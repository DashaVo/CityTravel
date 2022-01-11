namespace CityTraveler.Services.Interfaces
{
    public class EmailMessage : IMessage
    {
        public string Recipients { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Sender { get; set; }
        public string SenderName { get; set; }
    }
}
