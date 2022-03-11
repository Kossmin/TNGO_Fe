using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    public class DepositController
    {
        [Route("api/v1/deposit")]
        [ApiController]
        public class DepositsController : ControllerBase
        {
            private readonly TnGContext _context;
            private IDepositRepository depositRepo;

            public DepositsController(TnGContext context)
            {
                this.depositRepo = new DepositRepository(context);
                _context = context;
            }

            // GET: api/Deposits
            [HttpGet]
            public IEnumerable<Deposit> GetDeposits()
            {
                IEnumerable<Deposit> ss = depositRepo.GetDeposits();
                return ss;
            }

            // GET: api/Deposits/5
            [HttpGet(template: "get/{id}")]
            public Deposit GetDeposit(int id)
            {
                Deposit s = depositRepo.GetDeposit(id);
                if (s == null)
                {
                    return null;
                }
                return s;
            }

            // PUT: api/Deposits/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut(template: "update")]
            public String PutDeposit(Deposit Deposit)
            {
                try
                {
                    depositRepo.UpdateDeposit(Deposit);
                }
                catch (Exception)
                {
                    return "Update Failed";
                }
                return "Update Success";
            }
            // POST: api/Deposits
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public String PostDeposit(Deposit Deposit)
            {
                try
                {
                    depositRepo.InsertDepsoit(Deposit);
                }
                catch (Exception)
                {
                    return "Add Failed";
                }
                return "Add Success";
            }

            // DELETE: api/Deposits/5
            [HttpDelete("{id}")]
            public String DeleteDeposit(int id)
            {
                try
                {
                    if (DepositExists(id))
                    {
                        depositRepo.DeleteDeposit(id);
                    }
                }
                catch (Exception)
                {
                    return "Delete Failed";
                }
                return "Delete Success";
            }

            private bool DepositExists(int id)
            {
                return _context.Deposits.Any(e => e.Id == id);
            }
        }
    }
}
