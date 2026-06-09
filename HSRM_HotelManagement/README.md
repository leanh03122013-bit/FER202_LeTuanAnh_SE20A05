# HSRM - Hotel Service & Reservation Management

HSRM là dự án quản lý khách sạn được chuyển đổi từ cấu trúc mẫu FoodDeli sang nghiệp vụ khách sạn.
Dự án tạm thời **không dùng AI OCR, không dùng Docker, không dùng Socket.io**.

## Công nghệ

- Frontend: ReactJS + Vite
- Backend: NodeJS + ExpressJS
- Database: SQL Server
- Authentication: JWT
- API Client: Axios
- Version Control: GitHub

## Cấu trúc giống bài mẫu

```txt
client/
  src/
    api/
    components/
    config/
    contexts/
    hooks/
    pages/
    styles/
    utils/

server/
  config/
  controllers/
  dao/
  models/
  routes/
  services/
  utils/

database/
  HSRM_Database.sql
```

## Module chính

1. Authentication & Authorization
2. User Management
3. Room Type Management
4. Room Management
5. Guest Management
6. Reservation Management
7. Check-in / Check-out cơ bản
8. Service Management
9. Service Order Management
10. Invoice / Billing
11. Maintenance Request
12. Dashboard / Reports
13. Audit Logs

## Cách chạy database

Mở SQL Server Management Studio, chạy file:

```txt
database/HSRM_Database.sql
```

## Cách chạy backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Cách chạy frontend

```bash
cd client
npm install
npm run dev
```

Tài khoản mẫu:

```txt
Admin: admin@hsrm.com / 123456
Receptionist: reception@hsrm.com / 123456
Customer: customer@hsrm.com / 123456
Housekeeping: housekeeping@hsrm.com / 123456
Service Staff: service@hsrm.com / 123456
```
