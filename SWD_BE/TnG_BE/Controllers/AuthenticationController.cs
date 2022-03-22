using Firebase.Auth;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TnG_BE.Controllers
{
    [Route("api/v1/auth")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private static String ApiKey = "AIzaSyAwDrRFdYmjHsULu281vBQk4PbKWK1yH2I";
        private static String Bucket = "inspired-victor-343905.firebaseapp.com";
        private IConfiguration _config;

        public AuthenticationController(IConfiguration config)
        {
            _config = config;
        }

        //[HttpPost]
        //public async Task<String> SignUp(string Email, String Password, String Name)
        //{
        //    try
        //    {
        //        var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));

        //        var a = await auth.CreateUserWithEmailAndPasswordAsync(Email, Password, Name, true);
        //        ModelState.AddModelError(string.Empty, "Please Verify your email then login.");
        //    }
        //    catch (Exception ex)
        //    {
        //        ModelState.AddModelError(string.Empty, ex.Message);
        //    }
        //    return "Create Success";
        //}

        [HttpGet(template: "login")]
        public async Task<IActionResult> LoginAsync(string token)
        {
            if (token == null) return BadRequest();
            FirebaseToken decodedToken = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            string uid = decodedToken.Uid;
            string jwtToken = GenerateJsonWebToken(uid);

            if (jwtToken.Length != 0)
            {
                return Ok(new { token = jwtToken });
            }
            return Unauthorized();

        }

        [HttpGet(template: "sendNotify")]
        public IActionResult SendNotify(string token)
        {
            if (token == null) return BadRequest();
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("private_key.json")
            });

            // This registration token comes from the client FCM SDKs.
            var registrationToken = token;

            // See documentation on defining a message payload.
            var message = new Message()
            {
                Data = new Dictionary<string, string>()
                {
                    { "myData", "1337" },
                },
                Token = registrationToken,
                Topic = "all",
                Notification = new Notification()
                {
                    Title = "Test from code",
                    Body = "Here is your test!"
                }
            };

            // Send a message to the device corresponding to the provided
            // registration token.
            string response = FirebaseMessaging.DefaultInstance.SendAsync(message).Result;
            // Response is a message ID string.
            Console.WriteLine("Successfully sent message: " + response);
            return Ok(); ;
        }

        private static bool AutheticatedUserAsync(string uid)
        {
            var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));
            var ab = auth.SignInWithOAuthAsync(FirebaseAuthType.Google, uid).Result;
            var user = ab.User;
            if (user != null)
            {
                return true;
            }
            return false;
        }

        private string GenerateJsonWebToken(string uid)
        {
            /*var uidAdmin = _config.GetSection("AppSetting").GetSection("AdminUid");*/
            var uidAdmin = _config["AppSetting:AdminUid"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["AppSetting:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(type:"uid", value:uid),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())

            };
            var token = new JwtSecurityToken(
                issuer: _config["AppSetting:AdminUid"],
                audience: _config["AppSetting:AdminUid"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
                );
            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }
    }
}
