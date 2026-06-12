// ==================== FILE CART.JS ====================
// Logic xử lý riêng cho trang Giỏ hàng (cart.html)
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initCart();
});

// Hàm khởi tạo trang giỏ hàng
function initCart() {
    renderCart();
    setupCartEventListeners();
}

// Hàm render danh sách sản phẩm trong giỏ và tính toán tiền bạc
function renderCart() {
    const cart = getCart();
    
    const emptyState = document.getElementById('cart-empty-state');
    const cartContent = document.getElementById('cart-content');
    const itemsContainer = document.getElementById('cart-items-container'); 

    // Nếu giỏ hàng trống, hiển thị màn hình trống
    if (cart.length === 0) {
        emptyState.classList.remove('d-none');
        cartContent.classList.add('d-none');
        return;
    }

    // Nếu có sản phẩm, hiển thị chi tiết
    emptyState.classList.add('d-none');
    cartContent.classList.remove('d-none');

    itemsContainer.innerHTML = ''; // Xóa sạch danh sách cũ

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const rowHtml = `
            <tr>
                <td style="padding: 16px 0;">
                    <div class="d-flex align-items-center">
                        <!-- Ảnh sản phẩm nhỏ -->
                        <div class="bg-white border p-1 me-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                            <img src="${item.image}" alt="${item.title}" style="max-width: 60px; max-height: 60px; object-fit: contain;">
                        </div>
                        <div>
                            <!-- Tiêu đề sản phẩm -->
                            <h6 class="mb-1" style="font-size: 0.88rem; font-weight: 500;">
                                <a href="product.html?id=${item.id}" class="text-decoration-none text-dark">${item.title}</a>
                            </h6>
                            <span class="label-caps" style="font-size: 0.6rem; color: var(--color-secondary);">${item.category}</span>
                        </div>
                    </div>
                </td>
                <td style="font-family: 'Inter', sans-serif;">$${item.price.toFixed(2)}</td>
                <td align="center">
                    <!-- Tăng giảm số lượng -->
                    <div class="input-group" style="width: 110px;">
                        <button class="btn btn-outline-secondary btn-sm btn-qty-change" data-id="${item.id}" data-action="minus" style="border-radius: 0px !important;">-</button>
                        <input type="text" class="form-control form-control-sm text-center bg-white" value="${item.quantity}" readonly style="border-radius: 0px !important; border-left: none; border-right: none;">
                        <button class="btn btn-outline-secondary btn-sm btn-qty-change" data-id="${item.id}" data-action="plus" style="border-radius: 0px !important;">+</button>
                    </div>
                </td>
                <td align="right" style="font-family: 'Inter', sans-serif;" class="fw-semibold">$${itemTotal.toFixed(2)}</td>
                <td align="center" style="padding-left: 16px;">
                    <!-- Nút xóa sản phẩm -->
                    <button class="btn btn-link text-secondary btn-delete-item p-0" data-id="${item.id}" style="text-decoration: none;">
                        <i class="bi bi-trash3" style="font-size: 1.1rem;"></i>
                    </button>
                </td>
            </tr>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', rowHtml);
    });

    // Cập nhật hóa đơn
    document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `$${subtotal.toFixed(2)}`;
}

// Hàm khởi tạo các sự kiện cho Giỏ hàng (dùng Event Delegation)
function setupCartEventListeners() {
    const itemsContainer = document.getElementById('cart-items-container');
    const btnCheckout = document.getElementById('btn-checkout');

    if (itemsContainer) {
        // Lắng nghe click trong Container của bảng (Event Delegation)
        itemsContainer.addEventListener('click', (event) => {
            
            // 1. Click nút tăng/giảm số lượng
            const qtyBtn = event.target.closest('.btn-qty-change');
            if (qtyBtn) {
                const id = parseInt(qtyBtn.getAttribute('data-id'), 10);
                const action = qtyBtn.getAttribute('data-action');
                changeItemQuantity(id, action);
                return;
            }

            // 2. Click nút xóa sản phẩm
            const deleteBtn = event.target.closest('.btn-delete-item');
            if (deleteBtn) {
                const id = parseInt(deleteBtn.getAttribute('data-id'), 10);
                deleteCartItem(id);
                return;
            }
        });
    }

    if (btnCheckout) {
        // Sự kiện click thanh toán
        btnCheckout.addEventListener('click', () => {
            checkoutCart();
        });
    }
}

// Thay đổi số lượng của 1 sản phẩm trong giỏ hàng
function changeItemQuantity(id, action) {
    const cart = getCart();
    const item = cart.find(item => item.id === id);

    if (!item) return;

    if (action === 'plus') {
        item.quantity += 1;
    } else if (action === 'minus') {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // Nếu số lượng = 1 mà bấm trừ tiếp, thì xóa hẳn sản phẩm khỏi giỏ
            deleteCartItem(id);
            return;
        }
    }

    saveCart(cart); // Lưu vào localStorage và cập nhật badge
    renderCart();   // Vẽ lại giao diện giỏ hàng
}

// Xóa sản phẩm khỏi giỏ hàng
function deleteCartItem(id) {
    let cart = getCart();
    
    // Tìm tên sản phẩm trước khi xóa để hiển thị thông báo
    const itemToDelete = cart.find(item => item.id === id);
    const title = itemToDelete ? itemToDelete.title : 'sản phẩm';

    // Lọc bỏ sản phẩm cần xóa
    cart = cart.filter(item => item.id !== id);

    saveCart(cart);
    renderCart();

    showToast(`Đã xóa "${title}" khỏi giỏ hàng`);
}

// Hàm xử lý thanh toán đơn hàng
function checkoutCart() {
    const cart = getCart();
    if (cart.length === 0) return;

    // Hiển thị thông báo thành công
    showToast('Thanh toán thành công! Cám ơn bạn đã đặt hàng.');

    // Xóa rỗng giỏ hàng
    saveCart([]); 
    
    // Vẽ lại giao diện trống
    renderCart();
}
