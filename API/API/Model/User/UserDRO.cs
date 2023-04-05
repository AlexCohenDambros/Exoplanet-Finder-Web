namespace API.Model.User
{
    public class UserDRO
    {
        public UserDRO(int id, string email)
        {
            this.email= email;
            this.id = id;
        }
        public int id { get; set; }

        public string email { get; set; }
    }
}
