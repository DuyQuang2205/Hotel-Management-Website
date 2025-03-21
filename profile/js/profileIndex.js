//All global variables here
let userInfor = [];
let user;
let allBData = [];
let logbtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea = bookingForm.querySelector("textarea");
let bCloseBtn = document.querySelector("b-modal-close-btn");

//Check user login or not
if (sessionStorage.getItem("__au__") == null) {
  window.location.href = "../index.html";
}
userInfor = JSON.parse(sessionStorage.getItem("__au__"));

//Logout
logbtn.onclick = () => {
  logbtn.innerText = "Processing...";
  setTimeout(() => {
    sessionStorage.removeItem("__au__");
    window.location.href = "../index.html";
  }, 1000);
};

//start booking code
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  let data = { notice: bTextarea.value };
  for (let el of allBInput) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  //FIX RIGHT THERE
  allBData.push(data);
  localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
  swal("gút chóp bro", "bookking success", "success");
  bookingForm.reset("");
  bCloseBtn.click();
};

//just_allBData

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

function showTab(tabId) {
  document.querySelectorAll(".tab-pane").forEach((tab) => {
    tab.classList.remove("active", "show");
  });

  let selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active", "show");
  }

  // Cập nhật URL hash để giữ tab khi reload
  history.pushState(null, null, `#${tabId}`);
}

document.addEventListener("DOMContentLoaded", function () {
  let hash = window.location.hash.substring(1);
  if (hash) {
    showTab(hash);
  }
});
