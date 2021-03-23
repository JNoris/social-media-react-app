using CapstoneIG_v1.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CapstoneIG_v1.Models
{
    public class FollowersModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        [JsonIgnore]
        public virtual ApplicationUser FollowingId { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        [JsonIgnore]
        public virtual ApplicationUser UserId { get; set; }
    }
}
