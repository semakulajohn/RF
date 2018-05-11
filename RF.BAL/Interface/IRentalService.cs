using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RF.Models;

namespace RF.BAL.Interface
{
  public  interface IRentalService
    {
        IEnumerable<Rental> GetAllRentals();
        Rental GetRental(long rentalId);
        long SaveRental(Rental rental, string userId);
        void MarkAsDeleted(long rentalId, string userId);
        IEnumerable<Category> GetAllCategories();
        long GetMediaFolderId(int rentalId);
        IEnumerable<Models.Rental> GetFeaturedRentals();
        IEnumerable<Rental> GetLatestUnOccupiedRentals();
    }
}
