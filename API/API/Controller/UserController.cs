using API.Model.User;
using API.Service.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
       public IActionResult GetAll()
        {
            IEnumerable<UserModel> users = _userService.GetAllUsers();
            return (users.Any() ? Ok(users) : BadRequest("error"));
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] UserDTO u)
        {
            var res = _userService.CreateUser(u);
            return (res!=null) ? Ok(res) : BadRequest("Information missing or user already exists");
        }

        [HttpGet("email/{email}")]
        public IActionResult GetByEmail(string email)
        {
            var res = _userService.GetUserByEmail(email);
            return (res!=null) ? Ok(res) : BadRequest("User does not exist");
        }


        [HttpGet("id/{id}")]
        public IActionResult GetUserByID(int id)
        {
            var res = _userService.GetUserByID(id);
            return (res != null) ? Ok(res) : BadRequest("User does not exist");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id){
            var res = _userService.DeleteUser(id);
            return res ? Ok() : BadRequest();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromBody] UserDTO userDTO, int id){
            var res = _userService.UpdateUser(userDTO, id);
            return res ? Ok() : BadRequest();

        }
    }
}
