const accounts = [
  { username: "nguyenvantoan", password: "nguyentoanbavl", role: "admin" },
  { username: "user1", password: "123", role: "user" }
];

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");

  const acc = accounts.find(
    (a) => a.username === user && a.password === pass
  );

  if (acc) {
    localStorage.setItem("user", JSON.stringify(acc));
    if (acc.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    error.textContent = "Sai tài khoản hoặc mật khẩu!";
  }
}

function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) window.location.href = "login.html";
}

function loadAccounts() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    document.body.innerHTML = "<h2>Không có quyền truy cập</h2>";
    return;
  }
  const list = document.getElementById("userList");
  accounts.forEach((acc) => {
    const li = document.createElement("li");
    li.textContent = acc.username + " - " + acc.role;
    list.appendChild(li);
  });
}

function initToggles() {
  const switches = document.querySelectorAll('.toggle-switch');
  switches.forEach(sw => {
    const key = sw.dataset.feature;
    const saved = localStorage.getItem(key);
    if (saved === "on") sw.checked = true;

    sw.addEventListener('change', () => {
      localStorage.setItem(key, sw.checked ? "on" : "off");
    });
  });
}