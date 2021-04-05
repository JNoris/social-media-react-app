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
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CapstoneIG_v1.Controllers;
using Microsoft.AspNetCore.Hosting;

namespace CapstoneIG_v1.Tests
{
    public class FollowsControllerTests
    {
        [Fact]
        public async Task GetFollowing()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            
            var appUser = new ApplicationUser
            {
                Id = "12",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };
            var appUser2 = new ApplicationUser
            {
                Id = "13",
                UserName = "megaman",
                NormalizedUserName = "megaman"
            };
            var appUser3 = new ApplicationUser
            {
                Id = "14",
                UserName = "eggman",
                NormalizedUserName = "eggman"
            };
            var appUser4 = new ApplicationUser
            {
                Id = "15",
                UserName = "charmander",
                NormalizedUserName = "charmander"
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


            var followsController = new FollowersController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            followsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, UserId = appUser, FollowingId = appUser2});
                context.Followers.Add(new FollowersModel { Id = 2, UserId = appUser, FollowingId = appUser3 });
                context.Followers.Add(new FollowersModel { Id = 3, UserId = appUser, FollowingId = appUser4 });

                context.SaveChanges();

                var result = await followsController.GetFollowing(appUser.UserName);
                List<FollowResponse> records = JsonConvert.DeserializeObject<List<FollowResponse>>(JsonConvert.SerializeObject(result.Value));

                //var remainingPosts = context.Comments.Where(x => x.PostId == 2).Select(x => x.Id).ToList();
                Assert.Equal(3, records.Count);
            }
        }

        [Fact]
        public async Task GetFollowers()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);

            var appUser = new ApplicationUser
            {
                Id = "12",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };
            var appUser2 = new ApplicationUser
            {
                Id = "13",
                UserName = "megaman",
                NormalizedUserName = "megaman"
            };
            var appUser3 = new ApplicationUser
            {
                Id = "14",
                UserName = "eggman",
                NormalizedUserName = "eggman"
            };
            var appUser4 = new ApplicationUser
            {
                Id = "15",
                UserName = "charmander",
                NormalizedUserName = "charmander"
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


            var followsController = new FollowersController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            followsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, UserId = appUser, FollowingId = appUser2 });
                context.Followers.Add(new FollowersModel { Id = 2, UserId = appUser, FollowingId = appUser3 });
                context.Followers.Add(new FollowersModel { Id = 3, UserId = appUser, FollowingId = appUser4 });

                context.SaveChanges();

                var result = await followsController.GetFollowers(appUser4.UserName);
                List<FollowResponse> records = JsonConvert.DeserializeObject<List<FollowResponse>>(JsonConvert.SerializeObject(result.Value));

                Assert.Single(records);
            }
        }

        [Fact]
        public async Task AddNewFollow()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);

            var appUser = new ApplicationUser
            {
                Id = "12",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };
            var appUser2 = new ApplicationUser
            {
                Id = "13",
                UserName = "megaman",
                NormalizedUserName = "megaman"
            };
            var appUser3 = new ApplicationUser
            {
                Id = "14",
                UserName = "eggman",
                NormalizedUserName = "eggman"
            };
            var appUser4 = new ApplicationUser
            {
                Id = "15",
                UserName = "charmander",
                NormalizedUserName = "charmander"
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

            var followsController = new FollowersController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            followsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, UserId = appUser, FollowingId = appUser2 });
                context.Followers.Add(new FollowersModel { Id = 2, UserId = appUser, FollowingId = appUser3 });

                context.Users.Add(appUser4);

                context.SaveChanges();

                var result = await followsController.AddNewFollow(appUser4.UserName);

                var remainingPosts = context.Followers.Where(x => x.FollowingId == appUser4).ToList();

                Assert.Single(remainingPosts);
            }
        }

        [Fact]
        public async Task RemoveFollow()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);

            var appUser = new ApplicationUser
            {
                Id = "12",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };
            var appUser2 = new ApplicationUser
            {
                Id = "13",
                UserName = "megaman",
                NormalizedUserName = "megaman"
            };
            var appUser3 = new ApplicationUser
            {
                Id = "14",
                UserName = "eggman",
                NormalizedUserName = "eggman"
            };
            var appUser4 = new ApplicationUser
            {
                Id = "15",
                UserName = "charmander",
                NormalizedUserName = "charmander"
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


            var followsController = new FollowersController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            followsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, UserId = appUser, FollowingId = appUser2 });
                context.Followers.Add(new FollowersModel { Id = 2, UserId = appUser, FollowingId = appUser3 });
                context.Followers.Add(new FollowersModel { Id = 3, UserId = appUser, FollowingId = appUser4 });

                context.SaveChanges();

                //removing a user that wasn't following
                //var result = await followsController.RemoveFollow(appUser4.UserName);

                var remainingPosts = context.Followers.Where(x => x.FollowingId == appUser2).ToList();
                
                Assert.Single(remainingPosts);

                var result = await followsController.RemoveFollow(appUser2.UserName);

                remainingPosts = context.Followers.Where(x => x.FollowingId == appUser2).ToList();

                Assert.Empty(remainingPosts);

            }
        }

        [Fact]
        public async Task SelfRemoveFollow()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);

            var appUser = new ApplicationUser
            {
                Id = "12",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };
            var appUser2 = new ApplicationUser
            {
                Id = "13",
                UserName = "megaman",
                NormalizedUserName = "megaman"
            };
            var appUser3 = new ApplicationUser
            {
                Id = "14",
                UserName = "eggman",
                NormalizedUserName = "eggman"
            };
            var appUser4 = new ApplicationUser
            {
                Id = "15",
                UserName = "charmander",
                NormalizedUserName = "charmander"
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


            var followsController = new FollowersController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            followsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Followers.Add(new FollowersModel { Id = 1, UserId = appUser, FollowingId = appUser2 });
                context.Followers.Add(new FollowersModel { Id = 2, UserId = appUser, FollowingId = appUser3 });
                context.Followers.Add(new FollowersModel { Id = 3, UserId = appUser, FollowingId = appUser4 });
                context.Followers.Add(new FollowersModel { Id = 4, UserId = appUser3, FollowingId = appUser });

                context.SaveChanges();

                //removing a user that wasn't following
                //var result = await followsController.RemoveFollow(appUser4.UserName);

                var remainingPosts = context.Followers.Where(x => x.FollowingId == appUser).ToList();

                Assert.Single(remainingPosts);

                var result = await followsController.SelfRemoveFollow(appUser3.UserName);

                remainingPosts = context.Followers.Where(x => x.UserId == appUser3).ToList();

                Assert.Empty(remainingPosts);

            }
        }
    }
}
