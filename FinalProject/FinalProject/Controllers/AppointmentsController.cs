using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

using System.Security.Claims;
using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    [Authorize] // 🔐 All endpoints require JWT
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ===================================================
        // USER: Book appointment
        // ===================================================
        [HttpPost("book")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> BookAppointment(
            [FromBody] CreateAppointmentDto dto)
        {
            // Get logged-in userId from JWT
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            // Check professional exists & verified
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p =>
                    p.ProfessionalId == dto.ProfessionalId &&
                    p.IsVerified
                );

            if (professional == null)
                return BadRequest("Professional not found or not verified.");

            // Prevent booking in the past
            var appointmentDateTime =
                dto.AppointmentDate.ToDateTime(dto.AppointmentTime);

            if (appointmentDateTime < DateTime.Now)
                return BadRequest("Cannot book appointment in the past.");

            // Prevent double booking
            bool slotTaken = await _context.Appointments.AnyAsync(a =>
                a.ProfessionalId == dto.ProfessionalId &&
                a.AppointmentDate == dto.AppointmentDate &&
                a.AppointmentTime == dto.AppointmentTime &&
                a.Status != AppointmentStatus.CANCELLED
            );

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

        // ===================================================
        // USER: View his own appointments
        // ===================================================
        [HttpGet("my")]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<IEnumerable<AppointmentResponseDto>>> GetMyAppointments()
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var appointments = await _context.Appointments
                .Where(a => a.UserId == userId)
                .Include(a => a.Professional)
                    .ThenInclude(p => p.User)
                .OrderByDescending(a => a.AppointmentDate)
                .Select(a => new AppointmentResponseDto
                {
                    AppointmentId = a.AppointmentId,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    Status = a.Status,
                    JitsiRoomId = a.JitsiRoomId,
                    CreatedAt = a.CreatedAt,
                    ProfessionalName = a.Professional.User.FullName
                })
                .ToListAsync();

            return Ok(appointments);
        }

        // ===================================================
        // THERAPIST: View own appointments
        // ===================================================
        [HttpGet("professional")]
        [Authorize(Roles = "PROFESSIONAL")]
        public async Task<ActionResult<IEnumerable<AppointmentResponseDto>>> GetProfessionalAppointments()
        {
            // Logged-in therapist userId
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            // Get professional profile
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p => p.ProfessionalId == userId);

            if (professional == null)
                return Unauthorized("Professional profile not found.");

            var appointments = await _context.Appointments
                .Where(a => a.ProfessionalId == professional.ProfessionalId)
                .Include(a => a.User)
                .OrderBy(a => a.AppointmentDate)
                .ThenBy(a => a.AppointmentTime)
                .Select(a => new AppointmentResponseDto
                {
                    AppointmentId = a.AppointmentId,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    Status = a.Status,
                    JitsiRoomId = a.JitsiRoomId,
                    CreatedAt = a.CreatedAt,
                    UserName = a.User.FullName
                })
                .ToListAsync();

            return Ok(appointments);
        }




        // ===================================================
        // THERAPIST: Confirm appointment
        // ===================================================
        [HttpPut("{appointmentId}/confirm")]
        [Authorize(Roles = "PROFESSIONAL")]
        public async Task<IActionResult> ConfirmAppointment(long appointmentId)
        {
            // Logged-in therapist userId
            var therapistUserId = long.Parse(
                User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value
            );

            // Get professional profile
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p => p.ProfessionalId == therapistUserId);

            if (professional == null)
                return Unauthorized("Professional profile not found.");

            // Get appointment
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

            if (appointment == null)
                return NotFound("Appointment not found.");

            // Ensure therapist owns this appointment
            if (appointment.ProfessionalId != professional.ProfessionalId)
                return Forbid("You cannot confirm this appointment.");

            // Ensure valid status
            if (appointment.Status != AppointmentStatus.PENDING)
                return BadRequest("Only pending appointments can be confirmed.");

            // Generate Jitsi room
            appointment.Status = AppointmentStatus.CONFIRMED;
            appointment.JitsiRoomId =
                $"safemind-{appointment.AppointmentId}-{Guid.NewGuid()}";

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Appointment confirmed successfully.",
                appointmentId = appointment.AppointmentId,
                jitsiRoomId = appointment.JitsiRoomId
            });
        }



    }
}

