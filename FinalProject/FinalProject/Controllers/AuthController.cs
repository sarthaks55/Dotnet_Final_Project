using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        
        // REGISTER
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already registered.");

            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleName == dto.Role);

            if (role == null)
                return BadRequest("Invalid role.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(
                dto.Password,
                workFactor: 12
            );

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                RoleId = role.RoleId,
                PasswordHash = hashedPassword
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        
        // LOGIN
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return Unauthorized("Invalid credentials.");

            bool passwordValid = BCrypt.Net.BCrypt.Verify(
                dto.Password,
                user.PasswordHash
            );

            if (!passwordValid)
                return Unauthorized("Invalid credentials.");

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user.UserId,
                user.FullName,
                user.Email,
                role = user.Role.RoleName
            });
        }



        // ==========================
        // PROFESSIONAL REGISTER
        // ==========================
        [HttpPost("register-professional")]
        public async Task<IActionResult> RegisterProfessional(RegisterProfessionalDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already registered.");

            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleName == "PROFESSIONAL");

            if (role == null)
                return BadRequest("Professional role not found.");

            // Validate languages
            var languages = await _context.Languages
                .Where(l => dto.LanguageIds.Contains(l.LanguageId))
                .ToListAsync();

            if (languages.Count != dto.LanguageIds.Count)
                return BadRequest("One or more languages are invalid.");

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 🔐 Hash password
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(
                    dto.Password,
                    workFactor: 12
                );

                // 👤 Create User
                var user = new User
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    RoleId = role.RoleId,
                    PasswordHash = hashedPassword
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // 🧑‍⚕️ Create Professional
                var professional = new Professional
                {
                    ProfessionalId = user.UserId, // 1-to-1 mapping
                    Specialization = dto.Specialization,
                    Gender = dto.Gender,
                    ExperienceYears = dto.ExperienceYears,
                    Qualification = dto.Qualification,
                    Bio = dto.Bio,
                    ConsultationFee = dto.ConsultationFee,
                    IsVerified = false // Admin approval required
                };

                _context.Professionals.Add(professional);
                await _context.SaveChangesAsync();

                // 🌐 Map Languages
                var professionalLanguages = languages.Select(l => new ProfessionalLanguage
                {
                    ProfessionalId = professional.ProfessionalId,
                    LanguageId = l.LanguageId
                });

                _context.ProfessionalLanguages.AddRange(professionalLanguages);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok("Professional registered successfully. Verification pending.");
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }




        // JWT GENERATION

        private string GenerateJwtToken(User user)
        {
            var jwt = _config.GetSection("Jwt");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.RoleName)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwt["Key"]!)
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(jwt["ExpiryMinutes"]!)
                ),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
