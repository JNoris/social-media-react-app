﻿using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneIG_v1.Controllers
{
    [ApiController]
    public class PostsController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;

        public PostsController(ApplicationDbContext db, UserManager<ApplicationUser> userManager, IWebHostEnvironment environment)
        {
            _db = db;
            _userManager = userManager;
            _environment = environment;
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string src = "https://localhost:5001/images/posterror.png";

            if (imageFile != null)
            {
                string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
                var imagePath = Path.Combine(_environment.ContentRootPath, "Images", imageName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                src = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
            }

            return src;
        }

        [HttpPost]
        [Route("addpost")]
        public async Task<IActionResult> AddPost([FromForm] PostModel post)
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                var imgStoreName = await SaveImage(post.ImgFile);

                PostModel newPost = new PostModel()
                {
                    ImageName = imgStoreName,
                    UploadDate = DateTime.Now,
                    Caption = post.Caption,
                    User = user
                };

                _db.Posts.Add(newPost);
                _db.SaveChanges();

                res = Ok(new Response { Status = "Success", Message = "Post Created" });
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpPost]
        [Route("deletepost/{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                PostModel pst = _db.Posts.Where(p => p.User == user && p.Id == postId).FirstOrDefault();

                if (pst != null)
                {
                    _db.Posts.Remove(pst);
                    _db.SaveChanges();
                    res = Ok(new Response { Status = "Success", Message = "Post Deleted" });
                }
                else
                {
                    Response.StatusCode = StatusCodes.Status400BadRequest;
                    res = Json(new { Status = "Failed", Message = "Can't delete a post you don't own" });
                }
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpPut]
        [Route("editpost/{postId}")]
        public async Task<IActionResult> EditPost([FromBody] PostModel post, int postId)
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                PostModel pst = _db.Posts.Where(p => p.User == user && p.Id == postId).FirstOrDefault();

                if (pst != null)
                {
                    pst.Caption = post.Caption;
                    _db.SaveChanges();
                    res = Ok(new Response { Status = "Success", Message = "Post Updated" });
                }
                else
                {
                    Response.StatusCode = StatusCodes.Status400BadRequest;
                    res = Json(new { Status = "Failed", Message = "Can't edit a post you don't own" });
                }
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpGet]
        [Route("getcurrentuserposts")]
        public async Task<JsonResult> GetCurrentUserPosts()
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                List<PostModel> usrPosts = _db.Posts.Where(p => p.User == user).ToList();
                List<PostResponse> pResponse = new List<PostResponse>();

                foreach (var p in usrPosts)
                {
                    int totalLikes = _db.Likes.Where(l => l.PostId == p.Id).Count();
                    int totalComments = _db.Comments.Where(l => l.PostId == p.Id).Count();
                    bool checkLike = _db.Likes.Any(c => c.PostId == p.Id && c.LikeBy == user);

                    PostResponse newPResponse = new PostResponse()
                    {
                        Id = p.Id,
                        PhotoPath = p.ImageName,
                        UploadDate = p.UploadDate,
                        ProfilePhotoPath = user.ProfileImageName,
                        UserName = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        NumberOfLikes = totalLikes,
                        NumberOfComments = totalComments,
                        IsLiked = checkLike
                    };

                    pResponse.Add(newPResponse);
                }

                var orderByDate = pResponse.OrderByDescending(p => p.UploadDate);

                res = Json(orderByDate);
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpGet]
        [Route("getuserposts/{username}")]
        public async Task<JsonResult> GetUserPostsAsync(string username)
        {
            dynamic res;

            ApplicationUser curUser = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            ApplicationUser user = _db.Users.Where(u => u.UserName == username).FirstOrDefault();

            if (user != null)
            {
                List<PostModel> usrPosts = _db.Posts.Where(p => p.User == user).ToList();
                List<PostResponse> pResponse = new List<PostResponse>();

                foreach (var p in usrPosts)
                {
                    int totalLikes = _db.Likes.Where(l => l.PostId == p.Id).Count();
                    int totalComments = _db.Comments.Where(l => l.PostId == p.Id).Count();
                    bool checkLike = _db.Likes.Any(c => c.PostId == p.Id && c.LikeBy == curUser);

                    PostResponse newPResponse = new PostResponse()
                    {
                        Id = p.Id,
                        PhotoPath = p.ImageName,
                        UploadDate = p.UploadDate,
                        ProfilePhotoPath = user.ProfileImageName,
                        UserName = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        NumberOfLikes = totalLikes,
                        NumberOfComments = totalComments,
                        IsLiked = checkLike
                    };

                    pResponse.Add(newPResponse);
                }

                var orderByDate = pResponse.OrderByDescending(p => p.UploadDate);

                res = Json(orderByDate);
            }
            else
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res = Json(new { Status = "Failed", Message = "No user found" });
            }

            return res;
        }

        [HttpGet]
        [Route("gethomepageposts")]
        public async Task<JsonResult> GetHomePagePosts()
        {
            dynamic res;

            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            if (user != null)
            {
                List<string> followedUsers = _db.Followers.Where(f => f.UserId == user).Select(x => x.FollowingId.Id).ToList();

                List<PostResponse> pResponse = new List<PostResponse>();

                foreach (string key in followedUsers)
                {
                    ApplicationUser usr = _db.Users.Where(u => u.Id == key).FirstOrDefault();
                    PostModel usrPost = _db.Posts.Where(p => p.User.Id == key).FirstOrDefault();
                    int totalLikes = _db.Likes.Where(l => l.PostId == usrPost.Id).Count();
                    int totalComments = _db.Comments.Where(l => l.PostId == usrPost.Id).Count();
                    bool checkLike = _db.Likes.Any(c => c.PostId == usrPost.Id && c.LikeBy == user);

                    PostResponse newPResponse = new PostResponse()
                    {
                        Id = usrPost.Id,
                        PhotoPath = usrPost.ImageName,
                        UploadDate = usrPost.UploadDate,
                        ProfilePhotoPath = usr.ProfileImageName,
                        UserName = usr.UserName,
                        FirstName = usr.FirstName,
                        LastName = usr.LastName,
                        NumberOfLikes = totalLikes,
                        NumberOfComments = totalComments,
                        IsLiked = checkLike
                    };

                    pResponse.Add(newPResponse);
                }

                var orderByDate = pResponse.OrderByDescending(p => p.UploadDate);

                res = Json(orderByDate);
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
