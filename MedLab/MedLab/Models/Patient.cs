using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;

namespace MedLab.Models
{

    public class Patient
    {
        [Key]
        public int PatientID { get; set; }

        [Required]
        [ForeignKey("User")]
        public string? UserID { get; set; }
        public User? User { get; set; }

        [Required]
        [StringLength(50)]
        public string? Name { get; set; }


        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? Phone { get; set; }

        [Required]
        public int Age { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        [Required]
        public int StateID { get; set; }
        [ForeignKey("StateID")]
        public State? State { get; set; }

        [StringLength(100)]
        public string? CreatedBy { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [StringLength(100)]
        public string? ModifiedBy { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? ModifiedDate { get; set; }
    }

}
