using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityTraveler.Mapping
{
    public class ReviewMapping : Profile
    {
        public ReviewMapping()
        {
            CreateMap<RatingDTO, RatingModel>();
            CreateMap<CommentModel, CommentDTO>().
               ForMember(x => x.Status, o => o.Ignore())
               .ForMember(z => z.Name, o => o.MapFrom(z => z.Owner.Profile.Name))
               .ReverseMap();
            CreateMap<ReviewModel, ReviewDTO>()
                .ForMember(x => x.RatingValue, o => o.Ignore())
                .ForMember(x=>x.RatingId, o=>o.Ignore())
                // .ForMember(x => x.RatingId, o => o.MapFrom(z => z.RatingId))
                /*ForMember(x => x.RatingId, o => o.Ignore()).
                ForMember(x => x.UserId, o => o.Ignore()).*/
                .ReverseMap();
            CreateMap<ReviewImageDTO, ReviewImageModel>().ReverseMap();
            CreateMap<EntertainmentReviewDTO, EntertainmentReviewModel>().
                ReverseMap();
            CreateMap<TripReviewDTO, TripReviewModel>().
                ReverseMap();
            CreateMap<EntertainmentGetDTO, EntertaimentModel>().ReverseMap();
            CreateMap<IEnumerable<TripDTO>, IEnumerable<TripModel>>();
            CreateMap<IEnumerable<UserDTO>, IEnumerable<ApplicationUserModel>>();
            CreateMap<ReviewModel, ReviewUpdateDTO>()
                .ForMember(x => x.RatingValue, o => o.MapFrom(z => z.Rating.Value))
                .ForMember(x => x.RatingId, o => o.MapFrom(z => z.Rating.Id))
                .ForMember(x => x.Name, o => o.MapFrom(z => z.User.Profile.Name))
                .ReverseMap();
            /* CreateMap<ReviewModel,ReviewPreviewDTO>().
                 ForMember(x => x.MainImage, o => o.MapFrom(z => z.Images.FirstOrDefault(p => p.IsMain == true))).
                 ForMember(x => x.Name, o => o.MapFrom(z => z.User.Profile.Name)).
                 ReverseMap();*/
        }
    }
}
