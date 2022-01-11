using CityTraveler.Repository.DbContext;
using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/info")]
    public class InfoController : Controller
    {
        private readonly IInfoService _service;
        private readonly ILogger<InfoController> _logger;

        public InfoController(IInfoService infoService, ILogger<InfoController> logger
            )
        {
            _service = infoService;
            _logger = logger;
        }

        [HttpGet("user/popular-entertaiment")]
        public async Task<IActionResult> GetUserMostPopularEntertaimentInTrips([FromQuery] Guid userId)
        {
            try
            {
                var entertaiment = await _service.GetUserMostPopularEntertaimentInTripsAsync(userId);
                if (entertaiment == null)
                {
                    return NotFound("Entertaiment not found");
                }
                return Json(entertaiment);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("popular-entertaiment")]
        public async Task<IActionResult> GetMostPopularEntertaimentInTrips()
        {
            try
            {
                var entertaiment = await _service.GetUserMostPopularEntertaimentInTripsAsync();
                if (entertaiment == null)
                {
                    return NotFound("Entertaiment not found");
                }
                return Json(entertaiment);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("trip-popular")]
        public async Task<IActionResult> GetMostPopularTripAsync()
        {
            try
            {
                var trip = await _service.GetMostPopularTripAsync();
                if (trip == null)
                {
                    return NotFound("Trip not found");
                }
                return Json(trip);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("review-maxcomment")]
        public async Task<IActionResult> GetReviewByMaxComment([FromQuery] Guid userId)
        {try
            {
                var review = await _service.GetReviewByMaxCommentsAsync(userId);
                if (review == null)
                {
                    return NotFound("Review not found");
                }
                return Json(review);
            }
            catch (Exception ex)
            { 
                _logger.LogError($"Error: {ex.Message}"); 
                return StatusCode(500, "Internal server error"); 
            }
        }

        [HttpGet("trip-maxreview")]
        public async Task<IActionResult> GetTripByMaxReview([FromQuery] Guid userId)
        {
            try
            {
                var trip = await _service.GetTripByMaxReviewAsync(userId);
                if (trip == null)
                {
                    return NotFound("Trip not found");
                }
                return Json(trip);
            }
            catch (Exception ex)
            { 
                _logger.LogError($"Error: {ex.Message}"); 
                return StatusCode(500, "Internal server error"); 
            }
        }

        [HttpGet("trips-lastperiod")]
        public async Task<IActionResult> GetLastTripsBYPeriod([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            try
            {
                var trips =await _service.GetLastTripsByPeriodAsync(start, end);
                if(trips !=null && trips.Any())
                {
                    return Json(trips);
                }
                return NotFound("Trips not found");
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("trips-lowprice")]
        public async Task<IActionResult> GetTripsByLowPrice([FromQuery] int count)
        {
            try
            {
                var trips =await _service.GetTripsByLowPriceAsync(count);
                if(trips != null && trips.Any())
                {
                    return Json(trips);
                }
                return NotFound("Trips not found");
                
            }
             catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("user-registered")]
        public async Task<IActionResult> GetRegisteredUsersByPeriod([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            try
            {
                var registeredUsers = await _service.GetRegisteredUsersByPeriodAsync(start, end);
                return Json(registeredUsers);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("trip-template")]
        public async Task<IActionResult> GetMostlyUsedTemplate([FromQuery] int count)
        {
            try
            {
                var template =await _service.GetMostlyUsedTemplatesAsync(count);
                if (template != null && template.Any())
                {
                    return Json(template);
                }
                return NotFound("Template not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users-create-trip-byperiod")]
        public async Task<IActionResult> GetUsersCountTripsDateRang([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            try
            {
                var usersCount =await _service.GetUsersCountTripsDateRangeAsync(start, end);
                return Json(usersCount);
            }
             catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("trip-longest")]
        public async Task<IActionResult> GetLongestTrip()
        {
            try
            {
                var trip = await _service.GetLongestTripAsync();
                if(trip != null) 
                { 
                    return Json(trip);
                }
                return NotFound("Trip not found");
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("trip-shotest")]
        public async Task<IActionResult> GetShortestTrip()
        {
            try
            {
                var trip = await _service.GetShortestTripAsync();
                if(trip != null)
                {
                    return Json(trip);
                }
                return NotFound("Trip not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("trip-created-period")]
        public async Task<IActionResult> GetTripsCreatedByPeriod([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            try
            {
                var tripsCount =await _service.GetTripsCreatedByPeriodAsync(start, end);
              
                    return Json(tripsCount);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
