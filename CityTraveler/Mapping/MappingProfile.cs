using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityTraveler.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PriceModel, PriceDTO>();
            CreateMap<CoordinatesDTO, CoordinatesStreetModel>().ReverseMap();
            CreateMap<CoordinatesDTO, CoordinatesAddressModel>().ReverseMap();
            CreateMap<CoordinatesDTO, CoordinatesModel>().ReverseMap();
            CreateMap<StreetGetDTO, StreetModel>();
            CreateMap<StreetModel, StreetShowDTO>();
            CreateMap<StreetModel, StreetDTO>().ReverseMap();
            CreateMap<AddressModel, AddressShowDTO>();
            CreateMap<PriceDTO, EntertaimentPriceModel>();
            CreateMap<ReviewImageModel, ImageDTO>();
            CreateMap<ImageGetDTO, ImageModel>().ReverseMap();
            CreateMap<ImageGetDTO, ReviewImageModel>().ReverseMap();
            CreateMap<ImageDTO, ImageModel>().ReverseMap();
            CreateMap<CoordinatesAddressModel, CoordinatesDTO>().ReverseMap();
            CreateMap<AddressGetDTO, AddressModel>()
                .ForMember(x => x.StreetId, o => o.Ignore()).ReverseMap();
            CreateMap<ReviewModel, ReviewPreviewDTO>()
                .ForMember(x => x.MainImage, o => o.MapFrom(z => z.Images.FirstOrDefault(p => p.IsMain == true)))
                .ForMember(x => x.RatingValue, o => o.MapFrom(z => z.Rating.Value))
                .ForMember(x => x.RatingId, o => o.MapFrom(z => z.Rating.Id))
                .ForMember(x => x.Name, o => o.MapFrom(z => z.User.Profile.Name))
                .ReverseMap();
            CreateMap<TripModel, TripPrewievDTO>()
                .ForMember(x => x.MainImage, o => o.MapFrom(z => z.Images.FirstOrDefault(p => p.IsMain == true)));
            CreateMap<EntertaimentModel, EntertainmentMapDTO>()
                .ForMember(x => x.Coordinates, o => o.MapFrom(z => z.Address.Coordinates));
            CreateMap<EntertaimentModel, EntertainmentShowDTO>()
                .ForMember(x => x.Type, o => o.MapFrom(z => z.Type.ToString()))
                .ForMember(x => x.MainImage, o => o.MapFrom(z => z.Images.FirstOrDefault(p => p.IsMain)))
                .ForMember(x => x.ReviewsCount, o => o.MapFrom(z => z.Reviews.Count()))
                .ForMember(x => x.TripsCount, o => o.MapFrom(z => z.Trips.Count()));
            CreateMap<EntertaimentModel, EntertainmentPreviewDTO>()
                .ForMember(x => x.Type, o => o.MapFrom(z => z.Type.ToString()))
                .ForMember(x => x.MainImage, o => o.MapFrom(z => z.Images.FirstOrDefault(p => p.IsMain)))
                .ForMember(x => x.ReviewsCount, o => o.MapFrom(z => z.Reviews.Count()))
                .ForMember(x => x.TripsCount, o => o.MapFrom(z => z.Trips.Count()));
            CreateMap<EntertainmentGetDTO, EntertaimentModel>()
                .ForMember(x => x.Address, o => o.MapFrom(z => z.Address))
                .ForMember(x => x.Type, o => o.MapFrom(z => (EntertainmentType)z.Type)).ReverseMap();
            CreateMap<EntertainmentUpdateDTO, EntertaimentModel>()
                .ForMember(x => x.Id, o => o.Ignore())
                .ForMember(x => x.Type, o => o.MapFrom(z => (EntertainmentType)z.Type));
        }
    }
}
