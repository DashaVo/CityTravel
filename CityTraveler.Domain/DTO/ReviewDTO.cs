using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CityTraveler.Domain.DTO
{
    public class ReviewDapperDTO
    {
        public Guid Id;
        public string Title { get; set; }
        public string Description { get; set; }
    }
    public class ReviewDTO
    {
        public Guid Id;
        public double? RatingValue { get; set; }
        public Guid? RatingId { get; set; }
        public Guid UserId { get; set; }
        public ICollection<ImageGetDTO> Images { get; set; } = new List<ImageGetDTO>();
        public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
        public string Title { get; set; }
        public string Description { get; set; }
    }
    public class ReviewUpdateDTO
    {
        public Guid Id;
        public double RatingValue { get; set; }
        public Guid? RatingId { get; set; }
        public Guid UserId { get; set; }
        public ICollection<ImageGetDTO> Images { get; set; } = new List<ImageGetDTO>();
        public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
        public string Title { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
    public class EntertainmentReviewDTO : ReviewDTO
    {
        public Guid EntertainmentId { get; set; }
    }
    public class TripReviewDTO : ReviewDTO
    {
        public Guid TripId { get; set; }
    }
  
    public class ReviewPreviewDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public ImageDTO MainImage { get; set; }
        public DateTime Modified { get; set; }
        public double RatingValue { get; set; }
        public Guid RatingId { get; set; }
        public Guid UserId { get; set; }
        public ICollection<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
