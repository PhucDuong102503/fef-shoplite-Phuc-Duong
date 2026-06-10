// ==================== FILE REGISTER.JS ====================
// Logic xác thực và xử lý form Đăng ký (register.html)
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initRegisterForm();
});

function initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn submit mặc định để xác thực JS

        // Xóa tất cả thông báo lỗi cũ trước đó
        clearErrors();

        // Tiến hành xác thực các trường
        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPhoneValid = validatePhone();
        const isRoleValid = validateRole();
        const isTermsValid = validateTerms();

        // Kiểm tra tổng quát
        const isFormValid = isNameValid && isEmailValid && isPasswordValid && isPhoneValid && isRoleValid && isTermsValid;

        if (isFormValid) {
            // Đăng ký thành công
            handleRegisterSuccess();
        }
    });
}

// 1. Xác thực Họ tên
function validateFullName() {
    const nameInput = document.getElementById('register-fullname');
    const nameValue = nameInput.value.trim();
    if (!nameValue) {
        showError('fullname', 'Họ và tên không được để trống.');
        return false;
    }
    return true;
}

// 2. Xác thực Email
function validateEmail() {
    const emailInput = document.getElementById('register-email');
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
        showError('email', 'Email không được để trống.');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError('email', 'Định dạng email không hợp lệ (Ví dụ: abc@domain.com).');
        return false;
    }
    return true;
}

// 3. Xác thực Mật khẩu
function validatePassword() {
    const passwordInput = document.getElementById('register-password');
    const passwordValue = passwordInput.value;

    if (!passwordValue) {
        showError('password', 'Mật khẩu không được để trống.');
        return false;
    } else if (passwordValue.length < 6) {
        showError('password', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
        return false;
    }
    return true;
}

// 4. Xác thực Số điện thoại
function validatePhone() {
    const phoneInput = document.getElementById('register-phone');
    const phoneValue = phoneInput.value.trim();
    // Regex số điện thoại VN: 10 chữ số bắt đầu bằng 03, 05, 07, 08, 09 (hoặc +84)
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;

    if (!phoneValue) {
        showError('phone', 'Số điện thoại không được để trống.');
        return false;
    } else if (!phoneRegex.test(phoneValue)) {
        showError('phone', 'Số điện thoại không hợp lệ (phải gồm 10 chữ số và bắt đầu bằng 03/05/07/08/09).');
        return false;
    }
    return true;
}

// 5. Xác thực Vai trò
function validateRole() {
    const roleSelect = document.getElementById('register-role');
    if (!roleSelect.value) {
        showError('role', 'Vui lòng chọn vai trò của bạn.');
        return false;
    }
    return true;
}

// 6. Xác thực Checkbox Điều khoản
function validateTerms() {
    const termsCheckbox = document.getElementById('register-terms');
    if (!termsCheckbox.checked) {
        showError('terms', 'Bạn cần phải đồng ý với Điều khoản dịch vụ.');
        return false;
    }
    return true;
}

// --- HÀM TRỢ GIÚP (HELPER FUNCTIONS) ---

// Hàm hiển thị thông báo lỗi dưới ô Input tương ứng
function showError(fieldId, message) {
    const errorDiv = document.getElementById(`error-${fieldId}`);
    const inputElement = document.getElementById(`register-${fieldId}`);
    
    if (errorDiv) {
        errorDiv.innerText = message;
        errorDiv.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.classList.add('is-invalid');
    }
}

// Hàm xóa toàn bộ lỗi và màu đỏ trên các ô Input
function clearErrors() {
    const errorDivs = document.querySelectorAll('.text-danger');
    errorDivs.forEach(div => {
        if (div.id.startsWith('error-')) {
            div.style.display = 'none';
            div.innerText = '';
        }
    });

    const inputs = document.querySelectorAll('.form-control, .form-select, .form-check-input');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
}

// Hàm xử lý khi toàn bộ form hợp lệ
function handleRegisterSuccess() {
    const form = document.getElementById('register-form');
    const successBox = document.getElementById('register-success');

    if (form && successBox) {
        form.classList.add('d-none'); // Ẩn form nhập liệu
        successBox.classList.remove('d-none'); // Hiển thị box chúc mừng thành công
        showToast('Đăng ký tài khoản thành công!');
    }
}
