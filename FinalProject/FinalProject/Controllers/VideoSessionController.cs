using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinalProject.Interfaces;

namespace SafeMind.Controllers
{
    [ApiController]
    [Route("api/video-sessions")]
    [Authorize]
    public class VideoSessionController : ControllerBase
    {
        private readonly IVideoSessionService _videoSessions;

        public VideoSessionController(IVideoSessionService videoSessions)
        {
            _videoSessions = videoSessions;
        }

        // =========================
        // Create room for appointment
        // =========================
        [HttpPost("{appointmentId}")]
        public async Task<IActionResult> Create(int appointmentId)
        {
            var result = await _videoSessions.CreateForAppointmentAsync(appointmentId);

            if (!result.Success)
                return BadRequest(new { error = result.Error });

            return Ok(result.Data);
        }
    }
}
