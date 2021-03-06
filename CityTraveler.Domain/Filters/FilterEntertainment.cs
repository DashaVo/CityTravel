
using CityTraveler.Domain.Enums;

namespace CityTraveler.Domain.Entities
{
    public class FilterEntertainment
    {
        public string StreetName { get; set; } = "";
        public int Type { get; set; }
        public string HouseNumber { get; set; } = "";
        public string TripName { get; set; } = "";
        public string Title { get; set; } = "";
        public double PriceMore { get; set; } = 0;
        public double PriceLess { get; set; } = double.MaxValue;
        public double RatingMore { get; set; } = 0;
        public double RatingLess { get; set; } = 5;
    }
}
