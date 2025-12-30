namespace FinalProject.DTO
{
    public class DiaryEntryResponseDto
    {
        public long DiaryId { get; set; }
        public string Text { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}
