using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CityTraveler.Services.Interfaces;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Domain.Entities;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Enums;

namespace CityTraveler.Services 
{
    public class HistoryService : IHistoryService
    {
        private readonly ILogger<HistoryService> _logger;
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        public HistoryService(ApplicationContext context, IMapper mapper, ILogger<HistoryService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<CommentDTO> GetUserLastComment(string userName)
        {
            try
            {
                var com = _context.Comments.OrderBy(x => x.Created).LastOrDefault(x => x.Owner.UserName == userName);
                return _mapper.Map < CommentModel, CommentDTO >(com);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get last user comment {e.Message}");
            }
        }
        public async Task<CommentDTO> GetLastComment()
        {
            try
            {
                var com =  _context.Comments.OrderBy(x => x.Created).LastOrDefault();
                return _mapper.Map<CommentModel, CommentDTO>(com);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get last comment {e.Message}");
            }
        }
        public async Task<ReviewPreviewDTO> GetLastReview()
        {
            try
            {
                return _mapper.Map<ReviewModel, ReviewPreviewDTO>(_context.Reviews.LastOrDefault());
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get last review {e.Message}");
            }
        }
        public async Task<ReviewPreviewDTO> GetUserLastReview(string userName)
        {
            try
            {
                return _mapper.Map<ReviewModel, ReviewPreviewDTO>(_context.Reviews.OrderBy(x => x.Created).LastOrDefault(x => x.User.UserName == userName));
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get last user review {e.Message}");
            }
        }
        public async Task<TripPrewievDTO> GetLastTrip()
        {
            try
            {
                var res = _mapper.Map<TripModel, TripPrewievDTO>(await Task.Run(() => _context.Trips.OrderBy(x => x.Created).LastOrDefault()));
                return res;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get last trip {e.Message}");
            }
        }
        public async Task<TripPrewievDTO> GetUserLastTrip(string userName, bool passed = false)
        {
            try
            {
                var user = await  _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                var res = _mapper.Map<TripModel, TripPrewievDTO>(await  Task.Run(() => user.Trips.OrderBy(x => x.Created).LastOrDefault()));
                return res;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get user last trip {e.Message}");
            }
        }
        public async Task<IEnumerable<EntertainmentPreviewDTO>> GetVisitEntertaiment(string userName, bool withoutReview = false)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                var entertaiments = user.Trips.SelectMany(x => x.Entertaiments).Distinct().OrderBy(x => x.Created);
                return entertaiments.Select(x => _mapper.Map<EntertaimentModel, EntertainmentPreviewDTO>(x));

            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                throw new Exception($"Failed to get pass entertaiment {e.Message}");
            }
        }
        public async Task<IEnumerable<CommentDTO>> GetUserComments(string userName)
        {
            try
            {
                var comments = _context.Comments.Where(x => x.Owner.UserName == userName).OrderBy(x => x.Created);
                return comments.Select(x => _mapper.Map<CommentModel, CommentDTO>(x)); ;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                return Enumerable.Empty<CommentDTO>();
            }
        }
    }
}
