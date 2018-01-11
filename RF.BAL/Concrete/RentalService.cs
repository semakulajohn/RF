using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RF.DTO;
using RF.BAL.Interface;
using RF.DAL.Interface;
using RF.Models;
using log4net;

namespace RF.BAL.Concrete
{
  public  class RentalService : IRentalService
    {
       ILog logger = log4net.LogManager.GetLogger(typeof(RentalService));
        private IRentalDataService _dataService;
        private IUserService _userService;
               

        public RentalService(IRentalDataService dataService,IUserService userService)
        {
            this._dataService = dataService;
            this._userService = userService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="rentalId"></param>
        /// <returns></returns>
        public Rental GetRental(long rentalId)
        {
            var result = this._dataService.GetRental(rentalId);
            return MapEFToModel(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Rental> GetAllRentals()
        {
            var results = this._dataService.GetAllRentals();
            return MapEFToModel(results);
        } 

       
        public long SaveRental(Rental rental, string userId)
        {
            var rentalDTO = new DTO.RentalDTO()
            {
                RentalId = rental.RentalId,
                CategoryId = rental.CategoryId,
                Occupied = rental.Occupied,
                NumberOfRooms = rental.NumberOfRooms,
                Description = rental.Description,
                Location = rental.Location, 
                RentFee = rental.RentFee,

            };

           var rentalId = this._dataService.SaveRental(rentalDTO, userId);

           return rentalId;
                      
        }

        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="rentalId"></param>
        /// <param name="userId"></param>
        public void MarkAsDeleted(long rentalId, string userId)
        {
            _dataService.MarkAsDeleted(rentalId, userId);
        }

   

        #region Mapping Methods

        private IEnumerable<Rental> MapEFToModel(IEnumerable<EF.Models.Rental> data)
        {
            var list = new List<Rental>();
            foreach (var result in data)
            {
                list.Add(MapEFToModel(result));
            }
            return list;
        }

        /// <summary>
        /// Maps rental EF object to rental Model Object and
        /// returns the rental model object.
        /// </summary>
        /// <param name="result">EF rental object to be mapped.</param>
        /// <returns>rental Model Object.</returns>
        public Rental MapEFToModel(EF.Models.Rental data)
        {
          
            var rental = new Rental()
            {
                RentalId = data.RentalId,
                Occupied= data.Occupied,
                Description = data.Description,
                NumberOfRooms = data.NumberOfRooms,
                CategoryId = data.CategoryId,
                RentFee = data.RentFee,
                Location = data.Location,
                CreatedOn = data.CreatedOn,
                Timestamp = data.Timestamp,
                CreatedBy = _userService.GetUserFullName(data.AspNetUser),
                UpdatedBy = _userService.GetUserFullName(data.AspNetUser1),
               

            };
            return rental;
        }



       #endregion
    }
}
