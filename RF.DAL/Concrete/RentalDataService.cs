﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RF.EF.Models;
using RF.DAL.Concrete;
using RF.DAL.Interface;
using RF.EF.UnitOfWork;
using RF.DTO;
using log4net;

namespace RF.DAL.Concrete
{
   public  class RentalDataService :DataServiceBase,IRentalDataService
    {
        ILog logger = log4net.LogManager.GetLogger(typeof(RentalDataService));

       public RentalDataService(IUnitOfWork<RentalFinderEntities> unitOfWork)
            : base(unitOfWork)
        {

        }

      
        public IEnumerable<Rental> GetAllRentals()
        {
            return this.UnitOfWork.Get<Rental>().AsQueryable().Where(r => r.Deleted == false);
        }

        public IEnumerable<Rental> GetLatestUnOccupiedRentals()
        {
            return this.UnitOfWork.Get<Rental>().AsQueryable().Where(r => r.Deleted == false && r.Occupied == false);
        }

        public Rental GetRental(long rentalId)
        {
            return this.UnitOfWork.Get<Rental>().AsQueryable()
                 .FirstOrDefault(c =>
                    c.RentalId == rentalId &&
                    c.Deleted == false
                );
        }

        /// <summary>
        /// Saves a new rental or updates an already existing rental.
        /// </summary>
        /// <param name="rental">rental to be saved or updated.</param>
        /// <param name="rentalId">RentalId of the rental creating or updating</param>
        /// <returns>rentalId</returns>
        public long SaveRental(RentalDTO rentalDTO, string userId)
        {
            long rentalId = 0;

           

            if (rentalDTO.RentalId == 0)
            {
                long mediaFolderId = 0;

                var media = new Media
                {
                    MediaGuid = Guid.NewGuid(),
                    //ParentId = rootGalleryId,
                    Name = rentalDTO.Description,
                    MediaTypeId = (long)RF.Library.EnumTypes.MediaType.Folder,
                    CreatedOn = DateTime.Now,
                    TimeStamp = DateTime.Now,
                    Deleted = false
                };

                this.UnitOfWork.Get<Media>().AddNew(media);
                this.UnitOfWork.SaveChanges();
                mediaFolderId = media.MediaId;
            
           
                var rental = new Rental()
                {
                       RentalId = rentalDTO.RentalId,
                       NumberOfRooms = rentalDTO.NumberOfRooms,
                       Occupied = rentalDTO.Occupied,
                       CategoryId = rentalDTO.CategoryId,
                       RentFee = rentalDTO.RentFee,  
                       ContactNumber = rentalDTO.ContactNumber,
                     Description = rentalDTO.Description,
                     MediaFolderId = mediaFolderId,
                    Location = rentalDTO.Location,
                    CreatedOn = DateTime.Now,
                    Timestamp = DateTime.Now,
                    CreatedBy = userId,
                    Deleted = false,
 

                };

                this.UnitOfWork.Get<Rental>().AddNew(rental);
                this.UnitOfWork.SaveChanges();
                rentalId = rental.RentalId;
                return rentalId;
            }

            else
            {
                var result = this.UnitOfWork.Get<Rental>().AsQueryable()
                    .FirstOrDefault(e => e.RentalId == rentalDTO.RentalId);
                if (result != null)
                {
                    result.CategoryId = rentalDTO.CategoryId;
                    result.Occupied = rentalDTO.Occupied;
                    result.NumberOfRooms = rentalDTO.NumberOfRooms;
                    result.UpdatedBy = userId;
                    result.RentFee = rentalDTO.RentFee;
                    result.Description = rentalDTO.Description;
                    result.ContactNumber = rentalDTO.ContactNumber;
                    result.Location = rentalDTO.Location;
                    result.Timestamp = DateTime.Now;
                    result.Deleted = rentalDTO.Deleted;
                    result.DeletedBy = rentalDTO.DeletedBy;
                    result.DeletedOn = rentalDTO.DeletedOn;
 
                    this.UnitOfWork.Get<Rental>().Update(result);
                    this.UnitOfWork.SaveChanges();
                }
                return rentalDTO.RentalId;
            }
            return rentalId;
        }

        public void MarkAsDeleted(long rentalId,string userId)
        {
           

            using (var dbContext = new RentalFinderEntities())
            {
              //  dbContext.Mark_rental_And_RelatedData_AsDeleted(rentalId, userId);
            }      

        }

        public IEnumerable<Category> GetAllCategories()
        {
            return this.UnitOfWork.Get<Category>().AsQueryable();
        }

      
    }
    
}
