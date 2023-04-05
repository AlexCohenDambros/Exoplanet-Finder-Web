using API.Model.User;
using Dapper;
using System.Data;

namespace API.Repository.User
{
    public class IUserReporitory : UserRepository
    {
        private IServiceProvider _serviceProvider;

        public IUserReporitory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IEnumerable<UserModel> GetAll()
        {
            using (IDbConnection connection = _serviceProvider.GetService<IDbConnection>()!)
            {
                connection.Open();
                string query = "SELECT id, name, email,password from [User]";
                IEnumerable<UserModel> m = connection.Query<UserModel>(query);
                return m;

            }
        }

        public UserModel CreateNewUser(UserModel u)
        {
            string query = "insert into [User] (name, email, password) values"
        }
        
    }
}
