using API.Model.User;

namespace API.Service.User
{
    public interface UserService
    {
        IEnumerable<UserModel> GetAllUsers();
        UserModel TransformDTOtoUser(UserDTO userDTO);
    }
}
