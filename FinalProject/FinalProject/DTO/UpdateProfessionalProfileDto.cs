using FinalProject.Models;

namespace FinalProject.DTO
{
    public class UpdateProfessionalProfileDto
    {
        // USER
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        // PROFESSIONAL
        public ProfessionalSpecialization? Specialization { get; set; }
        public Gender? Gender { get; set; }
        public int? ExperienceYears { get; set; }
        public string? Qualification { get; set; }
        public string? Bio { get; set; }
        public decimal? ConsultationFee { get; set; }

        // LANGUAGES
        public List<int>? LanguageIds { get; set; }
    }
}
