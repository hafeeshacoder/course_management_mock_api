// admin_dashboard.js  -  administrator overview (courses, students, enrollments)
// All data comes from the mock API. The tables refresh every 30 seconds.
(async function () {

    var admin = await EduAPI.requireAdmin();
    if (!admin) return;

    var esc = EduAPI.esc;

    var courses = [];
    var students = [];
    var enrollments = [];

    function setText(id, value) {
        var element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    function loadStatistics() {
        setText("totalCourses", courses.length);
        setText("totalStudents", students.length);
        setText("totalEnrollments", enrollments.length);
        setText("courseCompletions",
            enrollments.filter(function (item) { return item.completed; }).length);
    }

    function loadCourses() {

        var table = document.getElementById("courseTable");
        if (!table) return;

        if (courses.length === 0) {
            table.innerHTML =
                '<tr><td colspan="5" style="text-align:center;color:gray;">No courses found.</td></tr>';
            return;
        }

        table.innerHTML = courses.map(function (course) {
            return "<tr>" +
                "<td>" + esc(course.courseName) + "</td>" +
                "<td>" + esc(course.instructor) + "</td>" +
                "<td>" + esc(course.level) + "</td>" +
                "<td>" + esc(course.status || "Active") + "</td>" +
                "<td>" +
                '<button class="action-btn" data-action="edit" data-id="' + esc(course.id) + '">Edit</button> ' +
                '<button class="delete-btn" data-action="delete" data-id="' + esc(course.id) + '">Delete</button>' +
                "</td></tr>";
        }).join("");
    }

    function loadEnrollments() {

        var table = document.getElementById("enrollmentTable");
        if (!table) return;

        if (enrollments.length === 0) {
            table.innerHTML =
                '<tr><td colspan="3" style="text-align:center;color:gray;">No enrollments found.</td></tr>';
            return;
        }

        table.innerHTML = enrollments.map(function (item) {
            return "<tr>" +
                "<td>" + esc(item.studentName || "Student") + "</td>" +
                "<td>" + esc(item.courseTitle || "Course") + "</td>" +
                "<td>" + (item.completed ? "Completed" : esc(item.status || "Enrolled")) + "</td>" +
                "</tr>";
        }).join("");
    }

    function loadNotifications() {

        var container = document.getElementById("notificationContainer");
        if (!container) return;

        var notes = [];

        var pending = enrollments.filter(function (item) {
            return item.status === "Pending";
        }).length;

        if (enrollments.length === 0) {
            notes.push("No students have enrolled yet.");
        } else if (pending > 0) {
            notes.push(pending + " enrollment request(s) waiting for approval.");
        }

        notes.push(courses.length + " courses are available.");
        notes.push(students.length + " students registered.");
        notes.push(enrollments.length + " student enrollments found.");

        container.innerHTML = notes.map(function (note) {
            return '<div class="notification-item">' + esc(note) + "</div>";
        }).join("");
    }

    function render() {
        loadStatistics();
        loadCourses();
        loadEnrollments();
        loadNotifications();
    }

    async function refresh() {
        try {
            var results = await Promise.all([
                EduAPI.getCourses(),
                EduAPI.get("/students"),
                EduAPI.getEnrollments()
            ]);
            courses = results[0];
            students = results[1];
            enrollments = results[2];
            render();
        } catch (error) {
            EduAPI.showError(error, "Unable to load dashboard data.");
        }
    }

    // Edit / Delete buttons inside the course table
    var courseTable = document.getElementById("courseTable");

    if (courseTable) {
        courseTable.addEventListener("click", async function (event) {

            var button = event.target.closest("button[data-action]");
            if (!button) return;

            var id = button.dataset.id;

            if (button.dataset.action === "edit") {
                window.location.href = "/edit-course?id=" + encodeURIComponent(id);
                return;
            }

            if (!confirm("Delete this course? Its enrollments will be removed too.")) return;

            try {
                await EduAPI.deleteCourse(id);
                await refresh();
            } catch (error) {
                EduAPI.showError(error, "Unable to delete the course.");
            }
        });
    }

    await refresh();

    setInterval(refresh, 30000);

})();
