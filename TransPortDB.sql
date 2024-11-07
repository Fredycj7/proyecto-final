-- Creacion de base de datos
CREATE DATABASE TransPortDB;
GO

-- Uso de la base de datos
USE TransPortDB;
GO

--  tabla para las Sedes
CREATE TABLE Sedes (
    SedeID INT IDENTITY(1,1) PRIMARY KEY,
    NombreSede NVARCHAR(100) NOT NULL,
    Ubicacion NVARCHAR(100) NOT NULL
);
GO

-- tabla para los Giros de Negocio
CREATE TABLE GirosNegocio (
    GiroID INT IDENTITY(1,1) PRIMARY KEY,
    NombreGiro NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255)
);
GO

--  tabla para los Presupuestos por Giro de Negocio
CREATE TABLE Presupuestos (
    PresupuestoID INT IDENTITY(1,1) PRIMARY KEY,
    GiroID INT FOREIGN KEY REFERENCES GirosNegocio(GiroID),
    Monto DECIMAL(18,2) NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE NOT NULL
);
GO

-- tabla para el Control de Gastos por Giro de Negocio
CREATE TABLE Gastos (
    GastoID INT IDENTITY(1,1) PRIMARY KEY,
    GiroID INT FOREIGN KEY REFERENCES GirosNegocio(GiroID),
    Descripcion NVARCHAR(255),
    Monto DECIMAL(18,2) NOT NULL,
    Fecha DATE NOT NULL
);
GO

--  tabla para Maquinaria y Camiones
CREATE TABLE MaquinariaCamiones (
    MaquinariaID INT IDENTITY(1,1) PRIMARY KEY,
    Tipo NVARCHAR(100) NOT NULL,
    Marca NVARCHAR(100),
    Modelo NVARCHAR(100),
    Año INT,
    GPSID NVARCHAR(50)
);
GO

-- tabla para el Monitoreo por GPS
CREATE TABLE MonitoreoGPS (
    MonitoreoID INT IDENTITY(1,1) PRIMARY KEY,
    MaquinariaID INT FOREIGN KEY REFERENCES MaquinariaCamiones(MaquinariaID),
    FechaHora DATETIME NOT NULL,
    Latitud DECIMAL(9,6),
    Longitud DECIMAL(9,6),
    Velocidad DECIMAL(5,2),
    TiempoUso DECIMAL(5,2)
);
GO

--  tabla para los Transportes de Materia Prima
CREATE TABLE Transportes (
    TransporteID INT IDENTITY(1,1) PRIMARY KEY,
    Empresa NVARCHAR(100) NOT NULL,
    Origen NVARCHAR(100),
    Destino NVARCHAR(100),
    Fecha DATE NOT NULL,
    MaquinariaID INT FOREIGN KEY REFERENCES MaquinariaCamiones(MaquinariaID)
);
GO

-- tabla para los Servicios de Construcción
CREATE TABLE ServiciosConstruccion (
    ServicioID INT IDENTITY(1,1) PRIMARY KEY,
    Descripcion NVARCHAR(255),
    Ubicacion NVARCHAR(100),
    FechaInicio DATE,
    FechaFin DATE,
    GiroID INT FOREIGN KEY REFERENCES GirosNegocio(GiroID)
);
GO

-- tabla para los Empleados
CREATE TABLE Empleados (
    EmpleadoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Cargo NVARCHAR(100),
    SedeID INT FOREIGN KEY REFERENCES Sedes(SedeID)
);
GO

--  tabla para Oficinas Administrativas
CREATE TABLE OficinasAdministrativas (
    OficinaID INT IDENTITY(1,1) PRIMARY KEY,
    Ubicacion NVARCHAR(100),
    Alquilada BIT,
    SedeID INT FOREIGN KEY REFERENCES Sedes(SedeID)
);
GO
