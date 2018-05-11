//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RF.EF.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Rental
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
        public long MediaFolderId { get; set; }
        public string ContactNumber { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        public virtual AspNetUser AspNetUser1 { get; set; }
        public virtual AspNetUser AspNetUser2 { get; set; }
        public virtual Category Category { get; set; }
        public virtual Media Media { get; set; }
    }
}
