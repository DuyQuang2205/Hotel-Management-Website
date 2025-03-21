// all global variables here
let allUserInfor = [];

//sign up
let sigform = document.querySelector(".sig-form");
let allInput = sigform.querySelectorAll("input");
let sigbtn = document.querySelector("button");

//login
let logform = document.querySelector(".log-form");
let allLoginInput = logform.querySelectorAll("input");
let logbtn = document.querySelector("button");
console.log(allLoginInput);

// get all user infor from local storage
if (userInfor = localStorage.getItem("allUserInfor") != null) {
    allUserInfor = JSON.parse(localStorage.getItem("allUserInfor"))
}
console.log(allUserInfor);

//sign up form
sigform.onsubmit = (e) => {
    e.preventDefault();

    if (!checkPasswordMatch()) {
        return;
    }

    let emailInput = allInput[1].value.trim(); // Lấy giá trị email từ form và loại bỏ khoảng trắng thừa

    // Kiểm tra định dạng email (chỉ cho phép @gmail.com)
    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(emailInput)) {
        swal("Lỗi rồi bro!", "Vui lòng nhập email có đuôi @gmail.com", "error");
        return;
    }

    let checkEmail = allUserInfor.find((data) => {
        return data.Email === emailInput;
    });

    if (checkEmail == undefined) {
        let data = {};
        for (let el of allInput) {
            let key = el.name;
            data[key] = el.value;
        }
        sigbtn.innerText = "Processing...";
        setTimeout(() => {
            allUserInfor.push(data);
            localStorage.setItem("allUserInfor", JSON.stringify(allUserInfor));
            swal("Làm Tốt lắm bro!", "Registration Successful", "success");
            sigform.reset();
            sigbtn.innerText = "Continue";
        }, 1500);
    } else {
        swal("Gà quá vậy bro", 'Registration Failed, Email already registered', 'warning');
    }
};


//login form
logform.onsubmit = (e) => {
    e.preventDefault()
    let checkUser = allUserInfor.find((data) => {
        return data.Email == allLoginInput[0].value && data.Password == allLoginInput[1].value
    })

    if (allLoginInput[0].value == "" || allLoginInput[1].value == "") {
        swal("Gà quá vậy bro", 'Login Failed, Email or Password is empty', 'warning');
        return;
    }

    if (checkUser != undefined) {
        logbtn.innerText = "Processing..."
        setTimeout(() => {
            logbtn.innerText = "Login"
            window.location = "profile/profile.html"
            checkUser.Password = "Tìm mật khẩu con cặca";
            sessionStorage.setItem("__au__",JSON.stringify(checkUser))
        }, 1500)
    }
    else {
        swal("Gà quá vậy bro", 'Login Failed, Email or Password is incorrect', 'warning');
    }
}
//check password match
function checkPasswordMatch() {
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("passwordrp").value;

    if (password !== repeatPassword) {
        swal("Kém vậy bro!", "Password does not match!", "error");
        return false; // Ngăn chặn form submit
    }
    return true;
}

//add event listener for eye icon
document.addEventListener("DOMContentLoaded", function () {
    function togglePassword(inputId, iconId) {
        const passwordField = document.getElementById(inputId);
        const eyeIcon = document.getElementById(iconId);

        if (passwordField.type === "password") {
            passwordField.type = "text";
            eyeIcon.src = "img/eye1.png"; // change to open eyes icon
        } else {
            passwordField.type = "password";
            eyeIcon.src = "img/eye2.png"; // change to close eyes icon
        }
    }

    // Handling password input box
    document.getElementById("togglePassword").addEventListener("click", function () {
        togglePassword("password", "eyeIcon1");
    });

    // Handling for re-enter password box
    document.getElementById("togglePasswordrp").addEventListener("click", function () {
        togglePassword("passwordrp", "eyeIcon2");
    });

    document.getElementById("togglePasswordlogin").addEventListener("click", function () {
        togglePassword("passwordlogin", "eyeIcon3");
    });
});

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById("darkModeBtn");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        toggleBtn.innerHTML = "☀️"; // Light mode: mặt trời
        localStorage.setItem("theme", "light");
    } else {
        body.classList.add("dark-mode");
        toggleBtn.innerHTML = "🌙"; // Dark mode: mặt trăng
        localStorage.setItem("theme", "dark");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const toggleBtn = document.getElementById("darkModeBtn");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.innerHTML = "🌙";
    } else {
        toggleBtn.innerHTML = "☀️";
    }
});