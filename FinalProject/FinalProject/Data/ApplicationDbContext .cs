using FinalProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Role> Roles => Set<Role>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Professional> Professionals => Set<Professional>();
        public DbSet<Appointment> Appointments => Set<Appointment>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Roles
            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(r => r.RoleId);
                entity.HasIndex(r => r.RoleName)
                      .IsUnique();
                entity.Property(r => r.RoleName)
                      .HasMaxLength(50)
                      .IsRequired();
            });

            // Users
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.UserId);
                entity.HasIndex(u => u.Email)
                      .IsUnique();
                entity.Property(u => u.FullName)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(u => u.Email)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(u => u.PasswordHash)
                      .HasMaxLength(255)
                      .IsRequired();

                entity.Property(u => u.Phone)
                      .HasMaxLength(20);

                entity.Property(u => u.IsActive)
                      .HasDefaultValue(true);

                entity.Property(u => u.CreatedAt)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(u => u.Role)
                      .WithMany(r => r.Users)
                      .HasForeignKey(u => u.RoleId)
                      .OnDelete(DeleteBehavior.Restrict);
            });


            // Professional
            modelBuilder.Entity<Professional>(entity =>
            {
                entity.HasKey(p => p.ProfessionalId);

                entity.Property(p => p.Specialization)
                      .HasConversion<string>();

                entity.Property(p => p.ConsultationFee)
                      .HasPrecision(10, 2);

                entity.HasOne(p => p.User)
                      .WithOne(u => u.Professional)
                      .HasForeignKey<Professional>(p => p.ProfessionalId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Appointment
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(a => a.AppointmentId);

                entity.Property(a => a.Status)
                      .HasConversion<string>()
                      .HasDefaultValue(AppointmentStatus.PENDING);

                entity.Property(a => a.CreatedAt)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(a => a.User)
                      .WithMany(u => u.Appointments)
                      .HasForeignKey(a => a.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Professional)
                      .WithMany(p => p.Appointments)
                      .HasForeignKey(a => a.ProfessionalId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

        }
    }
}
