using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("video_sessions")]
    public class VideoSession
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        // FK → Appointment.Id (long)
        [Required]
        [Column("appointment_id")]
        public long AppointmentId { get; set; }

        [Required]
        [MaxLength(120)]
        [Column("room_token")]
        public string RoomToken { get; set; } = string.Empty;

        [Required]
        [Column("allowed_from")]
        public DateTime AllowedFrom { get; set; }

        [Required]
        [Column("allowed_until")]
        public DateTime AllowedUntil { get; set; }

        [Column("patient_joined")]
        public bool PatientJoined { get; set; }

        [Column("professional_joined")]
        public bool ProfessionalJoined { get; set; }

        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public Appointment Appointment { get; set; } = null!;
    }
}
