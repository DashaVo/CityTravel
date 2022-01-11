using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Filters;
using CityTraveler.Domain.Filters.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface IHistoryService
    {
        public Task<CommentDTO> GetUserLastComment(string userName);
        public Task<CommentDTO> GetLastComment();
        public Task<ReviewPreviewDTO> GetLastReview();
        public Task<TripPrewievDTO> GetLastTrip();
        public Task<TripPrewievDTO> GetUserLastTrip(string userName, bool passed = false);
        public Task<IEnumerable<EntertainmentPreviewDTO>> GetVisitEntertaiment(string userName, bool withoutReview = false);
        public Task<ReviewPreviewDTO> GetUserLastReview(string userName);
        public Task<IEnumerable<CommentDTO>> GetUserComments(string userName);
        //public Task<Friend> GetLastAddedFriend(Guid userId);

    }
}
