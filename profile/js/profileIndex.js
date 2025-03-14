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
