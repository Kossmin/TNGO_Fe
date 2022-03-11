using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class DepositRepository : IDepositRepository
    {
        private readonly TnGContext _context;
        public DepositRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeleteDeposit(int id)
        {
            var d = _context.Deposits.Find(id);
            _context.Deposits.Remove(d);
            return true;
        }

        public Deposit GetDeposit(int id)
        {
            var d = _context.Deposits.Find(id);
            return d;
        }

        public IEnumerable<Deposit> GetDeposits()
        {
            var ds = _context.Deposits.ToList();
            return ds;
        }

        public int InsertDepsoit(Deposit deposit)
        {
            _context.Deposits.Add(deposit);
            _context.SaveChanges();
            return deposit.Id;
        }

        public bool UpdateDeposit(Deposit deposit)
        {
            _context.Deposits.Update(deposit);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
