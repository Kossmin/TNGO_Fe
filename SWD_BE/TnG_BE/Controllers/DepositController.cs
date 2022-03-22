using Enities.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
            public ActionResult GetDeposits(int page)
            {
                IEnumerable<Deposit> ds = depositRepo.GetDeposits().AsQueryable()
                    .Join(transactionRepo.GetTransactions(), x => x.TransactionId, y => y.Id, (x, y) => new Deposit(x, y))
                    .Join(userRepo.GetUsers(), x => x.UserId, y => y.Id, (x, y) => new Deposit(x, y))
                    .Skip(page * 10).Take(10);
                if (ds == null)
                {
                    return BadRequest();
                }

                var json = JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

                return Content(json, "application/json");
            }
            // GET: api/Deposits/5
            [HttpGet(template: "get/{id}")]
            public ActionResult GetDeposit(int id)
            {
                Deposit s = depositRepo.GetDeposit(id);
                if (s == null)
                {
                    return BadRequest();
                }
                s.Transaction = transactionRepo.GetTransaction((int)s.TransactionId);
                s.User = userRepo.GetUser(s.UserId);

                var json = JsonConvert.SerializeObject(s, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

                return Content(json, "application/json");
            }

            // PUT: api/Deposits/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut(template: "update")]
            public String PutDeposit([FromBody] DepositViewModel dViewModel, int depostId)
            {
                try
                {
                    Deposit d = depositRepo.GetDeposit(depostId);
                    d.Date = dViewModel.Date;
                    d.Amount = dViewModel.Amount;
                    d.Description = dViewModel.Description;
                    d.UserId = dViewModel.UserId;
                    depositRepo.UpdateDeposit(d);
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
            public string PostDeposit([FromBody] DepositViewModel dViewModel)
            {
                DateTime depositTime = DateTime.Now;
                Transaction t = new Transaction();
                Wallet w = walletRepo.GetWallet(userRepo.GetUser(dViewModel.UserId).Id);  //User, Wallet same Id
                int depositId = depositRepo.GetDeposits().OrderBy(d => d.Id).Last().Id + 1;
                try
                {
                    w.Money = w.Money + dViewModel.Amount;
                    walletRepo.UpdateWallet(w);

                    t.Id = transactionRepo.GetTransactions().OrderBy(t => t.Id).Last().Id + 1;
                    t.Amount = w.Money;
                    t.Date = depositTime;
                    t.Description = "Added " + w.Money + " to the Wallet";
                    t.WalletId = w.Id;
                    transactionRepo.InsertTransaction(t);

                    Deposit deposit = new Deposit
                    {
                        Id = depositId,
                        Date = DateTime.Now,
                        Amount = dViewModel.Amount,
                        Description = dViewModel.Description,
                        UserId = dViewModel.UserId,
                    };

                    depositRepo.InsertDepsoit(deposit);
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
