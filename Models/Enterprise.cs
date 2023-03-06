using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Test_Enterprise_Back.Models
{
    [Table("enterprises")]
    public class Enterprise
    {

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("create_by")]
        [StringLength(100)]
        [Unicode(false)]
        public string? CreateBy { get; set; }
        [Column("created_date")]
        public DateTime? CreatedDate { get; set; }
        [Column("modified_by")]
        [StringLength(100)]
        [Unicode(false)]
        public string? ModifiedBy { get; set; }
        [Column("modified_date")]
        public DateTime? ModifiedDate { get; set; }
        [Column("status")]
        public bool Status { get; set; }
        [Column("address")]
        [StringLength(200)]
        [Unicode(false)]
        public string? Address { get; set; }
        [Column("name")]
        [StringLength(200)]
        [Unicode(false)]
        public string? Name { get; set; }
        [Column("phone")]
        [StringLength(50)]
        [Unicode(false)]
        public string? Phone { get; set; }
    }
}