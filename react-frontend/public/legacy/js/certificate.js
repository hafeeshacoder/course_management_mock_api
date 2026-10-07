// certificate.js  -  completion certificate (mock API)
// The course is selected with the URL:  /certificate?id=<course id>
(async function () {

    const student = await EduAPI.requireStudent();
    if (!student) return;

    const courseId = EduAPI.getQueryParam("id");

    if (!courseId) {
        window.location.href = "/my-courses";
        return;
    }

    let enrollment;

    try {
        enrollment = await EduAPI.getEnrollment(student.id, courseId);
    } catch (error) {
        EduAPI.showError(error, "Unable to load the certificate.");
        return;
    }

    if (!enrollment || !enrollment.completed) {
        alert("You need to complete this course before viewing its certificate.");
        window.location.href = "/my-courses";
        return;
    }

    const courseTitle = enrollment.courseTitle || "Course";

    let completionDate = enrollment.completedDate;

    if (!completionDate) {
        completionDate = EduAPI.todayLong();
        EduAPI.patch("/enrollments/" + enrollment.id, {
            completedDate: completionDate
        }).catch(console.error);
    }

    const studentName =
        student.studentName || student.name || student.fullName || student.email.split("@")[0];

    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    function drawCertificate() {

        // Background (warm cream)
        ctx.fillStyle = "#FBF3E7";
        ctx.fillRect(0, 0, W, H);

        // Flat decorative bands top/bottom (mustard + sage, no blur/gradient)
        ctx.fillStyle = "#D9A441";
        ctx.fillRect(0, 0, W, 14);
        ctx.fillStyle = "#8A9B6E";
        ctx.fillRect(0, H - 14, W, 14);

        // Outer border (bold espresso, neo-brutalist)
        ctx.strokeStyle = "#33261E";
        ctx.lineWidth = 10;
        ctx.strokeRect(25, 25, W - 50, H - 50);

        // Inner border (mustard gold)
        ctx.strokeStyle = "#D9A441";
        ctx.lineWidth = 3;
        ctx.strokeRect(45, 45, W - 90, H - 90);

        // Header
        ctx.fillStyle = "#7A3A22";
        ctx.font = "bold 26px 'Space Grotesk', Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText("EduBloom", W / 2, 110);

        ctx.fillStyle = "#33261E";
        ctx.font = "bold 52px 'Space Grotesk', Georgia, serif";
        ctx.fillText("Certificate of Completion", W / 2, 200);

        ctx.strokeStyle = "#D9A441";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 180, 225);
        ctx.lineTo(W / 2 + 180, 225);
        ctx.stroke();

        // Subtitle
        ctx.font = "20px 'Work Sans', Arial, sans-serif";
        ctx.fillStyle = "#7A6A5C";
        ctx.fillText("This certificate is proudly presented to", W / 2, 300);

        // Student name
        ctx.font = "italic bold 46px 'Space Grotesk', Georgia, serif";
        ctx.fillStyle = "#C1603C";
        ctx.fillText(studentName, W / 2, 375);

        ctx.strokeStyle = "#D8C9B4";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 250, 395);
        ctx.lineTo(W / 2 + 250, 395);
        ctx.stroke();

        // Course line
        ctx.font = "20px 'Work Sans', Arial, sans-serif";
        ctx.fillStyle = "#7A6A5C";
        ctx.fillText("for successfully completing the course", W / 2, 445);

        ctx.font = "bold 34px 'Space Grotesk', Georgia, serif";
        ctx.fillStyle = "#33261E";
        ctx.fillText(courseTitle, W / 2, 500);

        // Date
        ctx.font = "18px 'Work Sans', Arial, sans-serif";
        ctx.fillStyle = "#7A6A5C";
        ctx.fillText("Completed on " + completionDate, W / 2, 560);

        // Signature area
        ctx.textAlign = "left";
        ctx.strokeStyle = "#33261E";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(160, 730);
        ctx.lineTo(420, 730);
        ctx.stroke();
        ctx.font = "16px 'Work Sans', Arial, sans-serif";
        ctx.fillStyle = "#33261E";
        ctx.fillText("Course Instructor", 160, 755);

        ctx.beginPath();
        ctx.moveTo(W - 420, 730);
        ctx.lineTo(W - 160, 730);
        ctx.stroke();
        ctx.textAlign = "right";
        ctx.fillText("Date Issued", W - 160, 755);

        // Seal
        ctx.textAlign = "center";
        ctx.beginPath();
        ctx.arc(W / 2, 700, 45, 0, Math.PI * 2);
        ctx.fillStyle = "#D9A441";
        ctx.fill();
        ctx.fillStyle = "#33261E";
        ctx.font = "bold 13px 'Work Sans', Arial, sans-serif";
        ctx.fillText("VERIFIED", W / 2, 695);
        ctx.fillText("EDUBLOOM", W / 2, 710);

    }

    drawCertificate();

    // ===============================
    // DOWNLOAD AS IMAGE
    // ===============================

    document.getElementById("downloadBtn").addEventListener("click", function () {

        const link = document.createElement("a");
        link.download = courseTitle.replace(/\s+/g, "_") + "_Certificate.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

    });

    // ===============================
    // PRINT
    // ===============================

    document.getElementById("printBtn").addEventListener("click", function () {

        window.print();

    });

    // ===============================
    // BACK
    // ===============================

    document.getElementById("backBtn").addEventListener("click", function () {

        window.location.href = "/my-courses";

    });

})();
