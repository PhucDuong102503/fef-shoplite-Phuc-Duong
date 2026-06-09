// URL của API cung cấp dữ liệu sản phẩm
const API_URL = 'https://fakestoreapi.com/products';

// Khai báo các biến trạng thái cho tính năng Phân trang
let allProducts = []; // Mảng chứa toàn bộ 20 sản phẩm lấy từ API
let currentPage = 1;  // Trang hiện tại đang xem (mặc định là 1)
const itemsPerPage = 8; // Số lượng sản phẩm muốn hiển thị trên 1 trang

/** ==========================================gọi api============================================== */

// Lắng nghe sự kiện: Chờ cho HTML load xong hết thì mới chạy hàm fetchProducts
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});


// Hàm gọi API lấy sản phẩm (dùng async/await)
async function fetchProducts() {
    // Lấy các thẻ HTML cần thao tác
    const spinner = document.getElementById('loading-spinner');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Lỗi tải dữ liệu');
        
        // 1. Lưu TOÀN BỘ sản phẩm vào biến toàn cục allProducts
        allProducts = await response.json(); 
        
        spinner.classList.add('d-none');
        
        // 2. Thay vì render tất cả, ta chỉ render Trang 1
        displayPage(currentPage); 

    } catch (error) {
        console.error(error);
        spinner.innerHTML = '<p class="text-danger">Lỗi tải dữ liệu.</p>';
    }
}
/** ======================================================================================== */

/** ==========================================phân trang=============================================== */
// Hàm hiển thị sản phẩm của một trang cụ thể
function displayPage(page) {
    // 1. Tính toán vị trí cắt mảng (Logic cốt lõi của phân trang)
    const startIndex = (page - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage;
    
    // Ví dụ: Trang 1 => (1-1)*9 = 0. Cắt từ index 0 đến 9.
    // Trang 2 => (2-1)*9 = 9. Cắt từ index 9 đến 18.
    
    // 2. Dùng hàm slice() của mảng để cắt lấy đúng số lượng cần thiết
    const productsToDisplay = allProducts.slice(startIndex, endIndex);
    
    // 3. Gọi hàm renderProducts (hàm đã có) để vẽ ra giao diện
    renderProducts(productsToDisplay);
    
    // 4. Vẽ lại các nút phân trang cho đúng trạng thái đang click
    renderPagination();
}

// Hàm vẽ các nút phân trang
function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Xóa rỗng trước khi vẽ
    
    // Tính tổng số trang (Ví dụ: 20 sản phẩm / 9 = 2.2 => làm tròn lên là 3 trang)
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    // Tạo vòng lặp để vẽ ra số nút bằng với tổng số trang
    for (let i = 1; i <= totalPages; i++) {
        // Nếu trang i trùng với trang hiện tại thì đổi màu thành xanh (class active)
        const activeClass = (i === currentPage) ? 'active' : '';
        
        const liHtml = `
            <li class="page-item ${activeClass}">
                <button class="page-link" onclick="changePage(${i})">${i}</button>
            </li>
        `;
        paginationContainer.insertAdjacentHTML('beforeend', liHtml);
    }
}

// Hàm xử lý sự kiện khi người dùng click vào nút trang
function changePage(page) {
    currentPage = page; // Cập nhật lại trang hiện tại
    displayPage(currentPage); // Gọi lại hàm hiển thị trang mới
    
    // Cuộn màn hình lên đầu danh sách sản phẩm cho mượt
    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
}

/** ==========================================Kết thúc phân trang=============================================== */

/** ==========================================Render giao diện============================================== */
// Hàm render (hiển thị) sản phẩm ra giao diện
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    
    // Xóa rỗng container trước khi đổ dữ liệu vào (phòng trường hợp gọi lại)
    productsContainer.innerHTML = '';

    // Vòng lặp: Đi qua từng sản phẩm trong mảng
    products.forEach(product => {
        // Tạo một chuỗi HTML đại diện cho 1 Card sản phẩm
        const productCard = `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm product-card">
                    <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 200px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title text-truncate" title="${product.title}">${product.title}</h6>
                        <p class="card-text text-muted small">${product.category}</p>
                        <h5 class="text-danger fw-bold mt-auto">$${product.price}</h5>
                        
                        <div class="mt-3">
                            <a href="product.html?id=${product.id}" class="btn btn-outline-dark btn-sm w-100 mb-2">Xem chi tiết</a>
                            <button class="btn btn-warning btn-sm w-100">
                                <i class="bi bi-cart-plus"></i> Thêm Giỏ Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Chèn chuỗi HTML này vào trong Container
        productsContainer.insertAdjacentHTML('beforeend', productCard);
    });
}
/** ======================================================================================== */

