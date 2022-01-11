using CityTraveler.Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace CityTraveler.Domain.Entities
{
    public class FilterTrips
    {
        public DateTime TripStart { get; set; } = new DateTime();
        public string EntertaimentName { get; set; } = "";
        [DisplayFormat(ConvertEmptyStringToNull = false, NullDisplayText = "")]
        public string User { get; set; } = "";
        public double PriceMore { get; set; } = 0;
        public double PriceLess { get; set; } = double.MaxValue;
        public double AverageRatingMore { get; set; } = 0;
        public double AverageRatingLess { get; set; } = 5;
        [DisplayFormat(ConvertEmptyStringToNull = false, NullDisplayText = "")]
        public string Title { get; set; } = "";
        [DisplayFormat(ConvertEmptyStringToNull = false, NullDisplayText = "")]
        public string Description { get; set; } = "";
        public int TripStatus { get; set; }
    }
}
