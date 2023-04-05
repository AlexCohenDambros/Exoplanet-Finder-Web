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
            return (users.Any() ? Ok(users) : BadRequest());
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] UserDTO u)
        {
           //var user = ""
        }
    }
}
