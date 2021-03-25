using System.ComponentModel.DataAnnotations;

namespace CapstoneIG_v1.Auth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "User Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
