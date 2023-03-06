using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test_Enterprise_Back.Models;

namespace Test_Enterprise_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DepartmentsEmployeesController : ControllerBase
    {
        private readonly TestEnterpriseContext _context;

        public DepartmentsEmployeesController(TestEnterpriseContext context)
        {
            _context = context;
        }

        // GET: api/DepartmentsEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentsEmployee>>> GetDepartmentsEmployee()
        {
            return await _context.DepartmentsEmployee.ToListAsync();
        }

        // GET: api/DepartmentsEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentsEmployee>> GetDepartmentsEmployee(int id)
        {
            var departmentsEmployee = await _context.DepartmentsEmployee.FindAsync(id);

            if (departmentsEmployee == null)
            {
                return NotFound();
            }

            return departmentsEmployee;
        }

        // PUT: api/DepartmentsEmployees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartmentsEmployee(int id, DepartmentsEmployee departmentsEmployee)
        {
            if (id != departmentsEmployee.Id)
            {
                return BadRequest();
            }
            DateTime localTime = DateTime.Now;
            DateTime utcTime = localTime.ToUniversalTime();
            departmentsEmployee.ModifiedDate = utcTime;
            DateTime localTime1 = (DateTime)departmentsEmployee.CreatedDate;
            DateTime utcTime1 = localTime.ToUniversalTime();
            departmentsEmployee.CreatedDate = utcTime1;
            _context.Entry(departmentsEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentsEmployeeExists(id))
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

        // POST: api/DepartmentsEmployees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DepartmentsEmployee>> PostDepartmentsEmployee(DepartmentsEmployee departmentsEmployee)
        {
            DateTime localTime = DateTime.Now;
            DateTime utcTime = localTime.ToUniversalTime();
            departmentsEmployee.ModifiedDate = utcTime;
            DateTime localTime1 = (DateTime)departmentsEmployee.CreatedDate;
            DateTime utcTime1 = localTime.ToUniversalTime();
            departmentsEmployee.CreatedDate = utcTime1;
            _context.DepartmentsEmployee.Add(departmentsEmployee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentsEmployee", new { id = departmentsEmployee.Id }, departmentsEmployee);
        }

        // DELETE: api/DepartmentsEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartmentsEmployee(int id)
        {
            var departmentsEmployee = await _context.DepartmentsEmployee.FindAsync(id);
            if (departmentsEmployee == null)
            {
                return NotFound();
            }

            _context.DepartmentsEmployee.Remove(departmentsEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentsEmployeeExists(int id)
        {
            return _context.DepartmentsEmployee.Any(e => e.Id == id);
        }
    }
}
