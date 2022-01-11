using CityTraveler.Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace CityTraveler.Domain.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string AvatarSrc { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string AccessToken { get; set; }
        public DateTime Birthday { get; set; }
        public string Role { get; set; }
    }

    public class RegisterDTO
    {
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public string Gender { get; set; }
        public string AvatarSrc { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsPersistent { get; set; }
    }

    public class RestoreSessionDTO
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }

    public class SignoutDTO
    {
        public string Username { get; set; }
    }

    public class UpdateUserDTO
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string AvatarSrc { get; set; }
    }

    public class UpdateUserPasswordDTO
    {
        public string Username { get; set; }
        public string NewPassword { get; set; }
        public string OldPassword { get; set; }
    }

    public class ForgotPasswordDTO
    {
        public string Email { get; set; }
    }

    public class ConfirmProfileDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }

    public class SetupPasswordDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }

    public class SearchUsersDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
    }
}
