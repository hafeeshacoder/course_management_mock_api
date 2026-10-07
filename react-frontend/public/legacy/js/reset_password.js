// reset_password.js  -  Step 2: set a new password (mock API)
(function () {

    async function resetPassword(event) {

        event.preventDefault();

        var newPassword = document.getElementById("newPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        try {

            var session = await EduAPI.getSession();

            if (!session.resetRole || !session.resetEmail) {
                alert("Reset session expired.");
                window.location.href = "/forgot-password";
                return;
            }

            if (newPassword === "") {
                alert("Enter New Password.");
                document.getElementById("newPassword").focus();
                return;
            }

            if (newPassword.length < 6) {
                alert("Password must contain at least 6 characters.");
                document.getElementById("newPassword").focus();
                return;
            }

            if (confirmPassword === "") {
                alert("Confirm your Password.");
                document.getElementById("confirmPassword").focus();
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("Passwords do not match.");
                document.getElementById("confirmPassword").focus();
                return;
            }

            var collection = session.resetRole === "admin" ? "admins" : "students";

            var users = await EduAPI.get("/" + collection);

            var user = users.find(function (item) {
                return String(item.email).toLowerCase() ===
                    String(session.resetEmail).toLowerCase();
            });

            if (!user) {
                alert("Account not found.");
                window.location.href = "/forgot-password";
                return;
            }

            await EduAPI.patch("/" + collection + "/" + user.id, {
                password: newPassword
            });

            await EduAPI.updateSession({
                resetRole: null,
                resetEmail: null
            });

            alert("Password Reset Successful.");

            window.location.href = "/login";

        } catch (error) {
            EduAPI.showError(error, "Unable to reset the password. Please try again.");
        }
    }

    function paint(field, other) {
        var length = field.value.length;
        if (other) {
            if (length === 0) field.style.borderColor = "var(--border-soft)";
            else field.style.borderColor = other.value === field.value ? "green" : "red";
            return;
        }
        if (length === 0) field.style.borderColor = "var(--border-soft)";
        else if (length < 6) field.style.borderColor = "red";
        else if (length < 8) field.style.borderColor = "orange";
        else field.style.borderColor = "green";
    }

    function init() {

        var form = document.getElementById("resetPasswordForm");

        if (!form) {
            console.error("Reset Password Form Not Found.");
            return;
        }

        form.addEventListener("submit", resetPassword);

        var newField = document.getElementById("newPassword");
        var confirmField = document.getElementById("confirmPassword");

        newField.addEventListener("keyup", function () { paint(newField); });
        confirmField.addEventListener("keyup", function () { paint(confirmField, newField); });

        newField.focus();
    }

    document.addEventListener("DOMContentLoaded", init, { once: true });

    document.addEventListener("keypress", function (event) {
        var form = document.getElementById("resetPasswordForm");
        if (event.key === "Enter" && form) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

})();
