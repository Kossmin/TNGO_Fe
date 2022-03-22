using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/transaction")]
    [ApiController]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly TnGContext _context;
        private ITransactionRepository transRepo;
        private IWalletRepository walletRepo;
        public TransactionsController(TnGContext context)
        {
            this.transRepo = new TransactionRepository(context);
            this.walletRepo = new WalletRepository(context);
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public ActionResult GetTransactions(int page)
        {
            IEnumerable<Transaction> ss = transRepo.GetTransactions().AsQueryable()
                .Join(walletRepo.GetWallets(), x => x.WalletId, y => y.Id, (x, y) => new Transaction(x, y))
                .Skip(page * 10).Take(10);
            if (ss == null)
            {
                return BadRequest();
            }
            var json = JsonConvert.SerializeObject(ss, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // GET: api/Transactions/5
        [HttpGet(template: "get/{id}")]
        public ActionResult GetTransaction(int id)
        {
            Transaction s = transRepo.GetTransaction(id);
            if (s == null)
            {
                return null;
            }
            s.Wallet = walletRepo.GetWallet(s.WalletId);

            var json = JsonConvert.SerializeObject(s, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        [HttpGet(template: "get-user-transaction")]
        public ActionResult GetUserTransaction(int page, int walletId)
        {
            IEnumerable<Transaction> ss = transRepo.GetTransactions().AsQueryable()
                .Where(t => t.WalletId == walletId)
                .Join(walletRepo.GetWallets(), x => x.WalletId, y => y.Id, (x, y) => new Transaction(x, y));
            if (ss.Any())
            {
                return BadRequest();
            }

            var json = JsonConvert.SerializeObject(ss, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        [HttpDelete(template: "delete-transaction-history")]
        public string DeleteTransactionHistory(int walletId)
        {
            try
            {
                IEnumerable<Transaction> ts = transRepo.GetTransactions()
                    .Where(t => t.WalletId == walletId);
                foreach (Transaction t in ts)
                {
                    transRepo.DeleteTransaction(t.Id);
                }
            }
            catch (Exception)
            {
                return "Delete Failed";
            }
            return "Delete History Success";
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }
    }
}

