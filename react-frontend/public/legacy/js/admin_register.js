// admin_register.js  -  Administrator registration (saved through the mock API)
(function () {

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function fail(message, fieldId) {
        alert(message);
        var field = document.getElementById(fieldId);
        if (field) field.focus();
    }

    async function registerAdmin(event) {

        event.preventDefault();

        var adminName = document.getElementById("adminName").value.trim();
        var adminId = document.getElementById("adminId").value.trim();
        var adminEmail = document.getElementById("adminEmail").value.trim();
        var designation = document.getElementById("designation").value;
        var password = document.getElementById("adminPassword").value;
        var confirmPassword = document.getElementById("adminConfirmPassword").value;

        if (adminName === "") return fail("Please enter Administrator Name.", "adminName");
        if (adminName.length < 3) return fail("Administrator Name must contain at least 3 characters.", "adminName");
        if (adminId === "") return fail("Please enter Administrator ID.", "adminId");
        if (adminId.length < 4) return fail("Administrator ID is too short.", "adminId");
        if (adminEmail === "") return fail("Please enter Email Address.", "adminEmail");
        if (!validateEmail(adminEmail)) return fail("Please enter a valid Email Address.", "adminEmail");
        if (designation === "") return fail("Please select Designation.", "designation");
        if (password === "") return fail("Please enter Password.", "adminPassword");
        if (password.length < 6) return fail("Password must contain at least 6 characters.", "adminPassword");
        if (confirmPassword === "") return fail("Please confirm your Password.", "adminConfirmPassword");
        if (password !== confirmPassword) return fail("Passwords do not match.", "adminConfirmPassword");

        try {

            var admins = await EduAPI.get("/admins");

            var emailExists = admins.some(function (admin) {
                return String(admin.email).toLowerCase() === adminEmail.toLowerCase();
            });

            if (emailExists) return fail("Email already registered.", "adminEmail");

            var idExists = admins.some(function (admin) {
                return admin.adminId === adminId;
            });

            if (idExists) return fail("Administrator ID already exists.", "adminId");

            await EduAPI.post("/admins", {
                adminName: adminName,
                adminId: adminId,
                email: adminEmail.toLowerCase(),
                designation: designation,
                password: password,
                role: "Administrator",
                registrationDate: new Date().toLocaleDateString(),
                lastLogin: "",
                active: true
            });

            alert("Administrator Registration Successful!");

            document.getElementById("adminRegisterForm").reset();

            window.location.href = "/login";

        } catch (error) {
            EduAPI.showError(error, "Registration failed. Please try again.");
        }
    }

    function paintPassword(field) {
        var length = field.value.length;
        if (length === 0) field.style.borderColor = "var(--border-soft)";
        else if (length < 6) field.style.borderColor = "red";
        else if (length < 8) field.style.borderColor = "orange";
        else field.style.borderColor = "green";
    }

    function init() {

        var form = document.getElementById("adminRegisterForm");

        if (!form) {
            console.error("Admin Registration Form Not Found.");
            return;
        }

        form.addEventListener("submit", registerAdmin);

        var passwordField = document.getElementById("adminPassword");
        var confirmField = document.getElementById("adminConfirmPassword");
        var nameField = document.getElementById("adminName");
        var idField = document.getElementById("adminId");
        var emailField = document.getElementById("adminEmail");

        passwordField.addEventListener("keyup", function () { paintPassword(passwordField); });

        confirmField.addEventListener("keyup", function () {
            if (confirmField.value.length === 0) {
                confirmField.style.borderColor = "var(--border-soft)";
                return;
            }
            confirmField.style.borderColor =
                passwordField.value === confirmField.value ? "green" : "red";
        });

        nameField.addEventListener("input", function () {
            nameField.value = nameField.value.replace(/[^a-zA-Z\s]/g, "");
        });

        nameField.addEventListener("blur", function () {
            nameField.value = nameField.value
                .toLowerCase()
                .replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
        });

        idField.addEventListener("input", function () {
            idField.value = idField.value.replace(/\s/g, "");
        });

        emailField.addEventListener("blur", function () {
            emailField.value = emailField.value.toLowerCase();
        });

        nameField.focus();
    }

    document.addEventListener("DOMContentLoaded", init, { once: true });

    document.addEventListener("keypress", function (event) {
        var form = document.getElementById("adminRegisterForm");
        if (event.key === "Enter" && form) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

})();
