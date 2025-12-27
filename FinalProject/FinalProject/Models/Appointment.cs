using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("appointments")]
    public class Appointment
    {
        [Key]
        [Column("appointment_id")]
        public long AppointmentId { get; set; }

        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        [Required]
        [Column("professional_id")]
        public long ProfessionalId { get; set; }

        [Required]
        [Column("appointment_date")]
        public DateOnly AppointmentDate { get; set; }

        [Required]
        [Column("appointment_time")]
        public TimeOnly AppointmentTime { get; set; }

        [Column("status")]
        public AppointmentStatus Status { get; set; } = AppointmentStatus.PENDING;

        [Column("jitsi_room_id")]
        [MaxLength(255)]
        public string? JitsiRoomId { get; set; }

        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        // Navigation
        public User User { get; set; } = null!;
        public Professional Professional { get; set; } = null!;
    }

}
