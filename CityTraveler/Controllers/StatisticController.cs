using CityTraveler.Repository.DbContext;
using CityTraveler.Services.Interfaces;
using CityTraveler.Domain.Enums;
using CityTraveler.Repository.DbContext;
using CityTraveler.Services.Interfaces;
using CityTraveler.Domain.Enums;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CityTraveler.Services;

namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/statistic")]
    public class StatisticController : Controller
    {
        private readonly ILogger<StatisticController> _logger;
        private readonly IStatisticService _service;

        public StatisticController(ILogger<StatisticController> logger, IStatisticService adminPanelService)
        {
            _service = adminPanelService;
            _logger = logger;
        }
        [HttpGet("charts")]
        public async Task<IActionResult> GetCharts()
        {
            return Json(await _service.GetCharts());
        }
        [HttpGet("activity")]
        public async Task<IActionResult> GetActivity()
        {
            return Json(await _service.GetActivity());
        }
        [HttpGet("users-average-age")]
        public async Task<IActionResult> GetAverageAgeUser()
        {
            return  Json(await _service.GetAverageAgeUser());
        }

        [HttpGet("average-entertaiment-in-trip")]
        public async Task<IActionResult> GetAvarageEnternaimentInTrip()
        {
            return Json( await _service.GetAvarageEnternaimentInTrip());
        }

        [HttpGet("users-admin")]
        public async Task<IActionResult> GetActivityUserTrip(string userName, DateTime timeStart, DateTime timeEnd)
        {
            return (timeEnd != null) && (timeStart != null) ?
                Json(_service.GetActivityUserTrip(userName, timeStart,timeEnd))
                : new NotFoundResult();
        }

        [HttpGet("count-passed-trip")]
        public async Task<IActionResult> GetCountPassedUserTrip(string userName)
        {
            return Json(_service.GetCountPassedUserTrip(userName));
        }

        [HttpGet("average-price-trip")]
        public async Task<IActionResult> GetAveragePriceUserTrip(string userName)
        {
            return Json(_service.GetAveragePriceUserTrip(userName));
        }

        [HttpGet("max-time-trip")]
        public async Task<IActionResult> GetMaxTimeUserTrip(string userName)
        {
            return Json(_service.GetMaxTimeUserTrip(userName));
        }

        [HttpGet("min-time-trip")]
        public async Task<IActionResult> GetMinTimeUserTrip(string userName)
        {
            return Json(_service.GetMinTimeUserTrip(userName));
        }

        [HttpGet("user-average-entertaiment-in-trip")]
        public async Task<IActionResult> GetAverageEntertaimentUserTrip(string userName)
        {
            return Json(_service.GetAverageEntertaimentUserTrip(userName));
        }

        [HttpGet("user-average-rating-in-trip")]
        public async Task<IActionResult> GetAverageRatingUserTrip(string userName)
        {
            return Json(_service.GetAverageRatingUserTrip(userName));
        }

        [HttpGet("user-pass-entertaiment")]
        public async Task<IActionResult> QuantityPassEntertaiment(string userName)
        {
            return Json(_service.QuantityPassEntertaiment(userName));
        }

        [HttpGet("user-trip-with-entertaiment")]
        public async Task<IActionResult> GetTripVisitEntertaiment(string userName,Guid id)
        {
            return id != null ?
                Json(_service.GetTripVisitEntertaiment(userName, id))
                : new NotFoundResult();
        }
        [HttpGet("user-average-rating-reviews")]
        public async Task<IActionResult> GetAverageUserReviewRating(string userName)
        {
            return Json(_service.GetAverageUserReviewRating(userName));
        }
    }

}
