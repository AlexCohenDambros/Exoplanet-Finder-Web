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
        public IEnumerable<UserModel> GetAllUsers()
        {
            return userRepository.GetAll();
        }
        public UserDRO GetUserByEmail(string email)
        {
            return userRepository.GetUserByEmail(email);
        }
        public UserDRO GetUserByID(int id)
        {
            return userRepository.GetUserByID(id);
        }
        public UserModel TransformDTOtoUser(UserDTO userDTO)
        {
            var user = new UserModel();
            user.name = userDTO.name;
            user.email = userDTO.email;
            user.password = userDTO.password;
            return user;
        }
        public UserDRO? CreateUser(UserDTO userInput)
        {
            var u = GetUserByEmail(userInput.email);
            return (u == null) ? userRepository.CreateNewUser(TransformDTOtoUser(userInput)) : null;
        }

        public bool DeleteUser(int id){
            if(GetUserByID(id)==null){
                return false;
            }
            return userRepository.DeleteUser(id);
        }

        public bool UpdateUser(UserDTO userDTO,int id){
            if(GetUserByID(id)==null){
                return false;
            }
            return userRepository.UpdateUser(userDTO,id);
        }
    }
}

