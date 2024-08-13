using System.ComponentModel.DataAnnotations;


namespace MedLab.Models
{


    public class State
    {
        [Key]
        public int StateId { get; set; }

        [Required]
        [StringLength(100)]
        public string? StateName { get; set; }


        [Required]
        public bool IsActive { get; set; } = true;


        [StringLength(50)]
        public string? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        [StringLength(50)]
        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }
    }

}
