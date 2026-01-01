using System.Security.Claims;
using BCrypt.Net;
using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using FinalProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize(Roles = "USER")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEncryptionService _encryption;

        public UserController(
            ApplicationDbContext context,
            IEncryptionService encryption)
        {
            _context = context;
            _encryption = encryption;
        }

        private long GetUserId() =>
            long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // ===============================
        // UPDATE PROFILE
        // ===============================
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UpdateUserProfileDto dto)
        {
            var userId = GetUserId();
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound();

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

            bool valid = BCrypt.Net.BCrypt.Verify(
                dto.CurrentPassword,
                user.PasswordHash
            );

            if (!valid)
                return BadRequest("Current password is incorrect.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(
                dto.NewPassword, workFactor: 12);

            await _context.SaveChangesAsync();
            return Ok("Password changed successfully.");
        }

        // ===============================
        // UPDATE MOOD ENTRY
        // ===============================
        [HttpPut("mood/{moodId}")]
        public async Task<IActionResult> UpdateMood(
            long moodId,
            UpdateMoodEntryDto dto)
        {
            var userId = GetUserId();
            var mood = await _context.MoodEntries
                .FirstOrDefaultAsync(m => m.MoodId == moodId && m.UserId == userId);

            if (mood == null)
                return NotFound();

            mood.MoodValue = dto.MoodValue;
            mood.Notes = dto.Notes;

            await _context.SaveChangesAsync();
            return Ok("Mood entry updated.");
        }

        // ===============================
        // DELETE MOOD ENTRY
        // ===============================
        [HttpDelete("mood/{moodId}")]
        public async Task<IActionResult> DeleteMood(long moodId)
        {
            var userId = GetUserId();
            var mood = await _context.MoodEntries
                .FirstOrDefaultAsync(m => m.MoodId == moodId && m.UserId == userId);

            if (mood == null)
                return NotFound();

            _context.MoodEntries.Remove(mood);
            await _context.SaveChangesAsync();

            return Ok("Mood entry deleted.");
        }

        // ===============================
        // UPDATE DIARY ENTRY (ENCRYPTED)
        // ===============================
        [HttpPut("diary/{diaryId}")]
        public async Task<IActionResult> UpdateDiary(
            long diaryId,
            UpdateDiaryEntryDto dto)
        {
            var userId = GetUserId();
            var diary = await _context.DiaryEntries
                .FirstOrDefaultAsync(d => d.DiaryId == diaryId && d.UserId == userId);

            if (diary == null)
                return NotFound();

            diary.EncryptedText = _encryption.Encrypt(dto.Text);
            await _context.SaveChangesAsync();

            return Ok("Diary entry updated securely.");
        }

        // ===============================
        // DELETE DIARY ENTRY
        // ===============================
        [HttpDelete("diary/{diaryId}")]
        public async Task<IActionResult> DeleteDiary(long diaryId)
        {
            var userId = GetUserId();
            var diary = await _context.DiaryEntries
                .FirstOrDefaultAsync(d => d.DiaryId == diaryId && d.UserId == userId);

            if (diary == null)
                return NotFound();

            _context.DiaryEntries.Remove(diary);
            await _context.SaveChangesAsync();

            return Ok("Diary entry deleted.");
        }

        // ===============================
        // CANCEL APPOINTMENT
        // ===============================
        [HttpPut("appointments/{appointmentId}/cancel")]
        public async Task<IActionResult> CancelAppointment(long appointmentId)
        {
            var userId = GetUserId();
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a =>
                    a.Id == appointmentId &&
                    a.UserId == userId);

            if (appointment == null)
                return NotFound();

            if (appointment.Status == AppointmentStatus.COMPLETED ||
                appointment.Status == AppointmentStatus.CANCELLED)
                return BadRequest("Appointment cannot be cancelled.");

            appointment.Status = AppointmentStatus.CANCELLED;
            await _context.SaveChangesAsync();

            return Ok("Appointment cancelled successfully.");
        }
    }
}
