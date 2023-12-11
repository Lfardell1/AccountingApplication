using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.Models;
using Accounting.Database;
using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Migrations;
namespace AccountingApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DebtController : ControllerBase
    {

        private readonly IDebtRepository _debtRepository;

        public DebtController(IDebtRepository debtRepository)
        {

            _debtRepository = debtRepository;

        }

        [HttpGet]
        public IActionResult GetAllDebts() {
            var incomes =  _debtRepository.GetAllDebtsAsync();
            return Ok(incomes);
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Debt>> GetDebtByUserId(int Id) {

            var Debts = await _debtRepository.GetDebtByUserIdAsync(Id);
            if (Debts == null)
            {
                return NotFound();
            }
            return Ok(Debts);

        }

        [HttpPost]
        public async Task<ActionResult> CreateDebt(Debt debt)
        {

            var newDebt = await _debtRepository.CreateDebtAsync(debt);
            return CreatedAtAction(nameof(Debt), new { id = newDebt.DebtId }, newDebt);

        }

        [HttpPost("{UserId}")]
        public async Task<ActionResult> UpdateDebt(int UserId, Debt debt) {


            var DebtToUpdate = await _debtRepository.UpdateDebtAsync(UserId, debt);
            return Ok(DebtToUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDebt(int id)
        {
        var DebtToDelete = await _debtRepository.DeleteDebtAsync(id);

            return Ok(DebtToDelete);    

        }






    }
}

