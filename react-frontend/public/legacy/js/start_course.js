// start_course.js  -  learning page: videos, materials, progress, completion
// The course is selected with the URL:  /start-course?id=<course id>
// Video progress is saved on the student's enrollment record in the mock API.
(async function () {

    var esc = EduAPI.esc;

    var student = await EduAPI.requireStudent();
    if (!student) return;

    var courseId = EduAPI.getQueryParam("id");

    if (!courseId) {
        window.location.href = "/my-courses";
        return;
    }

    var course, enrollment;

    try {
        course = await EduAPI.getCourse(courseId);
        enrollment = await EduAPI.getEnrollment(student.id, courseId);
    } catch (error) {
        if (error.status === 404) {
            alert("This course is no longer available.");
            window.location.href = "/my-courses";
        } else {
            EduAPI.showError(error, "Unable to load the course.");
        }
        return;
    }

    if (!enrollment) {
        alert("Please enroll in this course before starting it.");
        window.location.href = "/course-details?id=" + encodeURIComponent(courseId);
        return;
    }

    var videos = Array.isArray(course.videos) ? course.videos : [];
    var materials = Array.isArray(course.materials) ? course.materials : [];
    var completedVideos = Array.isArray(enrollment.completedVideos)
        ? enrollment.completedVideos.slice()
        : [];

    // ---------- basic details ----------

    var title = course.courseName || "Course";

    document.getElementById("title").textContent = title;
    document.getElementById("overview").textContent = course.overview || "";
    document.getElementById("courseImage").src =
        course.banner || course.image || "https://picsum.photos/900/350";
    document.getElementById("instructor").textContent = course.instructor || "-";
    document.getElementById("duration").textContent = course.duration || "-";
    document.getElementById("level").textContent = course.level || "-";
    document.getElementById("mode").textContent = course.mode || "Online";
    document.title = title + " | EduBloom";

    var completeBtn = document.getElementById("completeBtn");
    var certificateBtn = document.getElementById("certificateBtn");

    function enableCertificate() {
        certificateBtn.disabled = false;
        certificateBtn.style.background = "var(--primary)";
        certificateBtn.style.cursor = "pointer";
    }

    if (enrollment.completed) enableCertificate();

    // ---------- videos ----------

    var videoContainer = document.getElementById("videoContainer");

    videoContainer.innerHTML = videos.length
        ? videos.map(function (video, index) {
            return '<div class="video-card">' +
                '<img src="' + esc(video.thumbnail) + '" alt="' + esc(video.title) + '">' +
                "<h3>" + esc(video.title) + "</h3>" +
                '<button class="watch-btn" data-index="' + index + '">Watch Video</button>' +
                "</div>";
        }).join("")
        : "<p>No video lessons have been added to this course yet.</p>";

    videoContainer.addEventListener("click", function (event) {
        var button = event.target.closest(".watch-btn");
        if (button) watchVideo(Number(button.dataset.index));
    });

    // ---------- materials ----------

    document.getElementById("materialContainer").innerHTML = materials.length
        ? materials.map(function (material) {
            return '<div class="material-card"><h3>' + esc(material.title) + "</h3>" +
                "<p>" + esc(material.description) + "</p>" +
                '<a href="' + esc(material.link) +
                '" target="_blank" rel="noopener" class="action-btn">Open Material</a></div>';
        }).join("")
        : "<p>No study materials have been added to this course yet.</p>";

    // ---------- progress ----------

    function currentProgress() {
        return videos.length ? (completedVideos.length / videos.length) * 100 : 0;
    }

    function paintProgress() {

        var progress = currentProgress();

        document.getElementById("progressBar").style.width = progress + "%";
        document.getElementById("progressText").textContent =
            Math.round(progress) + "% Completed";

        if (progress >= 100) {
            completeBtn.disabled = false;
            completeBtn.style.background = "var(--success)";
            completeBtn.style.cursor = "pointer";
        }
    }

    async function saveEnrollment(changes) {
        enrollment = await EduAPI.patch(
            "/enrollments/" + enrollment.id,
            Object.assign({
                completedVideos: completedVideos,
                progress: currentProgress(),
                totalVideos: videos.length
            }, changes || {})
        );
    }

    async function watchVideo(index) {

        var video = videos[index];
        if (!video) return;

        window.open(video.link, "_blank", "noopener");

        if (completedVideos.indexOf(index) === -1) {
            completedVideos.push(index);
        }

        paintProgress();

        try {
            await saveEnrollment();
        } catch (error) {
            EduAPI.showError(error, "Unable to save your progress.");
        }
    }

    paintProgress();

    // ---------- complete course ----------

    completeBtn.onclick = async function () {

        if (videos.length === 0 || completedVideos.length !== videos.length) {
            alert("Please watch all videos before completing the course.");
            return;
        }

        try {

            await saveEnrollment({
                progress: 100,
                completed: true,
                completedDate: enrollment.completedDate || EduAPI.todayLong()
            });

            enableCertificate();

            alert("Congratulations! You have successfully completed the course.");

        } catch (error) {
            EduAPI.showError(error, "Unable to complete the course.");
        }
    };

    // ---------- certificate ----------

    certificateBtn.onclick = function () {
        window.location.href = "/certificate?id=" + encodeURIComponent(courseId);
    };

})();
