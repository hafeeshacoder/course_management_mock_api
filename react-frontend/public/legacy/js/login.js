// login.js  -  Student / Administrator login (uses the mock API)
(function () {

    var currentRole = "student";

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showStudent() {
        currentRole = "student";
        document.getElementById("role").textContent = "Student Login";
        document.getElementById("studentBtn").classList.add("active");
        document.getElementById("adminBtn").classList.remove("active");
        document.getElementById("registerTitle").textContent = "New Student?";
        document.getElementById("registerText").textContent = "Don't have a student account?";
        document.getElementById("registerLink").textContent = "Student Register";
        document.getElementById("registerLink").href = "/register";
    }

    function showAdmin() {
        currentRole = "admin";
        document.getElementById("role").textContent = "Administrator Login";
        document.getElementById("adminBtn").classList.add("active");
        document.getElementById("studentBtn").classList.remove("active");
        document.getElementById("registerTitle").textContent = "New Administrator?";
        document.getElementById("registerText").textContent = "Don't have an administrator account?";
        document.getElementById("registerLink").textContent = "Administrator Register";
        document.getElementById("registerLink").href = "/admin-register";
    }

    async function loginUser() {

        var email = document.querySelector('input[type="email"]').value.trim();
        var password = document.querySelector('input[type="password"]').value.trim();

        if (email === "") { alert("Please enter Email."); return; }
        if (!validateEmail(email)) { alert("Enter a valid Email Address."); return; }
        if (password === "") { alert("Please enter Password."); return; }
        if (password.length < 6) { alert("Password must contain at least 6 characters."); return; }

        try {

            var result = await EduAPI.login(currentRole, email, password);

            if (!result.success) {
                alert(result.message);
                return;
            }

            alert(result.message);

            window.location.href = currentRole === "student"
                ? "/student-dashboard"
                : "/admin-dashboard";

        } catch (error) {
            EduAPI.showError(error, "Login failed. Please try again.");
        }
    }

    function init() {
        var studentBtn = document.getElementById("studentBtn");
        var adminBtn = document.getElementById("adminBtn");
        var loginBtn = document.querySelector(".login-btn");

        showStudent();

        if (studentBtn) studentBtn.addEventListener("click", showStudent);
        if (adminBtn) adminBtn.addEventListener("click", showAdmin);
        if (loginBtn) loginBtn.addEventListener("click", loginUser);
    }

    document.addEventListener("DOMContentLoaded", init, { once: true });

    // Enter key logs in (only while the login form is on screen)
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && document.querySelector(".login-btn")) {
            event.preventDefault();
            loginUser();
        }
    });

})();
