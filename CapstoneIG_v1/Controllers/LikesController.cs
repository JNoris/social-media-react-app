using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneIG_v1.Controllers
{
    [ApiController]
    public class LikesController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public LikesController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("GetLikes/{postId}")]
        public async Task<JsonResult> GetLikes(int postId)
        {
            var likers = await _db.Likes.Where(x => x.PostId == postId).Select(x => new
            {
                x.Id,
                x.LikeDate,
                x.PostId,
                x.LikeBy
            }).ToListAsync();

            List<LikeReponse> likeReponses = new List<LikeReponse>();

            foreach (var person in likers)
            {
                ApplicationUser usr = _db.Users.Where(u => u.Id == person.LikeBy.Id).FirstOrDefault();

                LikeReponse singleLike = new LikeReponse()
                {
                    Id = person.Id,
                    UserId = person.LikeBy.Id,
                    UserName = person.LikeBy.UserName
                };
                likeReponses.Add(singleLike);
            }
            var orderByName = likeReponses.OrderBy(p => p.UserName);

            return Json(orderByName);
        }

        [HttpPost]
        [Route("AddLike/{postId}")]
        public async Task<IActionResult> AddLike(int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            //Check if post exists
            PostModel targetExists = _db.Posts.Where(p => p.Id == postId).FirstOrDefault();

            //Check if already liked
            LikeModel likeExists = _db.Likes.Where(p => p.PostId == postId).Where(q => q.LikeBy == user).FirstOrDefault();

            if (targetExists != null && likeExists == null)
            {
                LikeModel newLike = new LikeModel()
                {
                    LikeDate = DateTime.Now,
                    PostId = postId,
                    LikeBy = user
                };

                _db.Likes.Add(newLike);
                _db.SaveChanges();
            }
            else
            {
                if (targetExists == null)
                {
                    return Ok(new Response { Status = "Failed", Message = "Unable to find Post" });
                }
                else
                {
                    return Ok(new Response { Status = "Failed", Message = "Already Liked" });
                }
            }

            return Ok(new Response { Status = "Success", Message = "Liked" });
        }

        [HttpPost]
        [Route("RemoveLike/{postId}")]
        public async Task<IActionResult> RemoveLike(int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            //Check if target exists
            LikeModel like = _db.Likes.Where(p => p.LikeBy == user).Where(q => q.PostId == postId).FirstOrDefault();

            if (like != null)
            {
                _db.Likes.Remove(like);
                _db.SaveChanges();
            }
            else
            {
                return Ok(new Response { Status = "Failed", Message = "Unable to Find Like" });
            }

            return Ok(new Response { Status = "Success", Message = "Unliked" });
        }
    }
}
