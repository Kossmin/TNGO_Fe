using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/transaction")]
    [ApiController]
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
        public IEnumerable<Transaction> GetTransactions()
        {
            IEnumerable<Transaction> ss = transRepo.GetTransactions();
            return ss;
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

        // PUT: api/Transactions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutTransaction(Transaction Transaction)
        {
            try
            {
                transRepo.UpdateTransaction(Transaction);
            }
            catch (Exception)
            {
                return "Update Failed";
            }
            return "Update Success";
        }

        // POST: api/Transactions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostTransaction(Transaction Transaction)
        {
            try
            {
                transRepo.InsertTransaction(Transaction);
            }
            catch (Exception)
            {
                return "Add Failed";
            }
            return "Add Success";
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public String DeleteTransaction(int id)
        {
            try
            {
                if (TransactionExists(id))
                {
                    transRepo.DeleteTransaction(id);
                }
            }
            catch (Exception)
            {
                return "Delete Failed";
            }
            return "Delete Success";
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }
    }
}

