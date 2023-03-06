using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Test_Enterprise_Back.Models
{
    [Table("employees")]
    public class Employee
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
        [Column("age")]
        public int Age { get; set; }
        [Column("email")]
        [StringLength(50)]
        [Unicode(false)]
        public string? Email { get; set; }
        [Column("name")]
        [StringLength(100)]
        [Unicode(false)]
        public string? Name { get; set; }
        [Column("position")]
        [StringLength(100)]
        [Unicode(false)]
        public string? Position { get; set; }
        [Column("surname")]
        [StringLength(100)]
        [Unicode(false)]
        public string? Surname { get; set; }
        [Column("user_name")]
        public string UserName { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("isAdmin")]
        public bool isAdmin { get; set; }

    }
}