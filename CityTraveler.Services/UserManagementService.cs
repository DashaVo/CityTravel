using Microsoft.EntityFrameworkCore;
using CityTraveler.Domain.Errors;
using CityTraveler.Domain.Entities;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CityTraveler.Domain.DTO;
using Microsoft.AspNetCore.Identity;
using CityTraveler.Domain.Enums;
using CityTraveler.Infrastructure.Authorization;

namespace CityTraveler.Services
{
    public class UserManagementService : IUserManagementService
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        public UserManagementService(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public bool IsActive { get; set; }
        public string Version { get; set; }
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        const string messageExceptionArgument = "Invalid arguments";

        public async Task<UserDTO> GetUserByIdAsync(Guid userId)
        {
            var userExist = await _context.Users.AnyAsync(x => x.UserId == userId);

            if (userExist)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
                return _mapper.Map<ApplicationUserModel, UserDTO>(user);
            }
            return null;
        }

        public async Task<IEnumerable<UserDTO>> GetUsersRangeAsync(int skip = 0, int take = 10)
        {

            if (skip < 0 || take < 1)
            {
                throw new UserManagemenServiceException(messageExceptionArgument);
            }

            var users = await Task.Run(() => _context.Users.Skip(skip).Take(take)); 
        
            return  _mapper.Map<IEnumerable<ApplicationUserModel>, IEnumerable<UserDTO>>(users);
           
        }

        public async Task<IEnumerable<UserDTO>> GetUsersByPropetiesAsync(string name, string email, string gender)
        {

            var users = await Task.Run(() => _context.Users
            .Where(x => x.Profile.Name.Contains(name) || x.Profile.Gender == gender || x.Email.Contains(email)));

            return _mapper.Map<IEnumerable<ApplicationUserModel>, IEnumerable<UserDTO>>(users);
        }

        public async Task<UpdateUserDTO> UpdateUser(UpdateUserDTO updateUser)
        {           
                var user = await _context.UserProfiles.FirstOrDefaultAsync(x => x.User.Email == updateUser.Email);
                var updatedUser = _mapper.Map<UpdateUserDTO, UserProfileModel>(updateUser, user);
                _context.Update(updatedUser);
                await _context.SaveChangesAsync();
                return _mapper.Map<UserProfileModel, UpdateUserDTO>(updatedUser);
        }

        public async Task<bool> DeleteUser(Guid Id)
        {
            var userExist = _context.Users.Any(x => x.Id == Id);
            if (userExist)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == Id);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            throw new UserManagemenServiceException("User nor found");
                
          
        }

    }
}
