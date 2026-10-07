// forgot_password.js  -  Step 1: verify the email (mock API)
// The verified email/role is handed to the reset page through the
// API "session" resource instead of sessionStorage.
(function () {

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function forgotPassword(event) {

        event.preventDefault();

        var emailField = document.getElementById("email");
        var email = emailField.value.trim().toLowerCase();

        if (email === "") {
            alert("Please enter your registered Email.");
            emailField.focus();
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid Email Address.");
            emailField.focus();
            return;
        }

        try {

            var lists = await Promise.all([
                EduAPI.get("/students"),
                EduAPI.get("/admins")
            ]);

            var matches = function (user) {
                return String(user.email).toLowerCase() === email;
            };

            var student = lists[0].find(matches);
            var admin = lists[1].find(matches);

            if (!student && !admin) {
                alert("Email is not registered.");
                return;
            }

            await EduAPI.updateSession({
                resetRole: admin ? "admin" : "student",
                resetEmail: email
            });

            alert("Email Verified Successfully.");

            window.location.href = "/reset-password";

        } catch (error) {
            EduAPI.showError(error, "Unable to verify the email. Please try again.");
        }
    }

    function init() {

        var form = document.getElementById("forgotPasswordForm");

        if (!form) {
            console.error("Forgot Password Form Not Found.");
            return;
        }

        form.addEventListener("submit", forgotPassword);

        var emailField = document.getElementById("email");

        if (emailField) {
            emailField.addEventListener("blur", function () {
                emailField.value = emailField.value.toLowerCase();
            });
            emailField.focus();
        }
    }

    document.addEventListener("DOMContentLoaded", init, { once: true });

    document.addEventListener("keypress", function (event) {
        var form = document.getElementById("forgotPasswordForm");
        if (event.key === "Enter" && form) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

})();
