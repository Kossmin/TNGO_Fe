using TnG_BE.Models;

namespace TnG_BE.DTO
{
    public class UserDTO
    {
        public UserDTO(IEnumerable<User> users, int totalPage, int pageIndex)
        {
            Users = users;
            TotalPage = totalPage;
            PageIndex = pageIndex;
        }

        public virtual IEnumerable<User> Users { get; set; }
        public int TotalPage { get; set; }
        public int PageIndex { get; set; }
    }
}
