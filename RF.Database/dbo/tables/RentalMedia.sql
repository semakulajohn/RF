CREATE TABLE [dbo].[RentalMedia]
(
	[RentalId]	[bigint] NOT NULL,
	[MediaId]	[bigint] NOT NULL,	
	PRIMARY KEY CLUSTERED ([RentalId] ASC, [MediaId] ASC),
	CONSTRAINT [FK_dbo_RentalMedia_RentalId] FOREIGN KEY ([RentalId]) REFERENCES [dbo].[Rental](RentalId),
	CONSTRAINT [FK_dbo_RentalMedia_MediaId] FOREIGN KEY ([MediaId]) REFERENCES [dbo].[Media](MediaId)
)
