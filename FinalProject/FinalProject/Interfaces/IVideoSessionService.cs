using System.Threading.Tasks;
using FinalProject.Models.Common;

namespace FinalProject.Interfaces
{
    public interface IVideoSessionService
    {
        Task<ServiceResult> CreateForAppointmentAsync(int appointmentId);
        Task<ServiceResult> ValidateJoinAsync(string roomToken, int userId);
        Task<ServiceResult> MarkJoinedAsync(string roomToken, bool isCounselor);
    }
}
