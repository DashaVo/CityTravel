using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using CityTraveler.Domain.DTO;

namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/socialmedia")]
    public class SocialMediaController : Controller
    {
        private readonly ILogger<SocialMediaController> _logger;
        private readonly ISocialMediaService _service;

        public SocialMediaController(ILogger<SocialMediaController> logger, ISocialMediaService socialMediaService)
        {
            _service = socialMediaService;
            _logger = logger;
        }

        [HttpPost("review-entertainment")]
        public async Task<IActionResult> AddReview([FromBody] EntertainmentReviewDTO review)
        {
            var result = await _service.AddReviewEntertainment(review);
            return Json(result);
        }

        [HttpPost("review-trip")]
        public async Task<IActionResult> AddReview([FromBody] TripReviewDTO review)
        {
            var result = await _service.AddReviewTrip( review);
            return Json(result);
        }

        [HttpPost("comment")]
        public async Task<IActionResult> AddComment([FromBody] CommentDTO comment)
        {
            var result = await _service.AddComment(comment);
            return Json(result);
        }

        [HttpPost("rating")]
        public async Task<IActionResult> AddRating([FromBody] RatingDTO rating)
        {
            var result = await _service.PostRating(rating);
            return Json(result);
        }

        [HttpPost("image")]
        public async Task<IActionResult> AddImage([FromBody] ReviewImageDTO image)
        {
            var result = await _service.AddImage(image);
            return Json(result);
        }

        [HttpPut("comment")]
        public async Task<IActionResult> UpdateComment([FromBody] CommentDTO comment)
        {
            var result = await _service.UpdateComment(comment);
            return Json(result);
        }

        [HttpPut("review")]
        public async Task<IActionResult> UpdateReview([FromBody] ReviewDTO review)
        {
            var result = await _service.UpdateReview(review);
            return Json(result);
        }

        [HttpDelete("review")]
        public async Task<IActionResult> DeleteReview([FromQuery] Guid reviewId)
        {
            var result = await _service.RemoveReview(reviewId);
            return Json(result);
        }

        [HttpDelete("comment")]
        public async Task<IActionResult> DeleteComment([FromQuery] Guid commentId)
        {
            var result = await _service.RemoveComment(commentId);
            return Json(result);
        }

        [HttpDelete("image")]
        public async Task<IActionResult> DeleteImage([FromQuery] Guid id)
        {
            var result = await _service.RemoveImage(id);
            return Json(result);
        }

        [HttpDelete("rating")]
        public async Task<IActionResult> DeleteRating([FromQuery] Guid id)
        {
            var result = await _service.RemoveRating(id);
            return Json(result);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetReview([FromQuery] Guid reviewId)
        {
            var review = await _service.GetReviewById(reviewId);
            return Json(review);
        }

        [HttpGet("title")]
        public async Task<IActionResult> GetReviewByTitle([FromQuery] string title)
        {
            var review = await _service.GetReviewsByTitle(title);
            return Json(review);

        }

        [HttpGet("title-dapper")]
        public async Task<IActionResult> GetReviewByTitleDapper([FromQuery] string title)
        {
            var review = await _service.getReviewsByTitleDapper(title);
            return Json(review);

        }

        [HttpGet("user-id-dapper")]
        public async Task<IActionResult> GetReviewByUserId([FromQuery] Guid userId)
        {
            var review = await _service.GetReviewsByUser(userId);
            return Json(review);
        }

        [HttpGet("average-raiting")]
        public async Task<IActionResult> GetReviewsByAverageRaiting([FromQuery] double raiting)
        {
            var review = await _service.GetReviewsByAverageRating(raiting);
            return Json(review);
        }

        [HttpGet("description")]
        public async Task<IActionResult> GetReviewsByDescription([FromQuery] string description)
        {
            var reviews = await _service.GetReviewsByDescription(description);
            return Json(reviews);
        }

        [HttpGet("reviews")]
        public async Task<IActionResult> GetReviewsByDescription([FromQuery] int skip, int take)
        {
            var reviews = await _service.GetReviews(skip, take);
            return Json(reviews);
        }
        [HttpGet("object-reviews")]
        public async Task<IActionResult> GetObjectReviews([FromQuery] Guid id, int skip, int take)
        {
            var reviews = await _service.GetObjectReviews(id, skip, take);
            return Json(reviews);
        }

        [HttpGet("rating")]
        public async Task<IActionResult> GetRatingById([FromQuery] Guid id) 
        {
            var rating = await _service.GetRatingById(id);
            return Json(rating);
        }

        [HttpGet("comments")]
        public async Task<IActionResult> GetCommentsByReview([FromQuery] Guid reviewId) 
        {
            var comments = await _service.GetCommentsByReview(reviewId);
            return Json(comments);
        }

        [HttpGet("comments-by-user")]
        public async Task<IActionResult> GetCommentsByUserId([FromQuery] Guid userId)
        {
            var comments = await _service.GetCommentsByUserId(userId);
            return Json(comments);
        }

        [HttpGet("images")]
        public async Task<IActionResult> GetImagesByReviewId([FromQuery] Guid reviewId)
        {
            var images = await _service.GetImagesByReviewId(reviewId);
            return Json(images);
        }
    }
}