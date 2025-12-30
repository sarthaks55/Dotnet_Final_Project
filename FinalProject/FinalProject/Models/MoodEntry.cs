using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("mood_entries")]
    public class MoodEntry
    {
        [Key]
        [Column("mood_id")]
        public long MoodId { get; set; }

        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        // Scale: 1 (Very Bad) → 5 (Very Good)
        [Required]
        [Column("mood_value")]
        [Range(1, 5)]
        public int MoodValue { get; set; }

        [Column("notes")]
        public string? Notes { get; set; }

        [Required]
        [Column("created_date")]
        public DateOnly CreatedDate { get; set; }

        // Navigation
        public User User { get; set; } = null!;
    }
}
