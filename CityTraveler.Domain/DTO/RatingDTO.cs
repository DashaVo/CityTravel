using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Domain.DTO
{
    public class RatingDTO
    {
        public Guid? ReviewId { get; set; }
        public Guid? UserId { get; set; }
        public Guid? EntertainmentId { get; set; }
        public double Value { get; set; }
    }
}