Dưới đây là bản dịch tiếng Việt của đề bài:

# Bài Tập Lớn FEF – "ShopLite" Mini E-Commerce

> **Mã bài:** FEF-LA-01
> **Thời gian:** 1 tuần (cá nhân)
> **Thang điểm:** 0–10

**Phạm vi kiến thức tích hợp:**

- HTML Semantic
- CSS Layout (Flexbox/Grid)
- Responsive Design
- Bootstrap
- JavaScript
- DOM & Event
- Fetch API

---

# 1. Bối cảnh và Mục tiêu

Học viên sẽ xây dựng **ShopLite** — một website bán hàng nhiều trang hoạt động hoàn toàn phía client (không cần backend).

Dữ liệu sản phẩm sẽ được lấy từ API công khai.

Bài tập mô phỏng một ứng dụng web thực tế với:

- Nhiều trang
- Giao diện phổ biến
- Gọi API
- Xử lý DOM tương đối phức tạp

Sau khi hoàn thành, học viên có thể chứng minh khả năng xây dựng một sản phẩm web hoàn chỉnh thay vì chỉ làm các bài tập nhỏ lẻ.

### Mục tiêu kép

1. Áp dụng toàn bộ kiến thức đã học vào một sản phẩm hoàn chỉnh.
2. Làm quen với quy trình phát triển thực tế:
   - Đọc tài liệu API
   - Thiết kế giao diện
   - Debug lỗi
   - Deploy sản phẩm

---

# 2. Công nghệ được phép sử dụng

| Phạm vi         | Công nghệ                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------- |
| Bắt buộc        | HTML5, CSS3, Vanilla JavaScript, Fetch API                                                   |
| Được phép       | Bootstrap 5 hoặc Tailwind CSS (chọn 1), Google Fonts, Bootstrap Icons hoặc Font Awesome      |
| Được phép       | localStorage để lưu giỏ hàng                                                                 |
| Không được phép | React, Vue, Angular, jQuery, thư viện quản lý state, AI tạo toàn bộ trang mà không hiểu code |

> Lý do không dùng framework JavaScript: học phần này kiểm tra kiến thức nền tảng. Bạn phải dùng Vanilla JavaScript để chứng minh khả năng làm việc với DOM và Event.

---

# 3. Nguồn dữ liệu (API)

Sử dụng:

**Fake Store API**

```
https://fakestoreapi.com/
```

| Chức năng              | Endpoint                      |
| ---------------------- | ----------------------------- |
| Lấy toàn bộ sản phẩm   | GET /products                 |
| Lấy sản phẩm theo ID   | GET /products/{id}            |
| Lấy danh sách danh mục | GET /products/categories      |
| Lọc theo danh mục      | GET /products/category/{name} |

Bạn có thể thay thế bằng:

```
https://dummyjson.com/products
```

miễn là dữ liệu thực vẫn được lấy từ API.

---

# 4. Yêu cầu sản phẩm

Website phải có tối thiểu **4 trang** và được liên kết bằng cùng một navbar.

---

## Trang 1 – Home / Danh sách sản phẩm (index.html)

### Bao gồm:

- Navbar
  - Logo
  - Menu
  - Icon giỏ hàng + số lượng sản phẩm

- Hero/Banner giới thiệu

- Danh sách sản phẩm dạng Grid hoặc Flexbox

Mỗi sản phẩm là một card gồm:

- Hình ảnh
- Tên sản phẩm
- Giá
- Nút:
  - View Details
  - Add To Cart

### Yêu cầu

- Dữ liệu phải lấy từ API
- Render bằng DOM
- Không được hard-code sản phẩm trong HTML

### Xử lý trạng thái

- Loading khi đang tải dữ liệu
- Error message nếu gọi API thất bại

### Footer

Bắt buộc có footer.

---

## Trang 2 – Chi tiết sản phẩm (product.html)

Nhận ID qua URL:

```html
product.html?id=5
```

Lấy dữ liệu:

```
/products/{id}
```

Hiển thị:

- Ảnh lớn
- Mô tả đầy đủ
- Giá
- Đánh giá (rating)

Có nút:

```
Add To Cart
```

hoạt động được.

---

## Trang 3 – Giỏ hàng (cart.html)

Hiển thị các sản phẩm đã thêm.

Dữ liệu được lưu bằng:

```javascript
localStorage;
```

Chức năng:

- Tăng số lượng
- Giảm số lượng
- Xóa sản phẩm
- Hiển thị tổng tiền cập nhật ngay lập tức

Nếu không có sản phẩm:

```
Giỏ hàng trống
```

---

## Trang 4 – Đăng ký / Liên hệ (register.html)

Form gồm:

- Họ tên
- Email
- Password
- Số điện thoại
- Select box
- Checkbox đồng ý điều khoản

### Validation bằng JavaScript

Không chỉ dùng HTML Validation.

Yêu cầu:

- Hiển thị lỗi dưới từng ô
- Chặn submit nếu dữ liệu sai
- Hiển thị thông báo thành công nếu hợp lệ

---

# 5. Yêu cầu kỹ thuật

## Semantic HTML

Sử dụng:

```html
<header>
  <nav>
    <main>
      <section>
        <footer></footer>
      </section>
    </main>
  </nav>
</header>
```

Hạn chế lạm dụng `<div>`.

---

## Responsive

Hiển thị tốt trên:

- Mobile (≤576px)
- Tablet
- Desktop

Navbar phải thu gọn trên mobile.

---

## CSS Layout

Phải thể hiện:

- Flexbox
- Grid

Tự viết CSS, không phụ thuộc hoàn toàn framework.

---

## DOM & Event

- Render động
- Xử lý:
  - click
  - submit
  - input

Sử dụng:

```javascript
addEventListener();
```

---

## Fetch API

Phải dùng:

```javascript
async/await
```

Kiểm tra:

```javascript
res.ok;
```

Xử lý lỗi bằng:

```javascript
try/catch
```

---

## Code sạch

- Đặt tên biến rõ ràng
- Đặt tên hàm rõ ràng
- JS tách file riêng
- Không để console.log thừa
- Không có lỗi trong Console

---

## Git

Commit nhiều lần.

Ví dụ:

```bash
git commit -m "Create navbar"
git commit -m "Add fetch products"
git commit -m "Implement cart feature"
```

Không được chỉ có:

```bash
git commit -m "final"
```

---

# 6. Thang điểm

## Mức Pass (0–6 điểm)

| Tiêu chí                                      | Điểm |
| --------------------------------------------- | ---- |
| Đủ 4 trang và navbar liên kết                 | 1.0  |
| HTML semantic đúng                            | 1.0  |
| Trang Home fetch và render sản phẩm           | 1.5  |
| Trang chi tiết hiển thị đúng sản phẩm theo ID | 1.0  |
| Form đăng ký có validation cơ bản             | 1.0  |
| Responsive cơ bản trên mobile                 | 0.5  |

**Tổng: 6 điểm**

---

## Mức Good (7–8 điểm)

Ngoài yêu cầu Pass:

| Tiêu chí                           | Điểm |
| ---------------------------------- | ---- |
| Giỏ hàng hoàn chỉnh + localStorage | 1.0  |
| Tìm kiếm hoặc lọc danh mục         | 0.5  |
| Loading và Error đầy đủ            | 0.3  |
| Flexbox/Grid viết tay tốt          | 0.2  |

**Tổng: 8 điểm**

---

## Mức Excellent (9–10 điểm)

| Tiêu chí                                    | Điểm |
| ------------------------------------------- | ---- |
| Event Delegation                            | 0.5  |
| Sort + Search + Filter cùng lúc             | 0.5  |
| Badge số lượng trên Navbar đồng bộ          | 0.3  |
| Pagination hoặc Load More                   | 0.3  |
| Spinner, Toast, Debounce                    | 0.2  |
| Code chất lượng cao, module hóa, README tốt | 0.2  |

**Tổng tối đa: 10 điểm**

---

### Trừ điểm

| Lỗi                             | Trừ                 |
| ------------------------------- | ------------------- |
| Console có lỗi                  | -0.5                |
| Hard-code dữ liệu thay vì Fetch | -1.0                |
| Copy giao diện mà không hiểu    | xử lý theo quy định |
| Không có lịch sử Git            | -0.5                |

---

# 7. Kế hoạch thực hiện trong 1 tuần

| Ngày   | Công việc                             |
| ------ | ------------------------------------- |
| Ngày 1 | Tạo repo, tạo 4 trang, navbar, footer |
| Ngày 2 | CSS, Bootstrap, Responsive            |
| Ngày 3 | Fetch API, render sản phẩm            |
| Ngày 4 | Trang chi tiết                        |
| Ngày 5 | Giỏ hàng + localStorage               |
| Ngày 6 | Validation + Search/Filter/Sort       |
| Ngày 7 | Sửa lỗi, README, Deploy               |

---

# 8. Quy định học thuật

- Được dùng AI hoặc Google để học và debug.
- Phải hiểu toàn bộ code của mình.

Sẽ có phần vấn đáp:

Giảng viên có thể chỉ vào bất kỳ đoạn code nào và hỏi:

- Đoạn này làm gì?
- Tại sao viết như vậy?

Không giải thích được sẽ bị trừ điểm.

Sao chép bài của người khác:

- Cả hai bên đều nhận 0 điểm.

---

# 9. Nộp bài

### Bước 1

Push source code lên GitHub Public:

```text
fef-shoplite-tenban
```

Ví dụ:

```text
fef-shoplite-phucduong
```

### Bước 2

Deploy bằng:

- GitHub Pages
- Netlify
- Vercel

Đưa link demo vào README.

### Bước 3

README phải có:

- Mô tả ngắn
- Ảnh chụp màn hình
- Hướng dẫn chạy
- Danh sách tính năng đã hoàn thành
  - Pass
  - Good
  - Excellent

### Bước 4

Nộp:

- Link GitHub
- Link Demo

theo hướng dẫn của giảng viên.

---

# 10. Tài liệu tham khảo

- Sổ tay môn học
- Tài liệu DOM & Event
- API Docs: [Fake Store API Docs](https://fakestoreapi.com/docs?utm_source=chatgpt.com)
- Deploy:
  - [GitHub Pages](https://pages.github.com/?utm_source=chatgpt.com)
  - [Netlify](https://www.netlify.com/?utm_source=chatgpt.com)

> Khuyến nghị: Hoàn thành thật chắc phần Pass trước, đảm bảo website chạy ổn định rồi mới làm các tính năng nâng cao. Một ứng dụng 4 trang chạy tốt, responsive và code sạch sẽ được đánh giá cao hơn một ứng dụng nhiều tính năng nhưng lỗi liên tục.
