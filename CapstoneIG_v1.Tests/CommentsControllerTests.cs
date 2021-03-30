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
        public async Task AddCcomment()
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

            postController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };
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
                context.Posts.Add(new PostModel { Id = 1, ImageName = "FakeImageUrl", UploadDate = DateTime.Now, Caption = "Some random caption", User = appUser });

                context.SaveChanges();



                var res = await commentsController.AddComment(comment1, 1);

                var remainingPosts = context.Comments.Select(x => x.Id).ToList();

                Assert.Single(remainingPosts);
            }

        }
    }
}
