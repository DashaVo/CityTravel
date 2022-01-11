using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(ApplicationUserModel user);

        string GenerateRefreshToken(Guid userId);
    }
}
