using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Repository;
using CityTraveler.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityTraveler.Services
{
    public class SocialMediaService : ISocialMediaService
    {
        public static ILogger<EntertainmentService> LoggerEntertainment { set; get; }
        public static IConfiguration configEntertainment { set; get; }
        private readonly IDbRequestManager<ReviewDapperDTO> _requestManager;
        private readonly ILogger<SocialMediaService> _logger;
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;

        public SocialMediaService(ApplicationContext context, IMapper mapper, ILogger<SocialMediaService> logger, IConfiguration configuration)
        {
            _dbContext = context;
            _mapper = mapper;
            _logger = logger;
            _requestManager = new DbRequestManager<ReviewDapperDTO>(configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<IEnumerable<object>> getReviewsByTitleDapper(string title)
        {
            var query = @"SELECT Id, Title, Description FROM [dbo].[Reviews] WHERE Title LIKE @title";

            var result = await _requestManager.CommonQueryAsync(query, new {@title= $"%{title}%" }, false);

            return result.Select(x =>
            {
                return new
                {
                    Title = x.Title,
                    Description = x.Description,
                    Id = x.Id
                };
            });
        }
        public async Task<IEnumerable<object>> getUserReviewsDapper(Guid Id)
        {
            var query = @"SELECT Id, Title, Description FROM [dbo].[Reviews] WHERE UserId = @id";

            var result = await _requestManager.CommonQueryAsync(query, new {@id = Id }, false);

            return result.Select(x =>
            {
                return new
                {
                    Title = x.Title,
                    Description = x.Description,
                    Id = x.Id
                };
            });
        }

        public async Task<EntertainmentReviewDTO> AddReviewEntertainment(EntertainmentReviewDTO review)
        {
            try
            {
                if (!_dbContext.Entertaiments.Any(x => x.Id == review.EntertainmentId))
                {
                    _logger.LogError("Entertainment not found");
                    return null;
                }
                for (int i = 0; i < review.Images.Count() - 1; ++i) 
                {
                    var modelImage = _mapper.Map<ImageGetDTO, ImageModel>(review.Images.ToList().ElementAt(i));
                    _dbContext.Images.Add(modelImage);
                }
                var model = _mapper.Map<EntertainmentReviewDTO, EntertainmentReviewModel>(review);
                model.User = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == review.UserId);
                review.Id = _dbContext.Reviews.Add(model).Entity.Id;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to add review to entertainment {e.Message}");
                return null;
            }
            return review;
        }

        public async Task<TripReviewDTO> AddReviewTrip( TripReviewDTO review)
        {
            try
            {
                if (!_dbContext.Trips.Any(x => x.Id == review.TripId))
                {
                    _logger.LogError("Trip not found");
                    return null;
                }
                var model = _mapper.Map<TripReviewDTO, TripReviewModel>(review);
                model.User = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == review.UserId);
                review.Id = _dbContext.Reviews.Add(model).Entity.Id;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to add review to trip {e.Message}");
                return null;
            }
            return review;
        }

        public async Task<IEnumerable<ReviewPreviewDTO>> GetObjectReviews(Guid objectId, int skip, int take)
        {
            try
            {
                if (!await _dbContext.Entertaiments.AnyAsync(x => x.Id == objectId)
                && !await _dbContext.Trips.AnyAsync(x => x.Id == objectId))
                {
                    _logger.LogError("Object not found");
                    return Enumerable.Empty<ReviewPreviewDTO>();
                }
                var entertainment = await _dbContext.Entertaiments.FirstOrDefaultAsync(x => x.Id == objectId);
                var trip = await _dbContext.Trips.FirstOrDefaultAsync(x => x.Id == objectId);
                return await _dbContext.Entertaiments.AnyAsync(x => x.Id == objectId) ?
                     entertainment.Reviews.Where(x => x.EntertainmentId == objectId).Skip(skip).Take(take).Select(x => _mapper.Map<EntertainmentReviewModel, ReviewPreviewDTO>(x)) :
                     trip.Reviews.Where(x => x.TripId == objectId).Skip(skip).Take(take).Select(x => _mapper.Map<TripReviewModel, ReviewPreviewDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get reviews {e.Message}");
                return Enumerable.Empty<ReviewPreviewDTO>();
            }
        }
        public async Task<IEnumerable<ReviewPreviewDTO>> GetReviewsByUser(Guid userId)
        {
            try
            {
                if (!await _dbContext.Users.AnyAsync(x => x.Id == userId))
                {
                    _logger.LogError("User not found");
                    return Enumerable.Empty<ReviewPreviewDTO>();
                }
                var result = _dbContext.Reviews.Where(x => x.UserId == userId).ToList();
                return _mapper.Map<List<ReviewModel>, List<ReviewPreviewDTO>>(result);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get reviews {e.Message}");
                return Enumerable.Empty<ReviewPreviewDTO>();
            }
        }
        public async Task<IEnumerable<CommentDTO>> GetCommentsByUserId(Guid userId)
        {
            try
            {
                if (!await _dbContext.Users.AnyAsync(x => x.UserId == userId))
                {
                    _logger.LogError("User not found");
                    return Enumerable.Empty<CommentDTO>();
                }
                var comments = _dbContext.Comments.Where(x => x.Owner.UserId == userId).ToList();
                return _mapper.Map<List<CommentModel>, List<CommentDTO>>(comments);

            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get reviews {e.Message}");
                return Enumerable.Empty<CommentDTO>();
            }
        }

        public async Task<IEnumerable<ReviewDTO>> GetUserReviews(Guid userId)
        {
            try
            {
                if (!await _dbContext.Users.AnyAsync(x => x.Id == userId))
                {
                    _logger.LogError("User not found");
                    return Enumerable.Empty<ReviewDTO>();
                }
                var reviewModels = _dbContext.Reviews.Where(x => x.UserId == userId);
                return reviewModels.Select(x => _mapper.Map<ReviewModel, ReviewDTO>(x));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get reviews {e.Message}");
                return Enumerable.Empty<ReviewDTO>();
            }
        }

        public async Task<RatingDTO> GetRatingById(Guid id)
        {
            try
            {
                if (!_dbContext.Ratings.Any(x => x.Id == id))
                {
                    _logger.LogError("Rating not found");
                    return null;
                }
                return _mapper.Map<RatingModel, RatingDTO>(await _dbContext.Ratings.FirstOrDefaultAsync(x => x.Id == id));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get review by id {e.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<ReviewDTO>> GetReviews(int skip = 0, int take = 10)
        {
            try
            {
                if (skip < 0 || take < 0)
                {
                    _logger.LogError("Invalid arguments");
                    return Enumerable.Empty<ReviewDTO>();
                }
                var reviewModels = _dbContext.Reviews.Skip(skip).Take(take);
                var reviews = new List<ReviewDTO>();
                return await Task.Run(() => reviewModels.Select(x => _mapper.Map<ReviewModel, ReviewDTO>(x)));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get reviews {e.Message}");
                return Enumerable.Empty<ReviewDTO>();
            }
        }

        public async Task<Guid> PostRating(RatingDTO rating)
        {
            try
            {
                if (!_dbContext.Reviews.Any(x => x.Id == rating.ReviewId))
                {
                    _logger.LogError("Review not found");
                    return Guid.Empty;
                }
                var model = _mapper.Map<RatingDTO, RatingModel>(rating);
                model.User = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == rating.UserId);
                _dbContext.Ratings.Add(model);
                await _dbContext.SaveChangesAsync();
                EntertainmentService service = new EntertainmentService(_dbContext, _mapper, LoggerEntertainment);
                //service.GetAverageRating(rating.EntertainmentId);
                return _dbContext.Ratings.ToList().ElementAt(_dbContext.Ratings.Count() -1).Id;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to post rating {e.Message}");
                return Guid.Empty;
            }

        }

        public async Task<bool> RemoveReview(Guid reviewId)
        {
            try
            {
                if (!_dbContext.Reviews.Any(x => x.Id == reviewId))
                {
                    _logger.LogError("Review not found");
                    return false;
                }
                var review = await _dbContext.Reviews.FirstOrDefaultAsync(x => x.Id == reviewId);
                var raiting = await _dbContext.Ratings.FirstOrDefaultAsync(x => x.ReviewId == review.Id);
                if(raiting!=null)
                    _dbContext.Ratings.Remove(raiting);
                _dbContext.Images.RemoveRange(review.Images);
                _dbContext.Reviews.Remove(review);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to remove review {e.Message}");
                return false;
            }
        }

        public async Task<Guid> AddComment(CommentDTO comment)
        {
            try
            {
                if (!_dbContext.Users.Any(x => x.Id == comment.OwnerId))
                {
                    _logger.LogError("User not found");
                    return Guid.Empty;
                }
                if (!_dbContext.Reviews.Any(x => x.Id == comment.ReviewId))
                {
                    _logger.LogError("Review not found");
                    return Guid.Empty;
                }
                if (comment.Status > 3 || comment.Status < 1)
                {
                    _logger.LogError("Comment status incorrect");
                    return Guid.Empty;
                }
                var model = _mapper.Map<CommentDTO, CommentModel>(comment);
                model.Status = (CommentStatus)comment.Status;
                model.Owner = null;
                model.OwnerId = comment.OwnerId;
                var res = _dbContext.Comments.Add(model);
                await _dbContext.SaveChangesAsync();
                return res.Entity.Id;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to add comment {e.Message}");
                return Guid.Empty;
            }
        }

        public async Task<bool> RemoveComment(Guid commentId)
        {
            try
            {
                if (!_dbContext.Comments.Any(x => x.Id == commentId))
                {
                    _logger.LogError("Comment not found");
                    return false;
                }
                var comment = await _dbContext.Comments.FirstOrDefaultAsync(x => x.Id == commentId);
                _dbContext.Comments.Remove(comment);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to remove comment {e.Message}");
                return false;
            }
        }

        public async Task<Guid> AddImage(ReviewImageDTO image)
        {
            try
            {
                if (!_dbContext.Reviews.Any(x => x.Id == image.ReviewId))
                {
                    _logger.LogError("Review not found");
                    return Guid.Empty;
                }
                var model = _mapper.Map<ReviewImageDTO, ReviewImageModel>(image);
                var result = _dbContext.Images.Add(model);
                await _dbContext.SaveChangesAsync();
                return result.Entity.Id;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to add image {e.Message}");
                return Guid.Empty;
            }
        }

        public async Task<bool> RemoveImage(Guid reviewImageId)
        {
            try
            {
                if (!_dbContext.Images.Any(x => x.Id == reviewImageId))
                {
                    _logger.LogError("Image not found");
                    return false;
                }
                var image = await _dbContext.Images.FirstOrDefaultAsync(x => x.Id == reviewImageId);
                _dbContext.Images.Remove(image);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to remove image {e.Message}");
                return false;
            }
        }

        public async Task<IEnumerable<ReviewDTO>> GetReviewsByTitle(string title = "")
        {
            try
            {
                var reviewModels = _dbContext.Reviews.Where(x => x.Title.Contains(title));
                return await Task.Run(() => reviewModels.Select(x => _mapper.Map<ReviewModel, ReviewDTO>(x)));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get review by title {e.Message}");
                return Enumerable.Empty<ReviewDTO>();
            }
        }

        public async Task<IEnumerable<ReviewDTO>> GetReviewsByAverageRating(double rating)
        {
            try
            {
                var reviewModels = _dbContext.Reviews.Where(x => x.Rating.Value == rating);
                return await Task.Run(() => reviewModels.Select(x => _mapper.Map<ReviewModel, ReviewDTO>(x)));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get review by average raiting {e.Message}");
                return Enumerable.Empty<ReviewDTO>();
            }
        }

        public async Task<ReviewDTO> GetReviewByComment(Guid comment)
        {
            try
            {
                var commentModel = await _dbContext.Comments.FirstOrDefaultAsync(x => x.Id == comment);
                return _mapper.Map<ReviewModel, ReviewDTO>(commentModel.Review);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get review by comment {e.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<ReviewDTO>> GetReviewsByDescription(string description = "")
        {
            try
            {
                var reviewModels = _dbContext.Reviews.Where(x => x.Description.Contains(description ?? ""));
                return await Task.Run(() => reviewModels.Select(x => _mapper.Map<ReviewModel, ReviewDTO>(x)));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get review by description {e.Message}");
                return Enumerable.Empty<ReviewDTO>();
            }
        }

        public async Task<ReviewPreviewDTO> GetReviewById(Guid Id)
        {
            try
            {
                if (!_dbContext.Reviews.Any(x => x.Id == Id))
                {
                    _logger.LogError("Review not found");
                    return null;
                }
                return _mapper.Map<ReviewModel, ReviewPreviewDTO>(await _dbContext.Reviews.FirstOrDefaultAsync(x => x.Id == Id));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get review by id {e.Message}");
                return null;
            }
        }

        public async Task<bool> RemoveRating(Guid ratingId)
        {
            try
            {
                if (!await _dbContext.Ratings.AnyAsync(x => x.Id == ratingId))
                {
                    _logger.LogError("Rating not found");
                    return false;
                }
                _dbContext.Ratings.Remove(await _dbContext.Ratings.FirstOrDefaultAsync(x => x.Id == ratingId));
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to remove raiting {e.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateComment(CommentDTO model)
        {
            try
            {
                var isCommentExists = await _dbContext.Comments.AnyAsync(x => x.Id == model.Id);
                if (!isCommentExists)
                {
                    _logger.LogError("Comment not found");
                    return false;
                }
                _dbContext.Comments.Update(_mapper.Map<CommentDTO, CommentModel>(model));
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to update comment {e.Message}");
                return false;
            }
        }
      
        public async Task<IEnumerable<CommentDTO>> GetCommentsByReview(Guid id) 
        {
            try
            {
                if (!_dbContext.Reviews.Any(x => x.Id == id))
                {
                    _logger.LogError("Review not found");
                    return null;
                }
                var commentModels = _dbContext.Comments.Where(x => x.ReviewId == id);
                return await Task.Run(() => commentModels.Select(x => _mapper.Map<CommentModel, CommentDTO>(x)));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get comments by id {e.Message}");
                return null;
            }
        }
        public async Task<bool> UpdateReview(ReviewDTO model)
        {
            try
            {
                if (!await _dbContext.Reviews.AnyAsync(x => x.Id == model.Id))
                {
                    _logger.LogError("Review not found");
                    return false;
                }
                if (!_dbContext.Users.Any(x => x.Id == model.UserId))
                {
                    _logger.LogError("User not found");
                    return false;
                }
                if (!_dbContext.Ratings.Any(x => x.Id == model.RatingId))
                {
                    _logger.LogError("Rating not found");
                    return false;
                }
                var reviewModel = await _dbContext.Reviews.FirstOrDefaultAsync(x => x.Id == model.Id);
                var review = _mapper.Map<ReviewDTO, ReviewModel>(model, reviewModel);
                var rating = _dbContext.Ratings.FirstOrDefault(x => x.Id == model.RatingId);

                rating.Value = model.RatingValue.HasValue ? model.RatingValue.Value : 0;
                reviewModel.Rating = rating;
                _dbContext.Reviews.Update(review);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to update review {e.Message}");
                return false;
            }
        }
        public async Task<IEnumerable<ReviewImageDTO>> GetImagesByReviewId(Guid reviewId)
        {
            try
            {
                if (!_dbContext.Reviews.Any(x => x.Id == reviewId))
                {
                    _logger.LogError("Review not found");
                    return null;
                }
                var imageModels = _dbContext.Reviews.FirstOrDefault(x => x.Id == reviewId).Images;
                return await Task.Run(() => imageModels.Select(x => _mapper.Map<ReviewImageModel, ReviewImageDTO>(x)));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get comments by id {e.Message}");
                return null;
            }
        }
    }
}
