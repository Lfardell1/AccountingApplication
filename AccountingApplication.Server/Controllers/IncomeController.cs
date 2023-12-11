using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.Models;
using Accounting.Database;
using AccountingApplication.Server.Repos.Implementation;

namespace AccountingApplication.Server.Controllers
{
    [Route("api/incomes")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly IIncomeRepository _incomeService;

        public IncomeController(IIncomeRepository incomeService)
        {
            _incomeService = incomeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incomes>>> GetIncomes()
        {
            var incomes = await _incomeService.GetAllIncomesAsync();
            return Ok(incomes);
        }

        [HttpGet("user/{UserId}")]
        public async Task<ActionResult<IEnumerable<Incomes>>> GetIncomesById(int UserId)
        {
            var incomes = await _incomeService.GetIncomesByIdAsync(UserId);
            return Ok(incomes);
        }
        [HttpPost]
        public async Task<ActionResult<Incomes>> AddIncome(Incomes income)
        {
            var newIncome = await _incomeService.CreateIncomeAsync(income);
            if (newIncome == null)
            {
                return BadRequest("Failed to create income.");
            }

            // Assuming 'IncomeId' is the primary key of your 'Incomes' table/entity
            return Ok(newIncome); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var deleted = await _incomeService.DeleteIncomeAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
