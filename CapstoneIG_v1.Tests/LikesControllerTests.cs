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

namespace CapstoneIG_v1.Tests
{
    public class LikesControllerTests
    {
        [Fact]
        public async Task GetLikes()
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


            var likesController = new LikesController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            likesController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Likes.Add(new LikeModel { Id = 1, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser});
                context.Likes.Add(new LikeModel { Id = 2, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser2});
                context.Likes.Add(new LikeModel { Id = 3, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser3});
                context.Likes.Add(new LikeModel { Id = 4, LikeDate = DateTime.Now, PostId = 2, LikeBy = appUser4});

                context.SaveChanges();

                var result = await likesController.GetLikes(1);
                List<LikeReponse> records = JsonConvert.DeserializeObject<List<LikeReponse>>(JsonConvert.SerializeObject(result.Value));

                //var remainingPosts = context.Comments.Where(x => x.PostId == 2).Select(x => x.Id).ToList();
                Assert.Equal(3, records.Count);
            }
        }

        [Fact]
        public async Task AddLike()
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


            var likesController = new LikesController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            likesController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser4 });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser3 });

                context.Likes.Add(new LikeModel { Id = 1, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser });
                context.Likes.Add(new LikeModel { Id = 2, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser2 });
                context.Likes.Add(new LikeModel { Id = 3, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser3 });
                context.Likes.Add(new LikeModel { Id = 4, LikeDate = DateTime.Now, PostId = 2, LikeBy = appUser4 });

                context.SaveChanges();

                var result = await likesController.AddLike(1); //Can't like if already liked by appUser
                var remainingPosts = context.Likes.Where(x => x.LikeBy == appUser).Select(x => x.Id).ToList();
                Assert.Single(remainingPosts);

                var result2 = await likesController.AddLike(2);
                var remainingPosts2 = context.Likes.Where(x => x.LikeBy == appUser).Select(x => x.Id).ToList();
                Assert.Equal(2, remainingPosts2.Count);
            }
        }

        [Fact]
        public async Task RemoveLIke()
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


            var likesController = new LikesController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            likesController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser4 });
                context.Posts.Add(new PostModel { Id = 2, ImageName = "FakeImageUrl40", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser3 });

                context.Likes.Add(new LikeModel { Id = 1, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser });
                context.Likes.Add(new LikeModel { Id = 2, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser2 });
                context.Likes.Add(new LikeModel { Id = 3, LikeDate = DateTime.Now, PostId = 1, LikeBy = appUser3 });
                context.Likes.Add(new LikeModel { Id = 4, LikeDate = DateTime.Now, PostId = 2, LikeBy = appUser4 });

                context.SaveChanges();

                var result = await likesController.RemoveLike(2); //Unliking a post that wasn't liked
                var remainingPosts = context.Likes.Where(x => x.LikeBy == appUser).Select(x => x.Id).ToList();
                Assert.Single(remainingPosts);

                var result2 = await likesController.RemoveLike(1);
                var remainingPosts2 = context.Likes.Where(x => x.LikeBy == appUser).Select(x => x.Id).ToList();
                Assert.Empty(remainingPosts2);
            }
        }
    }
}
