using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityTraveler.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<ApplicationUserModel, UserDTO>()
                .ForMember(x => x.Name, o => o.MapFrom(z => z.Profile.Name))
                .ForMember(x => x.AvatarSrc, o => o.MapFrom(z => z.Profile.AvatarSrc))
                .ForMember(x => x.Gender, o => o.MapFrom(z => z.Profile.Gender))
                .ForMember(x => x.Birthday, o => o.MapFrom(z => z.Profile.Birthday));
            CreateMap<ApplicationUserModel, UpdateUserDTO>().ReverseMap();
            CreateMap<UpdateUserDTO, UserProfileModel>().ReverseMap();
            CreateMap<RegisterDTO, ApplicationUserModel>()
                .ForMember(x => x.Profile, o => o.MapFrom(z => new UserProfileModel() 
                {
                    Name = z.Name,
                    AvatarSrc = z.AvatarSrc,
                    Gender = z.Gender
                })).ReverseMap();
            CreateMap<UserDTO, ApplicationUserModel>();
                //.ForMember(x => x.Profile.Name, o => o.MapFrom(z => z.Name))
                //.ForMember(x => x.Profile.AvatarSrc, o => o.MapFrom(z => z.AvatarSrc))
                //.ForMember(x => x.PhoneNumber, o => o.MapFrom(z => z.PhoneNumber))
                //.ForMember(x => x.Email, o => o.MapFrom(z => z.Email))
                //.ForMember(x => x.Profile.Gender, o => o.MapFrom(z => z.Gender))
                //.ForMember(x => x.Profile.Birthday, o => o.MapFrom(z => z.Birthday));

      




        }
    }
}
