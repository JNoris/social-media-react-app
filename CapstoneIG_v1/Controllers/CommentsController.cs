using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class CommentsController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommentsController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("AddComment/{postId}")]
        public async Task<IActionResult> AddComment([FromBody] CommentModel comment, int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user!=null)
            {
                CommentModel newComment = new CommentModel()
                {
                    CommentText = comment.CommentText,
                    CommentDate = DateTime.Now,
                    PostId = postId,
                    CommentBy = user
                };

                _db.Comments.Add(newComment);
                _db.SaveChanges();

                return Ok(new Response { Status = "Success", Message = "Comment Added" }); 
            }
            else
            {
                return BadRequest(new Response { Status = "Failed", Message = "Unable to find User" });
            }
        }

        [HttpGet]
        [Route("GetPostComments/{postId}")]
        public async Task<JsonResult> GetPostComments(int postId)
        {
            List<CommentResponse> commentResponses = new List<CommentResponse>();

            var comments = await _db.Comments.Where(x => x.PostId == postId).Select(x => new
            {
                Id = x.Id,
                ProfilePhotoPath = x.CommentBy.ProfileImageName,
                UserId = x.CommentBy.Id,
                UserName = x.CommentBy.UserName,
                FirstName = x.CommentBy.FirstName,
                LastName = x.CommentBy.LastName,
                Text = x.CommentText
            }).ToListAsync();

            foreach (var comment in comments)
            {
                ApplicationUser usr = _db.Users.Where(u => u.Id == comment.UserId).FirstOrDefault();

                CommentResponse singleComment = new CommentResponse()
                {
                    Id = comment.Id,
                    ProfilePhotoPath = comment.ProfilePhotoPath,
                    UserId = comment.UserId,
                    UserName = comment.UserName,
                    FirstName = comment.FirstName,
                    LastName = comment.LastName,
                    Text = comment.Text
                };
                commentResponses.Add(singleComment);
            }
            var orderByDate = commentResponses.OrderBy(p => p.Id);

            return Json(orderByDate);

        }


        [HttpPost]
        [Route("DeleteComment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentID)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user !=null)
            {
                CommentModel comment = _db.Comments.Where(p => p.CommentBy == user).Where(q => q.Id == commentID).FirstOrDefault();

                if (comment != null)
                {
                    _db.Comments.Remove(comment);
                    await _db.SaveChangesAsync();

                    return Ok(new Response { Status = "Success", Message = "Post Deleted" });
                }
                else
                {
                    return BadRequest(new Response { Status = "Failed", Message = "You can't delete a post you don't own" });
                }
            }
            else
            {
                return BadRequest(new Response { Status = "Failed", Message = "Unable to find User" });
            }
        }
    }
}