using CapstoneIG_v1.Auth;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CapstoneIG_v1.Models
{
    public class PostModel
    {
        [Key]
        public int Id { get; set; }

        [DataType(DataType.Text)]
        public string ImageName { get; set; }

        [JsonIgnore]
        [NotMapped]
        public IFormFile ImgFile { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime UploadDate { get; set; }

        [DataType(DataType.Text)]
        public string Caption { get; set; }

        [JsonIgnore]
        [StringLength(450)]
        [DataType(DataType.Text)]
        public virtual ApplicationUser User { get; set; }
    }
}
