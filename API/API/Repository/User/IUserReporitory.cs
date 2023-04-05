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

        public UserDRO GetByEmail(string email)
        {
            using (IDbConnection connection = _serviceProvider.GetService<IDbConnection>()!)
            {
                connection.Open();
                string query = "select id, email from [User] where email=@email";
                UserModel u = connection.QueryFirstOrDefault<UserModel>(query,new {email});
                UserDRO? userDRO = (u == null) ? null : (new UserDRO(u.id, u.email));
                return userDRO;

            }
            
        }

        public UserDRO GetUserByID(int id)
        {
            using (IDbConnection connection = _serviceProvider.GetService<IDbConnection>()!)
            {
                connection.Open();
                string query = "select id, email from [User] where id=@id";
                UserModel u = connection.QueryFirstOrDefault<UserModel>(query, new { id});
                UserDRO? userDRO = (u == null) ? null : (new UserDRO(u.id, u.email));
                return userDRO;

            }
        }


        public UserDRO CreateNewUser(UserModel u)
        {
            
            using (IDbConnection connection = _serviceProvider.GetService<IDbConnection>()!)
            {
                connection.Open();
                string query = "insert into [User] (name, email, password) OUTPUT INSERTED.id, INSERTED.email values (@name, @email,@password)";
                UserModel Nu = connection.QueryFirst<UserModel>(query, new { name=u.name,email=u.email,password=u.password});

                return new UserDRO(Nu.id, Nu.email);

            }
        }
        
    }
}
