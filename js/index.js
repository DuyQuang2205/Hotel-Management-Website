// all global variables here
let allUserInfor = [];

//sign up
let sigform = document.querySelector(".sig-form");
let allInput = sigform.querySelectorAll("input");
let sigbtn = document.querySelector("button");

//login
let logform = document.querySelector(".log-form");
let allLoginInput = logform.querySelectorAll("input");

// get all user infor from local storage
if (userInfor = localStorage.getItem("allUserInfor") != null) {
    allUserInfor = JSON.parse(localStorage.getItem("allUserInfor"))
}
console.log(allUserInfor);

//sign up form
sigform.onsubmit = (e) => {
    e.preventDefault()
    
    if (!checkPasswordMatch()) {
        return;
    }

    let checkEmail = allUserInfor.find((data) => {
        return data.Email == allInput[1].value
    })

    if (checkEmail == undefined) {
        let data = {};
        for (let el of allInput) {
            let key = el.name;
            data[key] = el.value
        }
        sigbtn.innerText = "Processing..."
        setTimeout(() => {
            allUserInfor.push(data)
            localStorage.setItem("allUserInfor", JSON.stringify(allUserInfor))
            swal("Thành công!", "Registration Successful", "success");
            sigform.reset();
            sigbtn.innerText = "Continue"
        }, 1500)
    }
    else{
        swal("Gà quá vậy bro", 'Registration Failed, Email already register', 'warning');
    }
}

//login form


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

