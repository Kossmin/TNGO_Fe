using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class WalletRepository : IWalletRepository
    {
        private readonly TnGContext _context;
        public WalletRepository(TnGContext context)
        {
            _context = context;
        }
        public bool DeleteWallet(int id)
        {
            var w = _context.Wallets.Find(id);
            _context.Wallets.Remove(w);
            return true;
        }

        public Wallet GetWallet(int id)
        {
            var w = _context.Wallets.Find(id);
            return w;
        }

        public IEnumerable<Wallet> GetWallets()
        {
            var ws = _context.Wallets.ToList();
            return ws;
        }

        public int InsertWallet(Wallet wallet)
        {
            _context.Wallets.Add(wallet);
            _context.SaveChanges();
            return wallet.Id;
        }

        public bool UpdateWallet(Wallet wallet)
        {
            _context.Wallets.Update(wallet);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
