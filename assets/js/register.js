const usernameEL = document.querySelector("#username");
const emailEL = document.querySelector("#email");
const password = document.getElementById("password");
const confirmPassword = document.querySelector("#confirm-password");
const myform = document.querySelector("#signup");
console.log(usernameEL);
console.log(emailEL);
console.log(password);
console.log(confirmPassword);
//viet 1 phuong thuc kiem tra 1 truong nao do buoc phai nhap
function isRequired(value) {
    if (value == null || value == "") {
        return false;
    }
    return true;
}
//viet 1 phuong thuc co kha nang kiem tra do dai cua mot truong nao do nam giua min va max
function isBetween(length, min, max) {
    if (length < min || length > max) {
        return false;
    }
    return true;
}
//viet 1 function kiem tra 1 truong nao do co phai email hay khong
function isEmail(value) {
    //code here
    //tham khao tren internet Regular expression
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}
//hien thi loi cho input nao, voi thong diep la message
function showError(input, message){
    //lay ve the cha dang chua input
    const element = input.parentElement;
    //add class error
    element.classList.add("error");//error la class duoc viet san trong css
    element.classList.remove("success");
    //lay ve the small
    const errorTag = element.querySelector("small");
    errorTag.textContent = message;
}
//phuong thuc de bo thong diep loi di moi khi nhap dung du lieu roi
function showSuccess(input){
    const element = input.parentElement;
    element.classList.add("success");
    element.classList.remove("error");
    const errorTag = element.querySelector("small");
    errorTag.textContent = '';
}

//kiem tra truong username
//Yeu cau: username buoc phai nhap, va phai co toi thieu 3 ky tu va toi da 25 ky tu.
function checkUsername() {
    min = 3;
    max = 25;
    let vUsername = usernameEL.value.trim();//bo di dau cach o dau va cuoi chuoi
    let valid = false;
    if (!isRequired(vUsername)) {
        //hien thi thong diep loi o day
        //hien thi thong diep loi o ben duoi
        //hien thi input text mau do.
        showError(usernameEL,"Tên người dùng cần phải được nhập.")
        usernameEL.focus();
    } else if (!isBetween(vUsername.length, min, max)) {
        //kiem tra so ky tu nhap cua username
        // alert("Username must be at least 3 and 25 characters.");
        showError(usernameEL,"Tên người dùng cần ít nhất chứa 3 và tối đa 25 kí tự.")
        usernameEL.focus();
    } else {
        //hien thi mau xanh cho truong username
        // alert("Username passed.")
        showSuccess(usernameEL);
        valid = true;
    }
    return valid;
}
//kiem tra truong email
function checkEmail() {
    let valid = false;
    const vEmail = emailEL.value.trim();
    //kiem tra email buoc phai nhap
    if (!isRequired(vEmail)) {
        //thong bao loi email buoc phai nhap
        // alert("Email must input.");
        showError(emailEL,"Email cần phải được nhập.")
        emailEL.focus();
    } else if (!isEmail(vEmail)) {
        //neu ko phai dinh dang email thi thong bao loi
        // alert("Email must be emailname@domainname format.");
        showError(emailEL,"Email phải định dạng emailname@domainname.")
        emailEL.focus();
    } else {
        //thong bao thanh cong
        showSuccess(emailEL);
        valid = true;
    }
    return valid;
}
//kiem tra truong password 
//yeu cau: Mat khau co toi thieu 6 ki tu, toi da 25 ki tu
function checkPassword() {
    min = 3;
    max = 25;
    let vPassword = password.value.trim();//bo di dau cach o dau va cuoi chuoi
    let valid = false;
    if (!isRequired(vPassword)) {
        //hien thi thong diep loi o day
        //hien thi thong diep loi o ben duoi
        //hien thi input text mau do.
        showError(password,"Mật khẩu cần phải được nhập.")
        password.focus();
    } else if (!isBetween(vPassword.length, min, max)) {
        //kiem tra so ky tu nhap cua username
        // alert("Username must be at least 3 and 25 characters.");
        showError(password,"Mật khẩu cần ít nhất chứa 3 và tối đa 25 kí tự.")
        password.focus();
    } else {
        //hien thi mau xanh cho truong username
        // alert("Username passed.")
        showSuccess(password);
        valid = true;
    }
    return valid;
}
//kiem tra truong nhap lai mat khau
function checkConfirmPassword() {
    let valid = false;
    let vConfirmPassword = confirmPassword.value.trim();
    let vPassword = password.value.trim();
    //kiem tra confirmPassword co giong voi password vua nhap khong
    if (vConfirmPassword == vPassword) {
        showSuccess((confirmPassword));
        valid = true;
    } else {
        //thong bao loi confirm password buoc phai nhap
        showError(confirmPassword,"Mật khẩu được nhập lại không đúng. ");
        confirmPassword.focus();        
    }
    return valid;
}

//dang ky su kien submit cua form
myform.addEventListener('submit', function (e) {
    console.log("submit form duoc goi");
    e.preventDefault();
    let cUsername = checkUsername();
    let cEmail = checkEmail();
    let cPassword = checkPassword();
    let cConfirmPassword = checkConfirmPassword();
    let result = cUsername && cEmail && cPassword && cConfirmPassword;
    let user = {
        cUsername : cUsername,
        cEmail : cEmail,
        cPassword : cPassword
    }
    if (result) {
        //gui du lieu len may chu.
        // let json  = JSON.stringify(user);
        localStorage.setItem(usernameEL,user)
        alert("Đăng kí thành công !")
        window.location.href = "signin.html";
    }
    //code here
    else{
        alert("Đăng kí không thành công !")
    }
})