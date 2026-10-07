// student_register.js  -  Student registration (saved through the mock API)
(function () {

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function fail(message, fieldId) {
        alert(message);
        var field = document.getElementById(fieldId);
        if (field) field.focus();
    }

    async function registerStudent(event) {

        event.preventDefault();

        var studentName = document.getElementById("studentName").value.trim();
        var studentId = document.getElementById("studentId").value.trim();
        var studentEmail = document.getElementById("studentEmail").value.trim();
        var department = document.getElementById("department").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (studentName === "") return fail("Please enter Student Name.", "studentName");
        if (studentName.length < 3) return fail("Student Name should contain at least 3 characters.", "studentName");
        if (studentId === "") return fail("Please enter Student ID.", "studentId");
        if (studentId.length < 4) return fail("Student ID is too short.", "studentId");
        if (studentEmail === "") return fail("Please enter Email Address.", "studentEmail");
        if (!validateEmail(studentEmail)) return fail("Please enter a valid Email Address.", "studentEmail");
        if (department === "") return fail("Please select Department.", "department");
        if (password === "") return fail("Please enter Password.", "password");
        if (password.length < 6) return fail("Password must contain at least 6 characters.", "password");
        if (confirmPassword === "") return fail("Please confirm your Password.", "confirmPassword");
        if (password !== confirmPassword) return fail("Passwords do not match.", "confirmPassword");

        try {

            var students = await EduAPI.get("/students");

            var emailExists = students.some(function (student) {
                return String(student.email).toLowerCase() === studentEmail.toLowerCase();
            });

            if (emailExists) return fail("Email already registered.", "studentEmail");

            var idExists = students.some(function (student) {
                return student.studentId === studentId;
            });

            if (idExists) return fail("Student ID already exists.", "studentId");

            await EduAPI.post("/students", {
                studentName: studentName,
                studentId: studentId,
                email: studentEmail.toLowerCase(),
                department: department,
                password: password,
                role: "Student",
                registrationDate: new Date().toLocaleDateString(),
                lastLogin: "",
                active: true
            });

            alert("Student Registration Successful!");

            document.getElementById("registerForm").reset();

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

        var form = document.getElementById("registerForm");

        if (!form) {
            console.error("Registration form not found.");
            return;
        }

        form.addEventListener("submit", registerStudent);

        var passwordField = document.getElementById("password");
        var confirmField = document.getElementById("confirmPassword");
        var nameField = document.getElementById("studentName");
        var idField = document.getElementById("studentId");
        var emailField = document.getElementById("studentEmail");

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
        var form = document.getElementById("registerForm");
        if (event.key === "Enter" && form) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

})();
