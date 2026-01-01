using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    [Table("languages")]
    public class Language
    {
        [Key]
        [Column("language_id")]
        public int LanguageId { get; set; }

        [Required]
        [Column("language_name")]
        [MaxLength(50)]
        public string LanguageName { get; set; } = null!;

        // Navigation
        public ICollection<ProfessionalLanguage> ProfessionalLanguages { get; set; }
            = new List<ProfessionalLanguage>();
    }
}
