using Microsoft.AspNetCore;

namespace Test_Enterprise_Back
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                 .UseUrls("http://localhost:5056")
                .Build();
    }
}
