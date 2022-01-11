
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface IAuthService
    {
        Task<(UserDTO User, string Token)> Register(RegisterDTO registerModel);
        Task<UserDTO> Login(LoginDTO loginModel);
        Task<UserDTO> RestoreSession(RestoreSessionDTO restoreModel);
        Task<IMessage> ForgotPassword(ForgotPasswordDTO forgotPasswordModel);
        Task<bool> SetupPassword(SetupPasswordDTO setupPasswordModel);
        Task<bool> UpdatePassword(UpdateUserPasswordDTO updateUserPasswordModel);
        Task<bool> ConfirmProfile(ConfirmProfileDTO confirmProfileModel);
        Task<UserDTO> UpdateProfile(UpdateUserDTO updateUserModel);
        Task Signout();
    }
}
