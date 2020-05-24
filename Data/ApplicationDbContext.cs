using Device_Store.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Device_Store.Data
{
    public class ApplicationDbContext: IdentityDbContext<UserModel>
    {
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        //Creating Roles
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = "2", Name = "Customer", NormalizedName = "CUSTOMER" },
                new { Id = "3", Name = "Moderator", NormalizedName = "MODERATOR" }
                );

            builder.Entity<OrderProductModel>()
           .HasKey(t => new { t.OrderId, t.ProductId});


            builder.Entity<OrderProductModel>()
                .HasOne(sc => sc.Product)
                .WithMany(s => s.OrderProducts)
                .HasForeignKey(sc => sc.ProductId);

            builder.Entity<OrderProductModel>()
                .HasOne(sc => sc.Order)
                .WithMany(c => c.OrderProducts)
                .HasForeignKey(sc => sc.OrderId);

            builder.Entity<OrderModel>()
                .HasOne(u => u.User)
                .WithMany(p => p.Orders)
                .HasForeignKey(k => k.UserId);
        }

    }
}
