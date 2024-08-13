using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedLab.Models
{
    public class LabAssistant
    {
        [Key]
        public int LabAssistantID { get; set; }

        [Required]
        [ForeignKey("User")]
        public string? UserID { get; set; }
        public User? User { get; set; }

        [Required]
        public int DepartmentID { get; set; }
        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }

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
