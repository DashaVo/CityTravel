using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using CityTraveler.Domain.Errors;
using CityTraveler.Domain.Notifications;
using CityTraveler.Infrastructure.Authorization;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Repository.DbContext;
using CityTraveler.Services.Extensions;
using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CityTraveler.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUserModel> _userManager;
        private readonly SignInManager<ApplicationUserModel> _signinManager;
        private readonly ApplicationContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthService> _logger;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly string generalError = "Incorrect email or password";

        public AuthService(
            ILogger<AuthService> logger,
            IMapper mapper,
            IEmailService emailService,
            ITokenService tokenService,
            UserManager<ApplicationUserModel> userManager, 
            SignInManager<ApplicationUserModel> signInManager, 
            ApplicationContext context)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signinManager = signInManager;
            _emailService = emailService;
            _tokenService = tokenService;
            _context = context;
            _logger = logger;
        }

        public async Task<IMessage> ForgotPassword(ForgotPasswordDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                user = await _userManager.FindByNameAsync(request.Email);

                if (user == null)
                {
                    _logger.LogError($"{nameof(UserNotFoundException)}: User was not found.", $"Email: {request.Email}");
                    throw new UserNotFoundException($"User was not found.");
                }
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var password = PasswordExtensions.Generate("", 8, 3);
            await _userManager.ResetPasswordAsync(user, token, password);

            var template = _emailService.TemplateBind(EmailType.PasswordRestore, new string[] { "{Name}", "{Email}", "{Password}" }, user.Profile.Name, user.UserName, password);

            return new EmailMessage
            {
                Recipients = user.Email,
                Subject = template.Subject,
                Body = template.Body
            };
        }

        public async Task<UserDTO> Login(LoginDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                _logger.LogError($"{nameof(UserNotFoundException)}: Email was not found.", $"Email: {request.Email}");
                throw new UserNotFoundException(generalError);
            }

            var result = await _signinManager.PasswordSignInAsync(user.UserName, request.Password, request.IsPersistent, false);

            if (!result.Succeeded)
            {
                _logger.LogError($"{nameof(UserNotAuthorizedException)}: {generalError}, Email: {request.Email}, Password: {request.Password}");
                throw new UserNotAuthorizedException(generalError);
            }

            var profile = _mapper.Map<UserDTO>(user);
            profile.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? Roles.Guest;

            /*if(profile.Role == "Admin")
            {
                UserRole userRole = UserRole.Admin;
                profile.Role = ((int) userRole).ToString();
            }*/

            profile.AccessToken = await _tokenService.GenerateAccessToken(user);
            return profile;
        }

        public async Task<(UserDTO User, string Token)> Register(RegisterDTO request)
        {
            try
            {
                var user = _mapper.Map<RegisterDTO, ApplicationUserModel>(request);

                var existedUser = await _userManager.FindByEmailAsync(request.Email);

            if (existedUser != null)
            {
                throw new Exception("User is already created");
            }

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    _logger.LogError($"{nameof(UserUpdateException)}: Cannot create user with specified data.",
                        $"Email: {request.Email}", $"Name: {request.Name}", $"Gender: {request.Gender}", $"Password: {request.Password}");
                    throw new UserUpdateException("Cannot create user with specified data.");
                }

                result = await _userManager.AddToRoleAsync(user, Roles.User);

                if (!result.Succeeded)
                {
                    await _userManager.DeleteAsync(user);
                    _logger.LogError($"{nameof(UserUpdateException)}: Cannot add role to user.", $"Email: {request.Email}");
                    throw new UserUpdateException("Cannot add role to user.");
                }

                await _userManager.UpdateAsync(user);

                await _signinManager.SignInAsync(user, false);

                var token = HttpUtility.UrlEncode(await _userManager.GenerateEmailConfirmationTokenAsync(user));

                var created = _mapper.Map<ApplicationUserModel, UserDTO>(user);

                created.Role = Roles.User;
                created.AccessToken = await _tokenService.GenerateAccessToken(user);
                _context.SaveChanges();

                return (created, token);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdatePassword(UpdateUserPasswordDTO request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (!string.IsNullOrEmpty(request.OldPassword) && !string.IsNullOrEmpty(request.NewPassword))
            {
                var isValid = await _userManager.CheckPasswordAsync(user, request.OldPassword);

                if (!isValid)
                {
                    _logger.LogError($"{nameof(UserUpdateException)}: Current password was not correct.",
                        $"Password: {request.OldPassword}", $"NewPassword: {request.NewPassword}");
                    throw new UserUpdateException("Current password was not correct.");
                }

                var result = await _userManager.ChangePasswordAsync(user, request.OldPassword, request.NewPassword);
                return result.Succeeded;
            }
            return false;
        }

        public async Task<UserDTO> RestoreSession(RestoreSessionDTO request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);

            if (user == null)
            {
                _logger.LogError($"{nameof(UserNotFoundException)}: User was not found.", $"Username: {request.Username}");
                throw new UserNotFoundException("User was not found.");
            }

            await _signinManager.SignInAsync(user, true);

            var profile = _mapper.Map<UserDTO>(user);

            profile.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? Roles.Guest;
            profile.AccessToken = await _tokenService.GenerateAccessToken(user);
            return profile;
        }

        public async Task<bool> SetupPassword(SetupPasswordDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                _logger.LogError($"{nameof(UserNotFoundException)}: Email was not found.", $"Email: {request.Email}");
                throw new UserNotFoundException("User not found");
            }

            var result = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);

            if (!result.Succeeded)
            {
                _logger.LogError($"{nameof(UserUpdateException)}: Token is not valid.", $"Email: {request.Email}");
                throw new UserUpdateException("Token is not valid");
            }

            return result.Succeeded;
        }

        public async Task Signout()
        {
            await _signinManager.SignOutAsync();
        }

        public async Task<UserDTO> UpdateProfile(UpdateUserDTO request)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.UserName == request.UserName);

            if (user == null)
            {
                _logger.LogError($"{nameof(UserNotFoundException)}: User was not found", $"UserName: {request.UserName}");
                throw new UserNotFoundException($"User was not found");
            }

            if (user.Email != request.Email)
            {
                var token = await _userManager.GenerateChangeEmailTokenAsync(user, request.Email);
                await _userManager.ChangeEmailAsync(user, request.Email, token);
            }
            user = _mapper.Map<UpdateUserDTO, ApplicationUserModel>(request, user);
            
            await _userManager.UpdateAsync(user);

            
            var profile = _mapper.Map<UserDTO>(user);

            profile.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? Roles.Guest;
            profile.AccessToken = await _tokenService.GenerateAccessToken(user);

            return profile;
        }

        public async Task<bool> ConfirmProfile(ConfirmProfileDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                _logger.LogError($"{nameof(UserNotFoundException)}: User was not found.", $"Email: {request.Email}", $"Token: {request.Token}");
                throw new UserNotFoundException($"User was not found.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, request.Token);

            return result.Succeeded;
        }
    }
}
