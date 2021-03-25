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
        [Route("GetFollowers/{userId}")]
        public async Task<JsonResult> GetFollowers(string userId)
        {
            var followers = await _db.Followers.Where(x => x.UserId.Id == userId).Select(x => new
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
        //People who are following you
        [HttpGet]
        [Route("GetFollowedBy/{userId}")]
        public async Task<JsonResult> GetFollowedBy(string userId)
        {
            var followers = await _db.Followers.Where(x => x.FollowingId.Id == userId).Select(x => new
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

        [HttpPost]
        [Route("AddNewFollow/{targetId}")]
        public async Task<IActionResult> AddNewFollow(string targetId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            //Check if targetId exists
            ApplicationUser targetExists = _db.Users.Where(p => p.Id == targetId).FirstOrDefault();

            //Check if targetID is already a follower
            FollowersModel followExists = _db.Followers.Where(p => p.UserId == user).Where(q => q.FollowingId == targetExists).FirstOrDefault();

            if (targetExists != null && followExists == null)
            {
                FollowersModel newFollower = new FollowersModel()
                {
                    UserId = user,
                    FollowingId = targetExists,
                };

                _db.Followers.Add(newFollower);
                _db.SaveChanges();
            }
            else
            {
                if (targetExists == null)
                {
                    return Ok(new Response { Status = "Failed", Message = "Unable to Find User" });
                }
                else
                {
                    return Ok(new Response { Status = "Failed", Message = "Unable to Add User" });
                }
            }

            return Ok(new Response { Status = "Success", Message = "Follower Added" });
        }

        [HttpPost]
        [Route("RemoveFollow/{targetId}")]
        public async Task<IActionResult> RemoveFollow(string targetId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            ApplicationUser target = _db.Users.Where(p => p.Id == targetId).FirstOrDefault();

            //Check if target exists
            FollowersModel follow = _db.Followers.Where(p => p.UserId == user).Where(q => q.FollowingId == target).FirstOrDefault();

            if (follow != null)
            {
                _db.Followers.Remove(follow);
                _db.SaveChanges();
            }
            else
            {
                return Ok(new Response { Status = "Failed", Message = "Unable to Find User" });
            }

            return Ok(new Response { Status = "Success", Message = "Follower Removed" });
        }
    }
}