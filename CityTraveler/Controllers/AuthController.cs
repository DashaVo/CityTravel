using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Enums;
using CityTraveler.Domain.Errors;
using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _service;
        private readonly IEmailService _emailService;
        private readonly static ConcurrentDictionary<string, SemaphoreSlim> _lockersDic = new ConcurrentDictionary<string, SemaphoreSlim>();
        private readonly static ConcurrentDictionary<string, RegisterDTO> _inputContext = new ConcurrentDictionary<string, RegisterDTO>();

        public AuthController(ILogger<AuthController> logger, IAuthService service, IEmailService emailService)
        {
            _service = service;
            _emailService = emailService;
            _logger = logger;
            SetupLockers();
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _service.Signout();
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {
            try
            {
                var user = await _service.Login(request);
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UserNotAuthorizedException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("restore")]
        public async Task<IActionResult> RestoreSession([FromQuery] string u, [FromQuery] string t)
        {
            try
            {
                var user = await _service.RestoreSession(new RestoreSessionDTO
                {
                    Username = u,
                    Token = t
                });
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO request)
        {
            _lockersDic.TryGetValue("register", out SemaphoreSlim semaphore);

            var isExists = _inputContext.TryAdd("register", request);

            /*if (isExists)
            {
                await semaphore.WaitAsync();
            }*/

            await semaphore.WaitAsync();

            try
            {
                var (user, confirmToken) = await _service.Register(request);

                if (confirmToken != null)
                {
                    var template = _emailService.TemplateBind(EmailType.ConfirmProfile, new string[] { "{Request.Host.Value}", "{Email}", "{ConfirmToken}" }, 
                        Request.Host.Value, user.Email, confirmToken);

                    await _emailService.SendAsync(new EmailMessage
                    {
                        Recipients = user.Email,
                        Subject = template.Subject,
                        Body = template.Body
                    });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            finally
            {
                _inputContext.TryRemove("register", out RegisterDTO registerDTO);
                semaphore.Release();
            }
        }

        [HttpPost("setup-pass")]
        public async Task<IActionResult> SetupPassword([FromBody] SetupPasswordDTO request)
        {
            try
            {
                await _service.SetupPassword(request);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("set-pwd")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdateUserPasswordDTO request)
        {
            try
            {
                var notification = await _service.UpdatePassword(request);

                return NoContent();
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmProfile([FromQuery] string email, [FromQuery] string token)
        {
            try
            {
                await _service.ConfirmProfile(new ConfirmProfileDTO { Email = email, Token = token });
                return Redirect("/home");
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDTO request)
        {
            try
            {
                var user = await _service.UpdateProfile(request);
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void SetupLockers()
        {
            if (_lockersDic.Count == 0)
            {
                _lockersDic.TryAdd("register", new SemaphoreSlim(1, 1));
                _lockersDic.TryAdd("update", new SemaphoreSlim(1, 1));
            }
        }
    }
}
