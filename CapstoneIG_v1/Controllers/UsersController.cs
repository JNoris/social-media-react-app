using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneIG_v1.Controllers
{
    [ApiController]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;

        public UsersController(ApplicationDbContext db, UserManager<ApplicationUser> userManager, IWebHostEnvironment environment)
        {
            _db = db;
            _userManager = userManager;
            _environment = environment;
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string src = "https://localhost:5001/profileimages/defaultprofile.png";

            if (imageFile != null)
            {
                string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
                var imagePath = Path.Combine(_environment.ContentRootPath, "ProfileImages", imageName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                src = String.Format("{0}://{1}{2}/ProfileImages/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
            }

            return src;
        }

        [HttpPut]
        [Route("edituserprofilephoto")]
        public async Task<IActionResult> EditUserProfilePhoto([FromForm] ApplicationUser curUser)
        {
            dynamic res;

            if (curUser != null)
            {
                ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

                var imgStoreName = await SaveImage(curUser.ImgFile);

                user.ProfileImageName = imgStoreName;

                _db.SaveChanges();

                res = Ok(new Response { Status = "Success", Message = "User Updated" });
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpPut]
        [Route("edituser")]
        public async Task<IActionResult> EditCurrentUser([FromBody] ApplicationUser curUser)
        {
            dynamic res;

            if (curUser != null)
            {
                ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

                user.Bio = curUser.Bio;
                user.UserName = curUser.UserName;
                user.FirstName = curUser.FirstName;
                user.LastName = curUser.LastName;

                _db.SaveChanges();

                res = Ok(new Response { Status = "Success", Message = "User Updated" });
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpGet]
        [Route("getcurrentuserdetails")]
        public async Task<JsonResult> GetCurrentUserDetails()
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                ApplicationUser usr = _db.Users.Where(u => u.Id == user.Id).FirstOrDefault();

                UserResponse newUResponse = new UserResponse()
                {
                    ProfilePhotoPath = usr.ProfileImageName,
                    UserName = usr.UserName,
                    FirstName = usr.FirstName,
                    LastName = usr.LastName,
                    Bio = usr.Bio,
                    NumberOfPosts = _db.Posts.Where(p => p.User == usr).Count(),
                    NumberOfFollowers = _db.Followers.Where(f => f.FollowingId == user).Count(),
                    NumberOfFollowing = _db.Followers.Where(f => f.UserId == user).Count()
                };

                res = Json(newUResponse);
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpGet]
        [Route("getuserdetails/{username}")]
        public async Task<JsonResult> GetUserDetailsAsync(string username)
        {
            dynamic res;

            ApplicationUser curUser = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            ApplicationUser user = _db.Users.Where(u => u.UserName == username).FirstOrDefault();

            bool checkFollow = _db.Followers.Any(c => c.FollowingId == user && c.UserId == curUser);

            if (user != null)
            {
                UserResponse newUResponse = new UserResponse()
                {
                    ProfilePhotoPath = user.ProfileImageName,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Bio = user.Bio,
                    NumberOfPosts = _db.Posts.Where(p => p.User == user).Count(),
                    NumberOfFollowers = _db.Followers.Where(f => f.FollowingId.UserName == username).Count(),
                    NumberOfFollowing = _db.Followers.Where(f => f.UserId.UserName == username).Count(),
                    IsFollowed = checkFollow
                };

                res = Json(newUResponse);
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }
            return res;
        }

        [HttpPost]
        [Route("deleteuser")]
        public async Task<IActionResult> DeleteCurrentUser()
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                await _userManager.DeleteAsync(user);

                res = Ok(new Response { Status = "Success", Message = "User Deleted" });
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }
    }
}
