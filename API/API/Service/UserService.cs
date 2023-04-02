using API.Model;
using API.Repository;
using Microsoft.IdentityModel.Tokens;

namespace API.Service
{
    public class UserService
    {
        private UserRepository userRepository;


        public UserService(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }


        public IEnumerable<User> GetAllUsers()
        {
            return userRepository.GetAll();
        }
    }
}

