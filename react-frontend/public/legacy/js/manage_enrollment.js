// manage_enrollment.js  -  approve / reject enrollment requests (mock API)
(async function () {

    var admin = await EduAPI.requireAdmin();
    if (!admin) return;

    var esc = EduAPI.esc;

    var enrollmentTable = document.getElementById("enrollmentTable");
    var searchEnrollment = document.getElementById("searchEnrollment");
    var statusFilter = document.getElementById("statusFilter");
    var selectedEnrollment = document.getElementById("selectedEnrollment");
    var approvedTable = document.getElementById("approvedTable");
    var activityContainer = document.getElementById("activityContainer");

    var enrollments = [];
    var selectedId = null;

    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }

    function countByStatus(status) {
        return enrollments.filter(function (item) {
            return (item.status || "Pending") === status;
        }).length;
    }

    function updateStatistics() {

        var total = enrollments.length;
        var approved = countByStatus("Approved");
        var pending = countByStatus("Pending");
        var rejected = countByStatus("Rejected");

        setText("totalRequests", total);
        setText("approvedRequests", approved);
        setText("pendingRequests", pending);
        setText("rejectedRequests", rejected);
        setText("summaryTotal", total);
        setText("summaryApproved", approved);
        setText("summaryPending", pending);
        setText("summaryRejected", rejected);
    }

    function currentList() {

        var keyword = searchEnrollment.value.trim().toLowerCase();
        var status = statusFilter.value;

        return enrollments.filter(function (item) {

            var matchesText =
                String(item.studentName || "").toLowerCase().indexOf(keyword) !== -1 ||
                String(item.courseTitle || "").toLowerCase().indexOf(keyword) !== -1;

            var matchesStatus =
                status === "All" || (item.status || "Pending") === status;

            return matchesText && matchesStatus;
        });
    }

    function displayEnrollments() {

        var data = currentList();

        if (data.length === 0) {
            enrollmentTable.innerHTML =
                '<tr><td colspan="5" style="padding:60px;text-align:center;color:var(--text-muted);">' +
                "No Enrollment Requests Found</td></tr>";
            return;
        }

        enrollmentTable.innerHTML = data.map(function (item) {
            return "<tr>" +
                "<td>" + esc(item.studentName || "Student") + "</td>" +
                "<td>" + esc(item.courseTitle || "Course") + "</td>" +
                "<td>" + esc(item.enrollDate || "-") + "</td>" +
                "<td>" + esc(item.status || "Pending") + "</td>" +
                '<td><button data-view="' + esc(item.id) + '">View</button></td>' +
                "</tr>";
        }).join("");
    }

    function findSelected() {
        return enrollments.find(function (item) {
            return EduAPI.sameId(item.id, selectedId);
        });
    }

    function showSelected() {

        var item = findSelected();

        if (!item) {
            selectedEnrollment.innerHTML =
                "<p>Select an enrollment request to view its details.</p>";
            return;
        }

        selectedEnrollment.innerHTML =
            '<h3 style="color:var(--primary-deep);margin-bottom:20px;">Enrollment Details</h3>' +
            "<p><strong>Student Name :</strong> " + esc(item.studentName) + "</p>" +
            "<p><strong>Course Name :</strong> " + esc(item.courseTitle) + "</p>" +
            "<p><strong>Enrollment Date :</strong> " + esc(item.enrollDate) + "</p>" +
            "<p><strong>Status :</strong> " + esc(item.status || "Pending") + "</p>" +
            '<div style="margin-top:25px;display:flex;justify-content:center;gap:15px;flex-wrap:wrap;">' +
            '<button id="approveBtn" style="padding:12px 25px;background:var(--success);color:white;border:none;border-radius:8px;cursor:pointer;">Approve</button>' +
            '<button id="rejectBtn" style="padding:12px 25px;background:var(--danger);color:white;border:none;border-radius:8px;cursor:pointer;">Reject</button>' +
            "</div>";

        document.getElementById("approveBtn").onclick = function () { setStatus("Approved"); };
        document.getElementById("rejectBtn").onclick = function () { setStatus("Rejected"); };
    }

    function loadApprovedEnrollments() {

        var approved = enrollments.filter(function (item) {
            return item.status === "Approved";
        });

        if (approved.length === 0) {
            approvedTable.innerHTML =
                '<tr><td colspan="4" style="padding:60px;text-align:center;color:var(--text-muted);">' +
                "No Approved Enrollments</td></tr>";
            return;
        }

        approvedTable.innerHTML = approved.map(function (item) {
            return "<tr><td>" + esc(item.studentName) + "</td>" +
                "<td>" + esc(item.courseTitle) + "</td>" +
                "<td>Administrator</td>" +
                "<td>" + esc(item.enrollDate) + "</td></tr>";
        }).join("");
    }

    function loadRecentActivity() {

        if (enrollments.length === 0) {
            activityContainer.innerHTML =
                '<h3 style="color:var(--primary-deep);">No Recent Activity</h3>' +
                "<p>Recent enrollment activities will appear here.</p>";
            return;
        }

        var html = "<h3 style='color:var(--primary-deep);margin-bottom:20px;'>Recent Activity</h3>";

        enrollments.slice(-5).reverse().forEach(function (item) {
            html += '<p style="margin-bottom:15px;"><strong>' + esc(item.studentName) +
                "</strong> applied for <strong>" + esc(item.courseTitle) +
                "</strong> - " + esc(item.status || "Pending") + "</p>";
        });

        activityContainer.innerHTML = html;
    }

    function renderAll() {
        displayEnrollments();
        updateStatistics();
        loadApprovedEnrollments();
        loadRecentActivity();
        if (selectedId !== null) showSelected();
    }

    async function refreshEnrollments() {
        try {
            enrollments = await EduAPI.getEnrollments();
            renderAll();
        } catch (error) {
            EduAPI.showError(error, "Unable to load enrollments.");
        }
    }

    async function setStatus(status) {

        if (selectedId === null) {
            alert("Please select an enrollment request.");
            return;
        }

        try {
            await EduAPI.patch("/enrollments/" + selectedId, { status: status });
            alert("Enrollment " + status + " Successfully!");
            await refreshEnrollments();
        } catch (error) {
            EduAPI.showError(error, "Unable to update the enrollment.");
        }
    }

    enrollmentTable.addEventListener("click", function (event) {
        var button = event.target.closest("button[data-view]");
        if (!button) return;
        selectedId = button.dataset.view;
        showSelected();
    });

    searchEnrollment.addEventListener("keyup", displayEnrollments);
    statusFilter.addEventListener("change", displayEnrollments);

    await refreshEnrollments();

    setInterval(refreshEnrollments, 30000);

})();
