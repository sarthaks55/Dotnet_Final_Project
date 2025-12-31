using FinalProject.Data.Converters;
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
        public DbSet<VideoSession> VideoSessions => Set<VideoSession>();
        public DbSet<MoodEntry> MoodEntries => Set<MoodEntry>();
        public DbSet<DiaryEntry> DiaryEntries => Set<DiaryEntry>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==========================
            // Role
            // ==========================
            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(r => r.RoleId);

                entity.HasIndex(r => r.RoleName)
                      .IsUnique();

                entity.Property(r => r.RoleName)
                      .HasMaxLength(50)
                      .IsRequired();
            });

            // ==========================
            // User
            // ==========================
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

                // User ↔ Professional (1–1)
                entity.HasOne(u => u.Professional)
                      .WithOne(p => p.User)
                      .HasForeignKey<Professional>(p => p.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ==========================
            // Professional
            // ==========================
            modelBuilder.Entity<Professional>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Specialization)
                      .HasConversion<string>()
                      .IsRequired();

                entity.Property(p => p.ConsultationFee)
                      .HasPrecision(10, 2);

                entity.Property(p => p.IsVerified)
                      .HasDefaultValue(false);

                entity.Property(p => p.CreatedAt)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // ==========================
            // Appointment
            // ==========================
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Status)
                      .HasConversion<string>()
                      .HasDefaultValue(AppointmentStatus.BOOKED);

                entity.Property(a => a.CreatedAt)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(a => a.StartTime)
                      .IsRequired();

                entity.Property(a => a.EndTime)
                      .IsRequired(false);

                entity.HasOne(a => a.User)
                      .WithMany(u => u.Appointments)
                      .HasForeignKey(a => a.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Professional)
                      .WithMany(p => p.Appointments)
                      .HasForeignKey(a => a.ProfessionalId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Prevent same-time double booking
                entity.HasIndex(a => new
                {
                    a.ProfessionalId,
                    a.StartTime
                }).IsUnique();
            });

            // ==========================
            // VideoSession
            // ==========================
            modelBuilder.Entity<VideoSession>(entity =>
            {
                entity.HasKey(v => v.Id);

                entity.Property(v => v.CreatedAt)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(v => v.Appointment)
                      .WithOne(a => a.VideoSession)
                      .HasForeignKey<VideoSession>(v => v.AppointmentId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(v => v.AppointmentId)
                      .IsUnique();
            });

            // ==========================
            // MoodEntry
            // ==========================
            modelBuilder.Entity<MoodEntry>(entity =>
            {
                entity.HasKey(m => m.MoodId);

                entity.Property(m => m.MoodValue)
                      .IsRequired();

                entity.Property(m => m.CreatedDate)
                      .HasConversion(new DateOnlyConverter())
                      .IsRequired();

                entity.HasOne(m => m.User)
                      .WithMany()
                      .HasForeignKey(m => m.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(m => new { m.UserId, m.CreatedDate })
                      .IsUnique();
            });

            // ==========================
            // DiaryEntry
            // ==========================
            modelBuilder.Entity<DiaryEntry>(entity =>
            {
                entity.HasKey(d => d.DiaryId);

                entity.Property(d => d.EncryptedText)
                      .IsRequired();

                entity.Property(d => d.CreatedAt)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.User)
                      .WithMany()
                      .HasForeignKey(d => d.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
