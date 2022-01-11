namespace CityTraveler.Services.Interfaces
{
    public interface IMessage
    {
        string Sender { get; set; }
        string SenderName { get; set; }
        string Recipients { get; set; }
        string Subject { get; set; }
        string Body { get; set; }
    }
}
