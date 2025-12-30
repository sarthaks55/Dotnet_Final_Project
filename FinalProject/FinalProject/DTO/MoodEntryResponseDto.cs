namespace FinalProject.DTO
{
    public class MoodEntryResponseDto
    {
        public long MoodId { get; set; }
        public int MoodValue { get; set; }
        public string? Notes { get; set; }
        public DateOnly CreatedDate { get; set; }
    }
}
