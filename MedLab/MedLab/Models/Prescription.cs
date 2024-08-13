using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedLab.Models
{
    public class Prescription
    {
        [Key]
        public int PrescriptionID { get; set; }

        [Required]
        [ForeignKey("Patient")]
        public int PatientID { get; set; }
        public Patient? Patient { get; set; }

        [Required]
        [ForeignKey("LabAssistant")]
        public int LabAssistantID { get; set; }
        public LabAssistant? LabAssistant { get; set; }

        [Required]
        [Url]
        public string? FilePath { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime UploadedDate { get; set; } = DateTime.UtcNow;

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
