using FinalProject.Data;
using FinalProject.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BCrypt.Net;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "ADMIN")]


    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ===============================
        // VIEW ALL USERS (ROLE = USER)
        // ===============================
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<AdminUserResponseDto>>> GetUsers()
        {
            var users = await _context.Users
                .Where(u => u.Role.RoleName == "USER")
                .Select(u => new AdminUserResponseDto
                {
                    UserId = u.UserId,
                    FullName = u.FullName,
                    Email = u.Email,
                    Phone = u.Phone,
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }

        // ===============================
        // UPDATE USER IS_ACTIVE
        // ===============================
        [HttpPut("users/{userId}/status")]
        public async Task<IActionResult> UpdateUserStatus(
            long userId,
            UpdateIsActiveDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u =>
                    u.UserId == userId &&
                    u.Role.RoleName == "USER");

            if (user == null)
                return NotFound();

            user.IsActive = dto.IsActive;
            await _context.SaveChangesAsync();

            return Ok("User status updated.");
        }

        // ===============================
        // VIEW ALL PROFESSIONALS
        // ===============================
        [HttpGet("professionals")]
        public async Task<ActionResult<IEnumerable<AdminProfessionalResponseDto>>> GetProfessionals()
        {
            var professionals = await _context.Professionals
                .Include(p => p.User)
                .Select(p => new AdminProfessionalResponseDto
                {
                    UserId = p.Id,
                    FullName = p.User.FullName,
                    Email = p.User.Email,
                    Phone = p.User.Phone,
                    Specialization = p.Specialization,
                    Gender = p.Gender,
                    ExperienceYears = p.ExperienceYears,
                    ConsultationFee = p.ConsultationFee,
                    IsVerified = p.IsVerified,
                    CreatedAt = p.User.CreatedAt
                })
                .ToListAsync();

            return Ok(professionals);
        }

        // ===============================
        // UPDATE PROFESSIONAL IS_VERIFIED
        // ===============================
        [HttpPut("professionals/{professionalId}/verify")]
        public async Task<IActionResult> VerifyProfessional(
            long professionalId,
            UpdateIsVerifiedDto dto)
        {
            var professional = await _context.Professionals
                .FirstOrDefaultAsync(p => p.Id == professionalId);

            if (professional == null)
                return NotFound();

            professional.IsVerified = dto.IsVerified;
            await _context.SaveChangesAsync();

            return Ok("Professional verification status updated.");
        }


        private long GetAdminId()
        {
            return long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }


        [HttpPut("profile")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateAdminProfile(
    AdminUpdateProfileDto dto)
        {
            var adminId = GetAdminId();

            var admin = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u =>
                    u.UserId == adminId &&
                    u.Role.RoleName == "ADMIN");

            if (admin == null)
                return Unauthorized();

            // Prevent duplicate email
            if (await _context.Users.AnyAsync(u =>
                    u.Email == dto.Email &&
                    u.UserId != adminId))
            {
                return BadRequest("Email already in use.");
            }

            admin.FullName = dto.FullName;
            admin.Email = dto.Email;
            admin.Phone = dto.Phone;

            await _context.SaveChangesAsync();

            return Ok("Admin profile updated successfully.");
        }




        [HttpPut("change-password")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> ChangeAdminPassword(
    AdminChangePasswordDto dto)
        {
            var adminId = GetAdminId();

            var admin = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u =>
                    u.UserId == adminId &&
                    u.Role.RoleName == "ADMIN");

            if (admin == null)
                return Unauthorized();

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, admin.PasswordHash))
                return BadRequest("Current password is incorrect.");

            admin.PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

            await _context.SaveChangesAsync();

            return Ok("Password changed successfully.");
        }


    }
}
