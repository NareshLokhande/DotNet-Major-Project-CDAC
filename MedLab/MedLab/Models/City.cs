using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedLab.Models
{
   

    public class City
    {
        [Key]
        public int CityId { get; set; }

        [Required]
        [StringLength(100)]
        public string? CityName { get; set; }

        [Required]
        [ForeignKey("State")]
        public int StateId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        public virtual State? State { get; set; } // Navigation property

        // Audit columns
        [StringLength(50)]
        public string? CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [StringLength(50)]
        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }
    }

}
