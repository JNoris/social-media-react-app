using CapstoneIG_v1.Auth;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapstoneIG_v1.Models
{
    public class CommentModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(26, MinimumLength = 2)]
        [DataType(DataType.Text)]
        public string CommentText { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CommentDate { get; set; }

        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public virtual PostModel Post { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        public virtual ApplicationUser CommentBy { get; set; }
    }
}
