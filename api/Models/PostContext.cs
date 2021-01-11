using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanCodeLabb4.Models
{
    public class PostContext : DbContext
    {
        public PostContext(DbContextOptions<PostContext> options) : base(options) 
        {
            Database.EnsureCreated();
        }

        public DbSet<Post> Posts { get; set; }
    }
}
