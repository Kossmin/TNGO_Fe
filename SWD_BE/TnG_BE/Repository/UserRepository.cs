using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class UserRepository : IUserRepository
    {
        TnGContext _context;
        public UserRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeleteUser(int id)
        {
            var d = _context.Users.Find(id);
            _context.Users.Remove(d);
            return true;
        }

        public User GetUser(int id)
        {
            var user = _context.Users.Find(id);
            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            var us = _context.Users.ToList();
            return us;
        }

        public int InsertUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user.Id;
        }

        public string NormalLogin(string email, string password)
        {
            User? u = _context.Users.FirstOrDefault(x => x.Email == email && x.Password == password);
            if (u == null)
            {
                return string.Empty;
            }
            return u.Name;
        }

        public bool UpdateUser(User user)
        {
            _context.Users.Update(user);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
