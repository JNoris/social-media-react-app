using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapstoneIG_v1.Auth
{
    public class ApplicationUser : IdentityUser
    {
        [DataType(DataType.Text)]
        public string Bio { get; set; }

        [DataType(DataType.Text)]
        public string ProfileImageName { get; set; }

        [JsonIgnore]
        [NotMapped]
        public IFormFile ImgFile { get; set; }
    }
}
