﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RF.EF.UnitOfWork;
using Ninject.Modules;

namespace RF.DependencyResolver
{
    public class ModelDependencyResolver : NinjectModule
    {
        public override void Load()
        {
            Bind(typeof(IUnitOfWork<>)).To(typeof(UnitOfWork<>));
        }
    }
}
