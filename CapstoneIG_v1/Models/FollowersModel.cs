using CapstoneIG_v1.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapstoneIG_v1.Models
{
    public class FollowersModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        public virtual ApplicationUser FollowingId { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        public virtual ApplicationUser UserId { get; set; }
    }
}
