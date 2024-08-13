using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MedLab.Constants;
using Microsoft.AspNetCore.Identity;

namespace MedLab.Models
{
    public class User : IdentityUser
    {

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [DataType(DataType.DateTime)]
        public DateTime? LastLogin { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public Role UserRole { get; set; }

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
