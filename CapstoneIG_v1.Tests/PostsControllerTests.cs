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
    public class PostsControllerTests
    {
        [Fact]
        public async Task DeletePost()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman"
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

            var controller = new PostsController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl30", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });
                context.Posts.Add(new PostModel { Id = 3, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });

                context.SaveChanges();

                var res = await controller.DeletePost(2);

                var remainingPosts = context.Posts.Select(x => x.Id).ToList();

                Assert.Equal(2, remainingPosts.Count);
            }
        }

        [Fact]
        public async Task EditPost()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman"
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

            var controller = new PostsController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl30", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });
                context.Posts.Add(new PostModel { Id = 3, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });

                context.SaveChanges();

                PostModel pst = new PostModel { Id = 3, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Updated caption test", User = appUser };

                var res = await controller.EditPost(pst, 3);

                var postToUpdate = context.Posts.Where(x => x.Id == 3).FirstOrDefault();

                Assert.Equal("Updated caption test", postToUpdate.Caption);
            }
        }

        [Fact]
        public async Task GetCurrentUserPosts()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };

            var appUser2 = new ApplicationUser
            {
                Id = "321",
                UserName = "rainman",
                NormalizedUserName = "rainman"
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

            var controller = new PostsController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl30", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser2 });
                context.Posts.Add(new PostModel { Id = 3, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });

                context.SaveChanges();

                var res = await controller.GetCurrentUserPosts();

                List<PostResponse> records = JsonConvert.DeserializeObject<List<PostResponse>>(JsonConvert.SerializeObject(res.Value));

                Assert.Equal(2, records.Count());
            }
        }

        [Fact]
        public async Task GetUserPosts()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman"
            };

            var appUser2 = new ApplicationUser
            {
                Id = "321",
                UserName = "rainman",
                NormalizedUserName = "rainman"
            };

            mockUserManager
                .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            await mockUserManager.Object.CreateAsync(appUser2);

            mockUserManager
                .Setup(x => x.FindByNameAsync(appUser2.UserName))
                .Returns(Task.FromResult(appUser2));

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                        new Claim(ClaimTypes.NameIdentifier, "rainman"),
                                        new Claim(ClaimTypes.Name, "rainman")
                                   }, "TestAuthentication"));

            var mockEnv = Mock.Of<IWebHostEnvironment>();

            var controller = new PostsController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl30", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser2 });
                context.Posts.Add(new PostModel { Id = 3, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });

                context.SaveChanges();

                var res = await controller.GetUserPostsAsync("rainman");

                List<PostResponse> records = JsonConvert.DeserializeObject<List<PostResponse>>(JsonConvert.SerializeObject(res.Value));

                Assert.Single(records);
            }
        }

        [Fact]
        public async Task GetHomePagePosts()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var context = new ApplicationDbContext(options);

            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
            var appUser = new ApplicationUser
            {
                Id = "123",
                UserName = "snowman",
                NormalizedUserName = "snowman"
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

            var controller = new PostsController(context, mockUserManager.Object, mockEnv)
            {
                ControllerContext = new ControllerContext()
            };

            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser2 });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl30", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser2 });
                context.Posts.Add(new PostModel { Id = 3, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser3 });
                context.Posts.Add(new PostModel { Id = 4, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser4 });
                context.Posts.Add(new PostModel { Id = 5, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser4 });
                context.Posts.Add(new PostModel { Id = 6, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser4 });

                context.Followers.Add(new FollowersModel { Id = 1, FollowingId = appUser2, UserId = appUser });
                context.Followers.Add(new FollowersModel { Id = 2, FollowingId = appUser4, UserId = appUser });

                context.SaveChanges();

                var res = await controller.GetHomePagePosts();

                List<PostResponse> records = JsonConvert.DeserializeObject<List<PostResponse>>(JsonConvert.SerializeObject(res.Value));

                Assert.Equal(2, records.Count());
            }
        }

    }
}

