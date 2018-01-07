CREATE TABLE [dbo].[Category]
(
	[CategoryId] 	BIGINT IDENTITY(1,1) NOT NULL,		 
	[Name]		NVARCHAR(MAX) NOT NULL,
	

	 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([CategoryId] ASC),
	
)
GO




