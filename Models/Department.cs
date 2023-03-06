using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test_Enterprise_Back.Models
{
    [Table("departments")]
    public class Department
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("create_by")]
        public string? CreateBy { get; set; }
        [Column("created_date")]
        public DateTime? CreatedDate { get; set; }
        [Column("modified_by")]
        public string? ModifiedBy { get; set; }
        [Column("modified_date")]
        public DateTime? ModifiedDate { get; set; }
        [Column("status")]
        public bool? Status { get; set; }
        [Column("description")]
        public string? Description { get; set; }
        [Column("name")]
        public string? Name { get; set; }
        [Column("phone")]
        public string? Phone { get; set; }
        [Column("id_enterprise")]
        public int IdEnterprise { get; set; }

    }
}