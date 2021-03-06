using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Errors;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CityTraveler.Domain.DTO;


namespace CityTraveler.Services
{
    public class InfoService : IInfoService
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public InfoService(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool IsActive { get ; set ; }
        public string Version { get ; set ; }

        const string messageExceptionArgument = "Invalid arguments";

        public async Task<EntertainmentShowDTO> GetUserMostPopularEntertaimentInTripsAsync(Guid userId)
        {
                var entertaiment = (await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId))
                    .Trips.SelectMany(x => x.Entertaiments).OrderByDescending(x => x.Trips.Count()).FirstOrDefault();

                return _mapper.Map<EntertaimentModel, EntertainmentShowDTO>(entertaiment);
        }

        public async Task<EntertainmentShowDTO> GetMostPopularEntertaimentInTripsAsync()
        {
                var entertaiment = await Task.Run(() => _context.Trips.Distinct()
                    .SelectMany(x => x.Entertaiments).OrderByDescending(x => x.Trips.Count()).FirstOrDefault());

                return _mapper.Map<EntertaimentModel, EntertainmentShowDTO>(entertaiment);
        }
        public async Task<InfoTripDTO> GetMostPopularTripAsync()
        {
                var trip = await _context.Trips.OrderByDescending(x => x.Users.Count).FirstOrDefaultAsync();
                             
                return _mapper.Map<TripModel, InfoTripDTO>(trip);
        }
        public async Task<ReviewDTO> GetReviewByMaxCommentsAsync(Guid userId = default)
        {
                var review = userId != Guid.Empty
                ? (await _context.Users.FirstOrDefaultAsync(x => x.Id == userId)).Reviews.OrderByDescending(x => x.Comments.Count).FirstOrDefault()
                : _context.Users.SelectMany(x => x.Reviews).OrderByDescending(x => x.Comments.Count).FirstOrDefault();
                          
                return _mapper.Map<ReviewModel, ReviewDTO>(review);          
        }

        public async Task<InfoTripDTO> GetTripByMaxReviewAsync(Guid userId = default)
        {
                var trip = userId != Guid.Empty
                ? (await _context.Users.FirstOrDefaultAsync(x => x.Id == userId)).Trips.OrderByDescending(x => x.Reviews.Count).FirstOrDefault()
                : _context.Users.SelectMany(x => x.Trips).OrderByDescending(x => x.Reviews.Count).FirstOrDefault();

                return _mapper.Map<TripModel, InfoTripDTO>(trip);
        }

        public async Task<IEnumerable<InfoTripDTO>> GetLastTripsByPeriodAsync(DateTime start, DateTime end)
        {
            try
            {
                if (start > end)
                {
                    throw new ArgumentException(messageExceptionArgument);
                }

                var trips = await Task.Run(() => _context.Trips.Where(x => x.TripStart > start && x.TripStart < end));

               return _mapper.Map<IEnumerable<TripModel>, IEnumerable<InfoTripDTO>>(trips);
            }
            catch(Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            }
            
        }

        public async Task<IEnumerable<InfoTripDTO>> GetTripsByLowPriceAsync(int count)
        {
            try
            {
                if(count < 1)
                {
                    throw new ArgumentException("Invalid argument");
                }
                var trips =await Task.Run(() => _context.Trips.OrderBy(x => x.Price.Value).Take(count));

                return _mapper.Map<IEnumerable<TripModel>, IEnumerable<InfoTripDTO>>(trips);
            }
            catch(Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            }
            
        }

        public async Task<int> GetRegisteredUsersByPeriodAsync(DateTime start, DateTime end)
        {
            try
            {
                if (start > end)
                {
                    throw new ArgumentException(messageExceptionArgument);
                }
                var usersCount = await _context.Users.CountAsync(x => x.Profile.Created > start && x.Profile.Created < end);
                return usersCount;
            }
            catch(Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            }
              
        }
        public async Task<IEnumerable<InfoTripDTO>> GetMostlyUsedTemplatesAsync(int count = 2)
        {
            try
            {
                var templateIds = _context.Trips.Select(x => x.TemplateId).GroupBy(x => x)
                    .OrderByDescending(g => g.Count())
                    .Select(x => x.Key)
                    .Take(count);
                var templatesTripModel = await Task.Run(() => _context.Trips.Where(x => templateIds.Contains(x.Id)));

                return _mapper.Map<IQueryable<TripModel>, IEnumerable<InfoTripDTO>>(templatesTripModel);
            }
            catch (Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            }
            
        }

        public async Task<int> GetUsersCountTripsDateRangeAsync(DateTime start, DateTime end)
        {
        
            if (start > end)
            {
                throw new ArgumentException(messageExceptionArgument);
            }
                
            return await Task.Run(() => _context.Trips.Where(x => x.TripStart > start && x.TripEnd < end).SelectMany(x => x.Users).Distinct().Count());
        }

        public async Task<InfoTripDTO> GetLongestTripAsync()
        {
            try
            {
                var trip = await _context.Trips.OrderByDescending(x => x.RealSpent).FirstOrDefaultAsync();
                           
                return _mapper.Map<TripModel, InfoTripDTO>(trip);
            }
            catch (Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            }
        }

        public async Task<InfoTripDTO> GetShortestTripAsync()
        {
            try
            {
                var trip = await _context.Trips.OrderBy(x => x.RealSpent).FirstOrDefaultAsync();

                return _mapper.Map<TripModel, InfoTripDTO>(trip); 
            }
            catch (Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            }
        }

        public async Task<int> GetTripsCreatedByPeriodAsync(DateTime start, DateTime end)
        {
            try
            { 
                if (start > end)
                    {
                    throw new ArgumentException(messageExceptionArgument);
                    }
                return await Task.Run(() => _context.Trips.Where(x => x.TripStart > start && x.TripEnd < end).Count());
            }
            catch (Exception e)
            {
                throw new Exception(e.StackTrace, e.InnerException);
            } 
        }
    }
}
