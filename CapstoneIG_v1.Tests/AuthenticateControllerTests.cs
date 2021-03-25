﻿using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CapstoneIG_v1.Controllers;

namespace CapstoneIG_v1.Tests
{
    public class AuthenticateControllerTests
    {
        [Fact]
        public async Task Register()
        {
            var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);

            mockUserManager
                .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            var mockConf = Mock.Of<IConfiguration>();

            var controller = new AuthenticateController(mockUserManager.Object, mockConf)
            {
                ControllerContext = new ControllerContext()
            };

            var appUser = new RegisterModel
            {
                FirstName = "snow",
                LastName = "man",
                Username = "snowman",
                Password = "@QWert12345"
            };

            var res = (OkObjectResult)await controller.Register(appUser);

            Response resp = JsonConvert.DeserializeObject<Response>(JsonConvert.SerializeObject(res.Value));

            Assert.Equal("Success", resp.Status);
        }

        //[Fact]
        //public async Task Login()
        //{
        //    var mockStore = Mock.Of<IUserStore<ApplicationUser>>();
        //    var mockUserManager = new Mock<UserManager<ApplicationUser>>(mockStore, null, null, null, null, null, null, null, null);
        //    var appUser = new ApplicationUser
        //    {
        //        Id = "123",
        //        UserName = "snowman",
        //        NormalizedUserName = "snowman",

        //    };

        //    mockUserManager
        //        .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
        //        .ReturnsAsync(IdentityResult.Success);

        //    await mockUserManager.Object.CreateAsync(appUser);

        //    mockUserManager
        //        .Setup(x => x.FindByNameAsync(appUser.UserName))
        //        .Returns(Task.FromResult(appUser));

        //    var mockConf = Mock.Of<IConfiguration>();

        //    var controller = new AuthenticateController(mockUserManager.Object, mockConf)
        //    {
        //        ControllerContext = new ControllerContext()
        //    };

        //    var appUserL = new RegisterModel
        //    {
        //        Username = "snowman",
        //        Password = "@QWert12345"
        //    };

        //    var res = (OkObjectResult)await controller.Login(appUserL);

        //    var resp = JsonConvert.DeserializeObject<Response>(JsonConvert.SerializeObject(res.Value));

        //    Assert.Equal("Success", "x");
        //}
    }
}
