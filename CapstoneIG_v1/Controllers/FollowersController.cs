using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Identity;

namespace CapstoneIG_v1.Controllers
{
    [ApiController]
    public class FollowersController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public FollowersController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        //People you are following
        [HttpGet]
        [Route("GetFollowing/{username}")]
        public async Task<JsonResult> GetFollowing(string username)
        {
            try
            {
                var followers = await _db.Followers.Where(x => x.UserId.UserName == username).Select(x => new
                {
                    Id = x.Id,
                    UserId = x.FollowingId.Id,
                    UserName = x.FollowingId.UserName,
                    FirstName = x.FollowingId.FirstName,
                    LastName = x.FollowingId.LastName,
                    ProfilePhotoPath = x.FollowingId.ProfileImageName
                }).ToListAsync();

                return Json(followers);
            }
            catch (DbUpdateException)
            {
                Response.StatusCode = StatusCodes.Status500InternalServerError;
                return Json(new { Status = "Failed", Message = "Unable to query Database" });
            }
        }

        //People who are following you
        [HttpGet]
        [Route("GetFollowers/{username}")]
        public async Task<JsonResult> GetFollowers(string username)
        {
            try
            {
                var followers = await _db.Followers.Where(x => x.FollowingId.UserName == username).Select(x => new
                {
                    Id = x.Id,
                    UserId = x.UserId.Id,
                    UserName = x.UserId.UserName,
                    FirstName = x.UserId.FirstName,
                    LastName = x.UserId.LastName,
                    ProfilePhotoPath = x.UserId.ProfileImageName
                }).ToListAsync();

                return Json(followers);
            }
            catch (DbUpdateException)
            {
                Response.StatusCode = StatusCodes.Status500InternalServerError;
                return Json(new { Status = "Failed", Message = "Unable to query Database" });
            }
        }

        [HttpPost]
        [Route("AddNewFollow/{username}")]
        public async Task<IActionResult> AddNewFollow(string username)
        {
            string message;
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            //Check if targetId exists
            ApplicationUser targetExists = _db.Users.Where(p => p.UserName == username).FirstOrDefault();

            //Check if targetID is already a follower
            FollowersModel followExists = _db.Followers.Where(p => p.UserId == user).Where(q => q.FollowingId == targetExists).FirstOrDefault();

            if (targetExists != null && followExists == null)
            {
                FollowersModel newFollower = new FollowersModel()
                {
                    UserId = user,
                    FollowingId = targetExists,
                };

                try
                {
                    _db.Followers.Add(newFollower);
                    _db.SaveChanges();

                    return Ok(new Response { Status = "Success", Message = "Follower Added" });
                }
                catch (DbUpdateException)
                {
                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return Json(new { Status = "Failed", Message = "Unable to Update Database" });
                }
            }
            else
            {
                if (targetExists == null)
                {
                    message = "Unable to Find User";
                }
                else
                {
                    message = "Already following User";
                }
                return BadRequest(new Response { Status = "Failed", Message = message });
            }
        }

        [HttpPost]
        [Route("RemoveFollow/{username}")]
        public async Task<IActionResult> RemoveFollow(string username)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            ApplicationUser target = _db.Users.Where(p => p.UserName == username).FirstOrDefault();

            //Check if following target
            FollowersModel follow = _db.Followers.Where(p => p.UserId == user).Where(q => q.FollowingId == target).FirstOrDefault();

            if (follow != null)
            {
                try
                {
                    _db.Followers.Remove(follow);
                    _db.SaveChanges();

                    return Ok(new Response { Status = "Success", Message = "Follower Removed" });
                }
                catch (DbUpdateException)
                {
                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return Json(new { Status = "Failed", Message = "Unable to Update Database" });
                }
            }
            else
            {
                return BadRequest(new Response { Status = "Failed", Message = "Unable to Find User" });
            }

        }

        [HttpPost]
        [Route("SelfRemoveFollow/{username}")]
        public async Task<IActionResult> SelfRemoveFollow(string username)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            ApplicationUser target = _db.Users.Where(p => p.UserName == username).FirstOrDefault();

            //Check if target exists
            FollowersModel follow = _db.Followers.Where(p => p.FollowingId == user).Where(q => q.UserId == target).FirstOrDefault();

            if (follow != null)
            {
                try
                {
                    _db.Followers.Remove(follow);
                    _db.SaveChanges();

                    return Ok(new Response { Status = "Success", Message = "Follower Removed" });
                }
                catch (DbUpdateException)
                {
                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return Json(new { Status = "Failed", Message = "Unable to Update Database" });
                }
            }
            else
            {
                return Ok(new Response { Status = "Failed", Message = "Unable to Find User" });
            }
        }
    }
}