namespace CityTraveler.Infrastructure.Settings
{
    public class EmailSettings
    {
        public string Server { get; set; }
        public int Host { get; set; }
        public string SenderName { get; set; }
        public string Sender { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; }
        public string DefaultRecipients { get; set; }
    }
}
