using System.Security.Claims;
using BCrypt.Net;
using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/professional")]
    [Authorize(Roles = "PROFESSIONAL")]
    public class ProfessionalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfessionalController(ApplicationDbContext context)
        {
            _context = context;
        }

        private long GetUserId() =>
            long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // ===============================
        // UPDATE PROFILE (USER + PROFESSIONAL)
        // ===============================
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UpdateProfessionalProfileDto dto)
        {
            var userId = GetUserId();

            var user = await _context.Users.FindAsync(userId);
            var professional = await _context.Professionals
                .Include(p => p.ProfessionalLanguages)
                .FirstOrDefaultAsync(p => p.Id == userId);

            if (user == null || professional == null)
                return NotFound();

            // -------- USER --------
            if (!string.IsNullOrWhiteSpace(dto.Email))
            {
                bool emailExists = await _context.Users
                    .AnyAsync(u => u.Email == dto.Email && u.UserId != userId);

                if (emailExists)
                    return BadRequest("Email already in use.");

                user.Email = dto.Email;
            }

            if (!string.IsNullOrWhiteSpace(dto.FullName))
                user.FullName = dto.FullName;

            if (!string.IsNullOrWhiteSpace(dto.Phone))
                user.Phone = dto.Phone;

            // -------- PROFESSIONAL --------
            if (dto.Specialization.HasValue)
                professional.Specialization = dto.Specialization.Value;

            if (dto.Gender.HasValue)
                professional.Gender = dto.Gender.Value;

            if (dto.ExperienceYears.HasValue)
                professional.ExperienceYears = dto.ExperienceYears;

            if (!string.IsNullOrWhiteSpace(dto.Qualification))
                professional.Qualification = dto.Qualification;

            if (!string.IsNullOrWhiteSpace(dto.Bio))
                professional.Bio = dto.Bio;

            if (dto.ConsultationFee.HasValue)
                professional.ConsultationFee = dto.ConsultationFee;

            // -------- LANGUAGES --------
            if (dto.LanguageIds != null)
            {
                var validLanguages = await _context.Languages
                    .Where(l => dto.LanguageIds.Contains(l.LanguageId))
                    .ToListAsync();

                if (validLanguages.Count != dto.LanguageIds.Count)
                    return BadRequest("Invalid language selection.");

                _context.ProfessionalLanguages.RemoveRange(
                    professional.ProfessionalLanguages);

                var mappings = dto.LanguageIds.Select(id =>
                    new ProfessionalLanguage
                    {
                        ProfessionalId = userId,
                        LanguageId = id
                    });

                _context.ProfessionalLanguages.AddRange(mappings);
            }

            await _context.SaveChangesAsync();
            return Ok("Profile updated successfully.");
        }

        // ===============================
        // CHANGE PASSWORD
        // ===============================
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var userId = GetUserId();
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound();

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                return BadRequest("Current password is incorrect.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(
                dto.NewPassword, workFactor: 12);

            await _context.SaveChangesAsync();
            return Ok("Password updated successfully.");
        }

        // ===============================
        // UPDATE APPOINTMENT STATUS
        // ===============================
        [HttpPut("appointments/{appointmentId}/status")]
        public async Task<IActionResult> UpdateAppointmentStatus(
            long appointmentId,
            UpdateAppointmentStatusDto dto)
        {
            var professionalId = GetUserId();

            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a =>
                    a.Id == appointmentId &&
                    a.ProfessionalId == professionalId);

            if (appointment == null)
                return NotFound();

            // VALID TRANSITIONS
            if (appointment.Status == AppointmentStatus.PENDING &&
                dto.Status == AppointmentStatus.CONFIRMED)
            {
                appointment.Status = AppointmentStatus.CONFIRMED;
            }
            else if (appointment.Status == AppointmentStatus.CONFIRMED &&
                (dto.Status == AppointmentStatus.CANCELLED ||
                 dto.Status == AppointmentStatus.COMPLETED))
            {
                appointment.Status = dto.Status;
            }
            else
            {
                return BadRequest("Invalid appointment status transition.");
            }

            await _context.SaveChangesAsync();
            return Ok($"Appointment {dto.Status.ToString().ToLower()}.");
        }
    }
}
