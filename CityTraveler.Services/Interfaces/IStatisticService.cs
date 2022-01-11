using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CityTraveler.Domain.DTO;

namespace CityTraveler.Services.Interfaces
{
    public interface IStatisticService 
    {
        public Task<int> QuantityPassEntertaiment(string userName);
        public Task<IEnumerable<TripPrewievDTO>> GetTripVisitEntertaiment(string userName, Guid id);
        public Task<double> GetAverageEntertaimentUserTrip(string userName);
        public Task<double> GetAverageRatingUserTrip(string userName);
        public Task<TimeSpan> GetMaxTimeUserTrip(string userName);
        public Task<TimeSpan> GetMinTimeUserTrip(string userName);
        public Task<double> GetAveragePriceUserTrip(string userName);
        public Task<int> GetCountPassedUserTrip(string userName);
        public Task<IEnumerable<TripPrewievDTO>> GetActivityUserTrip(string userName, DateTime timeStart, DateTime timeEnd);
        public Task<DateTime> GetAverageAgeUser();
        public Task<double> GetAvarageEnternaimentInTrip();
        public Task<double> GetAverageUserReviewRating(string userName);
        public Task<object> GetCharts();
        public Task<object> GetActivity();
        
    }
}
