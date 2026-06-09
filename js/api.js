// ==================== FILE API.JS ====================
// File này chứa các hàm gọi API dùng chung cho toàn bộ dự án.
// Các trang khác (home.js, product.js) sẽ gọi các hàm này
// thay vì phải tự viết lại logic fetch.
// =====================================================

// URL gốc của Fake Store API (chỉ cần sửa 1 chỗ này nếu đổi API)
const BASE_URL = 'https://fakestoreapi.com';

// Hàm lấy toàn bộ sản phẩm
async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Lỗi tải danh sách sản phẩm');
    return await response.json();
}

// Hàm lấy chi tiết 1 sản phẩm theo ID 
async function fetchProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy sản phẩm');
    return await response.json();
}

// Hàm lấy danh sách tất cả danh mục (category)
async function fetchCategories() {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Lỗi tải danh mục');
    return await response.json();
}
