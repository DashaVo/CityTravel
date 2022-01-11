using CityTraveler.Domain.Entities;
using CityTraveler.Services.Interfaces;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Errors;
using CityTraveler.Domain.Enums;
using CityTraveler.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace CityTraveler.Services
{
    public class EntertainmentService : IEntertainmentService
    {
        private readonly ILogger<EntertainmentService> _logger;
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public EntertainmentService(ApplicationContext context, IMapper mapper, ILogger<EntertainmentService> logger)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        private IEnumerable<T> GetingStrategy<T>(Func<EntertaimentModel, bool> where, EntertainmentType type)
        {
            IEnumerable<EntertaimentModel> result;

            switch (type)
            {
                case EntertainmentType.All:
                    result = _context.Entertaiments.Where(where);
                    _logger.LogInformation($"Info: Action was succeeded. Entertainment's count is {result.Count()}");

                    try
                    {
                        return result.Any()
                        ? result.Select(x => _mapper.Map<EntertaimentModel, T>(x))
                        : new List<T>();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning($"Warning: Mapping was not successful.");
#if DEBUG
                        throw new EntertainmentServicesException(ex.Message);
#else
                        return new List<T>();
#endif
                    }

                case EntertainmentType.Landscape:
                case EntertainmentType.Institution:
                case EntertainmentType.Event:
                    result = _context.Entertaiments.Where(x => x.Type == type).Where(where);
                    _logger.LogInformation($"Info: Action was succeeded. Entertainment's count is {result.Count()}");

                    try
                    {
                        return result.Any()
                            ? result.Select(x => _mapper.Map<EntertaimentModel, T>(x))
                            : new List<T>();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning($"Warning: Mapping was not successful.");
#if DEBUG
                        throw new EntertainmentServicesException(ex.Message);
#else
                        return new List<T>();
#endif
                    }

                default:
                    _logger.LogWarning($"Warning: Type is not correct.");
                    return new List<T>();
            }
        }

        public IEnumerable<EntertainmentPreviewDTO> GetAllDTO(EntertainmentType type = EntertainmentType.All)
        {
            Func<EntertaimentModel, bool> where = x => true;
            return GetingStrategy<EntertainmentPreviewDTO>(where, type);
        }

        public IEnumerable<EntertainmentPreviewDTO> GetEntertainmentsDTOByTitle(string title, EntertainmentType type = EntertainmentType.All)
        {
            Func<EntertaimentModel, bool> where = x => x.Title.Contains(title);
            return GetingStrategy<EntertainmentPreviewDTO>(where, type);
        }

        public IEnumerable<EntertainmentShowDTO> GetEntertainmentsDTO(IEnumerable<Guid> ids, EntertainmentType type = EntertainmentType.All)
        {
            Func<EntertaimentModel, bool> where = x => ids.Contains(x.Id);
            return GetingStrategy<EntertainmentShowDTO>(where, type);
        }

        public IEnumerable<EntertainmentPreviewDTO> GetEntertainmentsDTOByStreet(string streetTitle, EntertainmentType type = EntertainmentType.All)
        {
            Func<EntertaimentModel, bool> where = x => x.Address.Street.Title.Contains(streetTitle);
            return GetingStrategy<EntertainmentPreviewDTO>(where, type);
        }

        public IEnumerable<EntertainmentShowDTO> GetEntertainmentsDTOByCoordinates(CoordinatesDTO coordinatesDto, EntertainmentType type = EntertainmentType.All)
        {
            Func<EntertaimentModel, bool> where = x => x.Address.Coordinates.Latitude == coordinatesDto.Latitude
                && x.Address.Coordinates.Longitude == coordinatesDto.Longitude;
            return GetingStrategy<EntertainmentShowDTO>(where, type);
        }

        public async Task<EntertainmentShowDTO> GetEntertainmentDTOByIdAsync(Guid id)
        {
            var entertainment = await _context.Entertaiments.FirstOrDefaultAsync(x => x.Id == id);
            if (entertainment == null)
            {
                _logger.LogWarning("Warning: ID isn't correct.");
                return new EntertainmentShowDTO();
            }
            else
            {
                var result = _mapper.Map<EntertaimentModel, EntertainmentShowDTO>(entertainment);
                if (result.MainImage == null)
                {
                    result.MainImage = new ImageDTO();
                }
                return result;
            }
        }

        public double GetAverageRating(Guid? entertainmentId)
        {
            IEnumerable<EntertainmentReviewModel> reviews = _context.Entertaiments.FirstOrDefault(x => x.Id == entertainmentId).Reviews;

            if (reviews.Count() > 0)
            {
                return reviews.Sum(x => x.Rating.Value) / reviews.Count();
            }
            else
            {
                return 0;
            }
        }

        public IEnumerable<string> GetTypes()
        {
            return Enum.GetNames(typeof(EntertainmentType)).ToList();
        }
    }
}