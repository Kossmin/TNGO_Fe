using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        User GetUser(int id);
        int InsertUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(int id);
        string NormalLogin (string email, string password);
    }
}
