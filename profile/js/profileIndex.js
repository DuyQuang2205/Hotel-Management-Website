//All global variables here
let UserInfor = [];
let logbtn = document.querySelector(".logout-btn");

//Check user login or not
if(sessionStorage.getItem("__au__") == null) {
    window.location.href = "../index.html";
}
UserInfor = JSON.parse(sessionStorage.getItem("__au__"));

//Logout
logbtn.onclick = () => {
    logbtn.innerText = "Processing..."
    setTimeout(() => {
        sessionStorage.removeItem("__au__");
        window.location.href = "../index.html";
    }, 1000)
}

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById("darkModeBtn");

    // Kiểm tra trạng thái hiện tại của dark mode
    const isDarkMode = body.classList.toggle("dark-mode");

    // Cập nhật icon và lưu trạng thái vào localStorage
    toggleBtn.innerHTML = isDarkMode ? "🌙" : "☀️";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Khi trang load, kiểm tra trạng thái dark mode từ localStorage
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
