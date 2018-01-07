using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RF.Admin.Startup))]
namespace RF.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
