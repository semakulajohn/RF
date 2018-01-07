CREATE TABLE [dbo].[Rental]
(
	[RentalId] 	BIGINT IDENTITY(1,1) NOT NULL,		 
	[Description]		NVARCHAR(MAX) NOT NULL,
	[Location]		NVARCHAR(MAX) NOT NULL,
	[CategoryId]    BIGINT NOT NULL,
	[NumberOfRooms]  INT NOT NULL,
	[Occupied]		BIT NOT NULL,
	[RentFee]		FLOAT NOT NULL,
    [CreatedOn]		DATETIME NOT NULL, 
    [Timestamp]		DATETIME NOT NULL,
	[CreatedBy]		nvarchar (128) not null,
	[UpdatedBy]		nvarchar (128) null,
	[Deleted]		BIT NOT NULL,
	[DeletedBy]		nvarchar (128) null,
	[DeletedOn]		DATETIME NULL,
	

	 CONSTRAINT [PK_Rental] PRIMARY KEY CLUSTERED ([RentalId] ASC),
	 CONSTRAINT [FK_dbo_Rental_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category](CategoryId),
	CONSTRAINT [FK_dbo_Rental_CreatedBy] FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[AspNetUsers](Id),
	CONSTRAINT [FK_dbo_Rental_UpdatedBy] FOREIGN KEY ([UpdatedBy]) REFERENCES [dbo].[AspNetUsers](Id),
	CONSTRAINT [FK_dbo_Rental_DeletedBy] FOREIGN KEY ([DeletedBy]) REFERENCES [dbo].[AspNetUsers](Id),
	
)
GO
ALTER TABLE [dbo].[Rental] ADD  CONSTRAINT [DF_dbo_Rental_Deleted]  DEFAULT ((0)) FOR [Deleted]
GO
ALTER TABLE [dbo].[Rental] ADD  CONSTRAINT [DF_dbo_Rental_Occupied]  DEFAULT ((0)) FOR [Occupied]
GO

