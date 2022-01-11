using CityTraveler.Domain.DTO;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Services.Interfaces;
using CityTraveler.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CityTraveler.Domain.Errors;

namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserManagementController : Controller
    {
        private readonly IUserManagementService _service;
        private readonly ILogger<UserManagementController> _logger;

        public UserManagementController(IUserManagementService userService, ILogger<UserManagementController> logger)
        {
            _logger = logger;
            _service = userService;
        }

        [HttpGet("username")]
        public async Task<IActionResult> GetUserByIdAsync([FromQuery] Guid userId)
        {
            try
            {
                var user = await _service.GetUserByIdAsync(userId);
                if(user == null)
                {
                    return NotFound("User not found");
                }
                return Json(user);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersRangeAsync([FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            try
            {
                var users =await _service.GetUsersRangeAsync(skip, take);
                return Json(users);
            }
            catch (UserManagemenServiceException ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return NotFound("Invalid arguments");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("search")]
        public async Task<IActionResult> GetUsersByPropetiesAsync([FromQuery] string name, string email, string gender)
        {
            try
            {
                var users =await _service.GetUsersByPropetiesAsync(name, email, gender);
                if (users != null && users.Any())
                {
                    return Json(users);
                }
                return NotFound("Users not found!");

            }
            catch (UserManagemenServiceException ex) {
                _logger.LogError($"Error: {ex.Message}");
                return NotFound("Users not found!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO updateUser)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Json(await _service.UpdateUser(updateUser));
                }
                throw new Exception("Invalid form");
            }
            catch (UserManagemenServiceException ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return NotFound("User not found!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser([FromQuery] Guid Id)
        {
            try
            {
                return Json(await _service.DeleteUser(Id));
            }
            catch (UserManagemenServiceException ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return NotFound("Users not found!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
