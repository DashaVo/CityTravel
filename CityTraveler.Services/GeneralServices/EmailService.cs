using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using CityTraveler.Infrastructure.Settings;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CityTraveler.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;
        private readonly ApplicationContext _context;

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger, ApplicationContext context)
        {
            _emailSettings = emailSettings.Value;
            _logger = logger;
            _context = context;
        }

        public async Task<bool> SendAsync(IMessage email)
        {
            try
            {
                var recipients = (string.IsNullOrWhiteSpace(email.Recipients) ? _emailSettings.DefaultRecipients : email.Recipients).Split(" ,".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_emailSettings.Sender, _emailSettings.SenderName),
                    Subject = email.Subject,
                    Body = email.Body,
                    IsBodyHtml = true
                };

                foreach (var to in recipients)
                {
                    mailMessage.To.Add(to);
                }

                using (SmtpClient smtp = new SmtpClient(_emailSettings.Server, _emailSettings.Host))
                {
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(_emailSettings.UserName, _emailSettings.Password);
                    smtp.EnableSsl = _emailSettings.EnableSsl;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                    await smtp.SendMailAsync(mailMessage);
                    return true;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
#if DEBUG
                throw new InvalidOperationException(ex.Message);
#else
                return false;
#endif
            }
        }

        public EmailTemplateModel TemplateBind(EmailType type, string[] toReplace, params string[] values)
        {
            var template = _context.EmailTemplatesModels.FirstOrDefault(x => x.Type == type);

            if (template == null)
            {
                _logger.LogError($"EmailError: Template was not found.", $"Type: {type}");
                throw new ArgumentNullException(type.ToString());
            }

            for (int index = 0; index < toReplace.Length; index++)
            {
                template.Body = template.Body.Replace(toReplace[index], $"{"{"}{index}{"}"}");
            }

            template.Body = string.Format(template.Body, values);

            return template;
        }
    }
}
