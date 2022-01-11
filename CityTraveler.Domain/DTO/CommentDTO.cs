using System;

namespace CityTraveler.Domain.DTO
{
    public class CommentDTO
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; }
        public Guid ReviewId { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
    }
}
