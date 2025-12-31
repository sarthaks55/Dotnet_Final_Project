namespace FinalProject.DTO
{
    public class CreateAppointmentDto
    {
        public long ProfessionalId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }


}
