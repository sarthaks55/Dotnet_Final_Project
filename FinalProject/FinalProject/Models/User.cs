using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public long UserId { get; set; }

        [Required]
        [Column("role_id")]
        public int RoleId { get; set; }

        public Role Role { get; set; } = null!;

        [Required]
        [Column("full_name")]
        [MaxLength(100)]
        public string FullName { get; set; } = null!;

        [Required]
        [Column("email")]
        [MaxLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        [Column("password_hash")]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = null!;

        [Column("phone")]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }


        // One-to-one
        public Professional? Professional { get; set; }

        // One-to-many
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();


    }

}



