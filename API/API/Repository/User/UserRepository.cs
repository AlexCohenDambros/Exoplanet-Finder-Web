using API.Model.User;

namespace API.Repository.User
{
    public interface UserRepository
    {

        IEnumerable<UserModel> GetAll();

        UserModel CreateNewUser(UserModel u);
    }
}
