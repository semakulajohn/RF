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
    
    public partial class MediaType
    {
        public MediaType()
        {
            this.ExtensionTypes = new HashSet<ExtensionType>();
            this.Media = new HashSet<Media>();
        }
    
        public long MediaTypeId { get; set; }
        public string MediaType1 { get; set; }
    
        public virtual ICollection<ExtensionType> ExtensionTypes { get; set; }
        public virtual ICollection<Media> Media { get; set; }
    }
}
