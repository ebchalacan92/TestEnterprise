using Test_Enterprise_Back.Security.Request;
using Test_Enterprise_Back.Security.Response;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using Test_Enterprise_Back.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Test_Enterprise_Back.Security.EncryptTools;
using Test_Enterprise_Back.Response;

namespace Test_Enterprise_Back.Services
{
  public class UserService : UserInterface
    {
         private static readonly Encoding Encoding1252 = Encoding.GetEncoding(1252);
        private readonly AppSettings _appSettings;
        private readonly TestEnterpriseContext _context;
        public UserService(IOptions<AppSettings> appSettings, TestEnterpriseContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public UserResponse Auth(AuthRequest model)
        {

            UserResponse userResponse = new UserResponse();
            {
                string spassword = Encrypt.GetSha256(model.password);

                var usuario = _context.Employee.Where(d => d.UserName == model.name && d.Password == spassword).FirstOrDefault();

                if (usuario == null) return null;
                userResponse.name = usuario.UserName;
                userResponse.token = GetToken(usuario);
            }
            return userResponse;
        }
        private string GetToken(Employee employee)
        {
            var tokeHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Code);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString()),
                        new Claim(ClaimTypes.Name, employee.UserName)
                    }
                    ),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokeHandler.CreateToken(tokenDescriptor);
            return tokeHandler.WriteToken(token);
    }
    }
}
