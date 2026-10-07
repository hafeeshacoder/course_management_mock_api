// course_details.js  -  shows one course from the mock API and handles enrolling
// The course is selected with the URL:  /course-details?id=<course id>
(async function () {

    var esc = EduAPI.esc;

    var student = await EduAPI.requireStudent();
    if (!student) return;

    var courseId = EduAPI.getQueryParam("id");

    if (!courseId) {
        alert("Please select a course first.");
        window.location.href = "/courses";
        return;
    }

    var course;

    try {
        course = await EduAPI.getCourse(courseId);
    } catch (error) {
        if (error.status === 404) {
            alert("This course is no longer available.");
            window.location.href = "/courses";
        } else {
            EduAPI.showError(error, "Unable to load the course.");
        }
        return;
    }

    function list(value) {
        return Array.isArray(value) ? value.filter(Boolean) : [];
    }

    function cards(items, subtitle) {
        return items.map(function (item) {
            return '<div class="skill-card"><h3>' + esc(item) + "</h3><p>" +
                subtitle(item) + "</p></div>";
        }).join("");
    }

    var title = course.courseName || "Course";

    document.getElementById("title").textContent = title;
    document.getElementById("overview").textContent = course.overview || "";
    document.getElementById("courseDescription").textContent =
        course.description || course.overview || "";

    var image = document.getElementById("courseImage");
    image.onerror = function () {
        this.onerror = null;   // only try the fallback once
        this.src = "https://picsum.photos/900/350";
    };
    image.src = course.banner || course.image || "https://picsum.photos/900/350";

    document.getElementById("duration").textContent = course.duration || "-";
    document.getElementById("instructor").textContent = course.instructor || "-";
    document.getElementById("level").textContent = course.level || "-";
    document.getElementById("mode").textContent = course.mode || "Online";
    document.getElementById("instructorName").textContent = course.instructor || "-";
    document.getElementById("instructorInfo").textContent =
        course.instructorInfo ||
        (course.instructor ? course.instructor + " is the instructor for this course." : "");

    document.title = title + " | EduBloom";

    document.getElementById("modules").innerHTML =
        list(course.modules).map(function (module, index) {
            return '<div class="module-card"><h3>Module ' + (index + 1) + "</h3><p>" +
                esc(module) + "</p></div>";
        }).join("");

    document.getElementById("skills").innerHTML =
        cards(list(course.skills), function (skill) {
            return "Develop practical knowledge in " + esc(skill) + ".";
        });

    document.getElementById("outcomes").innerHTML =
        cards(list(course.learningOutcomes), function () {
            return "Successfully achieve this learning outcome after completing the course.";
        });

    document.getElementById("prerequisites").innerHTML =
        cards(list(course.prerequisites), function () {
            return "Recommended before starting this course.";
        });

    var enrollBtn = document.querySelector(".enroll-btn");

    var existing = null;

    try {
        existing = await EduAPI.getEnrollment(student.id, course.id);
    } catch (error) {
        EduAPI.showError(error);
    }

    if (existing) {
        enrollBtn.textContent = "Already Enrolled";
        enrollBtn.disabled = true;
    } else if ((course.status || "Active") !== "Active") {
        enrollBtn.textContent = "Not Open For Enrollment";
        enrollBtn.disabled = true;
    }

    window.enrollCourse = async function () {

        if (enrollBtn.disabled) return;

        enrollBtn.disabled = true;

        try {

            var already = await EduAPI.getEnrollment(student.id, course.id);

            if (already) {
                alert("You have already enrolled in this course.");
                return;
            }

            var created = await EduAPI.post("/enrollments", {
                studentRefId: student.id,
                studentName: student.studentName || student.email,
                studentEmail: student.email,
                courseId: course.id,
                courseTitle: title,
                enrollDate: new Date().toLocaleDateString(),
                status: "Pending",
                progress: 0,
                completedVideos: [],
                totalVideos: list(course.videos).length,
                completed: false,
                completedDate: ""
            });

            window.location.href = "/enrollment-success?enrollment=" +
                encodeURIComponent(created.id);

        } catch (error) {
            enrollBtn.disabled = false;
            EduAPI.showError(error, "Enrollment failed. Please try again.");
        }
    };

    window.scrollTo({ top: 0, behavior: "smooth" });

})();
