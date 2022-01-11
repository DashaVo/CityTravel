using CityTraveler.Domain.Enums;
using CityTraveler.Domain.Entities;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface IEmailService
    {
        EmailTemplateModel TemplateBind(EmailType type, string[] toReplace, params string[] values);
        Task<bool> SendAsync(IMessage email);
    }
}
