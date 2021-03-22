using CapstoneIG_v1.Auth;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapstoneIG_v1.Models
{
    public class PostModel
    {
        [Key]
        public int Id { get; set; }

        //[DataType(DataType.Upload)]
        [DataType(DataType.Text)]
        public string ImgPath { get; set; }

        [NotMapped]
        public IFormFile ImgFile { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime UploadDate { get; set; }

        [StringLength(26, MinimumLength = 2)]
        [DataType(DataType.Text)]
        public string Caption { get; set; }

        [StringLength(450)]
        [DataType(DataType.Text)]
        public virtual ApplicationUser UserId { get; set; }


    }
}
