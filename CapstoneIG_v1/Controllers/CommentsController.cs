﻿using CapstoneIG_v1.Auth;
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
        public async Task<IActionResult> AddComment([FromForm] CommentModel comment, int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

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

        [HttpGet]
        [Route("GetPostCommentsFull/{postId}")]
        public async Task<JsonResult> GetPostCommentsFull(int postId)
        {
            //List<CommentModel> comments = _db.Comments.Where(x => x.PostId == postId).ToList();
            var comments = await _db.Comments.Where(x => x.PostId == postId).Select(x => new
            {
                x.Id,
                x.CommentText,
                x.CommentDate,
                x.PostId,
                userId = x.CommentBy.Id
            }).ToListAsync();
            return Json(comments);
        }

        [HttpGet]
        [Route("GetPostComments/{postId}")]
        public async Task<JsonResult> GetPostComments(int postId)
        {
            //List<CommentModel> comments = await _db.Comments.Where(x => x.PostId == postId).ToListAsync();
            var comments = await _db.Comments.Where(x => x.PostId == postId).Select(x => new
            {
                x.Id,
                x.CommentText,
                x.CommentDate,
                x.PostId,
                userId = x.CommentBy.Id
            }).ToListAsync();

            List<CommentResponse> commentResponses = new List<CommentResponse>();

            foreach (var comment in comments)
            {
                ApplicationUser usr = _db.Users.Where(u => u.Id == comment.userId).FirstOrDefault();

                CommentResponse singleComment = new CommentResponse()
                {
                    Id = comment.Id,
                    UserId = comment.userId,
                    UserName = usr.UserName,
                    Text = comment.CommentText
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

            CommentModel comment = _db.Comments.Where(p => p.CommentBy == user).Where(q => q.Id == commentID).FirstOrDefault();

            if (comment != null)
            {
                _db.Comments.Remove(comment);
                await _db.SaveChangesAsync();
            }
            else
            {
                return Ok(new Response { Status = "Failed", Message = "You can't delete a post you don't own" });
            }

            return Ok(new Response { Status = "Success", Message = "Post Deleted" });
        }
    }
}
