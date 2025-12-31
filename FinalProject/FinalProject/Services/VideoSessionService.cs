using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FinalProject.Interfaces;
using FinalProject.Models;
using FinalProject.Models.Common;
using FinalProject.Data;


namespace FinalProject.Services
{
    public class VideoSessionService : IVideoSessionService
    {
        private readonly ApplicationDbContext _db;

        public VideoSessionService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<ServiceResult> CreateForAppointmentAsync(int appointmentId)
        {
            var appointment = await _db.Appointments
                .FirstOrDefaultAsync(a => a.Id == appointmentId);

            if (appointment == null)
                return ServiceResult.Fail("Appointment not found");

            // 🔑 KEY FIX: check existing session
            var existingSession = await _db.VideoSessions
                .FirstOrDefaultAsync(v => v.AppointmentId == appointmentId);

            if (existingSession != null)
            {
                return ServiceResult.Ok(new
                {
                    RoomToken = existingSession.RoomToken,
                    existingSession.AllowedFrom,
                    existingSession.AllowedUntil
                });
            }

            // Create only if not exists
            var token = Guid.NewGuid().ToString("N");

            var session = new VideoSession
            {
                AppointmentId = appointmentId,
                RoomToken = token,
                AllowedFrom = appointment.StartTime.AddMinutes(-5),
                AllowedUntil = appointment.StartTime.AddMinutes(60)
            };

            _db.VideoSessions.Add(session);
            await _db.SaveChangesAsync();

            return ServiceResult.Ok(new
            {
                RoomToken = token,
                session.AllowedFrom,
                session.AllowedUntil
            });
        }

        public async Task<ServiceResult> ValidateJoinAsync(string roomToken, int userId)
        {
            var session = await _db.VideoSessions
                .Include(v => v.Appointment)
                .FirstOrDefaultAsync(v => v.RoomToken == roomToken);

            if (session == null)
                return ServiceResult.Fail("Invalid room");

            if (DateTime.UtcNow < session.AllowedFrom ||
                DateTime.UtcNow > session.AllowedUntil)
                return ServiceResult.Fail("Session not active");

            if (userId != session.Appointment.UserId &&
                userId != session.Appointment.ProfessionalId)
                return ServiceResult.Fail("Access denied");

            return ServiceResult.Ok();
        }

        public async Task<ServiceResult> MarkJoinedAsync(string roomToken, bool isProfessional)
        {
            var session = await _db.VideoSessions
                .FirstOrDefaultAsync(v => v.RoomToken == roomToken);

            if (session == null)
                return ServiceResult.Fail("Invalid room");

            if (isProfessional)
                session.ProfessionalJoined = true;
            else
                session.PatientJoined = true;

            await _db.SaveChangesAsync();
            return ServiceResult.Ok();
        }
    }
}
