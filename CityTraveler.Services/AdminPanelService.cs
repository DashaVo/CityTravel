using CityTraveler.Domain.Entities;
using CityTraveler.Repository.DbContext;
using CityTraveler.Services.Interfaces;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CityTraveler.Domain.Enums;
using CityTraveler.Domain.Filters.Admin;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CityTraveler.Domain.DTO;

namespace CityTraveler.Services
{
    public class AdminPanelService : IAdminPanelService
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<AdminPanelService> _logger;
        public AdminPanelService(ApplicationContext context, IMapper mapper, ILogger<AdminPanelService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<IEnumerable<UserDTO>> FilterUsers(FilterAdminUser filter,int skip = 0, int take = 10)
        {
            try
            {
                var users = _context.Users.Where(x =>
                            x.UserName.Contains(filter.UserName ?? "")
                            && x.Profile.Gender.Contains(filter.Gender ?? "")
                            && x.Profile.Name.Contains(filter.Name ?? "" )
                            && x.Email.Contains(filter.Email ?? "" )
                            && x.PhoneNumber.Contains(filter.PhoneNumber ?? "")).Skip(skip).Take(take);
                return users.Select(x => _mapper.Map<ApplicationUserModel, UserDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter users {e.Message}");
                return Enumerable.Empty<UserDTO>();
            }
        }
        public async Task<IEnumerable<EntertainmentPreviewDTO>> GetEntertainmentDTOByAddressAsync(AddressShowDTO addressDto)
        {
            var entertaiments = _context.Entertaiments.Where(x => x.Address.ApartmentNumber == addressDto.ApartmentNumber
                        && x.Address.HouseNumber == addressDto.HouseNumber
                        && x.Address.Street.Title.Contains(addressDto.Street.Title)
                        );
             return _mapper.Map<IEnumerable<EntertaimentModel>, IEnumerable<EntertainmentPreviewDTO>>(entertaiments);
        }
        public async Task<IEnumerable<EntertainmentPreviewDTO>> GetEntertainmentDTOByTripAsync(Guid id)

        {
            var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == id);
            var entertaiments = trip.Entertaiments;
            return _mapper.Map<IEnumerable<EntertaimentModel>, IEnumerable<EntertainmentPreviewDTO>>(entertaiments);
        }
        public async Task<IEnumerable<EntertainmentPreviewDTO>> FilterEntertaiments(FilterAdminEntertaiment filter, int skip = 0, int take = 10)
        {
            if (filter.AveragePriceLess < filter.AveragePriceMore)
            {
                _logger.LogWarning("PriceLess can`t be more than priceMore");
                return null;
            }
            if(filter.AverageRatingLess < filter.AverageRatingMore)
            {
                _logger.LogWarning("RatingLess can`t be more than RatingMore");
                return null;
            }
            try
            {
                var entertaiments = _context.Entertaiments.Where(x => x.AverageRating <= filter.AverageRatingLess
                            && x.AverageRating >= filter.AverageRatingMore
                            && x.AveragePrice.Value >= filter.AveragePriceMore
                            && x.AveragePrice.Value <= filter.AveragePriceLess
                            && x.Address.Street.Title.Contains(filter.Street ?? "")
                            && x.Description.Contains(filter.Description ?? "")
                            && x.Title.Contains(filter.Title ?? "")).Skip(skip).Take(take);
                entertaiments = (filter.Type != 4) ? entertaiments.Where(x => x.Type == (EntertainmentType)filter.Type) : entertaiments;
                return entertaiments.Select(x => _mapper.Map<EntertaimentModel, EntertainmentPreviewDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter entertainments {e.Message}");
                return Enumerable.Empty<EntertainmentPreviewDTO>();
            }
        }
        public async Task<IEnumerable<TripPrewievDTO>> FilterTrips(FilterAdminTrip filter, int skip = 0, int take = 10)
        {
            if (filter.PriceLess < filter.PriceMore)
            {
                _logger.LogWarning("PriceLess can`t be more than priceMore");
                return null;
            }
            if(filter.AverageRatingLess < filter.AverageRatingMore)
            {
                _logger.LogWarning("RatingLess can`t be more than RatingMore");
                return null;
            }
            try
            {
                var trips = _context.Trips.Where(x => x.TripStart >= filter.TripStart
                        && x.TripEnd <= filter.TripEnd
                        && x.Description.Contains(filter.Description ?? "")
                        && x.Title.Contains(filter.Title ?? "" )
                        && x.AverageRating >= filter.AverageRatingMore
                        && x.AverageRating <= filter.AverageRatingLess).Skip(skip).Take(take);
                trips = filter.TripStatus != 4 ? trips.Where(x => x.TripStatus == (TripStatus)filter.TripStatus) : trips;

                return trips.Select(x => _mapper.Map<TripModel, TripPrewievDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter trips {e.Message}");
                return Enumerable.Empty<TripPrewievDTO>(); ;
            }
        }
        public async Task<IEnumerable<AddressShowDTO>> FindAdressStreets(string filter = "", int skip = 0, int take = 10)
        {
            try
            {
                 var address =  _context.Streets.Where(x =>
                               x.Title.Contains(filter ?? "")).SelectMany(x => x.Addresses);
                return address.Select(x => _mapper.Map<AddressModel, AddressShowDTO>(x)).Skip(skip).Take(take); ;

            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter steets {e.Message}");
                return Enumerable.Empty<AddressShowDTO>();
            }
        }
        public async Task<IEnumerable<ReviewPreviewDTO>> FilterReview(FilterAdminReview filter, int skip = 0, int take = 10)
        {
            if (filter.RatingLess < filter.RatingMore)
            {
                _logger.LogWarning("RatingMore can`t be more than RatingLess.");
                return null;
            }
            try
            {
                var rates = _context.Reviews.Where(x =>
                        x.Rating.Value <= filter.RatingLess
                        && x.Rating.Value >= filter.RatingMore
                        && x.Description.Contains(filter.Description ?? "")
                        && x.User.UserName.Contains(filter.User ?? "")
                        && x.Title.Contains(filter.Title ?? "" )).Skip(skip).Take(take);
                return rates.Select(x => _mapper.Map<ReviewModel, ReviewPreviewDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter reviews {e.Message}");
                return Enumerable.Empty<ReviewPreviewDTO>();
            }
        }
        public async Task<bool> DeleteEntertaimentAsync(Guid id)
        {
            try
            {
                if (id != Guid.Empty)
                {
                    var enter = await _context.Entertaiments.FirstOrDefaultAsync(x => x.Id == id);
                    _context.Entertaiments.Remove(enter);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation($"Trip: {enter} was deleted.");
                }

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on deleting trip! Trip Id={id} was not foud. {e.Message}");
                return false;
            }
        }
        public async Task<bool> DeleteTripAsync(Guid tripId)
        {
            try
            {
                if (tripId != Guid.Empty)
                {
                    var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);
                    _context.Trips.Remove(trip);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation($"Trip: {trip} was deleted.");
                }

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on deleting trip! Trip Id={tripId} was not foud. {e.Message}");
                return false;
            }
        }
        public async Task<UserDTO> GetUserByUserNameAsync(string username)
        {
            var userExist = await _context.Users.AnyAsync(x => x.UserName == username);

            if (userExist)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
                return _mapper.Map<ApplicationUserModel, UserDTO>(user);
            }
            return null;
        }
        public async Task<IEnumerable<ReviewPreviewDTO>> ReviewByUser(string username)
        {
            if (username == null)
            {
                _logger.LogWarning("Error.");
                return null;
            }
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
                var rates = user.Reviews;
                return rates.Select(x => _mapper.Map<ReviewModel, ReviewPreviewDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter reviews {e.Message}");
                return Enumerable.Empty<ReviewPreviewDTO>();
            }
        }
        public async Task<IEnumerable<TripPrewievDTO>> TripByUser(string username)
        {
            if (username == null)
            {
                _logger.LogWarning("Error.");
                return null;
            }
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
                var trips = user.Trips;
                return trips.Select(x => _mapper.Map<TripModel, TripPrewievDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogWarning($"Failed to filter reviews {e.Message}");
                return Enumerable.Empty<TripPrewievDTO>();
            }
        }
        
    }
}
