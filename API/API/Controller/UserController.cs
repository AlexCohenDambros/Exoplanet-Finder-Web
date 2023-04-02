using API.Model;
using API.Service;
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
            IEnumerable<User> users = _userService.GetAllUsers();
            return (users.Any() ? Ok(users) : BadRequest());
        }

    }
}
