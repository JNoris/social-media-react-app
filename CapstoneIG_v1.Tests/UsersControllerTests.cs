using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using CapstoneIG_v1.Controllers;
using Microsoft.AspNetCore.Hosting;

namespace CapstoneIG_v1.Tests
{
    public class UsersControllerTests
    {
        [Fact]
        public async Task EditCurrentUser()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman",
                Bio = "Some random bio text"
            };

            mockUserManager
                .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            await mockUserManager.Object.CreateAsync(appUser);

            mockUserManager
                .Setup(x => x.FindByNameAsync(appUser.UserName))
                .Returns(Task.FromResult(appUser));

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                        new Claim(ClaimTypes.NameIdentifier, "snowman"),
                                        new Claim(ClaimTypes.Name, "snowman")
                                   }, "TestAuthentication"));

            var mockEnv = Mock.Of<IWebHostEnvironment>();

            var controller = new UsersController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                ApplicationUser testUser = new ApplicationUser { Bio = "Updated bio test", UserName = "RainMan" };

                var res = controller.EditCurrentUser(testUser);

                Assert.Equal("Updated bio test", appUser.Bio);
            }
        }

        [Fact]
        public async Task GetCurrentUserDetails()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman",
                ProfileImageName = "fakeprofileurl"
            };

            var appUser2 = new ApplicationUser
            {
                Id = "456",
                UserName = "rainman",
                NormalizedUserName = "rainman"
            };

            var appUser3 = new ApplicationUser
            {
                Id = "789",
                UserName = "windman",
                NormalizedUserName = "windman"
            };

            var appUser4 = new ApplicationUser
            {
                Id = "012",
                UserName = "fireman",
                NormalizedUserName = "fireman"
            };

            mockUserManager
                .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            await mockUserManager.Object.CreateAsync(appUser);

            mockUserManager
                .Setup(x => x.FindByNameAsync(appUser.UserName))
                .Returns(Task.FromResult(appUser));

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                        new Claim(ClaimTypes.NameIdentifier, "snowman"),
                                        new Claim(ClaimTypes.Name, "snowman")
                                   }, "TestAuthentication"));

            var mockEnv = Mock.Of<IWebHostEnvironment>();

            var controller = new UsersController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, FollowingId = appUser, UserId = appUser2 });
                context.Followers.Add(new FollowersModel { Id = 2, FollowingId = appUser, UserId = appUser3 });
                context.Followers.Add(new FollowersModel { Id = 3, FollowingId = appUser, UserId = appUser4 });

                context.SaveChanges();

                var res = await controller.GetCurrentUserDetails();

                UserResponse records = JsonConvert.DeserializeObject<UserResponse>(JsonConvert.SerializeObject(res.Value));

                Assert.Equal(3, records.NumberOfFollowers);
            }
        }

        [Fact]
        public async Task GetUserDetails()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman",
                ProfileImageName = "fakeprofileurl"
            };

            var appUser2 = new ApplicationUser
            {
                Id = "456",
                UserName = "rainman",
                NormalizedUserName = "rainman"
            };

            var appUser3 = new ApplicationUser
            {
                Id = "789",
                UserName = "windman",
                NormalizedUserName = "windman"
            };

            var appUser4 = new ApplicationUser
            {
                Id = "012",
                UserName = "fireman",
                NormalizedUserName = "fireman"
            };

            mockUserManager
                .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            await mockUserManager.Object.CreateAsync(appUser);

            mockUserManager
                .Setup(x => x.FindByNameAsync(appUser.UserName))
                .Returns(Task.FromResult(appUser));

            var mockEnv = Mock.Of<IWebHostEnvironment>();

            var controller = new UsersController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, FollowingId = appUser4, UserId = appUser2 });
                context.Followers.Add(new FollowersModel { Id = 2, FollowingId = appUser4, UserId = appUser3 });
                context.Followers.Add(new FollowersModel { Id = 3, FollowingId = appUser, UserId = appUser4 });

                context.SaveChanges();

                var res = controller.GetUserDetails("012");

                UserResponse records = JsonConvert.DeserializeObject<UserResponse>(JsonConvert.SerializeObject(res.Value));

                Assert.Equal(1, records.NumberOfFollowing);
            }
        }

        //[Fact]
        //public async Task DeleteUser()
        //{
            
        //}
    }
}
