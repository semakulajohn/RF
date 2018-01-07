using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RF.Models
{
   public class Rental
    {
        public long RentalId { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public long CategoryId { get; set; }
        public int NumberOfRooms { get; set; }
        public bool Occupied { get; set; }
        public double RentFee { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime Timestamp { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public bool Deleted { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedOn { get; set; }
    }
}
