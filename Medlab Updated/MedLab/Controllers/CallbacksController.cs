using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedLab.Data;
using MedLab.Models;

namespace MedLab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallbacksController : ControllerBase
    {
        private readonly MedDbContext _context;

        public CallbacksController(MedDbContext context)
        {
            _context = context;
        }

        // GET: api/Callbacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Callback>>> GetCallback()
        {
            return await _context.Callback.ToListAsync();
        }

        // GET: api/Callbacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Callback>> GetCallback(int id)
        {
            var callback = await _context.Callback.FindAsync(id);

            if (callback == null)
            {
                return NotFound();
            }

            return callback;
        }

        // PUT: api/Callbacks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCallback(int id, Callback callback)
        {
            if (id != callback.Id)
            {
                return BadRequest();
            }

            _context.Entry(callback).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CallbackExists(id))
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

        // POST: api/Callbacks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Callback>> PostCallback(Callback callback)
        {
            _context.Callback.Add(callback);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCallback", new { id = callback.Id }, callback);
        }

        // DELETE: api/Callbacks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCallback(int id)
        {
            var callback = await _context.Callback.FindAsync(id);
            if (callback == null)
            {
                return NotFound();
            }

            _context.Callback.Remove(callback);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CallbackExists(int id)
        {
            return _context.Callback.Any(e => e.Id == id);
        }
    }
}
