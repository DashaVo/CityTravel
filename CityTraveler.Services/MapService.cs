using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Errors;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CityTraveler.Domain.DTO;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace CityTraveler.Services
{
    public class MapService : IMapService
    {
        private readonly ApplicationContext _context;
        private readonly ILogger<MapService> _logger;
        private readonly IMapper _mapper;
        public MapService(ApplicationContext context, IMapper mapper, ILogger<MapService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public bool IsActive { get; set; }
        public string Version { get; set; }

        public int GetCountOfEntertainments()
        {
            return _context.Entertaiments.Count();
        }

        public async Task<IEnumerable<EntertainmentMapDTO>> GetAllEntertitainmentsAsync(int skip, int take)
        {
            var entertainments = _context.Entertaiments.Skip(skip).Take(take);

            if (await entertainments.AnyAsync())
            {
                try
                {
                    var result = entertainments.Select(x => _mapper.Map<EntertaimentModel, EntertainmentMapDTO>(x));
                    _logger.LogInformation($"Info: Action was succeeded. Entertainments count is {entertainments.Count()}");
                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error: Action was not succeeded. {ex.Message}");
                }
            }
            else
            {
                _logger.LogInformation($"Info: There aren`t any Entertainments in the DataBase");
            }

            return new List<EntertainmentMapDTO>();
        }

        public async Task<IEnumerable<StreetDTO>> GetAllStreetsAsync()
        {
            var streets = _context.Streets;

            if (await streets.AnyAsync())
            {
                try
                {
                    var result = streets.Select(x => _mapper.Map<StreetModel, StreetDTO>(x));
                    _logger.LogInformation($"Info: Action was succeeded. Streets count is {streets.Count()}");
                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error: Action was not succeeded. {ex.Message}");
                }
            }
            else
            {
                _logger.LogInformation($"Info: There aren`t any streets in the DataBase");
            }

            return new List<StreetDTO>();
        }

        public async Task<StreetDTO> GetStreetByIdAsync(Guid streetId) 
        {
            var street = await _context.Streets.FirstOrDefaultAsync(x => x.Id == streetId);

            if (street == null)
            {
                _logger.LogInformation("Info: Street was not found");
                return null;
            }
            else
            {
                return _mapper.Map<StreetModel, StreetDTO>(street);
            }
        }
    }
}
