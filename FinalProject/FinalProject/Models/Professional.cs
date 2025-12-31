using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("professionals")]
    public class Professional
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        // ✅ REQUIRED FK
        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        [Required]
        [Column("specialization")]
        public ProfessionalSpecialization Specialization { get; set; }

        [Column("gender")]
        public Gender? Gender { get; set; }

        [Column("experience_years")]
        public int? ExperienceYears { get; set; }

        [Column("qualification")]
        [MaxLength(150)]
        public string? Qualification { get; set; }

        [Column("bio")]
        public string? Bio { get; set; }

        [Column("consultation_fee")]
        public decimal? ConsultationFee { get; set; }

        [Column("is_verified")]
        public bool IsVerified { get; set; } = false;

        // Navigation
        public User User { get; set; } = null!;
        public ICollection<Appointment> Appointments { get; set; }
            = new List<Appointment>();

        // NEW
        public ICollection<ProfessionalLanguage> ProfessionalLanguages { get; set; }
            = new List<ProfessionalLanguage>();
    }
}
