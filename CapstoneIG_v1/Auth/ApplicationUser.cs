using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CapstoneIG_v1.Auth
{
    public class ApplicationUser : IdentityUser
    {
        [DataType(DataType.Text)]
        public string Bio { get; set; }
    }
}
