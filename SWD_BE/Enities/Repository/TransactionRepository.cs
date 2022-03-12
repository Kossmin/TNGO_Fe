using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly TnGContext _context;
        public TransactionRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeleteTransaction(int id)
        {
            var t = _context.Transactions.Find(id);
            _context.Transactions.Remove(t);
            return true;
        }

        public Transaction GetTransaction(int id)
        {
            var t = _context.Transactions.Find(id);
            return t;
        }

        public IEnumerable<Transaction> GetTransactions()
        {
            var ts = _context.Transactions.ToList();
            return ts;
        }

        public int InsertTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
            return transaction.Id;
        }

        public bool UpdateTransaction(Transaction transaction)
        {
            _context.Transactions.Remove(transaction);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
