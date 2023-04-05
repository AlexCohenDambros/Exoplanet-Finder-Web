using API.Model.User;

namespace API.Repository.User
{
    public interface UserRepository
    {

        IEnumerable<UserModel> GetAll();

        UserDRO CreateNewUser(UserModel u);

        UserDRO GetUserByEmail(string email);

        UserDRO GetUserByID(int id);
    }
}
