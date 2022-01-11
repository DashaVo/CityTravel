using CityTraveler.Domain.Entities;
using CityTraveler.Infrastructure.Settings;
using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<ApplicationUserModel> _userManager;
        private readonly IOptions<AuthSettings> _options;

        public TokenService(UserManager<ApplicationUserModel> userManager, IOptions<AuthSettings> options)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _options = options ?? throw new ArgumentNullException(nameof(options));
        }

        public async Task<string> GenerateAccessToken(ApplicationUserModel user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserName.ToString()),
            };

            var roles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            if (roles.Count > 0)
                claims.AddRange(roles.Select(x => new Claim(ClaimTypes.Role, x)));

            return GenerateJwtToken(claims, DateTime.Now.AddMinutes(Convert.ToDouble(_options.Value.JwtBearer.AuthTokenValid)));
        }

        public string GenerateRefreshToken(Guid userId)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            return GenerateJwtToken(claims, DateTime.Now.AddDays(Convert.ToDouble(_options.Value.JwtBearer.RefreshTokenValid)));
        }

        private string GenerateJwtToken(List<Claim> claims, DateTime expires)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.JwtBearer.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _options.Value.JwtBearer.Issuer,
                _options.Value.JwtBearer.Audience,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
