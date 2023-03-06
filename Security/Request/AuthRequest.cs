using System.ComponentModel.DataAnnotations;

namespace Test_Enterprise_Back.Security.Request
{
    public class AuthRequest
    {
        [Required]
        public string? name { get; set; }
        [Required]
        public string? password {get; set;}
    }
}
