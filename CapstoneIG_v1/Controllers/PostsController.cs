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

        public class FileUpload
        {
            public IFormFile Files { get; set; }
        }

        [NonAction]
        public async Task<string> SaveImage(FileUpload imgfile)
        {
            if (!Directory.Exists(_environment.WebRootPath + "\\PostImages\\"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "\\PostImages\\");
            }

            string imgPath = _environment.WebRootPath + "\\PostImages\\" + imgfile.Files.FileName;

            using (FileStream fileStream = System.IO.File.Create(imgPath))
            {
                await imgfile.Files.CopyToAsync(fileStream);
                fileStream.Flush();
            }

            return imgPath;
        }

        [HttpPost]
        [Route("createpost")]
        public async Task<IActionResult> CreatePost([FromBody] PostModel post, [FromForm] FileUpload model)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            var userId = user.Id;

            var getImg = await SaveImage(model);

            PostModel newPost = new PostModel()
            {
                ImgPath = getImg,
                UploadDate = DateTime.Now,
                Caption = post.Caption,
                UserId = userId
            };

            _db.Posts.Add(newPost);
            _db.SaveChanges();

            return Ok(new Response { Status = "Success", Message = "Post Created" });
        }
    }
}
