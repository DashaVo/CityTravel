using System;

namespace CityTraveler.Domain.Notifications
{
    public abstract class EmailNotification
    {
        public string Subject { get; set; }
        public string Body { get; set; }
    }

    public class MultipleRecipientsEmailNotification : EmailNotification
    {
        public string Recipients { get; set; }
    }

    public class DirectEmailNotification : EmailNotification
    {
        public Guid RecipientId { get; set; }
    }
}
