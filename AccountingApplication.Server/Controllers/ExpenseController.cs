using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using AccountingApplication.Server.Repos.Implementation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountingApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {

        private readonly IExpenseRepository _expenseRepository;

        public ExpenseController(IExpenseRepository expenseRepository)
        {
           _expenseRepository = expenseRepository;
        }

        [HttpGet("user/{userID}")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetAllUserTransactions(int userID)
        {
            var transactions = await _expenseRepository.AllUserExpensesAsync(userID);
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetTransaction(int id)
        {
            var transaction = await _expenseRepository.GetExpensesAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }
        [HttpPost]
        public async Task<ActionResult<Expense>> AddTransaction(Expense expense)
        {
            var newTransaction = await _expenseRepository.CreateExpenseAsync(expense);
            return CreatedAtAction(nameof(GetTransaction), new { id = newTransaction.ID }, newTransaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var deleted = await _expenseRepository.DeleteExpenseAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

