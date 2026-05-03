using Microsoft.AspNetCore.Mvc;
using CobMain.Api.Models;
using CobMain.Api.Services;

namespace CobMain.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JourneyController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosService;

        public JourneyController(ICosmosDbService cosmosService)
        {
            _cosmosService = cosmosService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JourneyLayout>>> GetAll()
        {
            var layouts = await _cosmosService.GetAllLayoutsAsync();
            return Ok(layouts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JourneyLayout>> GetById(string id)
        {
            var layout = await _cosmosService.GetLayoutAsync(id);
            if (layout == null) return NotFound();
            return Ok(layout);
        }

        [HttpPost]
        public async Task<ActionResult<JourneyLayout>> Create([FromBody] JourneyLayout layout)
        {
            var created = await _cosmosService.CreateLayoutAsync(layout);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JourneyLayout>> Update(string id, [FromBody] JourneyLayout layout)
        {
            var existing = await _cosmosService.GetLayoutAsync(id);
            if (existing == null) return NotFound();
            var updated = await _cosmosService.UpdateLayoutAsync(id, layout);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existing = await _cosmosService.GetLayoutAsync(id);
            if (existing == null) return NotFound();
            await _cosmosService.DeleteLayoutAsync(id);
            return NoContent();
        }
    }
}
