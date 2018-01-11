using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RF.EF.UnitOfWork;
using RF.EF.Models;
using RF.EF.Context;

namespace RF.DAL
{
   public class DataServiceBase
    {
        private IUnitOfWork<RentalFinderEntities> _unitOfwork;

        protected IUnitOfWork<RentalFinderEntities> UnitOfWork { get { return this._unitOfwork; } }

        public DataServiceBase(IUnitOfWork<RentalFinderEntities> unitOfWork)
        {
            this._unitOfwork = unitOfWork;
        }
    }
}
