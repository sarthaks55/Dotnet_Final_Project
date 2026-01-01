using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("professional_languages")]
    public class ProfessionalLanguage
    {
        [Column("professional_id")]
        public long ProfessionalId { get; set; }

        [Column("language_id")]
        public int LanguageId { get; set; }

        // Navigation
        public Professional Professional { get; set; } = null!;
        public Language Language { get; set; } = null!;
    }
}
