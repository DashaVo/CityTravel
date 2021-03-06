using System;
using System.Linq;
using System.Threading.Tasks;
using CityTraveler.Domain.DTO;
using CityTraveler.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using NUnit.Framework;

namespace CityTraveler.Tests
{
    public class SocialMediaTests
    {
        private Mock<ILogger<SocialMediaService>> _loggerMock;
        private SocialMediaService _service;
        public static IConfiguration configSocialMedia { set; get; }

        [SetUp]
        public async Task Setup()
        {
            await ArrangeTests.SetupDbContext();
            _loggerMock = ArrangeTests.SetupTestLogger(new NullLogger<SocialMediaService>());
            _service = new SocialMediaService(ArrangeTests.ApplicationContext, ArrangeTests.TestMapper, _loggerMock.Object, configSocialMedia);
        }

        [Test]
        public async Task GetReviewByIdTest()
        {
            var reviewId = ArrangeTests.ApplicationContext.Reviews.First().Id;
            var review = await _service.GetReviewById(reviewId);
            Assert.IsNotNull(review);
        }

        [Test]
        public async Task GetReviewsByIdThrowsTest()
        {
            var result = await _service.GetReviewById(Guid.NewGuid());
            Assert.IsNull(result);
        }

        [Test]
        public async Task GetReviewsTest()
        {
            var review = await _service.GetReviews(0, 5);
            Assert.IsNotNull(review);
            Assert.AreEqual(review.Count(), 5);
        }

        [Test]
        public async Task GetReviewsThrowsTest()
        {
            var result = await _service.GetReviews(-1, 5);
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task GetReviewsThrowsTest2()
        {
            var result = await _service.GetReviews(1, -5);
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task AddReviewTripTest()
        {
            var triptId = ArrangeTests.ApplicationContext.Trips.First().Id;
            var user = ArrangeTests.ApplicationContext.Users.First();
            var tripReview = new TripReviewDTO { UserId = user.Id };
            tripReview.TripId = triptId;
            var review = await _service.AddReviewTrip(tripReview);
            Assert.IsNotNull(review);
            Assert.AreEqual(tripReview.TripId, triptId);
        }

        [Test]
        public async Task AddReviewTripThrowsTest()
        {
            var result = await _service.AddReviewTrip(new TripReviewDTO { TripId = Guid.NewGuid()});
            Assert.IsNull(result);
        }

        [Test]
        public async Task RemoveReviewTest()
        {
            var review = await ArrangeTests.ApplicationContext.Reviews.FirstAsync();
            var result = await _service.RemoveReview(review.Id);
            Assert.True(result);
            Assert.False(ArrangeTests.ApplicationContext.Reviews.Contains(review));
        }

        [Test]
        public async Task RemoveReviewThrowsTest()
        {
            var result = await _service.RemoveReview(Guid.NewGuid());
            Assert.IsFalse(result);
        }

        [Test]
        public async Task GetUserReviewsThrowsTest()
        {
            var result = await _service.GetUserReviews(Guid.NewGuid());
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task GetUserReviewsTest()
        {
            var user = await ArrangeTests.ApplicationContext.Users.FirstAsync();
            var reviews = await _service.GetUserReviews(user.Id);
            Assert.NotNull(reviews);
            foreach (ReviewDTO review in reviews)
            {
                Assert.True(review.UserId == user.Id);
            }
        }

        [Test]
        public async Task GetObjectReviewsTest()
        {
            var trip = await ArrangeTests.ApplicationContext.Trips
              .FirstAsync();
            var reviews = _service.GetObjectReviews(trip.Id, 0,5);
            Assert.NotNull(reviews);
        }

        [Test]
        public async Task GetObjectReviewsThrowsTest()
        {
            var result = await _service.GetObjectReviews(Guid.NewGuid(),0,5);
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task PostRatingThrowsTest()
        {
            var result =  await _service.PostRating( new RatingDTO { Value = 3, ReviewId = Guid.NewGuid() });
            Assert.AreEqual(result, Guid.Empty);
        }

        [Test]
        public async Task PostRatingTest()
        {
            var firstReview = await ArrangeTests.ApplicationContext.Reviews
              .FirstAsync();
            var rating = new RatingDTO { Value = 3, ReviewId = firstReview.Id };
            var review = await _service.PostRating(rating);
            Assert.AreNotEqual(review, Guid.Empty);
        }

        [Test]
        public async Task AddCommentTest()
        {
            var firstReview = await ArrangeTests.ApplicationContext.Reviews
              .FirstAsync(x => x.Comments.Any());
            var comment = new CommentDTO{ Status = 1, ReviewId = firstReview.Id ,Description = "desc"};
            var review = await _service.AddComment(comment);
            Assert.AreNotEqual(review, Guid.Empty);
        }

        [Test]
        public async Task AddCommentThrowsTest()
        {
            var result = await _service.AddComment(new CommentDTO { Status = 1, ReviewId = Guid.NewGuid() }) ;
            Assert.AreEqual(result, Guid.Empty);
        }

        [Test]
        public async Task RemoveCommentTest()
        {
            var firstReview = await ArrangeTests.ApplicationContext.Reviews
              .FirstAsync(x => x.Comments.Any());
            var comment = await ArrangeTests.ApplicationContext.Comments.FirstAsync();
            var review = await _service.RemoveComment(comment.Id);
            Assert.True(review);
        }

        [Test]
        public async Task RemoveCommentThrowsCommentTest()
        {
            var result = await _service .RemoveComment(Guid.NewGuid());
            Assert.IsFalse(result);
        }

        [Test]
        public async Task GetReviewsByTitleTest()
        {
            var reviews = await _service.GetReviewsByTitle("title");
            Assert.NotNull(reviews);
            foreach (ReviewDTO review in reviews)
            {
                Assert.True(review.Title.Contains("title"));
            }
        }

        [Test]
        public async Task GetReviewsByDescriptionTest()
        {
            var reviews = await _service.GetReviewsByDescription("description");
            Assert.NotNull(reviews);
            foreach (ReviewDTO review in reviews)
            {
                Assert.True(review.Description.Contains("description"));
            }
        }

        [Test]
        public async Task GetReviewsByCommentTest()
        {
            var review = await _service.GetReviewByComment(ArrangeTests.ApplicationContext.Comments.First().Id);
            Assert.NotNull(review);
        }

        [Test]
        public void GetReviewsByAverageRaitingTest()
        {
            var reviews = _service.GetReviewsByAverageRating(5);
            Assert.NotNull(reviews);
        }

        [Test]
        public async Task AddImageTest()
        {
            var firstReview = await ArrangeTests.ApplicationContext.Reviews
              .FirstAsync();
            var image = new ReviewImageDTO { Title = "title", ReviewId = firstReview.Id };
            var review = await _service.AddImage(image);
            Assert.True(review);
        }

        [Test]
        public async Task AddImageThrowsTest()
        {
            var result = await _service.AddImage(new ReviewImageDTO { Title = "title" , ReviewId = Guid.NewGuid() });
            Assert.IsFalse(result);
        }

        [Test]
        public async Task RemoveImageTest()
        {
            var firstReview = await ArrangeTests.ApplicationContext.Reviews
              .FirstAsync(x => x.Images.Any());
            var image = await ArrangeTests.ApplicationContext.Images.FirstAsync(x => x.Id == firstReview.Images.ElementAt(0).Id);
            var review = await _service.RemoveImage(image.Id);
            Assert.True(review);
            Assert.False(ArrangeTests.ApplicationContext.Images.Contains(image));
        }

        [Test]
        public async Task RemoveImageThrowsImageTest()
        {
            var result = await _service.RemoveImage(Guid.NewGuid());
            Assert.IsFalse(result);
        }
    }
}
