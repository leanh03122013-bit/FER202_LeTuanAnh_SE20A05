# Phân tích chuyển đổi từ FoodDeli sang HSRM

## 1. Nguyên tắc chuyển đổi

Dự án FoodDeli là hệ thống giao đồ ăn gồm các nhóm nghiệp vụ: Customer, Shop, Shipper, Admin, Product, Cart, Order, Payment, Review.
Dự án HSRM là hệ thống khách sạn nên chuyển đổi theo nghiệp vụ mới: Customer, Receptionist, Housekeeping, Service Staff, Admin, Room, Reservation, Service Order, Invoice, Maintenance.

## 2. Bảng ánh xạ nghiệp vụ

| FoodDeli | HSRM Hotel | Ý nghĩa chuyển đổi |
|---|---|---|
| Product | Room / Service | Món ăn chuyển thành phòng hoặc dịch vụ khách sạn |
| Shop | Hotel Admin / Service Staff | Cửa hàng chuyển thành bộ phận khách sạn |
| Shipper | Housekeeping / Service Staff | Người giao hàng chuyển thành nhân viên buồng phòng/dịch vụ |
| Cart | Reservation Draft / Service Order | Giỏ hàng chuyển thành đặt phòng hoặc đặt dịch vụ |
| Order | Reservation / Service Order | Đơn đồ ăn chuyển thành đơn đặt phòng hoặc đơn dịch vụ |
| Payment | Invoice | Thanh toán chuyển thành hóa đơn khách sạn |
| Review | Feedback | Có thể mở rộng sau, hiện chưa làm |
| Voucher | Promotion | Có thể mở rộng sau, hiện chưa làm |
| Notification | Audit Log / Status Tracking | Tạm thời lưu trạng thái bằng API, không dùng Socket.io |

## 3. Các role trong HSRM

| Role | Chức năng |
|---|---|
| Admin | Quản lý user, phòng, dịch vụ, báo cáo, audit log |
| Receptionist | Quản lý đặt phòng, check-in, check-out, hóa đơn |
| Customer | Xem phòng, đặt phòng, đặt dịch vụ, xem hóa đơn |
| Housekeeping | Xem phòng dirty, báo bảo trì, cập nhật trạng thái phòng |
| Service Staff | Xử lý đơn dịch vụ ăn uống/giặt là |

## 4. Luồng chính

### Luồng đặt phòng

Customer chọn phòng → tạo Reservation → Receptionist xác nhận → trạng thái phòng Booked.

### Luồng check-in

Receptionist tìm Reservation → xác nhận check-in → phòng chuyển InUse.

### Luồng đặt dịch vụ

Customer đặt dịch vụ → Service Staff xử lý → trạng thái Pending/Processing/Completed/Cancelled.

### Luồng check-out

Receptionist tạo Invoice → hệ thống cộng tiền phòng + dịch vụ → thanh toán → phòng chuyển Dirty.

### Luồng buồng phòng

Housekeeping dọn phòng Dirty → chuyển Available. Nếu có lỗi → tạo Maintenance Request → phòng chuyển Maintenance.

## 5. Những phần đã bỏ theo yêu cầu

- Bỏ Docker
- Bỏ Socket.io
- Bỏ AI OCR tạm thời
- Bỏ PayOS / thanh toán online
- Bỏ Firebase / video / map / shipper tracking
