using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface ITransactionRepository
    {
        IEnumerable<Transaction> GetTransactions();
        Transaction GetTransaction(int id);
        int InsertTransaction(Transaction transaction);
        bool UpdateTransaction(Transaction transaction);
        bool DeleteTransaction(int id);
    }
}
