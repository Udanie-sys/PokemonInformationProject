USE [master]
GO
/****** Object:  Database [PokemonDB]    Script Date: 5/20/2022 5:59:16 AM ******/
CREATE DATABASE [PokemonDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PokemonDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLSERVERUDANIE\MSSQL\DATA\PokemonDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PokemonDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLSERVERUDANIE\MSSQL\DATA\PokemonDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [PokemonDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PokemonDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PokemonDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PokemonDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PokemonDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PokemonDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PokemonDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [PokemonDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PokemonDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PokemonDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PokemonDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PokemonDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PokemonDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PokemonDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PokemonDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PokemonDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PokemonDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PokemonDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PokemonDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PokemonDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PokemonDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PokemonDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PokemonDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PokemonDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PokemonDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PokemonDB] SET  MULTI_USER 
GO
ALTER DATABASE [PokemonDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PokemonDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PokemonDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PokemonDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PokemonDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PokemonDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [PokemonDB] SET QUERY_STORE = OFF
GO
USE [PokemonDB]
GO
/****** Object:  UserDefinedFunction [dbo].[Split]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[Split] (@sep char(1), @s varchar(512))
RETURNS table
AS
RETURN (
    WITH Pieces(pn, start, stop) AS (
      SELECT 1, 1, CHARINDEX(@sep, @s)
      UNION ALL
      SELECT pn + 1, stop + 1, CHARINDEX(@sep, @s, stop + 1)
      FROM Pieces
      WHERE stop > 0
    )
    SELECT pn,
      SUBSTRING(@s, start, CASE WHEN stop > 0 THEN stop-start ELSE 512 END) AS s
    FROM Pieces
  )
GO
/****** Object:  Table [dbo].[Evolution]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Evolution](
	[Evolution_ID] [int] NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pokemon]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pokemon](
	[id] [int] NULL,
	[favourite] [bit] NULL,
	[name] [nvarchar](500) NULL,
	[classification] [nvarchar](500) NULL,
	[resistant] [nvarchar](500) NULL,
	[weaknesses] [nvarchar](500) NULL,
	[minimumWeight] [nvarchar](500) NULL,
	[maximumWeight] [nvarchar](500) NULL,
	[minimumHeight] [nvarchar](500) NULL,
	[maximumHeight] [nvarchar](500) NULL,
	[fleeRate] [float] NULL,
	[EvolutionRequirementsName] [nvarchar](500) NULL,
	[EvolutionRequirementsAmount] [int] NULL,
	[maxCP] [int] NULL,
	[maxHP] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pokemon_Has_Evolution]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pokemon_Has_Evolution](
	[Pokemon_ID] [int] NULL,
	[Evolution_ID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pokemon_Has_Types]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pokemon_Has_Types](
	[Pkemon_ID] [int] NULL,
	[Type_ID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Types]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Types](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[InsertPokemon]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Udanie>
-- Create date: <Create Date,05/20/2022,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[InsertPokemon]
	@id int,
	@favourite bit,
	@name nvarchar(500) null,
	@classification nvarchar(500) null,
	@types nvarchar(500) null,
	@resistant nvarchar(500) null,
	@weaknesses nvarchar(500) null,
	@minimumWeight nvarchar(500) null,
	@maximumWeight nvarchar(500) null,
	@minimumHeight nvarchar(500) null,
	@maximumHeight nvarchar(500) null,
	@fleeRate float null,
	@EvolutionRequirementsName nvarchar(500) null,
	@EvolutionRequirementsAmount int null,
	@maxCP int null,
	@maxHP int null
	

AS
DECLARE @insertedId INT;
BEGIN
	IF NOT EXISTS (SELECT * FROM Pokemon WHERE id = @id)
	BEGIN
	SET NOCOUNT ON;
	 
	INSERT INTO Pokemon VALUES(@Id,
	@favourite,
	@name,
	@classification,	
	@resistant ,
	@weaknesses ,
	@minimumWeight,
	@maximumWeight,
	@minimumHeight,
	@maximumHeight,
	@fleeRate,
	@EvolutionRequirementsName,
	@EvolutionRequirementsAmount,
	@maxCP,
	@maxHP);

	SET @insertedId=SCOPE_IDENTITY();
	
 BEGIN
 declare @TypeId as int;
 	
   BEGIN
	 	
      INSERT INTO Types(name)       
	  select (RTRIM(LTRIM(value))) as name from STRING_SPLIT(@types,',') 
			   WHERE (RTRIM(LTRIM(value)))
			   not in
      (SELECT distinct name FROM Types)
	  
   END
END
	Insert into [Pokemon_Has_Types] (Pkemon_ID,Type_ID)
	(select  @id as Pkemon_ID, id as Type_ID from Types where name in
	(select value from STRING_SPLIT(ltrim(rtrim(@types)),',')))
	   
	
	SELECT * FROM Pokemon WHERE id=@id;
END
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateFaorurite]    Script Date: 5/20/2022 5:59:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateFaorurite]
@id int,
@status bit
AS
BEGIN

UPDATE DBO.Pokemon SET favourite=@status WHERE id=@id;

END
GO
USE [master]
GO
ALTER DATABASE [PokemonDB] SET  READ_WRITE 
GO
