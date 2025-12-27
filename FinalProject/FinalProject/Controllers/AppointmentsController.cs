using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ============================
        // USER: Book appointment
        // ============================
        [HttpPost("book/{userId}")]
        public async Task<IActionResult> BookAppointment(
            long userId,
            [FromBody] CreateAppointmentDto dto)
        {
            // Check professional exists
            var professionalExists = await _context.Professionals
                .AnyAsync(p => p.ProfessionalId == dto.ProfessionalId && p.IsVerified);

            if (!professionalExists)
                return BadRequest("Professional not found or not verified.");

            // Prevent double booking
            bool slotTaken = await _context.Appointments.AnyAsync(a =>
                a.ProfessionalId == dto.ProfessionalId &&
                a.AppointmentDate == dto.AppointmentDate &&
                a.AppointmentTime == dto.AppointmentTime &&
                a.Status != AppointmentStatus.CANCELLED);

            if (slotTaken)
                return Conflict("This time slot is already booked.");

            var appointment = new Appointment
            {
                UserId = userId,
                ProfessionalId = dto.ProfessionalId,
                AppointmentDate = dto.AppointmentDate,
                AppointmentTime = dto.AppointmentTime,
                Status = AppointmentStatus.PENDING
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Appointment booked successfully",
                appointmentId = appointment.AppointmentId
            });
        }

        // ============================
        // USER: View his appointments
        // ============================
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<AppointmentResponseDto>>> GetUserAppointments(long userId)
        {
            var appointments = await _context.Appointments
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.AppointmentDate)
                .Select(a => new AppointmentResponseDto
                {
                    AppointmentId = a.AppointmentId,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    Status = a.Status,
                    JitsiRoomId = a.JitsiRoomId,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();

            return Ok(appointments);
        }

        // ============================
        // PROFESSIONAL: View his appointments
        // ============================
        [HttpGet("professional/{professionalId}")]
        public async Task<ActionResult<IEnumerable<AppointmentResponseDto>>> GetProfessionalAppointments(long professionalId)
        {
            var appointments = await _context.Appointments
                .Where(a => a.ProfessionalId == professionalId)
                .OrderBy(a => a.AppointmentDate)
                .ThenBy(a => a.AppointmentTime)
                .Select(a => new AppointmentResponseDto
                {
                    AppointmentId = a.AppointmentId,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    Status = a.Status,
                    JitsiRoomId = a.JitsiRoomId,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();

            return Ok(appointments);
        }
    }
}
