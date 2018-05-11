using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RF.Web.Models;
using RF.Helpers;
using System.Configuration;
using System.Net.Mail;
using System.Text;
using RF.EF;

namespace RF.Web.Controllers
{
    public class ContactUsController : Controller
    {
        [HttpPost]
        [ActionName("ContactUsForm")]
        public ActionResult ContactUsFormSubmit(WebQuery model)
        {
            if (!ModelState.IsValid)
            {
                TempData.Add("Status", "Invalid form Data");
                ModelState.Clear();
                return View();
            }
            else
            {

                SendMailToSupportCenter(model);
                TempData.Add("Success", true);
                ModelState.Clear();
                model.Email = string.Empty;
                model.Name = string.Empty;
                model.Message = string.Empty;
                model.Phone = string.Empty;
                //model.SaveChanges();

                return View();

            }

        }

        public void SendMailToSupportCenter(WebQuery model)
        {
            if (ModelState.IsValid)
            {
                MailAddress From = new MailAddress(ConfigurationManager.AppSettings["no-reply-email"]);
                MailAddress To = new MailAddress(ConfigurationManager.AppSettings["contactus-email"]);
                var mail = new Email();
                var sb = new StringBuilder();
                sb.AppendFormat("Names :{0} <br />", model.Name);
                sb.AppendFormat("Email address: {0} <br />", model.Email);
                sb.AppendFormat("Phone Number : {0} <br/>", model.Phone);
                sb.AppendFormat("Message: ", model.Message);

                mail.MailFromAddress = ConfigurationManager.AppSettings["no-reply-email"];
                mail.MailBodyHtml = sb.ToString();
                mail.Subject = "ContactUs - From website";
                mail.MailToAddress = ConfigurationManager.AppSettings["contactus-email"];
                mail.SendMail();


            }
        }

        public void SaveToDatabase(WebQuery model)
        {
            EF.Models.RentalFinderEntities rentalFinderEntities = new EF.Models.RentalFinderEntities();
            var webquery = new WebQuery()
            {
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Message = model.Message,
                CreatedOn = model.CreatedOn

            };
            //<webquery>
            //rentalFinderEntities.SaveChanges(webquery);

        }
    }
}