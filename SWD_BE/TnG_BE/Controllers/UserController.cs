using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly TnGContext _context;
        private IUserRepository userRepo;
        private IWalletRepository walletRepo;
        public UsersController(TnGContext context)
        {
            this.userRepo = new UserRepository(context);
            this.walletRepo = new WalletRepository(context);
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult GetUsers(int page, string name)
        {
            if (name == null) name = "";

            int totalUser = userRepo.GetUsers().Count();
            int totalPage = totalUser / 10;
            if (totalUser % 10 != 0) totalPage++;

            IEnumerable<User> us = userRepo.GetUsers().Skip(page * 10).Take(10)
                .Where(s => s.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
            if (us == null)
            {
                return BadRequest();
            }

            UserDTO users = new UserDTO(us, totalPage, page);
            var json = JsonConvert.SerializeObject(, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // GET: api/Users/5
        [HttpGet(template: "get/{id}")]
        public User GetUser(int id)
        {
            User s = userRepo.GetUser(id);
            if (s == null)
            {
                return null;
            }
            return s;
        }

        [HttpGet(template: "login")]
        public String GetUser(string email, string password)
        {
            return userRepo.NormalLogin(email, password);
        }
        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutUser(User User)
        {
            try
            {
                userRepo.UpdateUser(User);
            }
            catch (Exception)
            {
                return "Update Failed";
            }
            return "Update Success";
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostUser(User user)
        {
            int id = userRepo.GetUsers().OrderBy(u => u.Id).Last().Id + 1;
            user.Id = id;
            try
            {
                userRepo.InsertUser(user);
                //Add new Wallet for new user
                Wallet wallet = new Wallet();
                wallet.Id = walletRepo.GetWallets().OrderBy(w => w.Id).Last().Id + 1;
                wallet.Money = 0;
                wallet.Description = "";
                wallet.UserId = id;
                //End of Add new wallet
                walletRepo.InsertWallet(wallet);
            }
            catch (Exception)
            {
                return "Add Failed";
            }
            return "Add Success";
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public String DeleteUser(int id)
        {
            try
            {
                if (UserExists(id))
                {
                    userRepo.DeleteUser(id);
                }
            }
            catch (Exception)
            {
                return "Delete Failed";
            }
            return "Delete Success";
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
