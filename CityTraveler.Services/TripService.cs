using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using CityTraveler.Domain.Errors;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Repository;
using CityTraveler.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CityTraveler.Services
{
    public class TripService : ITripService
    {
        private readonly ApplicationContext _context;
        private readonly ILogger<TripService> _logger;
        private readonly IMapper _mapper;
        private readonly IDbRequestManager<DefaultTripDTO> _requestManager;
        public TripService(ApplicationContext context, IMapper mapper, ILogger<TripService> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
            _requestManager = new DbRequestManager<DefaultTripDTO>(configuration.GetConnectionString("DefaultConnection"));
        }

        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        private IEnumerable<T> GetingStrategy<T>(Guid userId)
        {
            var trips = _context.Trips.Where(x=>x.Users.Select(x => x.UserId).Contains(userId));
            try
            {
                return trips.Any()
                       ? trips.Select(x => _mapper.Map<TripModel, T>(x))
                       : new List<T>();
            }
            catch (Exception e)
            {

                _logger.LogWarning($"Warning: Mapping was not successful.");
                throw new EntertainmentServicesException(e.Message);
            }
        }

        public async Task<bool> AddNewTripAsync(AddNewTripDTO newTrip)
        {
            try
            {
                if (newTrip != null)
                {
                    var model = _mapper.Map<AddNewTripDTO, TripModel>(newTrip);
                    var entertainments = _context.Entertaiments.Where(x => newTrip.EntertaimentsIds.Contains(x.Id)).ToList();
                    var user = _context.UserProfiles.Select(x => x.User).FirstOrDefault(x => x.UserId == newTrip.UserId);
                    model.Entertaiments = entertainments;
                    model.Users.Add(user);
                    _context.Trips.Add(model);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation($"New trip was created. Trip: {newTrip}");
                }

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on creating new trip! {e.Message}");
                throw new TripServiceException($"Exception on creating new trip! { e.Message }");
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

        public async Task<bool> AddDefaultTrip(DefaultTripDTO newDefaultTrip)
        {
            try
            {
                if (newDefaultTrip != null)
                {
                    var model = _mapper.Map<DefaultTripDTO, TripModel>(newDefaultTrip);
                    _context.Trips.Add(model);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation($"New default trip was created. Trip: {newDefaultTrip}");
                }

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on creating new efault trip! {e.Message}");
                return false;
            }
        }
        /*public async Task<IEnumerable<object>> GetDefaultTrips(int skip = 0, int take = 5)
        {
            var query = @"SELECT Id, Title, Description, AverageRating, TagString 
                            FROM [dbo].[Trips]
                            WHERE DafaultTrip=1";
            var result = await _requestManager.CommonQueryAsync(query, new { }, false);
            return result.Select(x =>
            {
                return new {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    AverageRating = x.AverageRating,
                    TagString = x.TagString
                };
            });
        }*/

        public IEnumerable<DefaultTripDTO> GetDefaultTrips(int skip = 0, int take = 5)
        {
            try
            {
                var trips = _context.Trips.Where(x => x.DafaultTrip == true).Skip(skip).Take(take);
               
                if (!trips.Any())
                {
                    _logger.LogWarning($"Problem with getting default trips. {trips} are null!");
                }

                return trips.Select(x => _mapper.Map<TripModel, DefaultTripDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on getting default trips! {e.Message}");
                return Enumerable.Empty<DefaultTripDTO>();
            }
        }


        public DefaultTripDTO GetDefaultTripById(Guid defaltTripId)
        {
            try
            {
                if (defaltTripId == Guid.Empty)
                {
                    _logger.LogWarning($"Problem with finding default trip with Id={defaltTripId}");
                }

                var trip = _context.Trips.FirstOrDefault(x => x.Id == defaltTripId);
                return _mapper.Map<TripModel, DefaultTripDTO>(trip);
            }
            catch (Exception e)
            {
                _logger.LogError($"Problen with finding default trip that contains Id={defaltTripId}! {e.Message}");
                throw new Exception($"Problen with finding default trip that contains Id={defaltTripId}! {e.Message}");
            }
        }


        public IEnumerable<TripDTO> GetTripDTOs(Guid userId)
        {
            return GetingStrategy<TripDTO>(userId);
        }
        
        public IEnumerable<TripPrewievDTO> GetTripPrewievDTOs(Guid userId)
        {
            return GetingStrategy<TripPrewievDTO>(userId);
        }



        public async  Task<IEnumerable<TripPrewievDTO>> GetTripsByUserId(Guid userId)
        {
            try
            {
                if (userId == Guid.Empty)
                {
                    _logger.LogWarning($"Problem with finding trip with user Id={userId}");
                }
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
                var trips = user.Trips;
                return trips.Select(x=> _mapper.Map<TripModel, TripPrewievDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogError($"Problen with finding trip that contains user Id={userId}! {e.Message}");
                throw new Exception($"Problen with finding trip that contains Id={userId}! {e.Message}");
            }
        }

        public async Task<IEnumerable<TripPrewievDTO>> GetTripsByEntertainmentId(Guid entretainmentId, int skip = 0, int take = 5)
        {
            try
            {
                if (entretainmentId == Guid.Empty)
                {
                    _logger.LogWarning($"Problem with finding trip with entertainment Id={entretainmentId}");
                }
                var entertainment = await _context.Entertaiments.FirstOrDefaultAsync(x => x.Id == entretainmentId);
                var trips = entertainment.Trips;
                return trips.Select(x => _mapper.Map<TripModel, TripPrewievDTO>(x)).Skip(skip).Take(take);
            }   
            catch (Exception e)
            {
                _logger.LogError($"Problen with finding trip that contains entertainmen Id={entretainmentId}! {e.Message}");
                throw new Exception($"Problen with finding trip that contains Id={entretainmentId}! {e.Message}");
            }
        }

        public TripDTO GetTripById(Guid tripId)
        {
            try
            {
                if (tripId == Guid.Empty)
                {
                    _logger.LogWarning($"Problem with finding trip with Id={tripId}");
                }

                var trip = _context.Trips.FirstOrDefault(x => x.Id == tripId);
                return _mapper.Map<TripModel, TripDTO>(trip);
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on finding trip that contains Id={tripId}! {e.Message}");
                return new List<TripDTO>().FirstOrDefault();
            }      
        }

        public IEnumerable<TripDTO> GetTrips(string title, double rating, TimeSpan optimalSpent, double price, string tag, int skip = 0, int take = 10)
        {
            try
            {
                var trips = _context.Trips.Skip(skip)
                    .Take(take)
                    .Where(x => x.Title==title && x.AverageRating == rating
                    && x.OptimalSpent == optimalSpent && x.Price.Value == price
                    && x.TagString==tag);

                return trips.Where(x=>x.DafaultTrip != true).Select(x => _mapper.Map<TripModel, TripDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on finding trips with parameteres: Title={title}, " +
                    $"Rating={rating}, OptimalSpent={optimalSpent}, Price={price}, Tag={tag}. {e.Message}");
                return Enumerable.Empty<TripDTO>();
            }
        }

        //Kate`s fault
        public IEnumerable<TripModel> GetTripsByStatus(TripStatus status)
        {
            try
            {
                return _context.Trips.Where(x => x.TripStatus == status);
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on finding trip that contains Status={status}! {e.Message}");
                return Enumerable.Empty<TripModel>();
            }      
        }


        public async Task<bool> UpdateDefaultTrip(DefaultTripDTO defaultTripDTO)
        {
            try
            {
                var isDeafultTripExists = await _context.Comments.AnyAsync(x => x.Id == defaultTripDTO.Id);
                if (!isDeafultTripExists)
                {
                    _logger.LogWarning($"Problem with trip udtating. Maybe trip = {defaultTripDTO} doesn't exists.");
                    return false;
                }
                // var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == defaultTripDTO.Id);
                _context.Trips.Update(_mapper.Map<DefaultTripDTO, TripModel>(defaultTripDTO));
                _context.SaveChanges();
                _logger.LogInformation($"Trip with id = {defaultTripDTO.Id} was updated. New information: {defaultTripDTO}!");
                return true;
              
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on updating trip with id = {defaultTripDTO.Id}! {e.Message}");
                throw new TripServiceException(e.Message);
            }
        }


        public async Task<bool> UpdateTripTitleAsync(Guid tripId, string newTitle)
        {
            try
            {
                if (tripId == Guid.Empty && newTitle == null)
                {
                    _logger.LogWarning($"Problem with updating trip title. TripId={tripId} maybe doesn't existss.");
                    return false;
                }

                var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);
                trip.Title = newTitle;
                _context.Update(trip);
                _context.SaveChanges();

                _logger.LogInformation($"Trip with id:{tripId} was updated. New title={newTitle}.");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on updating trip title! {e.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateTripDescriptionAsync(Guid tripId, string newDecription)
        {
            try
            {
                if (tripId == Guid.Empty && newDecription == null)
                {
                    _logger.LogWarning($"Problem with updating trip description. TripId={tripId} maybe doesn't existss.");
                    return false;
                }

                var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);
                trip.Description = newDecription;
                _context.Update(trip);
                _context.SaveChanges();

                _logger.LogInformation($"Trip with id:{tripId} was updated. New description={newDecription}");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on updating trip description! {e.Message}");
                return false;
            }
        }

        public async Task<bool> AddEntertainmetToTripAsync(Guid tripId, Guid newEntertainmentId)
        {
            try
            {
                if (tripId == Guid.Empty && newEntertainmentId == Guid.Empty )
                {
                    _logger.LogWarning($"Problem with adding new entertainment to trip. TripId={tripId} maybe doesn't existss.");
                    return false;
                }

                var model = await _context.Entertaiments.FirstOrDefaultAsync(x => x.Id == newEntertainmentId);
                var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);

                trip.Entertaiments.Add(model);
                _context.Update(trip);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on adding new entertainment to trip! {e.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteEntertainmentFromTrip(Guid tripId, Guid entertainmentId)
        {
            try
            {
                if (tripId==Guid.Empty && entertainmentId==Guid.Empty)
                {
                    _logger.LogWarning($"Problem with deleting entertainment from trip. TripId={tripId} or " +
                        $"EntertainmentId={entertainmentId} maybe doesn't existss.");
                    return false;
                }

                var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);
                var entertainment = await _context.Entertaiments.FirstOrDefaultAsync(x => x.Id == entertainmentId);
                trip.Entertaiments.Remove(entertainment);
                _context.Update(trip);
                _context.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception on deleting entertainment from trip! {e.Message}");
                return false;
            }
        }

        //?
        public async Task<bool> UpdateTripSatusAsync(Guid tripId, TripStatus newStatus)
        {
            try
            {
                var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);
                trip.TripStatus = newStatus;
                _context.Update(trip);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new TripServiceException($"Exception on  updating trip status! {e.Message}");
            }
        }
    }
}
