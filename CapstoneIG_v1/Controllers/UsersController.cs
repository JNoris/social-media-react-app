using CapstoneIG_v1.Auth;
using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Hosting;
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
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;

        public UsersController(ApplicationDbContext db, UserManager<ApplicationUser> userManager, IWebHostEnvironment environment)
        {
            _db = db;
            _userManager = userManager;
            _environment = environment;
        }

        [HttpGet]
        [Route("getcurrentuserdetails")]
        public async Task<JsonResult> GetCurrentUserDetails()
        {
            ApplicationUser user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);

            ApplicationUser usr = _db.Users.Where(u => u.Id == user.Id).FirstOrDefault();

            return Json(usr);
        }
    }
}
