using API.Model;
using Dapper;
using System.Data;

namespace API.Repository
{
    public class IUserReporitory : UserRepository
    {
        private IServiceProvider _serviceProvider;

        public IUserReporitory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IEnumerable<User> GetAll()
        {
            using (IDbConnection connection = _serviceProvider.GetService<IDbConnection>()!)
            {
                connection.Open();
                string query = "SELECT id, name, email,password from [User]";
                IEnumerable<User> m = connection.Query<User>(query);
                return m;

            }
        }
    }
}
