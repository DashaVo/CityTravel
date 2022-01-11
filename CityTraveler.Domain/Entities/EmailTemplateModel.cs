using CityTraveler.Domain.Enums;

namespace CityTraveler.Domain.Entities
{
    public class EmailTemplateModel : Entity
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public EmailType Type { get; set; }
    }
}
