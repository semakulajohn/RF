CREATE TABLE [dbo].[Image]
(
	[ImageId] 	BIGINT IDENTITY(1,1) NOT NULL,		 
	[Link]		NVARCHAR(MAX) NOT NULL,
	[RentalId]  BIGINT NOT NULL,
    [CreatedOn]		DATETIME NOT NULL, 
    [Timestamp]		DATETIME NOT NULL,
	[CreatedBy]		nvarchar (128) not null,
	[UpdatedBy]		nvarchar (128) null,
	[Deleted]		BIT NOT NULL,
	[DeletedBy]		nvarchar (128) null,
	[DeletedOn]		DATETIME NULL,
	

	 CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED ([ImageId] ASC),
	 CONSTRAINT [FK_dbo_Image_Rental] FOREIGN KEY ([RentalId]) REFERENCES [dbo].[Rental](RentalId),
	CONSTRAINT [FK_dbo_Image_CreatedBy] FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[AspNetUsers](Id),
	CONSTRAINT [FK_dbo_Image_UpdatedBy] FOREIGN KEY ([UpdatedBy]) REFERENCES [dbo].[AspNetUsers](Id),
	CONSTRAINT [FK_dbo_Image_DeletedBy] FOREIGN KEY ([DeletedBy]) REFERENCES [dbo].[AspNetUsers](Id),
	
)
GO
ALTER TABLE [dbo].[Image] ADD  CONSTRAINT [DF_dbo_Image_Deleted]  DEFAULT ((0)) FOR [Deleted]
GO

