using Microsoft.AspNetCore.Identity;
using System;

namespace CapstoneIG_v1.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public static implicit operator ApplicationUser(string v)
        {
            throw new NotImplementedException();
        }
    }
}
