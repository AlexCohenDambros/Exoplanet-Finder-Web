using API.Model.User;
using API.Repository.User;
using Microsoft.IdentityModel.Tokens;

namespace API.Service.User
{
    public class IUserService : UserService
    {
        private UserRepository userRepository;


        public IUserService(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }


        public IEnumerable<User> GetAllUsers()
        {
            return userRepository.GetAll();
        }
        public User TransformDTOtoUser(UserDTO userDTO)
        {
            var user = new User();
            user.name = userDTO.name;
            user.email = userDTO.email;
            user.password = UserDTO.password;
            return user;


        }
    }
}

