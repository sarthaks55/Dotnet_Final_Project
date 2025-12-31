using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("appointments")]
    public class Appointment
    {
        [Key]
        [Column("appointment_id")]
        public long Id { get; set; }

        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        [Required]
        [Column("professional_id")]
        public long ProfessionalId { get; set; }

        
        // When the session is scheduled
        [Required]
        [Column("start_time")]
        public DateTime StartTime { get; set; }

        // Optional — can be null if session length varies
        [Column("end_time")]    
        public DateTime? EndTime { get; set; }

        // Cancellation reason (optional)
        [MaxLength(250)]
        [Column("cancellation_reason")]
        public string? CancellationReason { get; set; }

        // Video timestamps (optional logs)

        [Column("call_startAt")]
        public DateTime? CallStartedAt { get; set; }

        [Column("call_endedAt")]
        public DateTime? CallEndedAt { get; set; }

        [Column("status")]
        public AppointmentStatus Status { get; set; } = AppointmentStatus.PENDING;


        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // 🔹 Navigation
        public User User { get; set; } = null!;
        public Professional Professional { get; set; } = null!;
        public VideoSession? VideoSession { get; set; }
    }
}
