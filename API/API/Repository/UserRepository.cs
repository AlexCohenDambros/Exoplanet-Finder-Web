using API.Model;

namespace API.Repository
{
    public interface UserRepository
    {

        IEnumerable<User> GetAll();
    }
}
