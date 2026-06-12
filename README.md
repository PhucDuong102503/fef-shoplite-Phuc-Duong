# ShopLite - Mini E-Commerce Client-side Web App

Dự án **ShopLite** là một website bán hàng e-commerce mini, hoạt động hoàn toàn ở phía client (Client-side) mà không cần backend riêng, sử dụng dữ liệu sản phẩm từ Fake Store API. 

Giao diện được thiết kế theo phong cách tối giản, đơn sắc đương đại **Gallery Avant** (White-cube).

* **Link Github**: [https://github.com/PhucDuong102503/fef-shoplite-Phuc-Duong](https://github.com/PhucDuong102503/fef-shoplite-Phuc-Duong)
* **Link Demo (Vercel)**: [https://fef-shoplite-phuc-duong.vercel.app/](https://fef-shoplite-phuc-duong.vercel.app/)

---

## 📷 Ảnh Chụp Màn Hình Giao Diện

*(Chèn các hình ảnh screenshot giao diện Trang Chủ, Chi Tiết Sản Phẩm, Giỏ Hàng, và Đăng Ký tại đây)*

---

## 🛠️ Hướng Dẫn Chạy Dự Án Locally

1. **Tải mã nguồn về máy**:
   ```bash
   git clone https://github.com/PhucDuong102503/fef-shoplite-Phuc-Duong.git
   cd fef-shoplite-Phuc-Duong
   ```
2. **Khởi chạy trang web**:
   * Mở trực tiếp các file `.html` (ví dụ: `index.html`) trên trình duyệt Chrome, Edge, Firefox,...
   * Hoặc khuyên dùng: Mở bằng Extension **Live Server** trong VSCode để trải nghiệm mượt mà nhất.

---

## 🏆 Danh Sách Tính Năng Đã Hoàn Thành

Dự án đã được triển khai hoàn chỉnh 100% tất cả các tiêu chí từ cơ bản đến nâng cao:

### 1. Mức Đạt (Pass - 6.0 Điểm)
- [x] **Đầy đủ 4 trang và liên kết bằng Navbar chung**:
  - Trang Chủ (`index.html`)
  - Trang Chi tiết sản phẩm (`product.html`)
  - Trang Giỏ hàng (`cart.html`)
  - Trang Đăng ký (`register.html`)
- [x] **HTML Semantic chuẩn**: Sử dụng đúng cấu trúc `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, hạn chế lạm dụng `div`.
- [x] **Trang Home**: Gọi API Fake Store (`GET /products`) để lấy và hiển thị danh sách sản phẩm.
- [x] **Trang Chi Tiết**: Nhận ID qua URL query string (`?id=x`), gọi API lấy chi tiết sản phẩm và render động.
- [x] **Form Đăng Ký**: Validation bằng JavaScript thủ công (kiểm tra rỗng, đúng định dạng).
- [x] **Responsive**: Hiển thị tốt trên Mobile (≤576px), Tablet, Desktop; Hamburger menu hoạt động mượt mà.

### 2. Mức Khá (Good - 8.0 Điểm)
- [x] **Giỏ hàng hoàn chỉnh + localStorage**: Lưu trữ giỏ hàng, cho phép tăng/giảm số lượng, xóa sản phẩm, và cập nhật tổng tiền tức thời.
- [x] **Tìm kiếm và Lọc**: Có thanh tìm kiếm theo tên và lọc theo danh mục (category) trên Trang chủ.
- [x] **Loading & Error**: Có Spinner xoay hiển thị khi đang fetch dữ liệu, thông báo lỗi rõ ràng nếu gọi API thất bại.
- [x] **Flexbox/Grid viết tay**: Custom CSS hoàn toàn cho bố cục trang, không phụ thuộc hoàn toàn vào CSS framework.

### 3. Mức Xuất Sắc (Excellent - 10.0 Điểm)
- [x] **Event Delegation (Ủy quyền sự kiện)**: Áp dụng lắng nghe sự kiện click trên nút "Thêm vào giỏ" ở trang chủ (`#products-container`) và trang giỏ hàng (`#cart-items-container`) giúp tối ưu hiệu năng bộ nhớ.
- [x] **Bộ lọc kết hợp đồng thời**: Người dùng có thể vừa tìm kiếm chữ, vừa chọn danh mục, vừa sắp xếp theo giá tăng/giảm hoặc tên A-Z cùng một lúc.
- [x] **Badge số lượng đồng bộ**: Badge giỏ hàng trên Navbar ở tất cả các trang luôn hiển thị chính xác tổng số lượng sản phẩm đang có trong giỏ hàng.
- [x] **Phân trang (Pagination)**: Phân chia hiển thị 8 sản phẩm/trang ở trang chủ, tự động tính lại số lượng trang khi lọc.
- [x] **Spinner, Toast, Debounce**:
  - Có Spinner trạng thái chờ.
  - Có hộp thông báo Toast đen phẳng hiện góc màn hình khi tương tác giỏ hàng/thanh toán.
  - Áp dụng kỹ thuật Debounce 300ms khi gõ tìm kiếm để tránh render liên tục.
- [x] **Code chất lượng cao, module hóa**: Mã nguồn JavaScript được tách file khoa học (`api.js`, `main.js`, và các file js riêng biệt cho từng trang).