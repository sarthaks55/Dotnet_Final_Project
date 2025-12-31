using FinalProject.Models;

namespace FinalProject.DTO
{
    public class RegisterProfessionalDto
    {
        // USER TABLE
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Phone { get; set; }

        // PROFESSIONAL TABLE
        public ProfessionalSpecialization Specialization { get; set; }
        public Gender Gender { get; set; }
        public int? ExperienceYears { get; set; }
        public string? Qualification { get; set; }
        public string? Bio { get; set; }
        public decimal? ConsultationFee { get; set; }

        // LANGUAGES (IDs)
        public List<int> LanguageIds { get; set; } = new();
    }
}
