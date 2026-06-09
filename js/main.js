// ==================== FILE MAIN.JS ====================
// File này chứa các hàm dùng chung cho toàn bộ dự án như:
// quản lý giỏ hàng (localStorage), hiển thị Toast, đồng bộ Navbar.
// =====================================================

// Lắng nghe sự kiện khi tài liệu HTML tải xong
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});

// Hàm lấy giỏ hàng từ localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Hàm lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge(); // Cập nhật lại số lượng badge ở navbar ngay khi lưu
}

// Hàm cập nhật Badge giỏ hàng trên Navbar
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;

    const cart = getCart();
    // Tính tổng số lượng tất cả sản phẩm trong giỏ
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    badge.innerText = totalCount;
    
    // Nếu không có sản phẩm nào, có thể để số 0 hoặc ẩn đi tùy nhu cầu.
    // Ở đây ta giữ số 0 để đồng bộ với thiết kế.
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product, quantity = 1) {
    const cart = getCart();
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart(cart);
    showToast(`Đã thêm "${product.title}" vào giỏ hàng`);
}

// Hàm hiển thị thông báo Toast tối giản phong cách Gallery Avant
function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 8px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-gallery';
    toast.style.cssText = `
        background-color: #0A0A0A;
        color: #FFFFFF;
        padding: 16px 24px;
        font-family: 'Inter', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border-radius: 0px;
        border: none;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: auto;
    `;
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    // Kích hoạt animation slide-up và fade-in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Tự động ẩn sau 3.5 giây
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3500);
}
