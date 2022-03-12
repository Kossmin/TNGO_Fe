using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace TnG_BE
{
    public class CallFirebase
    {
        public virtual FirebaseApp AddFireBaseAsync()
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var jsonFireBasePath = Path.Combine(currentDirectory, "Cerf", "private_key.json");
            var defaultApp = FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile(jsonFireBasePath)
            });
            return defaultApp;
        }
    }
}
