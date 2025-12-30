using System.Security.Claims;
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
    [Route("api/diary")]
    [Authorize(Roles = "USER")]
    public class DiaryEntriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEncryptionService _encryption;

        public DiaryEntriesController(
            ApplicationDbContext context,
            IEncryptionService encryption)
        {
            _context = context;
            _encryption = encryption;
        }

        // =====================================
        // USER: Add diary entry
        // =====================================
        [HttpPost]
        public async Task<IActionResult> AddEntry(CreateDiaryEntryDto dto)
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var encryptedText = _encryption.Encrypt(dto.Text);

            var entry = new DiaryEntry
            {
                UserId = userId,
                EncryptedText = encryptedText
            };

            _context.DiaryEntries.Add(entry);
            await _context.SaveChangesAsync();

            return Ok("Diary entry saved securely.");
        }

        // =====================================
        // USER: Get all diary entries
        // =====================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiaryEntryResponseDto>>> GetEntries()
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var entries = await _context.DiaryEntries
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.CreatedAt)
                .Select(d => new DiaryEntryResponseDto
                {
                    DiaryId = d.DiaryId,
                    Text = _encryption.Decrypt(d.EncryptedText),
                    CreatedAt = d.CreatedAt
                })
                .ToListAsync();

            return Ok(entries);
        }
    }
}
