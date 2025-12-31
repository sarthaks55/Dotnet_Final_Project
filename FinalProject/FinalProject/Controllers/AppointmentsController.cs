using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    [Authorize]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

       
        // USER: Book appointment
       
        [HttpPost("book")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> BookAppointment(
            [FromBody] CreateAppointmentDto dto)
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            // Check professional exists & verified
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p =>
                    p.Id == dto.ProfessionalId &&
                    p.IsVerified
                );

            if (professional == null)
                return BadRequest("Professional not found or not verified.");

            // Prevent booking in the past
            if (dto.StartTime < DateTime.UtcNow)
                return BadRequest("Cannot book appointment in the past.");

            // Prevent double booking (same professional + same start time)
            bool slotTaken = await _context.Appointments.AnyAsync(a =>
                a.ProfessionalId == dto.ProfessionalId &&
                a.StartTime == dto.StartTime &&
                a.Status != AppointmentStatus.CANCELLED
            );

            if (slotTaken)
                return Conflict("This time slot is already booked.");

            var appointment = new Appointment
            {
                UserId = userId,
                ProfessionalId = dto.ProfessionalId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Status = AppointmentStatus.BOOKED
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Appointment booked successfully",
                appointmentId = appointment.Id
            });
        }

<<<<<<< HEAD
       
        // USER: View his own appointments
       
=======
        // ===================================================
        // USER: View own appointments
        // ===================================================
>>>>>>> eb5cf63ec420917b9f97ab9a7348557e759502e6
        [HttpGet("my")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetMyAppointments()
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var appointments = await _context.Appointments
                .Where(a => a.UserId == userId)
                .Include(a => a.Professional)
                    .ThenInclude(p => p.User)
                .OrderByDescending(a => a.StartTime)
                .Select(a => new
                {
                    a.Id,
                    a.StartTime,
                    a.EndTime,
                    Status = a.Status.ToString(),
                    a.CreatedAt,
                    ProfessionalName = a.Professional.User.FullName
                })
                .ToListAsync();

            return Ok(appointments);
        }

<<<<<<< HEAD
       
        // PROFESSIONAL: View own appointments
       
=======
        // ===================================================
        // PROFESSIONAL: View own appointments
        // ===================================================
>>>>>>> eb5cf63ec420917b9f97ab9a7348557e759502e6
        [HttpGet("professional")]
        [Authorize(Roles = "PROFESSIONAL")]
        public async Task<IActionResult> GetProfessionalAppointments()
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );
            Console.WriteLine("User ID: " + userId);
            var professionalId = await _context.Professionals
                .Where(p => p.UserId == userId)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();
            Console.WriteLine("Professional ID: " + professionalId);
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p => p.Id == professionalId);

            if (professional == null)
                return Unauthorized("Professional profile not found.");

            var appointments = await _context.Appointments
                .Where(a => a.ProfessionalId == professional.Id)
                .Include(a => a.User)
                .OrderBy(a => a.StartTime)
                .Select(a => new
                {
                    a.Id,
                    a.StartTime,
                    a.EndTime,
                    Status = a.Status.ToString(),
                    a.CreatedAt,
                    UserName = a.User.FullName
                })
                .ToListAsync();

            return Ok(appointments);
        }

<<<<<<< HEAD



       
        // PROFESSIONAL: Confirm appointment
       
=======
        // ===================================================
        // PROFESSIONAL: Confirm appointment
        // ===================================================
>>>>>>> eb5cf63ec420917b9f97ab9a7348557e759502e6
        [HttpPut("{appointmentId}/confirm")]
        [Authorize(Roles = "PROFESSIONAL")]
        public async Task<IActionResult> ConfirmAppointment(long appointmentId)
        {
            var professionalUserId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );
            var professionalId = await _context.Professionals
                .Where(p => p.UserId == professionalUserId)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p => p.Id == professionalId);

            if (professional == null)
                return Unauthorized("Professional profile not found.");

            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.Id == appointmentId);

            if (appointment == null)
                return NotFound("Appointment not found.");

            if (appointment.ProfessionalId != professional.Id)
                return Forbid("You cannot confirm this appointment.");

            if (appointment.Status != AppointmentStatus.BOOKED)
                return BadRequest("Only booked appointments can be confirmed.");

            appointment.Status = AppointmentStatus.CONFIRMED;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Appointment confirmed successfully.",
                appointmentId = appointment.Id
            });
        }
    }
}
