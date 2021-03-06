using AutoMapper;
using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using CityTraveler.Infrastucture.Data;
using CityTraveler.Mapping;
using CityTraveler.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityTraveler.Tests
{
    public static class ArrangeTests
    {
        public static ApplicationContext ApplicationContext { get; set; }

        public static Mock<UserManager<ApplicationUserModel>> UserManagerMock { get; set; }
        public static Mock<SignInManager<ApplicationUserModel>> SignInManagerMock { get; set; }
        public static Mock<RoleManager<ApplicationUserRole>> RoleManagerMock { get; set; }
        public static IMapper TestMapper { get; set; }
        public static ILogger<CityArchitectureService> LoggerCityArchitecture { set; get; }
        public static ILogger<EntertainmentService> LoggerEntertainment { set; get; }
        public static ILogger<SocialMediaService> LoggerSocialMedia { set; get; }
        public static ILogger<SearchService> LoggerSearchService { set; get; }
        public static ILogger<TripService> LoggerTrip { get; set; }
        public static ILogger<InfoService> LoggerInfoService { get; set; }
        public static Mock<ILogger<T>> SetupTestLogger<T>() where T : class
        {
            return new Mock<ILogger<T>>();
        }

        public static async Task SetupDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>()
                  .UseInMemoryDatabase(Guid.NewGuid().ToString())
                  .Options;

            ApplicationContext = new ApplicationContext(options);
            SetupManagementMocks();
            var dbInitializer = new DbInitializer(ApplicationContext, UserManagerMock.Object, RoleManagerMock.Object);

            await dbInitializer.Initialize();
            await GenerateData();
            await GenerateReviews();
            await GenerateImage();
            await GenerateComment();
            await GenerateTrips();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
                cfg.AddProfile<ReviewMapping>();
                cfg.AddProfile<TripMapping>();
                cfg.AddProfile<UserMappingProfile>();
            });

            TestMapper = new Mapper(config);

        }

        private static void SetupManagementMocks()
        {
            var user = new ApplicationUserModel
            {
                UserName = "admin@admin.admin",
                Email = "admin@admin.admin",
                EmailConfirmed = true,
                Profile = new UserProfileModel
                {
                    Gender = "male"
                }
            };
            var store = new Mock<IUserStore<ApplicationUserModel>>();
            UserManagerMock = new Mock<UserManager<ApplicationUserModel>>(store.Object, null, null, null, null, null, null, null, null);
            UserManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUserModel>(), It.IsAny<string>())).Callback(() =>
            {
                ApplicationContext.Users.Add(user);
                ApplicationContext.SaveChanges();
            }).ReturnsAsync(IdentityResult.Success).Verifiable();
            UserManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(user).Verifiable();
            UserManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUserModel>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Verifiable();

            var storeRoles = new Mock<IRoleStore<ApplicationUserRole>>();
            RoleManagerMock = new Mock<RoleManager<ApplicationUserRole>>(storeRoles.Object, null, null, null, null);
            RoleManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUserRole>())).ReturnsAsync(IdentityResult.Success).Verifiable();
        }

        private static async Task GenerateData()
        {
            {
                var trips = new List<TripModel>();
                for (int i = 0; i < 50; i++)
                {
                    var trip = new TripModel()
                    {
                        TripStart = DateTime.Now,
                        TripEnd = DateTime.Now.AddHours(4),
                        Entertaiments = new List<EntertaimentModel>(),
                        Price = new TripPriceModel(),
                        Title = $"TripTitle{i}",
                        Description = $"TripDescription{i}",
                        OptimalSpent = TimeSpan.Zero,
                        RealSpent = TimeSpan.Zero,
                        TripStatus = TripStatus.New,
                        TagString = $"tripTagString{i}",
                        TemplateId = Guid.NewGuid()
                    };
                    if (i % 2 == 0)
                    {
                        trip.DafaultTrip = true;
                    }
                    if (i > 5)
                    {
                        trip.AverageRating = 4;
                    }
                    trips.Add(trip);
                }
                ApplicationContext.Trips.AddRange(trips);
                ApplicationContext.SaveChanges();

                //StreetGen
                var streets = new List<StreetModel>();
                for (int i = 0; i < 10; i++)
                {
                    var street = new StreetModel()
                    {
                        Title = $"Street-{i}",
                        Description = $"Street description-{i}"
                    };
                    streets.Add(street);
                }

                //EntertainmentGen
                var entertainments = new List<EntertaimentModel>();
                for (int i = 0; i < 100; i++)
                {
                    var rnd = new Random();
                    var streetIndex = rnd.Next(0, 9);

                    var entertainmentType = EntertainmentType.Landscape;
                    switch (i % 3)
                    {
                        case 0:
                            entertainmentType = EntertainmentType.Event;
                            break;
                        case 1:
                            entertainmentType = EntertainmentType.Institution;
                            break;
                    }
                    var entertainment = new EntertaimentModel()
                    {
                        Title = $"Entertainment - {i}",
                        Address = new AddressModel()
                        {
                            Coordinates = new CoordinatesAddressModel()
                            {
                                Latitude = i * 3 / 2 + 1.34,
                                Longitude = i * 5 / 2 + 1.34
                            },
                            HouseNumber = $"{i}",
                            ApartmentNumber = $"{i}",
                            Street = streets[streetIndex],
                        },
                        AveragePrice = new EntertaimentPriceModel(),

                        Type = entertainmentType,
                    };
                    entertainments.Add(entertainment);
                }

                ApplicationContext.Streets.AddRange(streets);
                ApplicationContext.SaveChanges();
                ApplicationContext.Entertaiments.AddRange(entertainments);
                ApplicationContext.SaveChanges();

            }
        }
        /* private static async Task GenerateUserData()
         {
             var users = new List<UserProfileModel>();
             for (int i = 0; i < 10; i++)
             {
                 var user = new UserProfileModel()
                 {
                     Name = $"name{i}",
                     Birthday = new DateTime(2018 - i, 9, 13),
                     Gender = "male",
                     User = new ApplicationUserModel()
                     {
                         UserId = Guid.NewGuid(),
                         UserName = $"email{i}@email",
                         Email = $"email{i}@email",
                         Trips = new List<TripModel>
                         {
                             new TripModel
                             {
                                 Entertaiments = new List<EntertaimentModel>
                                 {
                                     new EntertaimentModel(),
                                     new EntertaimentModel(),
                                 },
                                 Reviews = new List<ReviewModel>
                                 {
                                    new ReviewModel(),
                                    new ReviewModel(),
                                 }
                             }
                          }   
                     }
                 };

                 users.Add(user);
             }
             await ApplicationContext.UserProfiles.AddRangeAsync(users);
             await ApplicationContext.SaveChangesAsync();
         }*/

        private static async Task GenerateReviews()
        {
            var reviews = new List<ReviewModel>();


            for (int i = 0; i < 10; i++)
            {
                var review = new ReviewModel()
                {
                    User = new ApplicationUserModel { Profile = new UserProfileModel { Name = "lll" } },
                    // Trip = new TripModel { },
                    Rating = new RatingModel { Value = 5 }
                };

                reviews.Add(review);

            }
            await ApplicationContext.Reviews.AddRangeAsync(reviews);
            await ApplicationContext.SaveChangesAsync();
        }

        private static async Task GenerateComment()
        {
            var comments = new List<CommentModel>();
            for (int i = 0; i < 10; i++)
            {
                var comment = new CommentModel()
                {
                    Status = CommentStatus.Liked,
                    Review = new ReviewModel { Rating = new RatingModel { Value = 3 } }
                };

                comments.Add(comment);
            }
            await ApplicationContext.Comments.AddRangeAsync(comments);
            await ApplicationContext.SaveChangesAsync();
        }

        private static async Task GenerateImage()
        {
            var images = new List<ImageModel>();
            for (int i = 0; i < 10; i++)
            {
                var image = new ReviewImageModel()
                {
                    Review = new ReviewModel
                    {
                        User = new ApplicationUserModel { Profile = new UserProfileModel { Name = "lll" } },
                        Rating = new RatingModel { Value = 5 }
                    }

                };

                images.Add(image);
            }
            await ApplicationContext.Images.AddRangeAsync(images);
            await ApplicationContext.SaveChangesAsync();
        }

        private static async Task GenerateTrips()
        {
            var trips = new List<TripModel>();
            for (int i = 0; i < 10; i++)
            {
                var trip = new TripModel()
                {
                    Id = Guid.NewGuid(),
                    TripStart = DateTime.Now,
                    TripEnd = DateTime.Now.AddHours(4),
                    Entertaiments = new List<EntertaimentModel>(),
                    Images = new List<TripImageModel>(),
                    Price = new TripPriceModel(),
                    Title = $"TripTitle{i}",
                    Description = $"TripDescription{i}",
                    OptimalSpent = TimeSpan.Zero,
                    RealSpent = TimeSpan.Zero,
                    TripStatus = TripStatus.New,
                    TagString = $"tripTagString{i}"
                };
                if (i % 2 == 0)
                {
                    trip.DafaultTrip = true;
                }
                if (i > 5)
                {
                    trip.AverageRating = 4;
                }
                trips.Add(trip);
            }


            await ApplicationContext.Trips.AddRangeAsync(trips);
            await ApplicationContext.SaveChangesAsync();
        }
    }
}

