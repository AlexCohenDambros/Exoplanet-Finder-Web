using API.Model.User;

namespace API.Service.User
{
    public interface UserService
    {
        IEnumerable<UserModel> GetAllUsers();
        UserModel TransformDTOtoUser(UserDTO userDTO);

        UserDRO GetUserByEmail(string email);

        UserDRO GetUserByID(int id);

        UserDRO? CreateUser(UserDTO userInput);
    }
}
