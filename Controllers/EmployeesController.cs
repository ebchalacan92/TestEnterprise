using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test_Enterprise_Back.Models;
using Test_Enterprise_Back.Security.EncryptTools;
using Test_Enterprise_Back.Services;

namespace Test_Enterprise_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EmployeesController : ControllerBase
    {
        public UserInterface _usuarioService;
        private readonly TestEnterpriseContext _context;

        public EmployeesController(TestEnterpriseContext context, UserInterface contextt)
        {
            _usuarioService = contextt;
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employee.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            DateTime localTime = DateTime.Now;
            DateTime utcTime = localTime.ToUniversalTime();
            employee.ModifiedDate = utcTime;
            DateTime localTime1 = (DateTime)employee.CreatedDate;
            DateTime utcTime1 = localTime.ToUniversalTime();
            employee.CreatedDate = utcTime1;
            string spassword = Encrypt.GetSha256(employee.Password);
            employee.Password = spassword;
            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            
            DateTime localTime = DateTime.Now;
            DateTime utcTime = localTime.ToUniversalTime();
            employee.CreatedDate = utcTime;
            employee.ModifiedDate = null;
            string spassword = Encrypt.GetSha256(employee.Password);
            employee.Password = spassword;
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.Id == id);
        }
    }
}
