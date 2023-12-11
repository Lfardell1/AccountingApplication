using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using AccountingApplication.Server.Repos.Implementation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;

namespace AccountingApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {

        private readonly ITransactionRepository _transactionRepository;

        public TransactionController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        [HttpGet("user/{userID}")]
        public async Task<ActionResult<IEnumerable<Transactions>>> GetAllUserTransactions(int userID)
        {
            var transactions = await _transactionRepository.AllUserTransactionsAsync(userID);
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transactions>> GetTransaction(int id)
        {
            var transaction = await _transactionRepository.GetTransactionAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }
        [HttpPost]
        public async Task<ActionResult<Transactions>> AddTransaction(Transactions transaction)
        {
            var newTransaction = await _transactionRepository.CreateTransactionAsync(transaction);
            return CreatedAtAction(nameof(GetTransaction), new { id = newTransaction.Id }, newTransaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var deleted = await _transactionRepository.DeleteTransactionAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

