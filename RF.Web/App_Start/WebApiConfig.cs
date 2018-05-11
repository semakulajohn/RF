using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace RF.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute("API Default", "webapi/{controller}/{action}/{id}",
            new { action = RouteParameter.Optional, id = RouteParameter.Optional });
        }
    }
}
