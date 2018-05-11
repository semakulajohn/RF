using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace RF.Web.Models
{
    public class WebQuery
    {
        public int WebQueryId { get; set; }
        public string Name { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string Message { get; set; }
        public string Phone { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                           @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                           @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                           ErrorMessage = "Email is not valid")]
        public string Email { get; set; }

    
    }
}