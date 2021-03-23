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
        [Route("createpost")]
        public async Task<IActionResult> CreatePost([FromForm] PostModel post)
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

        [HttpGet]
        [Route("getuserposts")]
        public async Task<JsonResult> GetUserPosts()
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            List<PostModel> posts = _db.Posts.Where(x => x.User.Id == user.Id).ToList();

            return Json(posts);
        }

    }
}
