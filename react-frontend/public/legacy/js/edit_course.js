// edit_course.js  -  edit / delete courses (mock API: PUT / DELETE /courses/:id)
// Open a course directly with  /edit-course?id=<course id>
(async function () {

    var admin = await EduAPI.requireAdmin();
    if (!admin) return;

    var esc = EduAPI.esc;

    var DEFAULT_BANNER = "https://picsum.photos/900/350";

    var courses = [];
    var selectedId = null;

    function el(id) { return document.getElementById(id); }

    function value(id) { return el(id).value.trim(); }

    function values(ids) {
        return ids.map(value).filter(Boolean);
    }

    function selectedCourse() {
        return courses.find(function (course) {
            return EduAPI.sameId(course.id, selectedId);
        });
    }

    var OUTCOME_IDS = ["outcome1", "outcome2", "outcome3", "outcome4", "outcome5"];
    var PRE_IDS = ["pre1", "pre2", "pre3"];
    var MODULE_IDS = ["module1", "module2", "module3", "module4", "module5"];
    var VIDEO_IDS = ["video1", "video2", "video3", "video4", "video5"];
    var MATERIAL_IDS = ["notes", "lab", "assignment", "reference", "resource"];

    function fill(ids, list) {
        ids.forEach(function (id, index) {
            el(id).value = (list && list[index]) || "";
        });
    }

    function displayCourses(list) {

        list = list || courses;

        var container = el("courseList");

        if (list.length === 0) {
            container.innerHTML =
                '<p style="text-align:center;color:var(--text-muted);padding:30px;">No Courses Available</p>';
            return;
        }

        container.innerHTML = list.map(function (course) {
            return '<div class="course-card"><div class="course-info">' +
                "<h3>" + esc(course.courseName) + "</h3>" +
                "<p>Instructor : " + esc(course.instructor) +
                " | Duration : " + esc(course.duration) +
                " | Status : " + esc(course.status) + "</p></div>" +
                '<button class="edit-btn" data-id="' + esc(course.id) + '">Edit Course</button></div>';
        }).join("");
    }

    function loadCourse(id, scroll) {

        selectedId = id;

        var course = selectedCourse();
        if (!course) return;

        el("courseName").value = course.courseName || "";
        el("courseCode").value = course.courseCode || "";
        el("instructor").value = course.instructor || "";
        el("duration").value = course.duration || "";
        el("level").value = course.level || "Beginner";
        el("category").value = course.category || "Programming";
        el("image").value = course.image || "";
        el("status").value = course.status || "Active";
        el("overview").value = course.overview || "";

        fill(OUTCOME_IDS, course.learningOutcomes);
        fill(PRE_IDS, course.prerequisites);
        fill(MODULE_IDS, course.modules);
        fill(VIDEO_IDS, (course.videos || []).map(function (video) { return video.link; }));
        fill(MATERIAL_IDS, (course.materials || []).map(function (material) { return material.link; }));

        el("previewImage").src = course.banner || course.image || DEFAULT_BANNER;

        if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function resetForm() {

        ["courseName", "courseCode", "instructor", "duration", "image", "overview"]
            .concat(OUTCOME_IDS, PRE_IDS, MODULE_IDS, VIDEO_IDS, MATERIAL_IDS)
            .forEach(function (id) { el(id).value = ""; });

        ["level", "category", "status"].forEach(function (id) {
            el(id).selectedIndex = 0;
        });

        el("previewImage").src = DEFAULT_BANNER;
        selectedId = null;
    }

    async function refreshCourses() {
        try {
            courses = await EduAPI.getCourses();
            displayCourses();
        } catch (error) {
            EduAPI.showError(error, "Unable to load courses.");
        }
    }

    // ---------- events ----------

    el("courseList").addEventListener("click", function (event) {
        var button = event.target.closest("button[data-id]");
        if (button) loadCourse(button.dataset.id, true);
    });

    el("searchCourse").addEventListener("keyup", function () {
        var keyword = this.value.toLowerCase();
        displayCourses(courses.filter(function (course) {
            return String(course.courseName).toLowerCase().indexOf(keyword) !== -1;
        }));
    });

    el("image").addEventListener("input", function () {
        var course = selectedCourse();
        el("previewImage").src =
            value("image") ||
            (course && (course.banner || course.image)) ||
            DEFAULT_BANNER;
    });

    el("updateBtn").addEventListener("click", async function () {

        var old = selectedCourse();

        if (!old) {
            alert("Please select a course to update.");
            return;
        }

        if (value("courseName") === "" || value("courseCode") === "" || value("instructor") === "") {
            alert("Please fill all required fields.");
            return;
        }

        var duplicate = courses.some(function (course) {
            return !EduAPI.sameId(course.id, old.id) &&
                String(course.courseCode).toLowerCase() === value("courseCode").toLowerCase();
        });

        if (duplicate) {
            alert("Another course already uses this Course Code.");
            return;
        }

        var image = value("image");

        // keep the banner in step with the image for admin-created courses
        var banner = old.banner;
        if (!banner || banner === old.image) banner = image || old.banner;

        // keep the long description in step with the overview when they were the same
        var description = old.description;
        if (!description || description === old.overview) description = value("overview");

        // rebuild videos / materials from the links, keeping existing titles & thumbnails,
        // and never dropping items beyond the 5 fields shown on this form
        var videos = EduAPI.mergeLinks(
            values(VIDEO_IDS),
            old.videos,
            function (link, number) { return EduAPI.videoFromLink(link, number, banner); }
        ).concat((old.videos || []).slice(VIDEO_IDS.length));

        var materials = EduAPI.mergeLinks(
            values(MATERIAL_IDS),
            old.materials,
            EduAPI.materialFromLink
        ).concat((old.materials || []).slice(MATERIAL_IDS.length));

        var updated = Object.assign({}, old, {
            courseName: value("courseName"),
            courseCode: value("courseCode"),
            instructor: value("instructor"),
            duration: value("duration"),
            level: el("level").value,
            category: el("category").value,
            image: image || old.image,
            banner: banner,
            status: el("status").value,
            overview: value("overview"),
            description: description,
            learningOutcomes: values(OUTCOME_IDS),
            prerequisites: values(PRE_IDS),
            modules: values(MODULE_IDS),
            videos: videos,
            materials: materials
        });

        try {

            var saved = await EduAPI.put("/courses/" + encodeURIComponent(old.id), updated);

            // keep the course title on existing enrollments in step with the rename
            if (old.courseName !== saved.courseName) {
                var related = await EduAPI.get("/enrollments?courseId=" + encodeURIComponent(old.id));
                await Promise.all(related.map(function (item) {
                    return EduAPI.patch("/enrollments/" + item.id, {
                        courseTitle: saved.courseName,
                        totalVideos: (saved.videos || []).length
                    });
                }));
            }

            alert("Course Updated Successfully!");

            await refreshCourses();
            loadCourse(saved.id, false);

        } catch (error) {
            EduAPI.showError(error, "Unable to update the course.");
        }
    });

    el("deleteBtn").addEventListener("click", async function () {

        var course = selectedCourse();

        if (!course) {
            alert("Please select a course to delete.");
            return;
        }

        if (!confirm("Are you sure you want to delete this course? Its enrollments will be removed too.")) {
            return;
        }

        try {
            await EduAPI.deleteCourse(course.id);
            alert("Course Deleted Successfully!");
            resetForm();
            await refreshCourses();
        } catch (error) {
            EduAPI.showError(error, "Unable to delete the course.");
        }
    });

    el("resetBtn").addEventListener("click", resetForm);

    // ---------- start ----------

    el("previewImage").src = DEFAULT_BANNER;

    await refreshCourses();

    var requestedId = EduAPI.getQueryParam("id");

    if (requestedId && courses.some(function (course) { return EduAPI.sameId(course.id, requestedId); })) {
        loadCourse(requestedId, true);
    }

})();
