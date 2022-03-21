using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    public class UserController
    {
        [Route("api/v1/wallet")]
        [ApiController]
        [Authorize]
        public class WalletsController : ControllerBase
        {
            private readonly TnGContext _context;
            private IWalletRepository walletRepo;

            public WalletsController(TnGContext context)
            {
                this.walletRepo = new WalletRepository(context);
                _context = context;
            }

            // GET: api/Wallets/5
            [HttpGet(template: "get/{id}")]
            public ActionResult GetWallet(int id)
            {
                Wallet w = walletRepo.GetWallet(id);
                if (w == null)
                {
                    return BadRequest();
                }
                var json = JsonConvert.SerializeObject(w, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

                return Content(json, "application/json");
            }
        }
    }
}
