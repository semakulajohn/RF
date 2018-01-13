using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RF.BAL.Interface;
using log4net;
using RF.Models;

namespace RF.Admin.Controllers
{
    public class RentalApiController : ApiController
    {
        private IRentalService _rentalService;
            private IUserService _userService;
            ILog logger = log4net.LogManager.GetLogger(typeof(RentalApiController));
            private string userId = string.Empty;

            public RentalApiController()
            {
            }

            public RentalApiController(IRentalService rentalService,IUserService userService)
            {
                this._rentalService = rentalService;
                this._userService = userService;
                userId = Microsoft.AspNet.Identity.IdentityExtensions.GetUserId(RequestContext.Principal.Identity);
            }

            [HttpGet]
            [ActionName("GetRental")]
            public Rental GetRental(long rentalId)
            {
                return _rentalService.GetRental(rentalId);
            }

            [HttpGet]
            [ActionName("GetAllRentals")]
            public IEnumerable<Rental> GetAllRentals()
            {
                return _rentalService.GetAllRentals();
            }

            [HttpGet]
            [ActionName("GetAllCategories")]
            public IEnumerable<Category> GetAllCategories()
            {
                return _rentalService.GetAllCategories();
            }

            [HttpGet]
            [ActionName("Delete")]
            public void DeleteRental(long rentalId)
            {
                _rentalService.MarkAsDeleted(rentalId, userId);
            }

            [HttpPost]
            [ActionName("Save")]
            public long Save(Rental model)
            {

                var rentalId = _rentalService.SaveRental(model, userId);
                return rentalId;
            }
    }
}
