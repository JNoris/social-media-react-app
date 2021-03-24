using CapstoneIG_v1.Auth;
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
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_environment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            string src = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);

            return src;
        }

        [HttpPost]
        [Route("addpost")]
        public async Task<IActionResult> AddPost([FromForm] PostModel post)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

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

            return Ok(new Response { Status = "Success", Message = "Post Created" });
        }

        [HttpPost]
        [Route("deletepost/{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            PostModel pst = _db.Posts.Where(p => p.User == user).Where(q => q.Id == postId).FirstOrDefault();

            if(pst != null)
            {
                _db.Posts.Remove(pst);
                _db.SaveChanges();
            }
            else
            {
                return Ok(new Response { Status = "Failed", Message = "You can't delete a post you don't own" });
            }
            
            return Ok(new Response { Status = "Success", Message = "Post Deleted" });
        }

        [HttpPut]
        [Route("editpost/{postId}")]
        public async Task<IActionResult> EditPost([FromBody] PostModel post, int postId)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            PostModel pst = _db.Posts.Where(p => p.User == user).Where(q => q.Id == postId).FirstOrDefault();

            if (pst != null)
            {
                pst.Caption = post.Caption;
                _db.SaveChanges();
            }
            else
            {
                return Ok(new Response { Status = "Failed", Message = "You can't edit a post you don't own" });
            }

            return Ok(new Response { Status = "Success", Message = "Post Updated" });
        }

        [HttpGet]
        [Route("getcurrentuserposts")]
        public async Task<JsonResult> GetCurrentUserPosts()
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            List<PostModel> usrPosts = _db.Posts.Where(p => p.User == user).ToList();
            List<PostResponse> pResponse = new List<PostResponse>();

            foreach(var p in usrPosts)
            {
                int totalLikes = _db.Likes.Where(l => l.PostId == p.Id).Count();
                int totalComments = _db.Comments.Where(l => l.PostId == p.Id).Count();

                PostResponse newPResponse = new PostResponse()
                {
                    Id = p.Id,
                    PhotoPath = p.ImageName,
                    UploadDate = p.UploadDate,
                    ProfilePhotoPath = user.ProfileImageName,
                    UserName = user.UserName,
                    NumberOfLikes = totalLikes,
                    NumberOfComments = totalComments
                };

                pResponse.Add(newPResponse);
            }

            var orderByDate = pResponse.OrderByDescending(p => p.UploadDate);

            return Json(orderByDate);
        }

        [HttpGet]
        [Route("getuserposts/{userId}")]
        public JsonResult GetUserPosts(string userId)
        {
            ApplicationUser user = _db.Users.Where(u => u.Id == userId).FirstOrDefault();
            List<PostModel> usrPosts = _db.Posts.Where(p => p.User == user).ToList();
            List<PostResponse> pResponse = new List<PostResponse>();

            foreach (var p in usrPosts)
            {
                int totalLikes = _db.Likes.Where(l => l.PostId == p.Id).Count();
                int totalComments = _db.Comments.Where(l => l.PostId == p.Id).Count();

                PostResponse newPResponse = new PostResponse()
                {
                    Id = p.Id,
                    PhotoPath = p.ImageName,
                    UploadDate = p.UploadDate,
                    ProfilePhotoPath = user.ProfileImageName,
                    UserName = user.UserName,
                    NumberOfLikes = totalLikes,
                    NumberOfComments = totalComments
                };

                pResponse.Add(newPResponse);
            }

            var orderByDate = pResponse.OrderByDescending(p => p.UploadDate);

            return Json(orderByDate);
        }

        [HttpGet]
        [Route("gethomepageposts")]
        public async Task<JsonResult> GetHomePagePosts()
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            List<string> followedUsers = _db.Followers.Where(f => f.UserId == user).Select(x => x.FollowingId.Id).ToList();

            List<PostResponse> pResponse = new List<PostResponse>();

            foreach (string key in followedUsers)
            {
                ApplicationUser usr = _db.Users.Where(u => u.Id == key).FirstOrDefault();
                PostModel usrPost = _db.Posts.Where(p => p.User.Id == key).FirstOrDefault();
                int totalLikes = _db.Likes.Where(l => l.PostId == usrPost.Id).Count();
                int totalComments = _db.Comments.Where(l => l.PostId == usrPost.Id).Count();

                PostResponse newPResponse = new PostResponse()
                {
                    Id = usrPost.Id,
                    PhotoPath = usrPost.ImageName,
                    UploadDate = usrPost.UploadDate,
                    ProfilePhotoPath = usr.ProfileImageName,
                    UserName = usr.UserName,
                    NumberOfLikes = totalLikes,
                    NumberOfComments = totalComments
                };

                pResponse.Add(newPResponse);
            }

            var orderByDate = pResponse.OrderByDescending(p => p.UploadDate);

            return Json(orderByDate);
        }
    }
}
