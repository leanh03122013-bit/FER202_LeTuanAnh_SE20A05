-- ============================================================
-- HSRM HOTEL SERVICE & RESERVATION MANAGEMENT DATABASE
-- SQL Server
-- ============================================================

IF DB_ID('HSRM_DB') IS NOT NULL
BEGIN
    ALTER DATABASE HSRM_DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE HSRM_DB;
END
GO

CREATE DATABASE HSRM_DB;
GO

USE HSRM_DB;
GO

-- ============================================================
-- 1. SYSTEM TABLES
-- ============================================================

CREATE TABLE Roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    role_name NVARCHAR(50) NOT NULL UNIQUE,
    description NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    role_id INT NOT NULL,
    status NVARCHAR(20) DEFAULT 'Active',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Users_Roles FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);
GO

-- ============================================================
-- 2. HOTEL ROOM TABLES
-- ============================================================

CREATE TABLE RoomTypes (
    room_type_id INT IDENTITY(1,1) PRIMARY KEY,
    type_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    base_price DECIMAL(18,2) NOT NULL,
    capacity INT NOT NULL DEFAULT 2,
    status NVARCHAR(20) DEFAULT 'Active',
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Rooms (
    room_id INT IDENTITY(1,1) PRIMARY KEY,
    room_number NVARCHAR(20) NOT NULL UNIQUE,
    room_type_id INT NOT NULL,
    floor_number INT,
    status NVARCHAR(30) DEFAULT 'Available',
    note NVARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Rooms_RoomTypes FOREIGN KEY (room_type_id) REFERENCES RoomTypes(room_type_id),
    CONSTRAINT CK_Room_Status CHECK (status IN ('Available','Booked','InUse','Dirty','Maintenance'))
);
GO

-- ============================================================
-- 3. GUEST & RESERVATION TABLES
-- ============================================================

CREATE TABLE Guests (
    guest_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    email NVARCHAR(100),
    id_number NVARCHAR(50),
    gender NVARCHAR(20),
    date_of_birth DATE,
    address NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Reservations (
    reservation_id INT IDENTITY(1,1) PRIMARY KEY,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    adults INT DEFAULT 1,
    children INT DEFAULT 0,
    status NVARCHAR(30) DEFAULT 'Pending',
    note NVARCHAR(500),
    created_by INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Reservations_Guests FOREIGN KEY (guest_id) REFERENCES Guests(guest_id),
    CONSTRAINT FK_Reservations_Rooms FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
    CONSTRAINT FK_Reservations_Users FOREIGN KEY (created_by) REFERENCES Users(user_id),
    CONSTRAINT CK_Reservation_Status CHECK (status IN ('Pending','Confirmed','CheckedIn','CheckedOut','Cancelled')),
    CONSTRAINT CK_Reservation_Date CHECK (check_out_date > check_in_date)
);
GO

CREATE TABLE CheckIns (
    checkin_id INT IDENTITY(1,1) PRIMARY KEY,
    reservation_id INT NOT NULL UNIQUE,
    checkin_time DATETIME DEFAULT GETDATE(),
    actual_guest_count INT DEFAULT 1,
    receptionist_id INT,
    note NVARCHAR(500),
    CONSTRAINT FK_CheckIns_Reservations FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id),
    CONSTRAINT FK_CheckIns_Users FOREIGN KEY (receptionist_id) REFERENCES Users(user_id)
);
GO

-- ============================================================
-- 4. HOTEL SERVICE TABLES
-- ============================================================

CREATE TABLE Services (
    service_id INT IDENTITY(1,1) PRIMARY KEY,
    service_name NVARCHAR(100) NOT NULL,
    category NVARCHAR(50) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    description NVARCHAR(500),
    status NVARCHAR(20) DEFAULT 'Active',
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE ServiceOrders (
    service_order_id INT IDENTITY(1,1) PRIMARY KEY,
    reservation_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(18,2) NOT NULL,
    total_price AS (quantity * unit_price) PERSISTED,
    status NVARCHAR(30) DEFAULT 'Pending',
    note NVARCHAR(500),
    ordered_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_ServiceOrders_Reservations FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id),
    CONSTRAINT FK_ServiceOrders_Services FOREIGN KEY (service_id) REFERENCES Services(service_id),
    CONSTRAINT CK_ServiceOrder_Status CHECK (status IN ('Pending','Processing','Completed','Cancelled'))
);
GO

-- ============================================================
-- 5. BILLING TABLES
-- ============================================================

CREATE TABLE Invoices (
    invoice_id INT IDENTITY(1,1) PRIMARY KEY,
    reservation_id INT NOT NULL UNIQUE,
    room_fee DECIMAL(18,2) DEFAULT 0,
    service_fee DECIMAL(18,2) DEFAULT 0,
    discount_amount DECIMAL(18,2) DEFAULT 0,
    total_amount DECIMAL(18,2) DEFAULT 0,
    payment_method NVARCHAR(50),
    payment_status NVARCHAR(30) DEFAULT 'Unpaid',
    created_by INT,
    created_at DATETIME DEFAULT GETDATE(),
    paid_at DATETIME NULL,
    CONSTRAINT FK_Invoices_Reservations FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id),
    CONSTRAINT FK_Invoices_Users FOREIGN KEY (created_by) REFERENCES Users(user_id),
    CONSTRAINT CK_Invoice_Status CHECK (payment_status IN ('Unpaid','Paid','Cancelled'))
);
GO

-- ============================================================
-- 6. MAINTENANCE & LOGS
-- ============================================================

CREATE TABLE MaintenanceRequests (
    maintenance_id INT IDENTITY(1,1) PRIMARY KEY,
    room_id INT NOT NULL,
    reported_by INT,
    title NVARCHAR(150) NOT NULL,
    description NVARCHAR(500),
    priority NVARCHAR(20) DEFAULT 'Medium',
    status NVARCHAR(30) DEFAULT 'Pending',
    created_at DATETIME DEFAULT GETDATE(),
    completed_at DATETIME NULL,
    CONSTRAINT FK_Maintenance_Rooms FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
    CONSTRAINT FK_Maintenance_Users FOREIGN KEY (reported_by) REFERENCES Users(user_id),
    CONSTRAINT CK_Maintenance_Status CHECK (status IN ('Pending','InProgress','Completed','Cancelled'))
);
GO

CREATE TABLE AuditLogs (
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    action NVARCHAR(100) NOT NULL,
    table_name NVARCHAR(100),
    record_id INT,
    old_value NVARCHAR(MAX),
    new_value NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_AuditLogs_Users FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO

-- ============================================================
-- 7. SAMPLE DATA
-- Password seed is plain '123456' for development convenience.
-- New registered users are stored with bcrypt hash.
-- ============================================================

INSERT INTO Roles(role_name, description)
VALUES
('Admin', 'System administrator'),
('Receptionist', 'Front desk staff'),
('Customer', 'Hotel guest'),
('Housekeeping', 'Room cleaning and maintenance staff'),
('ServiceStaff', 'Food and laundry service staff');
GO

INSERT INTO Users(full_name, email, password_hash, phone, role_id)
VALUES
('System Admin', 'admin@hsrm.com', '123456', '0900000001', 1),
('Receptionist One', 'reception@hsrm.com', '123456', '0900000002', 2),
('Customer One', 'customer@hsrm.com', '123456', '0900000003', 3),
('Housekeeping One', 'housekeeping@hsrm.com', '123456', '0900000004', 4),
('Service Staff One', 'service@hsrm.com', '123456', '0900000005', 5);
GO

INSERT INTO RoomTypes(type_name, description, base_price, capacity)
VALUES
('Standard Room', 'Basic room for 1-2 guests', 500000, 2),
('Deluxe Room', 'Comfortable room with city view', 800000, 3),
('Suite Room', 'Luxury suite for VIP guests', 1500000, 4);
GO

INSERT INTO Rooms(room_number, room_type_id, floor_number, status)
VALUES
('101', 1, 1, 'Available'),
('102', 1, 1, 'Available'),
('201', 2, 2, 'Available'),
('202', 2, 2, 'Dirty'),
('301', 3, 3, 'Available'),
('302', 3, 3, 'Maintenance');
GO

INSERT INTO Guests(full_name, phone, email, id_number, gender, date_of_birth, address)
VALUES
('Nguyen Van A', '0911111111', 'nguyenvana@example.com', '012345678901', 'Male', '1999-01-01', 'Ha Noi'),
('Tran Thi B', '0922222222', 'tranthib@example.com', '098765432109', 'Female', '2000-05-20', 'Ho Chi Minh City');
GO

INSERT INTO Services(service_name, category, price, description)
VALUES
('Breakfast', 'Food', 100000, 'Morning breakfast service'),
('Laundry Service', 'Laundry', 50000, 'Laundry per kg'),
('Airport Pickup', 'Transport', 300000, 'Pickup from airport to hotel'),
('Extra Bed', 'Room', 200000, 'Extra bed per night');
GO

INSERT INTO Reservations(guest_id, room_id, check_in_date, check_out_date, adults, children, status, created_by)
VALUES
(1, 1, '2026-06-10', '2026-06-12', 2, 0, 'Confirmed', 2),
(2, 3, '2026-06-11', '2026-06-14', 2, 1, 'Pending', 2);
GO

INSERT INTO ServiceOrders(reservation_id, service_id, quantity, unit_price, status)
VALUES
(1, 1, 2, 100000, 'Completed'),
(1, 2, 1, 50000, 'Pending');
GO

-- ============================================================
-- 8. USEFUL VIEWS / PROCEDURES
-- ============================================================

CREATE VIEW vw_RoomOverview AS
SELECT 
    r.room_id,
    r.room_number,
    rt.type_name,
    rt.base_price,
    rt.capacity,
    r.floor_number,
    r.status
FROM Rooms r
JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id;
GO

CREATE VIEW vw_ReservationOverview AS
SELECT
    res.reservation_id,
    g.full_name AS guest_name,
    g.phone AS guest_phone,
    r.room_number,
    rt.type_name,
    res.check_in_date,
    res.check_out_date,
    DATEDIFF(DAY, res.check_in_date, res.check_out_date) AS nights,
    res.status,
    res.created_at
FROM Reservations res
JOIN Guests g ON res.guest_id = g.guest_id
JOIN Rooms r ON res.room_id = r.room_id
JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id;
GO

CREATE PROCEDURE sp_GetAvailableRooms
    @CheckInDate DATE,
    @CheckOutDate DATE,
    @RoomTypeId INT = NULL
AS
BEGIN
    SELECT r.*, rt.type_name, rt.base_price, rt.capacity
    FROM Rooms r
    JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id
    WHERE r.status = 'Available'
      AND (@RoomTypeId IS NULL OR r.room_type_id = @RoomTypeId)
      AND r.room_id NOT IN (
          SELECT room_id FROM Reservations
          WHERE status IN ('Pending','Confirmed','CheckedIn')
          AND NOT (check_out_date <= @CheckInDate OR check_in_date >= @CheckOutDate)
      );
END
GO

CREATE PROCEDURE sp_CalculateInvoice
    @ReservationId INT
AS
BEGIN
    DECLARE @RoomFee DECIMAL(18,2);
    DECLARE @ServiceFee DECIMAL(18,2);
    DECLARE @Total DECIMAL(18,2);

    SELECT @RoomFee = DATEDIFF(DAY, res.check_in_date, res.check_out_date) * rt.base_price
    FROM Reservations res
    JOIN Rooms r ON res.room_id = r.room_id
    JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id
    WHERE res.reservation_id = @ReservationId;

    SELECT @ServiceFee = ISNULL(SUM(total_price), 0)
    FROM ServiceOrders
    WHERE reservation_id = @ReservationId AND status = 'Completed';

    SET @Total = ISNULL(@RoomFee, 0) + ISNULL(@ServiceFee, 0);

    SELECT @RoomFee AS room_fee, @ServiceFee AS service_fee, @Total AS total_amount;
END
GO
