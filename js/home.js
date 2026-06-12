// ==================== FILE HOME.JS ====================
// File này chứa logic riêng cho trang Home (index.html)
// Nó sử dụng các hàm từ api.js và main.js
// =====================================================

// Khai báo các biến trạng thái
let allProducts = [];      // Mảng chứa toàn bộ sản phẩm lấy từ API
let activeProducts = [];   // Mảng chứa danh sách sản phẩm sau khi lọc/sắp xếp
let currentPage = 1;       // Trang hiện tại đang xem (mặc định là 1)
const itemsPerPage = 8;    // Số lượng sản phẩm hiển thị trên 1 trang

/** ========================================== GỌI API ============================================== */

// Lắng nghe sự kiện khi tài liệu HTML tải xong
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupEventDelegation();
    setupFilters();
});

// Hàm gọi API lấy sản phẩm
async function fetchProducts() {
    const spinner = document.getElementById('loading-spinner');

    try {
        // Gọi hàm fetchAllProducts() từ api.js
        allProducts = await fetchAllProducts(); 
        activeProducts = allProducts;
        
        spinner.classList.add('d-none');
        
        // Render trang đầu tiên
        displayPage(currentPage); 

    } catch (error) {
        console.error(error);
        if (spinner) {
            spinner.innerHTML = '<p class="text-danger py-4">Lỗi tải dữ liệu sản phẩm. Vui lòng F5 thử lại.</p>';
        }
    }
}

/** ========================================== EVENT DELEGATION ===================================== */

// Thiết lập lắng nghe sự kiện click bằng Event Delegation
function setupEventDelegation() {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.addEventListener('click', (event) => {
            const btn = event.target.closest('.btn-add-to-cart');
            if (btn) {
                const id = parseInt(btn.getAttribute('data-id'), 10);
                const product = allProducts.find(p => p.id === id);
                if (product) {
                    addToCart(product);
                }
            }
        });
    }
}

/** ========================================== BỘ LỌC & SẮP XẾP ===================================== */

// Thiết lập các bộ lắng nghe cho thanh công cụ lọc
function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.getElementById('filter-category');
    const sortProducts = document.getElementById('sort-products');

    if (searchInput) {
        // Áp dụng kỹ thuật Debounce 300ms khi người dùng nhập từ khóa tìm kiếm
        searchInput.addEventListener('input', debounce(() => {
            applyFiltersAndSort();
        }, 300));
    }

    if (filterCategory) {
        filterCategory.addEventListener('change', () => {
            applyFiltersAndSort();
        });
    }

    if (sortProducts) {
        sortProducts.addEventListener('change', () => {
            applyFiltersAndSort();
        });
    }
}

// Hàm kết hợp Lọc (Category) + Tìm kiếm (Search) + Sắp xếp (Sort) cùng lúc
function applyFiltersAndSort() {
    const searchKeyword = document.getElementById('search-input').value.toLowerCase().trim();
    const selectedCategory = document.getElementById('filter-category').value;
    const sortValue = document.getElementById('sort-products').value;

    let result = allProducts;

    // 1. Lọc theo danh mục
    if (selectedCategory) {
        result = result.filter(product => product.category === selectedCategory);
    }

    // 2. Lọc theo từ khóa tìm kiếm
    if (searchKeyword) {
        result = result.filter(product => product.title.toLowerCase().includes(searchKeyword));
    }

    // 3. Sắp xếp (Sort)
    if (sortValue === 'price-asc') {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortValue === 'title-asc') {
        result = [...result].sort((a, b) => a.title.localeCompare(b.title)); 
    } else if (sortValue === 'title-desc') {
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    // Reset trang hiện tại về trang 1
    currentPage = 1;
    activeProducts = result;

    displayPage(currentPage);
}

// Kỹ thuật Debounce giúp hoãn việc chạy hàm để tăng hiệu năng khi gõ phím
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/** ========================================== PHÂN TRANG =========================================== */

// Hàm hiển thị sản phẩm của một trang cụ thể
function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage;
    
    // Cắt mảng activeProducts để lấy số lượng sản phẩm trang hiện tại
    const productsToDisplay = activeProducts.slice(startIndex, endIndex);
    
    // Gọi hàm render ra giao diện
    renderProducts(productsToDisplay);
    
    // Vẽ các nút phân trang tương ứng
    renderPagination();
}

// Hàm vẽ các nút phân trang
function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = ''; // Xóa rỗng trước khi vẽ

    // Tính tổng số trang dựa trên activeProducts
    const totalPages = Math.ceil(activeProducts.length / itemsPerPage);

    // Nếu không có sản phẩm hoặc chỉ có 1 trang thì không cần vẽ nút phân trang
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = (i === currentPage) ? 'active' : '';
        
        const liHtml = `
            <li class="page-item ${activeClass}">
                <button class="page-link" onclick="changePage(${i})">${i}</button>
            </li>
        `;
        paginationContainer.insertAdjacentHTML('beforeend', liHtml);
    }
}

// Hàm xử lý sự kiện khi click chọn trang
function changePage(page) {
    currentPage = page;
    displayPage(currentPage);
    
    // Cuộn màn hình lên đầu danh sách sản phẩm mượt mà
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/** ========================================== RENDER GIAO DIỆN ===================================== */

// Hàm render sản phẩm ra giao diện
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    // Nếu không có sản phẩm nào sau khi lọc
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search text-muted" style="font-size: 2.5rem;"></i>
                <p class="text-muted mt-3" style="font-size: 0.95rem; letter-spacing: 0.05em;">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 product-card">
                    <img src="${product.image}" class="card-img-top p-4" alt="${product.title}" style="height: 220px; object-fit: contain;">
                    <div class="card-body d-flex flex-column p-4">
                        <p class="card-category mb-2">${product.category}</p>
                        <h6 class="card-title text-truncate mb-2" title="${product.title}">${product.title}</h6>
                        <p class="card-price mt-auto mb-3">$${product.price}</p>
                        
                        <div>
                            <a href="product.html?id=${product.id}" class="btn-gallery-outline mb-2">Xem chi tiết</a>
                            <button class="btn-gallery-primary btn-add-to-cart" data-id="${product.id}">
                                <i class="bi bi-bag-plus"></i> Thêm Giỏ Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', productCard);
    });
}
