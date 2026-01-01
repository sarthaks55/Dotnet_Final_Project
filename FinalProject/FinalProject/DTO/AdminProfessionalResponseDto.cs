using FinalProject.Models;

namespace FinalProject.DTO
{
    public class AdminProfessionalResponseDto
    {
        public long UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }

        public ProfessionalSpecialization Specialization { get; set; }
        public Gender? Gender { get; set; }
        public int? ExperienceYears { get; set; }
        public decimal? ConsultationFee { get; set; }

        public bool IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
