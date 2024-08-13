using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedLab.Models
{
    public class Report
    {
        [Key]
        public int ReportID { get; set; }

        [Required]
        public int AppointmentID { get; set; }
        [ForeignKey("AppointmentID")]
        public Appointment? Appointment { get; set; }

        [Required]
        [DataType(DataType.Upload)]
        public string? FilePath { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime UploadedDate { get; set; } = DateTime.UtcNow;

        [StringLength(100)]
        public string? UploadedBy { get; set; }
    }

}
