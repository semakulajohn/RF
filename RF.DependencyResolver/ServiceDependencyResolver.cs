using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ninject.Modules;
using RF.BAL.Concrete;
using RF.BAL.Interface;
using RF.DAL.Interface;
using RF.DAL.Concrete;

namespace RF.DependencyResolver
{
    public class ServiceDependencyResolver : NinjectModule
    {
        public override void Load()
        {
            //BAL
           // Bind(typeof(IUserService)).To(typeof(UserService));
            


            //DAL
           // Bind(typeof(IUserDataService)).To(typeof(UserDataService));
            
        }
    }
}
