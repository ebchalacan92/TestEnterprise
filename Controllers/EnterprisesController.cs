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
    public class EnterprisesController : ControllerBase
    {
        private readonly TestEnterpriseContext _context;

        public EnterprisesController(TestEnterpriseContext context)
        {
            _context = context;
        }

        // GET: api/Enterprises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enterprise>>> GetEnterprise()
        {
            return await _context.Enterprise.ToListAsync();
        }

        // GET: api/Enterprises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Enterprise>> GetEnterprise(int id)
        {
            var enterprise = await _context.Enterprise.FindAsync(id);

            if (enterprise == null)
            {
                return NotFound();
            }

            return enterprise;
        }

        // PUT: api/Enterprises/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnterprise(int id, Enterprise enterprise)
        {
            if (id != enterprise.Id)
            {
                return BadRequest();
            }
            DateTime localTime = DateTime.Now;
            DateTime utcTime = localTime.ToUniversalTime();
            enterprise.CreatedDate = utcTime;
             DateTime localTime1 = (DateTime)enterprise.CreatedDate;
            DateTime utcTime1 = localTime.ToUniversalTime();
            enterprise.CreatedDate = utcTime1;
            _context.Entry(enterprise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnterpriseExists(id))
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

        // POST: api/Enterprises
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Enterprise>> PostEnterprise(Enterprise enterprise)
        {
            DateTime localTime = DateTime.Now;
            DateTime utcTime = localTime.ToUniversalTime();
            enterprise.CreatedDate = utcTime;
            enterprise.ModifiedDate = null;
            _context.Enterprise.Add(enterprise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnterprise", new { id = enterprise.Id }, enterprise);
        }

        // DELETE: api/Enterprises/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnterprise(int id)
        {
            var enterprise = await _context.Enterprise.FindAsync(id);
            if (enterprise == null)
            {
                return NotFound();
            }

            _context.Enterprise.Remove(enterprise);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnterpriseExists(int id)
        {
            return _context.Enterprise.Any(e => e.Id == id);
        }
    }
}
