using System.ComponentModel.DataAnnotations;

namespace MedLab.Models
{
    public class Callback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [Phone]
        public string Number { get; set; }

        [Required]
        [StringLength(500)]
        public string Symptoms { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateOfCall { get; set; }

        public bool IsCompleted { get; set; }


    }
}
