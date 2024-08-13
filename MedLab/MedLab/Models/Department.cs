using System.ComponentModel.DataAnnotations;

namespace MedLab.Models
{
    public class Department
    {
        [Key]
        public int DepartmentID { get; set; }

        [Required]
        [StringLength(100)]
        public string? DepartmentName { get; set; }

        [StringLength(200)]
        public string? Description { get; set; }

        public bool IsActive { get; set; }

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
