using CapstoneIG_v1.Auth;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapstoneIG_v1.Models
{
    public class LikeModel
    {
        [Key]
        public int Id { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LikeDate { get; set; }

        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public virtual PostModel Post { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        public virtual ApplicationUser LikeBy { get; set; }
    }
}
