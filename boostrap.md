1. Thẻ HTML (Semantic HTML)
Thay vì dùng toàn thẻ <div>, chúng ta dùng các thẻ có ý nghĩa rõ ràng (đề bài yêu cầu phần này để lấy điểm Semantic):

<nav>: Dùng để bọc thanh điều hướng (Navigation bar).
<main>: Bọc nội dung chính của trang web.
<section>: Bọc một phân vùng nội dung (ví dụ: phân vùng Banner, phân vùng Danh sách sản phẩm).
<footer>: Bọc phần chân trang.
2. Các Class của Bootstrap
Bootstrap bản chất là một bộ CSS viết sẵn. Thay vì bạn phải tự viết CSS, bạn chỉ cần gọi tên class của nó ra là thẻ HTML sẽ tự đẹp. Dưới đây là ý nghĩa các class đã dùng:

a. Cấu trúc (Layout)

container: Căn giữa nội dung và tạo lề 2 bên để trang web không bị bè ra sát mép màn hình.
row: Tạo ra một "hàng" chứa các cột (dùng Flexbox).
g-4: (Gap 4) Tạo khoảng cách giữa các cột trong row đều đặn.
b. Căn chỉnh khoảng cách (Spacing) Quy tắc: m = margin (lề ngoài), p = padding (lề trong), t = top (trên), b = bottom (dưới), y = trục dọc (cả trên & dưới).

py-5: Padding trên và dưới mức độ 5 (tạo khoảng không gian rộng rãi cho vùng section).
mb-4: Margin bottom mức 4 (đẩy nội dung phía dưới ra xa một chút).
mt-2: Margin top mức 2.
ms-auto: Margin start auto (tự động đẩy phần tử về phía bên phải sát lề).
c. Màu sắc và Chữ (Colors & Typography)

bg-light / bg-dark: Màu nền sáng (xám nhạt) / Màu nền tối (đen).
text-center: Căn giữa chữ.
fw-bold: (Font weight bold) In đậm chữ.
text-primary: Chữ màu xanh dương chủ đạo.
text-muted: Chữ màu xám mờ (dùng cho các đoạn text phụ).
text-warning: Chữ màu vàng.
d. Các hiệu ứng Flexbox Ở thẻ <body> ta có dòng: <body class="d-flex flex-column min-vh-100">

d-flex: Bật chế độ Flexbox cho body.
flex-column: Xếp các khối (Navbar, Main, Footer) theo chiều dọc từ trên xuống.
min-vh-100: Chiều cao body tối thiểu bằng 100% màn hình.
<main class="flex-grow-1">: Main Content sẽ tự giãn nở ra lấp đầy khoảng trống. (Tổ hợp này giúp phần Footer luôn bị đẩy dính xuống đáy màn hình, kể cả khi trang web không có nội dung gì).
e. Các hiệu ứng khác

spinner-border: Tạo cái vòng tròn xoay xoay lúc chờ tải dữ liệu.
btn btn-primary: Tạo nút bấm màu xanh.