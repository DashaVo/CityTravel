using CityTraveler.Domain.Enums;
using CityTraveler.Services;
using Moq;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using CityTraveler.Domain.DTO;
using System;

namespace CityTraveler.Tests
{
    public class EntertainmentTests
    {
        private ILogger<EntertainmentService> _loggerMock = new Logger<EntertainmentService>(new LoggerFactory());
        EntertainmentService service;

        [SetUp]
        public async Task Setup()
        {
            await ArrangeTests.SetupDbContext();
            service = new EntertainmentService(ArrangeTests.ApplicationContext, ArrangeTests.TestMapper, _loggerMock);
        }

        [Test]
        public void GetAllDTOTest()
        {
            var allEntertainments = service.GetAllDTO();
            var landscapeEntertainments = service.GetAllDTO(EntertainmentType.Landscape);
            var institutionEntertainments = service.GetAllDTO(EntertainmentType.Institution);
            var eventEntertainments = service.GetAllDTO(EntertainmentType.Event);

            Assert.IsTrue(ArrangeTests.ApplicationContext.Entertaiments.Count() > 0);
            Assert.AreEqual(allEntertainments.Count(), ArrangeTests.ApplicationContext.Entertaiments.Count());

            foreach (var entertainment in landscapeEntertainments)
            {
                Assert.IsTrue(entertainment.Type == "Landscape");
                Assert.IsTrue(allEntertainments.Select(x => x.Id).Contains(entertainment.Id));
            }

            foreach (var entertainment in institutionEntertainments)
            {
                Assert.IsTrue(entertainment.Type == "Institution");
                Assert.IsTrue(allEntertainments.Select(x => x.Id).Contains(entertainment.Id));
            }

            foreach (var entertainment in eventEntertainments)
            {
                Assert.IsTrue(entertainment.Type == "Event");
                Assert.IsTrue(allEntertainments.Select(x => x.Id).Contains(entertainment.Id));
            }
        }

        [Test]
        public async Task GetEntertainmentbyIdTest()
        {
            var originalEntertianment = ArrangeTests.ApplicationContext.Entertaiments.First();
            var fakeId = Guid.NewGuid();

            var entertainment = await service.GetEntertainmentDTOByIdAsync(originalEntertianment.Id);
            var fakeEntertainment = await service.GetEntertainmentDTOByIdAsync(fakeId);

            Assert.IsNotNull(entertainment);
            Assert.AreEqual(originalEntertianment.Id, entertainment.Id);
            Assert.IsTrue(fakeEntertainment.Id == Guid.Empty);
        }

        [Test]
        public void GetAverageRatingTest()
        {
            var entertainment = ArrangeTests.ApplicationContext.Entertaiments
                .FirstOrDefault();

            var averageRating = service.GetAverageRating(entertainment.Id);

            Assert.IsNotNull(entertainment);
            Assert.IsNotNull(averageRating);
        }


        public void GetEntertainmentsDTOTest(EntertainmentType type)
        {
            var originalEntertainmentsIds = ArrangeTests.ApplicationContext.Entertaiments
                .Where(x => type == EntertainmentType.All || type == x.Type).Select(x => x.Id);

            var entertainments = service.GetEntertainmentsDTO(originalEntertainmentsIds, type).ToList();

            Assert.IsTrue(entertainments.Count > 0);
            if (type != EntertainmentType.All)
            {
                Assert.AreEqual(entertainments.First().Type, type.ToString());
            }
            Assert.AreEqual(originalEntertainmentsIds, entertainments.Select(x => x.Id));
        }

        public void GetEntertainmentsByTitleTest(EntertainmentType type)
        {
            var originalEntertainment = ArrangeTests.ApplicationContext.Entertaiments
                .Where(x => type == EntertainmentType.All || type == x.Type).First();

            var entertainments = service.GetEntertainmentsDTOByTitle(originalEntertainment.Title, type).ToList();

            Assert.IsTrue(entertainments.Count > 0);
            if (type != EntertainmentType.All)
            {
                Assert.AreEqual(entertainments.First().Type, type.ToString());
            }
            Assert.AreEqual(originalEntertainment.Id, entertainments[0].Id);
        }

        public void GetEntertainmentsByStreetTest(EntertainmentType type)
        {
            var originalEntertainment = ArrangeTests.ApplicationContext.Entertaiments
                .Where(x => type == EntertainmentType.All || type == x.Type).First();
            var street = originalEntertainment.Address.Street;

            var entertainments = service.GetEntertainmentsDTOByStreet(street.Title, type).ToList();

            Assert.IsTrue(entertainments.Count > 0);
            if (type != EntertainmentType.All)
            {
                Assert.AreEqual(entertainments.First().Type, type.ToString());
            }
            Assert.IsTrue(entertainments.Select(x => x.Id).Contains(originalEntertainment.Id));
        }

        public void GetEntertainmentsByCoordinatesTest(EntertainmentType type)
        {
            var originalEntertainment = ArrangeTests.ApplicationContext.Entertaiments
                .Where(x => type == EntertainmentType.All || type == x.Type).First();
            var coordinates = originalEntertainment.Address.Coordinates;
            var coordinatesDTO = new CoordinatesDTO()
            {
                Latitude = coordinates.Latitude,
                Longitude = coordinates.Longitude
            };

            var entertainments = service.GetEntertainmentsDTOByCoordinates(coordinatesDTO, type).ToList();

            Assert.IsTrue(entertainments.Count > 0);
            if (type != EntertainmentType.All)
            {
                Assert.AreEqual(entertainments.First().Type, type.ToString());
            }
            Assert.IsTrue(entertainments.Select(x => x.Id).Contains(originalEntertainment.Id));
        }

        [Test]
        public void GetEntertainmentsAllByTitleTest()
        {
            GetEntertainmentsByTitleTest(EntertainmentType.All);
        }

        [Test]
        public void GetEntertainmentsLandskapeByTitleTest()
        {
            GetEntertainmentsByTitleTest(EntertainmentType.Landscape);
        }

        [Test]
        public void GetEntertainmentsInstitutionByTitleTest()
        {
            GetEntertainmentsByTitleTest(EntertainmentType.Institution);
        }

        [Test]
        public void GetEntertainmentsEventByTitleTest()
        {
            GetEntertainmentsByTitleTest(EntertainmentType.Event);
        }

        [Test]
        public void GetEntertainmentsDTOAllTest()
        {
            GetEntertainmentsDTOTest(EntertainmentType.All);
        }

        [Test]
        public void GetEntertainmentsDTOLandskapeTest()
        {
            GetEntertainmentsDTOTest(EntertainmentType.Landscape);
        }

        [Test]
        public void GetEntertainmentsDTOInstitutionTest()
        {
            GetEntertainmentsDTOTest(EntertainmentType.Institution);
        }

        [Test]
        public void GetEntertainmentsDTOEventTest()
        {
            GetEntertainmentsDTOTest(EntertainmentType.Event);
        }

        [Test]
        public void GetEntertainmentsAllByStreetTest()
        {
            GetEntertainmentsByStreetTest(EntertainmentType.All);
        }

        [Test]
        public void GetEntertainmentsLandskapeByStreetTest()
        {
            GetEntertainmentsByStreetTest(EntertainmentType.Landscape);
        }

        [Test]
        public void GetEntertainmentsInstituionByStreetTest()
        {
            GetEntertainmentsByStreetTest(EntertainmentType.Institution);
        }

        [Test]
        public void GetEntertainmentsEventByStreetTest()
        {
            GetEntertainmentsByStreetTest(EntertainmentType.Event);
        }

        [Test]
        public void GetEntertainmentsAllByCoordinatesTest()
        {
            GetEntertainmentsByCoordinatesTest(EntertainmentType.All);
        }

        [Test]
        public void GetEntertainmentsLandskapeByCoordinatesTest()
        {
            GetEntertainmentsByCoordinatesTest(EntertainmentType.Landscape);
        }

        [Test]
        public void GetEntertainmentsInstitutionByCoordinatesTest()
        {
            GetEntertainmentsByCoordinatesTest(EntertainmentType.Institution);
        }

        [Test]
        public void GetEntertainmentsEventByCoordinatesTest()
        {
            GetEntertainmentsByCoordinatesTest(EntertainmentType.Event);
        }
    }
}