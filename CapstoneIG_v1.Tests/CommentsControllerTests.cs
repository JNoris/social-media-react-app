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
    public class CommentsControllerTests
    {
        [Fact]
        public async Task AddComment()
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

            var postController = new CommentsController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            var commentsController = new CommentsController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            commentsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            CommentModel comment1 = new CommentModel()
            {
                CommentText = "Hello World",
                CommentDate = DateTime.Now,
                PostId = 1,
                CommentBy = appUser
            };

            using (context)
            {
                //context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });

                //context.SaveChanges();

                var res = await commentsController.AddComment(comment1, 1);
                var res2 = await commentsController.AddComment(comment1, 2);

                var remainingPosts = context.Comments.Where(x => x.PostId == 2).Select(x => x.Id).ToList();

                Assert.Single(remainingPosts);
            }
        }

        [Fact]
        public async Task GetPostComments()
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

            var commentsController = new CommentsController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            commentsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Comments.Add(new CommentModel { Id = 1, CommentText = "Hello World", CommentDate = DateTime.Now, PostId = 1, CommentBy = appUser });
                context.Comments.Add(new CommentModel { Id = 2, CommentText = "Hello World2", CommentDate = DateTime.Now, PostId = 1, CommentBy = appUser });
                context.Comments.Add(new CommentModel { Id = 3, CommentText = "Hello World3", CommentDate = DateTime.Now, PostId = 1, CommentBy = appUser });
                context.Comments.Add(new CommentModel { Id = 4, CommentText = "Hello World4", CommentDate = DateTime.Now, PostId = 2, CommentBy = appUser });

                context.SaveChanges();

                var result= await commentsController.GetPostComments(1);

                //var numComments = context.Comments.Where(x => x.PostId == 1).Select(x => x.Id).ToList();
                List<CommentResponse> records = JsonConvert.DeserializeObject<List<CommentResponse>>(JsonConvert.SerializeObject(result.Value));

                Assert.Equal(3, records.Count);
            }
        }

        [Fact]
        public async Task DeleteComment()
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

            var postController = new CommentsController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            var commentsController = new CommentsController(context, mockUserManager.Object)
            {
                ControllerContext = new ControllerContext()
            };

            commentsController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            using (context)
            {
                context.Comments.Add(new CommentModel { Id = 1, CommentText = "Hello World", CommentDate = DateTime.Now, PostId = 1, CommentBy = appUser });
                context.Comments.Add(new CommentModel { Id = 2, CommentText = "Hello World2", CommentDate = DateTime.Now, PostId = 1, CommentBy = appUser });
                context.Comments.Add(new CommentModel { Id = 3, CommentText = "Hello World3", CommentDate = DateTime.Now, PostId = 1, CommentBy = appUser });
                context.Comments.Add(new CommentModel { Id = 4, CommentText = "Hello World4", CommentDate = DateTime.Now, PostId = 2, CommentBy = appUser });

                context.SaveChanges();

                var result = await commentsController.DeleteComment(3);

                var remainingPosts = context.Comments.Where(x => x.PostId == 3).Select(x => x.Id).ToList();

                Assert.Empty(remainingPosts);
            }
        }
    }
}
