
    using global::MedLab.Constants;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;


    namespace MedLab.Models
    {
        public class Billing
        {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int BillingId { get; set; }

            [Required]
            public int AppointmentId { get; set; }

            [ForeignKey("AppointmentId")]
            public Appointment? Appointment { get; set; }

            [Required]
            [DataType(DataType.Currency)]
            public decimal TotalAmount { get; set; }

            [Required]
            [DataType(DataType.Currency)]
            public decimal AmountPaid { get; set; }

            [DataType(DataType.Currency)]
            public decimal Discount { get; set; }

            [Required]
            [DataType(DataType.DateTime)]
            public DateTime BillingDate { get; set; } = DateTime.UtcNow;

            [Required]
            public PaymentStatus? PaymentStatus { get; set; } // e.g., Paid, Pending, Partially Paid

            [Required]
            public PaymentMethod? PaymentMethod { get; set; } // e.g., Credit Card, Debit Card, Net Banking

            [StringLength(100)]
            public string? TransactionId { get; set; }

            [StringLength(500)]
            public string? Remarks { get; set; }

            // Audit Columns
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


