using System.Security.Cryptography;
using System.Text;

namespace Test_Enterprise_Back.Security.EncryptTools
{
    public class Encrypt
    {
		public static string GetSha256(String str)
		{
			SHA256 sha256 = SHA256Managed.Create();
			ASCIIEncoding encoding = new();
			byte[] stream;
			StringBuilder sb = new();
			stream = sha256.ComputeHash(encoding.GetBytes(str));
			for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
			{
				return sb.ToString();
			}
		}
	}
}
