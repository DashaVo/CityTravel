using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Filters;
using CityTraveler.Domain.Filters.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Services.Interfaces
{
    public interface IAdminPanelService 
    {

        public Task<bool> DeleteEntertaimentAsync(Guid id);
        public Task<bool> DeleteTripAsync(Guid tripId);
        public Task<IEnumerable<UserDTO>> FilterUsers(FilterAdminUser filter,int skip, int take);
        public Task<IEnumerable<EntertainmentPreviewDTO>> FilterEntertaiments(FilterAdminEntertaiment filter,int skip, int take);
        public Task<IEnumerable<TripPrewievDTO>> FilterTrips(FilterAdminTrip filter, int skip, int take);
        public Task<IEnumerable<AddressShowDTO>> FindAdressStreets(string filter, int skip, int take);
        public Task<IEnumerable<ReviewPreviewDTO>> FilterReview(FilterAdminReview filter, int skip, int take);
        public Task<IEnumerable<EntertainmentPreviewDTO>> GetEntertainmentDTOByAddressAsync(AddressShowDTO addressDto);
        public Task<IEnumerable<EntertainmentPreviewDTO>> GetEntertainmentDTOByTripAsync(Guid id );
        public Task<UserDTO> GetUserByUserNameAsync(string username);
        public Task<IEnumerable<ReviewPreviewDTO>> ReviewByUser(string username);
        public Task<IEnumerable<TripPrewievDTO>> TripByUser(string username);

    }
}
