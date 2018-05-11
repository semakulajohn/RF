using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RF.BAL.Interface;
using RF.BAL.Concrete;
using log4net;
using RF.Models;

namespace RF.Web.Controllers
{
    public class RentalApiController : ApiController
    {
        private IRentalService _rentalService;
        
        ILog logger = log4net.LogManager.GetLogger(typeof(RentalApiController));
        private string userId = string.Empty;

        public RentalApiController()
        {
        }

        public RentalApiController(IRentalService rentalService)
        {
            this._rentalService = rentalService;
            
            userId = Microsoft.AspNet.Identity.IdentityExtensions.GetUserId(RequestContext.Principal.Identity);
        }


        [HttpGet]
        [ActionName("GetAllRentals")]
        public IEnumerable<Rental> GetAllRentals()
        {
            return _rentalService.GetAllRentals();
        }


        [HttpGet]
        [ActionName("GetLatestTenRentals")]
        public IEnumerable<Rental> GetLatestTenRentals()
        {
            return _rentalService.GetLatestUnOccupiedRentals();
        }

        [HttpGet]
        [System.Web.Http.ActionName("GetFeaturedRentals")]
        public IEnumerable<Rental> GetFeaturedRentals()
        {
            return _rentalService.GetFeaturedRentals();
        }

      
        [HttpGet]
        [ActionName("GetRental")]
        public Rental GetRental(long rentalId)
        {
            return _rentalService.GetRental(rentalId);
        }

    }
}
