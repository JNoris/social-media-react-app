using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CapstoneIG_v1.Controllers
{
    [ApiController]
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
        [Route("newcomment/{postId}")]
        public async Task<IActionResult> PostComment([FromBody] CommentModel comment, int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            var userId = user.Id;

            CommentModel newComment = new CommentModel()
            {
                CommentText = comment.CommentText,
                CommentDate = DateTime.Now,
                PostId = postId,
                CommentBy = userId
            };

            _db.Comments.Add(newComment);
            _db.SaveChanges();

            return Ok(new Response { Status = "Success", Message = "Comment Added" });
        }
    }
}
