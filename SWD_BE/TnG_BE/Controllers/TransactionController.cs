using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public TransactionsController(TnGContext context)
        {
            this.transRepo = new TransactionRepository(context);
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public IEnumerable<Transaction> GetTransactions(int page)
        {
            IEnumerable<Transaction> ss = transRepo.GetTransactions().Skip(page * 10).Take(10);
            if(ss.Any())
            {
                return ss;
            }
            return null;
        }

        // GET: api/Transactions/5
        [HttpGet(template: "get/{id}")]
        public Transaction GetTransaction(int id)
        {
            Transaction s = transRepo.GetTransaction(id);
            if (s == null)
            {
                return null;
            }
            return s;
        }

        [HttpGet(template: "get-user-transaction")]
        public IEnumerable<Transaction> GetUserTransaction(int page, int walletId)
        {
            IEnumerable<Transaction> ss = transRepo.GetTransactions()
                .Where(t => t.WalletId == walletId);
            if (ss.Any())
            {
                return ss;
            }
            return null;
        }
        
        [HttpDelete(template: "delete-transaction-history")]
        public string DeleteTransactionHistory (int walletId)
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

