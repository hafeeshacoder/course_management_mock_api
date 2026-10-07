// enrollment_success.js  -  confirmation page after enrolling (mock API)
(async function () {

    var student = await EduAPI.requireStudent();
    if (!student) return;

    window.goToMyCourses = function () {
        window.location.href = "/my-courses";
    };

    var enrollment = null;

    try {

        var enrollmentId = EduAPI.getQueryParam("enrollment");

        if (enrollmentId) {
            enrollment = await EduAPI.get("/enrollments/" + encodeURIComponent(enrollmentId));
        } else {
            var all = await EduAPI.getStudentEnrollments(student.id);
            enrollment = all.length ? all[all.length - 1] : null;
        }

    } catch (error) {
        console.error(error);
    }

    document.getElementById("courseName").textContent =
        enrollment ? enrollment.courseTitle : "Selected Course";

    document.getElementById("enrollDate").textContent = EduAPI.todayLong();

    var idText = document.getElementById("studentIdText");
    if (idText) idText.textContent = student.studentId || "-";

})();
