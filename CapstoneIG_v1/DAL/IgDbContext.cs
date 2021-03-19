using Microsoft.EntityFrameworkCore;

namespace CapstoneIG_v1.DAL
{
    public class IgDbContext : DbContext
    {
        public IgDbContext(DbContextOptions<IgDbContext> options) : base(options) { }
    }
}
