using CapstoneIG_v1.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CapstoneIG_v1.Auth
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>().ToTable("ApplicationUser");
        }

        public DbSet<CommentModel> Comments { get; set; }
        public DbSet<FollowersModel> Followers { get; set; }
        public DbSet<LikeModel> Likes { get; set; }
        public DbSet<PostModel> Posts { get; set; }
    }
}
