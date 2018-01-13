using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RF.EF.Models;
using RF.DTO;

namespace RF.DAL.Interface
{
  public  interface IRentalDataService
    {
        IEnumerable<Rental> GetAllRentals();
        Rental GetRental(long rentalId);
        long SaveRental(RentalDTO rental, string userId);
        void MarkAsDeleted(long rentalId, string userId);
        IEnumerable<Category> GetAllCategories();
    }
}
