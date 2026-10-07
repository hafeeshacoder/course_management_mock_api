// student_dashboard.js  -  reads the student's enrollments from the mock API
(async function () {

    var student = await EduAPI.requireStudent();
    if (!student) return;

    var esc = EduAPI.esc;

    document.getElementById("studentEmail").textContent = student.email || "-";
    document.getElementById("studentDepartment").textContent = student.department || "-";

    var enrolled;

    try {
        enrolled = await EduAPI.getStudentEnrollments(student.id);
    } catch (error) {
        EduAPI.showError(error, "Unable to load your courses.");
        return;
    }

    var totalProgress = 0;
    var completedCourses = 0;

    enrolled.forEach(function (item) {
        var progress = Number(item.progress) || 0;
        totalProgress += progress;
        if (progress >= 100) completedCourses++;
    });

    var overall = enrolled.length > 0
        ? Math.round(totalProgress / enrolled.length)
        : 0;

    document.getElementById("enrolledCount").textContent = enrolled.length;
    document.getElementById("completedCount").textContent = completedCourses;
    document.getElementById("assignmentCount").textContent = "0";
    document.getElementById("overallProgress").textContent = overall + "%";

    var courseTable = document.getElementById("courseTable");
    var notificationContainer = document.getElementById("notificationContainer");
    var quickOverview = document.getElementById("quickOverview");

    if (enrolled.length === 0) {

        courseTable.innerHTML =
            '<tr><td colspan="3" style="text-align:center;padding:40px;color:gray;">' +
            "No courses enrolled yet.</td></tr>";

        notificationContainer.innerHTML =
            '<p style="text-align:center;padding:30px;color:gray;">' +
            "No notifications available.</p>";

    } else {

        var rows = "";

        enrolled.forEach(function (item) {

            var progress = Math.round(Number(item.progress) || 0);
            var status = EduAPI.statusFromProgress(progress);

            rows +=
                "<tr>" +
                "<td>" + esc(item.courseTitle) + "</td>" +
                "<td>" + status + "</td>" +
                "<td>" + progress + "%" +
                '<div style="width:120px;height:8px;background:var(--border-soft);border-radius:20px;margin-top:6px;">' +
                '<div style="width:' + progress + '%;height:100%;background:var(--primary);border-radius:20px;"></div>' +
                "</div></td></tr>";
        });

        courseTable.innerHTML = rows;

        notificationContainer.innerHTML =
            '<div style="padding:20px;background:var(--surface-alt);border-left:5px solid var(--primary);border-radius:8px;margin-bottom:15px;">' +
            "You have successfully enrolled in <b>" + enrolled.length + "</b> course(s).</div>" +
            '<div style="padding:20px;background:var(--surface-alt);border-left:5px solid var(--success);border-radius:8px;">' +
            "You have completed <b>" + completedCourses + "</b> course(s).<br><br>" +
            "Overall Learning Progress : <b>" + overall + "%</b></div>";
    }

    quickOverview.innerHTML =
        "<p><b>Total Courses :</b> " + enrolled.length + "</p><br>" +
        "<p><b>Completed :</b> " + completedCourses + "</p><br>" +
        "<p><b>Assignments :</b> 0</p><br>" +
        "<p><b>Overall Progress :</b> " + overall + "%</p>" +
        '<div style="width:100%;height:12px;background:var(--border-soft);border-radius:20px;margin-top:10px;">' +
        '<div style="width:' + overall + '%;height:100%;background:var(--primary);border-radius:20px;"></div>' +
        "</div>";

})();
