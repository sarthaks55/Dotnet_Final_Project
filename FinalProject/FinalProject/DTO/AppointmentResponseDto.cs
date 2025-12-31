using FinalProject.Models;

namespace FinalProject.DTO
{
    public class AppointmentResponseDto
    {
        public long Id { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public AppointmentStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        // Optional display fields
        public string? UserName { get; set; }
        public string? ProfessionalName { get; set; }
    }
}
