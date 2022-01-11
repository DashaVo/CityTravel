using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using CityTraveler.Domain.Filters;
using CityTraveler.Domain.Filters.Admin;
using CityTraveler.Domain.DTO;
using System;

namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : Controller
    {
        private readonly ILogger<AdminController> _logger;
        private readonly IAdminPanelService _service;

        public AdminController(ILogger<AdminController> logger, IAdminPanelService adminPanelService)
        {
            _service = adminPanelService;
            _logger = logger;
        }

        [HttpPost("users")]
        public async Task<IActionResult> AdminFilterUsers([FromBody] FilterAdminUser filter, int skip, int take)
        {
            var users = await _service.FilterUsers(filter, skip, take);
            return Json(users);
        }

        [HttpPost("entertaiments")]
        public async Task<IActionResult> AdminFilterEntertaiments([FromBody] FilterAdminEntertaiment filter, int skip, int take)
        {
            var entertainments = await _service.FilterEntertaiments(filter, skip, take);
            return Json(entertainments); 
        }

        [HttpPost("trips")]
        public async Task<IActionResult> FilterTrips([FromBody] FilterAdminTrip filter, int skip, int take)
        {
            var trips = await _service.FilterTrips(filter, skip, take);
            return Json(trips);
        }

        [HttpPost("reviews")]
        public async Task<IActionResult> FilterReview([FromBody] FilterAdminReview filter, int skip, int take)
        {
            var reviews = await _service.FilterReview(filter, skip, take);
            return Json(reviews);
        }
        [HttpGet("reviews-by-user")]
        public async Task<IActionResult> ReviewByUser([FromQuery] string username)
        {
            var reviews = await _service.ReviewByUser(username);
            return Json(reviews);
        }
        [HttpGet("trips-by-user")]
        public async Task<IActionResult> TripByUser([FromQuery] string username)
        {
            var trips = await _service.TripByUser(username);
            return Json(trips);
        }
        
        [HttpPost("streets")]
        public async Task<IActionResult> FindAdressStreets([FromBody] string filter, int skip, int take)
        {
            var addresses = await _service.FindAdressStreets(filter,skip,take);
            return Json(addresses);
        }
        [HttpPost("entertaiments-on-streets")]
        public async Task<IActionResult> GetEntertainmentDTOByAddressAsync([FromBody] AddressShowDTO filter)
        {
            var addresses = await _service.GetEntertainmentDTOByAddressAsync(filter);
            return Json(addresses);
        }
        [HttpGet("entertaiments-in-trip")]
        public async Task<IActionResult> GetEntertainmentDTOByTripAsync([FromQuery] Guid id)
        {
            var entertainments = await _service.GetEntertainmentDTOByTripAsync(id);
            return Json(entertainments);
        }
        
        [HttpDelete("delete-entertaiment")]
        public async Task<IActionResult> DeleteEntertaiment([FromQuery] Guid objectId)
        {
            return Json(await _service.DeleteEntertaimentAsync(objectId));
        }
        [HttpDelete("delete-trip")]
        public async Task<IActionResult> DeleteTrip([FromQuery] Guid tripId)
        {
            return Json(await _service.DeleteTripAsync(tripId));
        }
        [HttpGet("username")]
        public async Task<IActionResult> GetUserByUserNameAsync([FromQuery] string username)
        {
            try
            {
                var user = await _service.GetUserByUserNameAsync(username);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Json(user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }
    }
}
