using AutoMapper;
using CityTraveler.Domain.DTO;
using CityTraveler.Domain.Entities;
using CityTraveler.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CityTraveler.Tests
{
    public class UserManagementTests
    {
        private UserManagementService service;
        [SetUp]
        public async Task Setup()
        {
            await ArrangeTests.SetupDbContext();
            var service = new UserManagementService(ArrangeTests.ApplicationContext, ArrangeTests.TestMapper);
        }


        [Test]

        public  async Task GetUserByIdTest()
        {
            var userModel =await ArrangeTests.ApplicationContext.Users
                .FirstOrDefaultAsync();
            var user = await service.GetUserByIdAsync(userModel.Id);

            Assert.IsNotNull(user);
            Assert.AreEqual(user.UserId, userModel.Id);
            Assert.AreEqual(user.Username, userModel.UserName);
            Assert.AreEqual(user.Email, userModel.Email);
          }
       
        [Test]
        public async Task GetUsersRangeTests()
        {
            var usersRange = ArrangeTests.ApplicationContext.Users
                .Skip(0).Take(10);
            
            var users = await service.GetUsersRangeAsync(0,10);

            Assert.IsNotEmpty(users);
            Assert.AreEqual(usersRange.Count(), users.Count());
            Assert.AreEqual(users.Select(x => x.Name), usersRange.Select(x => x.Profile.Name));
        }

        [Test]
        public async Task GetUsersByPropetiesTest()
        {
            var userModel = ArrangeTests.ApplicationContext
                .Users.LastOrDefault();
            
            var users = await service.GetUsersByPropetiesAsync(userModel.Profile.Name, "", "");

           Assert.IsNotEmpty(users);

            foreach (var user in users)
            {
                Assert.AreEqual(userModel.Profile.Name, user.Name);
                Assert.AreEqual(userModel.Profile.Gender, user.Gender);
                Assert.AreEqual(userModel.Profile.Birthday, user.Birthday);
                Assert.AreEqual(userModel.Email, user.Email);
                Assert.AreEqual(userModel.Id, user.UserId);
            }
        }

        [Test]
        public async Task UpdateUsertest()
        {
            var user = ArrangeTests.ApplicationContext.UserProfiles.FirstOrDefault();
            
            var userMap = ArrangeTests.TestMapper.Map<UserProfileModel, UpdateUserDTO>(user);
            var updateUser = await service.UpdateUser(userMap);

            Assert.IsNotNull(updateUser);
            Assert.AreEqual(user.Name, updateUser.Name);
            Assert.AreEqual(user.AvatarSrc, updateUser.AvatarSrc);
        }

        [Test]
        public async Task DeleteUserTest()
        {
            var user = ArrangeTests.ApplicationContext.Users.FirstOrDefault();
            
            var deleteUser = await service.DeleteUser(user.UserId);

            Assert.IsNotNull(user);
            Assert.IsTrue(deleteUser);
            Assert.IsFalse(ArrangeTests.ApplicationContext.Users.Contains(user));
        }
    }
}
