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
    [Route("api/mood")]
    [Authorize(Roles = "USER")]
    public class MoodEntriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MoodEntriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ======================================
        // USER: Add today's mood
        // ======================================
        [HttpPost]
        public async Task<IActionResult> AddMood(CreateMoodEntryDto dto)
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            bool alreadyAdded = await _context.MoodEntries.AnyAsync(m =>
                m.UserId == userId && m.CreatedDate == today);

            if (alreadyAdded)
                return Conflict("Mood for today already recorded.");

            var mood = new MoodEntry
            {
                UserId = userId,
                MoodValue = dto.MoodValue,
                Notes = dto.Notes,
                CreatedDate = today
            };

            _context.MoodEntries.Add(mood);
            await _context.SaveChangesAsync();

            return Ok("Mood entry saved.");
        }

         //======================================
        // USER: Get mood history(date range)
         //======================================
        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<MoodEntryResponseDto>>> GetMoodHistory(
            [FromQuery] DateOnly from,
            [FromQuery] DateOnly to)
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var moods = await _context.MoodEntries
                .Where(m => m.UserId == userId &&
                            m.CreatedDate >= from &&
                            m.CreatedDate <= to)
                .OrderBy(m => m.CreatedDate)
                .Select(m => new MoodEntryResponseDto
                {
                    MoodId = m.MoodId,
                    MoodValue = m.MoodValue,
                    Notes = m.Notes,
                    CreatedDate = m.CreatedDate
                })
                .ToListAsync();

            return Ok(moods);
            }

            // ======================================
            // USER: Weekly analytics
            // ======================================
            [HttpGet("weekly")]
        public async Task<IActionResult> GetWeeklyMood()
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var startDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-6));

            var data = await _context.MoodEntries
                .Where(m => m.UserId == userId && m.CreatedDate >= startDate)
                .GroupBy(m => m.CreatedDate)
                .Select(g => new
                {
                    Date = g.Key,
                    AverageMood = g.Average(x => x.MoodValue)
                })
                .OrderBy(x => x.Date)
                .ToListAsync();

            return Ok(data);
        }

        // ======================================
        // USER: Monthly analytics
        // ======================================
        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthlyMood()
        {
            var userId = long.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var startDate = DateOnly.FromDateTime(
                new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1));

            var data = await _context.MoodEntries
                .Where(m => m.UserId == userId && m.CreatedDate >= startDate)
                .GroupBy(m => m.CreatedDate)
                .Select(g => new
                {
                    Date = g.Key,
                    AverageMood = g.Average(x => x.MoodValue)
                })
                .OrderBy(x => x.Date)
                .ToListAsync();

            return Ok(data);
        }
    }
}
