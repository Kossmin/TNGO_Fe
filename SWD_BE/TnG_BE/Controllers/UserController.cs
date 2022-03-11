using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TnGContext _context;
        private IUserRepository userRepo;

        public UsersController(TnGContext context)
        {
            this.userRepo = new UserRepository(context);
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> ss = userRepo.GetUsers();
            return ss;
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
        public String PostUser(User User)
        {
            try
            {
                userRepo.InsertUser(User);
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
