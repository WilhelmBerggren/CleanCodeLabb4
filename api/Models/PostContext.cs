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

            if(Posts.Count() == 0)
            {
                Posts.AddRange(
                    new Post() 
                    {
                        Id = 1,
                        Title = "Davids nya kärra",
                        Url = "https://st.mascus.com/imagetilewm/product/5a5a5da2/other-karra-10,0734675c.jpg"
                    },
                    new Post()
                    {
                        Id = 2,
                        Title = "Willes otroliga bantningstips",
                        Url = "https://i.imgur.com/QeWNgWT.jpg"
                    },
                    new Post()
                    {
                        Id = 3,
                        Title = "Gratis pengar: Se knepet bankerna inte vill att du ska veta om!",
                        Url = "https://www.forsakringskassan.se/"
                    }
                );
                SaveChanges();
            }
        }

        public DbSet<Post> Posts { get; set; }
    }
}
