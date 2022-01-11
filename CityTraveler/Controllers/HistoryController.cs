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
    [Route("api/history")]
    public class HistoryController : Controller
    {
        private readonly ILogger<HistoryController> _logger;
        private readonly IHistoryService _service;
        public HistoryController(ILogger<HistoryController> logger, IHistoryService adminPanelService)
        {
            _service = adminPanelService;
            _logger = logger;
        }

        [HttpGet("get-last-user-comment")]

        public async Task<IActionResult> GetUserLastComment(string userName)
        {
            return Json(await _service.GetUserLastComment(userName));
        }
        [HttpGet("get-last-comment")]
        public async Task<IActionResult> GetLastComment()
        {
            return Json(await _service.GetLastComment());
        }

        [HttpGet("get-last-review")]
        public async Task<IActionResult> GetLastReview()
        {
            return Json(await _service.GetLastReview());
        }

        [HttpGet("get-last-trip")]
        public async Task<IActionResult> GetLastTrip()
        {
            return Json(await _service.GetLastTrip());
        }

        [HttpGet("get-visit-entertaiments")]
        public async Task<IActionResult> GetVisitEntertaiment(string userName)
        {
            return Json(await _service.GetVisitEntertaiment(userName));
        }

        [HttpGet("get-last-user-reviews")]
        public async Task<IActionResult> GetUserLastReview(string userName)
        {
            return Json(await _service.GetUserLastReview(userName));
        }

        [HttpGet("get-user-last-trip")]
        public async Task<IActionResult> GetUserLastTrip(string userName)
        {
            return Json(await _service.GetUserLastTrip(userName));
        }
        [HttpGet("get-user-comments")]
        public async Task<IActionResult> GetUserComments(string userName)
        {
            return Json(await _service.GetUserComments(userName));
        }
    }
}
