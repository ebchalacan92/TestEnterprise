using Test_Enterprise_Back.Security.Request;
using Test_Enterprise_Back.Security.Response;

namespace Test_Enterprise_Back.Services
{
    public interface UserInterface
    {
        UserResponse Auth(AuthRequest model);
    }
}
