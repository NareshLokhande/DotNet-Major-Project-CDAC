using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedLab.Models
{
    public class Test
    {
        [Key]
        public int TestID { get; set; }

        [Required]
        [StringLength(100)]
        public string? TestName { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [Required]
        public int DepartmentID { get; set; }

        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }

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
