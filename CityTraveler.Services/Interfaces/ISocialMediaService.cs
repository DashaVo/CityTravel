using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface ISocialMediaService
    {
        Task<EntertainmentReviewDTO> AddReviewEntertainment(EntertainmentReviewDTO rev);
        Task<TripReviewDTO> AddReviewTrip(TripReviewDTO rev);
        Task<bool> RemoveReview(Guid reviewId);
        Task<bool> RemoveRating(Guid ratingId);
        Task<bool> UpdateReview(ReviewDTO model);
        Task<bool> UpdateComment(CommentDTO model);
        Task<IEnumerable<ReviewDTO>> GetReviews(int skip = 0, int take = 10);
        Task<IEnumerable<ReviewDTO>> GetUserReviews(Guid userId);
        Task<IEnumerable<ReviewPreviewDTO>> GetObjectReviews(Guid objectId, int skip = 0, int take = 10);
        Task<Guid> PostRating(RatingDTO rating);
        Task<Guid> AddComment(CommentDTO comment);
        Task<bool> RemoveComment(Guid commentId);
        Task<Guid> AddImage(ReviewImageDTO comment);
        Task<bool> RemoveImage(Guid reviewImageId);
        Task<IEnumerable<ReviewDTO>> GetReviewsByTitle(string title);
        Task<IEnumerable<ReviewDTO>> GetReviewsByDescription(string description);
        Task<IEnumerable<ReviewDTO>> GetReviewsByAverageRating(double raiting);
        Task<ReviewDTO> GetReviewByComment(Guid comment);
        Task<ReviewPreviewDTO> GetReviewById(Guid Id);
        public Task<IEnumerable<object>> getReviewsByTitleDapper(string title);
        public Task<IEnumerable<object>> getUserReviewsDapper(Guid Id);
        Task<RatingDTO> GetRatingById(Guid id);
        Task<IEnumerable<CommentDTO>> GetCommentsByReview(Guid id);
        Task<IEnumerable<CommentDTO>> GetCommentsByUserId(Guid userId);
        Task<IEnumerable<ReviewPreviewDTO>> GetReviewsByUser(Guid userId);
        Task<IEnumerable<ReviewImageDTO>> GetImagesByReviewId(Guid reviewId);
    }
}
