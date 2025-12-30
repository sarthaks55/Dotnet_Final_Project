using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("diary_entries")]
    public class DiaryEntry
    {
        [Key]
        [Column("diary_id")]
        public long DiaryId { get; set; }

        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        [Required]
        [Column("encrypted_text")]
        public string EncryptedText { get; set; } = null!;

        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public User User { get; set; } = null!;
    }
}
