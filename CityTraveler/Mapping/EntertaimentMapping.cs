using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using System;

namespace CityTraveler.Mapping
{
    public class EntertaimentMapping : Profile
    {
        public EntertaimentMapping()
        {
            CreateMap<EntertaimentModel, EntertainmentPreviewDTO>();

        }

    }
}
