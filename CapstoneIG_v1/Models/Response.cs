﻿using System;

namespace CapstoneIG_v1.Models
{
    public class Response
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }

    public class PostResponse
    {
        public int Id { get; set; }
        public string PhotoPath { get; set; }
        public DateTime UploadDate { get; set; }
        public string ProfilePhotoPath { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int NumberOfLikes { get; set; }
        public int NumberOfComments { get; set; }
    }

    public class UserResponse
    {
        public string ProfilePhotoPath { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int NumberOfPosts { get; set; }
        public int NumberOfFollowers { get; set; }
        public int NumberOfFollowing { get; set; }
    }
}
