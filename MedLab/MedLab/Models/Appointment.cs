using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MedLab.Constants;

namespace MedLab.Models
{
    public class Appointment
    {
        [Key]
        public int AppointmentID { get; set; }

        [Required]
        [ForeignKey("Patient")]
        public int PatientID { get; set; }
        public Patient? Patient { get; set; }

        [Required]
        public int TestID { get; set; }
        [ForeignKey("TestID")]
        public Test? Test { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime AppointmentDate { get; set; }

        [StringLength(100)]
        public AppointmentStatus? Status { get; set; }

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
