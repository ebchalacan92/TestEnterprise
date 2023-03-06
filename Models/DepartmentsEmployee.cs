using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test_Enterprise_Back.Models
{
    [Table("departments_employees")]
    public class DepartmentsEmployee
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("create_by")]
        public string? CreateBy { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("modified_by")]
        public string? ModifiedBy { get; set; }
        [Column("modified_date")]
        public DateTime ModifiedDate { get; set; }
        [Column("status")]
        public bool Status { get; set; }
        [Column("id_department")]
        public int IdDepartment { get; set; }
        [Column("id_employee")]
        public int IdEmployee { get; set; }
      
    }
}