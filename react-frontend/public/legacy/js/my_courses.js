// my_courses.js  -  the student's enrolled courses + progress (mock API)
(async function () {

    var student = await EduAPI.requireStudent();
    if (!student) return;

    var esc = EduAPI.esc;

    var enrolled;

    try {
        enrolled = await EduAPI.getStudentEnrollments(student.id);
    } catch (error) {
        EduAPI.showError(error, "Unable to load your courses.");
        return;
    }

    var container = document.getElementById("courseContainer");

    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }

    if (enrolled.length === 0) {

        container.innerHTML =
            '<div class="empty"><h3>No Courses Enrolled Yet</h3>' +
            "<p>Browse courses and enroll to start learning.</p>" +
            '<a href="/courses" class="browse">Browse Courses</a></div>';

        ["totalCourses", "enrolledCount", "progressCount", "completedCount", "certificateCount"]
            .forEach(function (id) { setText(id, "0"); });

        document.getElementById("overallProgress").style.width = "0%";
        setText("overallProgressText", "0% Completed");

        return;
    }

    var html = "";
    var completedCourses = 0;
    var inProgressCourses = 0;
    var totalProgress = 0;
    var totalVideos = 0;
    var watchedVideosCount = 0;

    enrolled.forEach(function (item) {

        var progress = Math.round(Number(item.progress) || 0);
        var watched = (item.completedVideos || []).length;
        var videos = Number(item.totalVideos) || 0;

        totalProgress += progress;
        watchedVideosCount += watched;
        totalVideos += videos;

        var status = EduAPI.statusFromProgress(progress);

        if (status === "In Progress") inProgressCourses++;
        if (status === "Completed") completedCourses++;

        html +=
            '<div class="course-card">' +
            '<div class="course-header"><h3>' + esc(item.courseTitle) + "</h3>" +
            '<div class="status">' + status + "</div></div>" +
            '<div class="course-info">' +
            '<div class="info-box"><h4>Status</h4><p>' + status + "</p></div>" +
            '<div class="info-box"><h4>Progress</h4><p>' + progress + "%</p></div>" +
            '<div class="info-box"><h4>Videos</h4><p>' + watched + "/" + videos + " Watched</p></div>" +
            '<div class="info-box"><h4>Materials</h4><p>Available</p></div></div>' +
            '<div class="progress-title">Learning Progress</div>' +
            '<div class="progress"><div class="progress-fill" style="width:' + progress + '%;"></div></div>' +
            '<div class="progress-text">' + progress + "% Completed</div>" +
            '<div class="buttons">' +
            '<button class="btn start" data-action="start" data-course="' + esc(item.courseId) + '">' +
            (progress === 100 ? "Review Course" : "Continue Learning") + "</button>" +
            '<button class="btn details" data-action="view" data-course="' + esc(item.courseId) + '">View Details</button>' +
            "</div></div>";
    });

    container.innerHTML = html;

    container.addEventListener("click", function (event) {

        var button = event.target.closest("button[data-action]");
        if (!button) return;

        var id = encodeURIComponent(button.dataset.course);

        window.location.href = button.dataset.action === "start"
            ? "/start-course?id=" + id
            : "/course-details?id=" + id;
    });

    var overall = Math.round(totalProgress / enrolled.length);

    setText("totalCourses", enrolled.length);
    setText("enrolledCount", enrolled.length);
    setText("progressCount", inProgressCourses);
    setText("completedCount", completedCourses);
    setText("certificateCount", enrolled.filter(function (item) { return item.completed; }).length);
    setText("lessonCount", watchedVideosCount);
    setText("videoCount", totalVideos);
    setText("overallProgressText", overall + "% Completed");

    document.getElementById("overallProgress").style.width = overall + "%";

    document.getElementById("activityContainer").innerHTML =
        '<div class="course-card"><div class="course-header"><h3>Recent Activity</h3>' +
        '<div class="status">Today</div></div>' +
        '<p style="font-size:17px;line-height:30px;color:var(--text-muted);">' +
        "Enrolled Courses : <b>" + enrolled.length + "</b><br><br>" +
        "Completed Courses : <b>" + completedCourses + "</b><br><br>" +
        "Videos Watched : <b>" + watchedVideosCount + "/" + totalVideos + "</b><br><br>" +
        "Overall Progress : <b>" + overall + "%</b></p></div>";

})();
