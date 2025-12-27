using FinalProject.Models;

namespace FinalProject.DTO
{
    public class AppointmentResponseDto
    {
        public long AppointmentId { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public TimeOnly AppointmentTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public string? JitsiRoomId { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
