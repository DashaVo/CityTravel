using CityTraveler.Domain.DTO;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CityTraveler.Services;
using System.Linq;
using System.Threading.Tasks;
using CityTraveler.Domain.Entities;
using System.Collections.Generic;
using System;

namespace CityTraveler.Controllers
{
    [ApiController]
    [Route("api/map")]
    public class MapController : Controller
    {
        private readonly ILogger<MapController> _logger;
        private readonly IMapService _service;

        public MapController(ApplicationContext context, ILogger<MapController> logger, IMapService mapService)
        {
            _service = mapService;
            _logger = logger;
        }

        [HttpGet("street")]
        public async Task<IActionResult> GetStreetById([FromQuery] Guid id)
        {
            return Json(await _service.GetStreetByIdAsync(id));
        }

        [HttpGet("streets")]
        public async Task<IActionResult> GetAllStreets()
        {
            return Json(await _service.GetAllStreetsAsync());
        }

        [HttpGet("entertainments-count")]
        public IActionResult GetEntertainmentsCount()
        {
            return Json(_service.GetCountOfEntertainments());
        }

        [HttpGet("entertainments")]
        public async Task<IActionResult> GetAllEntertainments([FromQuery] int skip, int take)
        {
            return Json(await _service.GetAllEntertitainmentsAsync(skip, take));
        }
    }
}

