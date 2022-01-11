using CityTraveler.Domain.Entities;
using CityTraveler.Repository.DbContext;
using CityTraveler.Services.Interfaces;
using CityTraveler.Infrastucture.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CityTraveler.Domain.Enums;
using Microsoft.Extensions.Logging;
using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Repository;
using Microsoft.Extensions.Configuration;
using CityTraveler.Domain.Filters.Admin;

namespace CityTraveler.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly ILogger<StatisticService> _logger;
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly IDbRequestManager<object> _requestManager;
        public StatisticService(ApplicationContext context, IMapper mapper, ILogger<StatisticService> logger, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _requestManager = new DbRequestManager<object>(configuration.GetConnectionString("DefaultConnection"));
        }
        public bool IsActive { get; set; }
        public string Version { get; set; }
        public async Task<int> QuantityPassEntertaiment(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.SelectMany(x => x.Entertaiments).Distinct().Count();

            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get quantity of pass entertaiment {e.Message}");
            }
        }
        public async Task<IEnumerable<TripPrewievDTO>> GetTripVisitEntertaiment(string userName, Guid id)
        {
            try
            {
                var entertaiment = await _context.Entertaiments.FirstOrDefaultAsync(x => x.Id == id);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                var trips = user.Trips.Where(x => x.Entertaiments.Contains(entertaiment));
                return trips.Select(x => _mapper.Map<TripModel, TripPrewievDTO>(x));

            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                return Enumerable.Empty<TripPrewievDTO>();
            }

        }
        public async Task<double> GetAverageRatingUserTrip(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.Average(x => x.AverageRating);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get average rating user trips {e.Message}");
            }

        }
        public async Task<double> GetAverageEntertaimentUserTrip(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.Average(x => x.Entertaiments.Count);

            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get average count entertaiment user trip {e.Message}");
            }
        }
        public async Task<TimeSpan> GetMaxTimeUserTrip(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.Max(x => x.TripEnd - x.TripStart);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get maximal time for Trip {e.Message}");
            }
        }
        public async Task<TimeSpan> GetMinTimeUserTrip(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.Min(x => x.TripEnd - x.TripStart);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get minimal time for Trip {e.Message}");
            }
        }
        public async Task<double> GetAveragePriceUserTrip(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.Average(x => x.Price.Value);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get average price of user trips {e.Message}");
            }
        }
        public async Task<int> GetCountPassedUserTrip(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Trips.Count(x => x.TripStatus == TripStatus.Passed);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get count of passed user trip {e.Message}");
            }
        }
        public async Task<IEnumerable<TripPrewievDTO>> GetActivityUserTrip(string userName, DateTime timeStart, DateTime timeEnd)
        {
            if (!_context.Users.Any(x => x.UserName == userName))
            {
                _logger.LogWarning("User not found");
                return null;
            }
            if (timeEnd < timeStart)
            {
                _logger.LogWarning("TimeStart can`t be more than TimeEnd");
                return null;
            }
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                var trips = user.Trips.Where(x =>
                         x.Created < timeEnd
                         && x.Created > timeStart);
                return trips.Select(x => _mapper.Map<TripModel, TripPrewievDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                return Enumerable.Empty<TripPrewievDTO>();
            }

        }
        public async Task<DateTime> GetAverageAgeUser()
        {
            try
            {
                var ticks = (long)await Task.Run(() => _context.UserProfiles.Select(x => x.Birthday.Ticks).ToList().Average());
                var averageDate = new DateTime(ticks);
                return averageDate;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get average age user {e.Message}");
            }
        }
        public async Task<double> GetAvarageEnternaimentInTrip()
        {
            try
            {
                return _context.Trips.Select(x => x.Entertaiments.Count()).Max();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get average enternaiment all trip {e.Message}");
            }
        }
        public async Task<double> GetAverageUserReviewRating(string userName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return user.Reviews.Average(x => x.Rating.Value);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get average rating user reviews {e.Message}");
            }
        }
        public async Task<object> GetCharts()
        {
            var queryType = @"SELECT Type 
                          FROM [dbo].[Entertaiments]";

            var queryDate = @"SELECT *
                          FROM [dbo].[Trips]";
            var resultType = await _requestManager.CommonQueryAsync(queryType, new { }, false);
            var resultDate = await _requestManager.CommonQueryAsync(queryDate, new { }, false);
            var countEvent = resultType.Count(x => x.Type == ((int)EntertainmentType.Event));
            var countLandskape = resultType.Count(x => x.Type == ((int)EntertainmentType.Landscape));
            var countInstitution = resultType.Count(x => x.Type == ((int)EntertainmentType.Institution));
            var dates = resultDate.Select(x => x.Created.ToString("MM/dd/yyyy"));
            return new
            {
                pie = new List<Statistic>
                {
                    new Statistic()
                    {
                        name = "Events",
                        value = countEvent
                    },
                    new Statistic()
                    {
                        name = "Institution",
                        value = countInstitution
                    },
                    new Statistic()
                    {
                        name = "Landscape",
                        value = countLandskape
                    }
                },
                registration = dates.Distinct().Select(x =>
                   new Statistic()
                   {
                       name = x,
                       value = dates.Count(z => z == x)
                   })
            };
        }
        public async Task<object> GetActivity()
        {
            var queryComments = @"SELECT Modified 
                          FROM [dbo].[Comments]";

            var queryTrips = @"SELECT Modified
                          FROM [dbo].[Trips]";

            var queryRatings = @"SELECT Modified
                          FROM [dbo].[Ratings]";

            var comments = await _requestManager.CommonQueryAsync(queryComments, new { }, false);
            var trips = await _requestManager.CommonQueryAsync(queryTrips, new { }, false);
            var ratings = await _requestManager.CommonQueryAsync(queryRatings, new { }, false);

            var commentsDates = comments.Select(x => x.Modified.ToString("MM/dd/yyyy"));
            var tripsDates = trips.Select(x => x.Modified.ToString("MM/dd/yyyy"));
            var ratingsDates = ratings.Select(x => x.Modified.ToString("MM/dd/yyyy"));
            return new
            {
                pie = new List<ComplexStatistic>
                {
                    new ComplexStatistic()
                    {
                        name = "ratings",
                        series = ratingsDates.Distinct().Select(x =>
                        new Statistic()
                        {
                            name = x,
                            value = ratingsDates.Count(z => z == x)

                        })
                    },
                    new ComplexStatistic()
                    {
                        name = "trips",
                        series = tripsDates.Distinct().Select(x =>
                            new Statistic()
                            {
                                name = x,
                                value = tripsDates.Count(z => z == x)
                            })
                    },
                    new ComplexStatistic()
                    {
                        name = "comments",
                        series = commentsDates.Distinct().Select(x =>
                            new Statistic()
                            {
                                name = x,
                                value = commentsDates.Count(z => z == x)
                            })
                    }
                },

            };
        }
 


    }
}
