// ==================== FILE PRODUCT.JS ====================
// Logic xử lý riêng cho trang Chi tiết sản phẩm (product.html)
// =====================================================

let currentProduct = null; // Biến lưu trữ sản phẩm hiện tại sau khi tải từ API

document.addEventListener('DOMContentLoaded', () => {
    initProductDetail();
});

// Hàm khởi tạo và tải thông tin sản phẩm
async function initProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    const spinner = document.getElementById('loading-spinner');
    const errorContainer = document.getElementById('error-container');
    const detailContainer = document.getElementById('product-detail-container');

    if (!productId || isNaN(productId)) {
        // Nếu không có ID hợp lệ trên URL
        spinner.classList.add('d-none');
        errorContainer.classList.remove('d-none');
        return;
    }

    try {
        // Gọi hàm fetchProductById từ api.js
        currentProduct = await fetchProductById(productId);
        
        // Render dữ liệu ra giao diện
        renderProductDetail(currentProduct);

        // Ẩn spinner và hiển thị chi tiết sản phẩm
        spinner.classList.add('d-none');
        detailContainer.classList.remove('d-none');

        // Khởi tạo các sự kiện nút tăng giảm số lượng & thêm giỏ hàng
        setupEventListeners();

    } catch (error) {
        console.error(error);
        spinner.classList.add('d-none');
        errorContainer.classList.remove('d-none');
    }
}

// Hàm render thông tin sản phẩm ra HTML
function renderProductDetail(product) {
    document.getElementById('product-img').src = product.image;
    document.getElementById('product-img').alt = product.title;
    document.getElementById('product-category').innerText = product.category;
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('product-price').innerText = `$${product.price}`;
    document.getElementById('product-description').innerText = product.description;

    // Render sao đánh giá
    const ratingStarsContainer = document.getElementById('product-rating-stars');
    const ratingCountContainer = document.getElementById('product-rating-count');
    
    if (product.rating) {
        ratingStarsContainer.innerHTML = renderStars(product.rating.rate);
        ratingCountContainer.innerText = `(${product.rating.count} đánh giá)`;
    } else {
        ratingStarsContainer.innerHTML = renderStars(0);
        ratingCountContainer.innerText = `(0 đánh giá)`;
    }
}

// Hàm vẽ các sao đánh giá
function renderStars(rate) {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let starsHtml = '';
    // Vẽ sao đầy
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
    }
    // Vẽ nửa sao
    if (halfStar) {
        starsHtml += '<i class="bi bi-star-half text-warning me-1"></i>';
    }
    // Vẽ sao rỗng
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="bi bi-star text-warning me-1"></i>';
    }
    return starsHtml;
}

// Hàm khởi tạo các sự kiện click nút bấm
function setupEventListeners() {
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');
    const inputQty = document.getElementById('product-qty');
    const btnAddCart = document.getElementById('btn-add-to-cart');

    // Nút giảm số lượng
    btnMinus.addEventListener('click', () => {
        let currentQty = parseInt(inputQty.value, 10);
        if (currentQty > 1) {
            inputQty.value = currentQty - 1;
        }
    });

    // Nút tăng số lượng
    btnPlus.addEventListener('click', () => {
        let currentQty = parseInt(inputQty.value, 10);
        inputQty.value = currentQty + 1;
    });

    // Nút thêm vào giỏ hàng
    btnAddCart.addEventListener('click', () => {
        const qty = parseInt(inputQty.value, 10);
        if (currentProduct && qty > 0) {
            addToCart(currentProduct, qty);
        }
    });
}
