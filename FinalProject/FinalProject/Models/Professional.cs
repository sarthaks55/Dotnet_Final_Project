using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("professionals")]
    public class Professional
    {
        [Key]
        [Column("professional_id")]
        public long ProfessionalId { get; set; }

        [Required]
        [Column("specialization")]
        public ProfessionalSpecialization Specialization { get; set; }

        [Column("experience_years")]
        public int? ExperienceYears { get; set; }

        [MaxLength(150)]
        [Column("qualification")]
        public string? Qualification { get; set; }

        [Column("bio")]
        public string? Bio { get; set; }

        [Column("consultation_fee")]
        public decimal? ConsultationFee { get; set; }

        [Column("is_verified")]
        public bool IsVerified { get; set; } = false;

        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public User User { get; set; } = null!;
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
