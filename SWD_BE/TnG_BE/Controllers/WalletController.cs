using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    public class UserController
    {
        [Route("api/v1/wallet")]
        [ApiController]
        public class WalletsController : ControllerBase
        {
            private readonly TnGContext _context;
            private IWalletRepository walletRepo;

            public WalletsController(TnGContext context)
            {
                this.walletRepo = new WalletRepository(context);
                _context = context;
            }

            // GET: api/Wallets
            [HttpGet]
            public IEnumerable<Wallet> GetWallets()
            {
                IEnumerable<Wallet> ss = walletRepo.GetWallets();
                return ss;
            }

            // GET: api/Wallets/5
            [HttpGet(template: "get/{id}")]
            public Wallet GetWallet(int id)
            {
                Wallet s = walletRepo.GetWallet(id);
                if (s == null)
                {
                    return null;
                }
                return s;
            }

            // PUT: api/Wallets/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut(template: "update")]
            public String PutWallet(Wallet Wallet)
            {
                try
                {
                    walletRepo.UpdateWallet(Wallet);
                }
                catch (Exception)
                {
                    return "Update Failed";
                }
                return "Update Success";
            }

            // POST: api/Wallets
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public String PostWallet(Wallet Wallet)
            {
                try
                {
                    walletRepo.InsertWallet(Wallet);
                }
                catch (Exception)
                {
                    return "Add Failed";
                }
                return "Add Success";
            }

            // DELETE: api/Wallets/5
            [HttpDelete("{id}")]
            public String DeleteWallet(int id)
            {
                try
                {
                    if (WalletExists(id))
                    {
                        walletRepo.DeleteWallet(id);
                    }
                }
                catch (Exception)
                {
                    return "Delete Failed";
                }
                return "Delete Success";
            }

            private bool WalletExists(int id)
            {
                return _context.Wallets.Any(e => e.Id == id);
            }
        }
    }
}
