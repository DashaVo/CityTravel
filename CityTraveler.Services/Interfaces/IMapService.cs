using CityTraveler.Domain.Entities;
using CityTraveler.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface IMapService
    {
        public Task<IEnumerable<StreetDTO>> GetAllStreetsAsync();
        public Task<StreetDTO> GetStreetByIdAsync(Guid streetId);
        public Task<IEnumerable<EntertainmentMapDTO>> GetAllEntertitainmentsAsync(int skip, int take);
        public int GetCountOfEntertainments();

    }
}
