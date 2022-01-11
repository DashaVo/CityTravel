using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface IUserManagementService 
    {
        public Task<UserDTO> GetUserByIdAsync(Guid userId);
        public Task<UpdateUserDTO> UpdateUser(UpdateUserDTO updateUser);
        public Task<bool> DeleteUser(Guid userId);
        public Task<IEnumerable<UserDTO>> GetUsersRangeAsync(int skip = 0, int take = 10);
        public Task<IEnumerable<UserDTO>> GetUsersByPropetiesAsync(string name, string email, string gender);
        
    }   
}

