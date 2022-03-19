using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    public class DepositController
    {
        [Route("api/v1/deposit")]
        [Authorize]
        [ApiController]
        public class DepositsController : ControllerBase
        {
            private readonly TnGContext _context;
            private IDepositRepository depositRepo;
            private ITransactionRepository transactionRepo;
            private IWalletRepository walletRepo;
            private IUserRepository userRepo;
            public DepositsController(TnGContext context)
            {
                this.depositRepo = new DepositRepository(context);
                this.transactionRepo = new TransactionRepository(context);
                this.walletRepo = new WalletRepository(context);
                this.userRepo = new UserRepository(context);
                _context = context;
            }

            // GET: api/Deposits
            [HttpGet]
            public IEnumerable<Deposit> GetDeposits(int page)
            {
                IEnumerable<Deposit> ss = depositRepo.GetDeposits().Skip(page * 10).Take(10);
                if(ss.Any())
                {
                    return ss;
                }
                return null;
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
                DateTime depositTime = DateTime.Now;
                Transaction t = new Transaction();
                Wallet w = walletRepo.GetWallet(userRepo.GetUser(Deposit.UserId).Id);  //User, Wallet same Id
                int depositId = depositRepo.GetDeposits().OrderBy(d => d.Id).Last().Id + 1;
                try
                {
                    Deposit.Id = depositId;

                    w.Money = w.Money + Deposit.Amount;
                    walletRepo.UpdateWallet(w);

                    t.Id = transactionRepo.GetTransactions().OrderBy(t => t.Id).Last().Id + 1;
                    t.Amount = w.Money;
                    t.Date = depositTime;
                    t.Description = "Added " + w.Money + " to the Wallet";
                    t.WalletId = w.Id;
                    t.DepositId = depositId;
                    transactionRepo.InsertTransaction(t);

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
