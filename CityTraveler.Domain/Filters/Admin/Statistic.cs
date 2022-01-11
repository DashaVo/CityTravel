using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Domain.Filters.Admin
{
    public class Statistic
    {
        public string name { get; set; }
        public int value { get; set; } 
    }
    public class ComplexStatistic
    {
        public string name { get; set; }
        public IEnumerable<Statistic> series { get; set; }  = new List<Statistic>();
}
}
