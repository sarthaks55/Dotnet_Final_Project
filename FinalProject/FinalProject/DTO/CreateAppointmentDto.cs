namespace FinalProject.DTO
{
    public class CreateAppointmentDto
    {
        public long ProfessionalId { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public TimeOnly AppointmentTime { get; set; }
    }

}
