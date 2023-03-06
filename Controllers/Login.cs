using Microsoft.AspNetCore.Mvc;
using Test_Enterprise_Back.Models;
using Test_Enterprise_Back.Security.Request;
using Test_Enterprise_Back.Security.Response;
using Test_Enterprise_Back.Services;

namespace Test_Enterprise_Back.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public UserInterface _usuarioService;
        private readonly TestEnterpriseContext _context;

        public LoginController(TestEnterpriseContext context, UserInterface contextt)
        {
            _usuarioService = contextt;
            _context = context;
        }

        [HttpPost]
        public IActionResult Autentificar([FromBody] AuthRequest model)
        {
            Responses response = new Responses();
            var userResponse = _usuarioService.Auth(model);

            if (userResponse == null)
            {
                response.Succesfull = 0;
                response.Message = "Usuario o Contraseña Incorrecta";
                return BadRequest(response);
            }
            response.Succesfull = 1;
            response.Data = userResponse;
            return Ok(response);
        }
    }
}
