using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace FinalProject.Models
{
    [Table("roles")]
    public class Role
    {
        [Key]
        [Column("role_id")]
        public int RoleId { get; set; }

        [Required]
        [Column("role_name")]
        [MaxLength(50)]
        public string RoleName { get; set; } = null!;

        // Navigation
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}

