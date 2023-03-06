using Microsoft.EntityFrameworkCore;

namespace Test_Enterprise_Back.Models
{
    public class TestEnterpriseContext : DbContext
    {
        public TestEnterpriseContext(DbContextOptions<TestEnterpriseContext> options)
        : base(options)
        {
        }

        public DbSet<Test_Enterprise_Back.Models.Department> Department { get; set; }
        public DbSet<Test_Enterprise_Back.Models.DepartmentsEmployee> DepartmentsEmployee { get; set; }
        public DbSet<Test_Enterprise_Back.Models.Employee> Employee { get; set; }
        public DbSet<Test_Enterprise_Back.Models.Enterprise> Enterprise { get; set; }
    }
}
