// add_course.js  -  publish / save-as-draft a course (mock API: POST /courses)
// Field names follow db.json:
//   courseName, courseCode, learningOutcomes, modules, videos, materials ...
(async function () {

    var admin = await EduAPI.requireAdmin();
    if (!admin) return;

    var DEFAULT_ICON = "https://cdn-icons-png.flaticon.com/512/2103/2103633.png";
    var DEFAULT_BANNER = "https://picsum.photos/900/350";

    function el(id) { return document.getElementById(id); }

    function value(id) { return el(id).value.trim(); }

    function values(ids) {
        return ids.map(value).filter(Boolean);
    }

    // "Select Level" / "Select Category" are only placeholders
    function selected(id) {
        var text = el(id).value;
        return /^Select /.test(text) ? "" : text;
    }

    function updatePreview() {
        el("previewImage").src = value("image") || DEFAULT_BANNER;
    }

    function buildCourse(status) {

        var image = value("image");
        var instructor = value("instructor");

        return {
            courseName: value("courseName"),
            courseCode: value("courseCode"),
            instructor: instructor,
            duration: value("duration"),
            level: selected("level"),
            category: selected("category"),
            image: image || DEFAULT_ICON,
            banner: image || DEFAULT_BANNER,
            status: status,
            overview: value("overview"),
            description: value("overview"),
            mode: "Online",
            learningOutcomes: values(["outcome", "outcome2", "outcome3", "outcome4", "outcome5"]),
            prerequisites: values(["prerequistite1", "prerequisite2", "prerequisite3"]),
            modules: values(["module1", "module2", "module3", "module4", "module5"]),
            skills: [],
            instructorInfo: instructor ? instructor + " is the instructor for this course." : "",
            videos: EduAPI.mergeLinks(
                values(["v1", "v2", "v3", "v4", "v5"]),
                [],
                function (link, number) {
                    return EduAPI.videoFromLink(link, number, image);
                }
            ),
            materials: EduAPI.mergeLinks(
                values(["l1", "lab", "reference", "additional"]),
                [],
                EduAPI.materialFromLink
            ),
            maxStudents: value("maxstudents") ? Number(value("maxstudents")) : "",
            language: el("courselanguage").value,
            certificate: el("certificateavailability").value,
            enrollmentType: el("enrollmenttype").value,
            startDate: el("sd").value,
            endDate: el("ed").value
        };
    }

    async function save(status) {

        if (
            value("courseName") === "" ||
            value("courseCode") === "" ||
            value("instructor") === ""
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {

            var existing = await EduAPI.getCourses();

            var duplicate = existing.some(function (course) {
                return String(course.courseCode).toLowerCase() ===
                    value("courseCode").toLowerCase();
            });

            if (duplicate) {
                alert("A course with this Course Code already exists.");
                el("courseCode").focus();
                return;
            }

            await EduAPI.post("/courses", buildCourse(status));

            if (status === "Draft") {
                alert("Course Saved as Draft!");
            } else {
                alert("Course Published Successfully!");
            }

            window.location.href = "/admin-dashboard";

        } catch (error) {
            EduAPI.showError(error, "Unable to save the course.");
        }
    }

    function resetForm() {

        [
            "courseName", "courseCode", "instructor", "duration", "image", "overview",
            "outcome", "outcome2", "outcome3", "outcome4", "outcome5",
            "prerequistite1", "prerequisite2", "prerequisite3",
            "module1", "module2", "module3", "module4", "module5",
            "v1", "v2", "v3", "v4", "v5",
            "l1", "lab", "reference", "additional",
            "maxstudents", "sd", "ed"
        ].forEach(function (id) { el(id).value = ""; });

        ["level", "category", "status", "courselanguage",
            "certificateavailability", "enrollmenttype"]
            .forEach(function (id) { el(id).selectedIndex = 0; });

        el("previewImage").src = DEFAULT_BANNER;
    }

    el("image").addEventListener("input", updatePreview);

    // Publish uses the chosen Status (Active / Draft / Inactive)
    el("publishBtn").addEventListener("click", function () { save(el("status").value); });

    // Save Draft always stores the course as a Draft
    el("draftBtn").addEventListener("click", function () { save("Draft"); });

    el("resetBtn").addEventListener("click", resetForm);

    updatePreview();

})();
