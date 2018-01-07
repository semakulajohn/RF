using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RF.Web.Startup))]
namespace RF.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
