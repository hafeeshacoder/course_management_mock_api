import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function ManageEnrollment() {
    return (
        <>
            <PageCss href="/css/manage_enrollment.css" />

            <PageShell variant="admin">

                <div className="container">

                    {/* PAGE HEADER */}

                    <div className="banner">

                        <h1>
                            Manage Student Enrollments
                        </h1>

                        <p>
                            Review, approve, reject, and manage student enrollment requests.
                            All enrollment requests submitted by students will be displayed here.
                        </p>

                    </div>


                    {/* STATISTICS */}

                    <div className="stats">

                        <div className="card">
                            <h3>Total Requests</h3>
                            <div
                                className="number"
                                id="totalRequests"
                            >
                                0
                            </div>
                        </div>

                        <div className="card">
                            <h3>Approved</h3>
                            <div
                                className="number"
                                id="approvedRequests"
                            >
                                0
                            </div>
                        </div>

                        <div className="card">
                            <h3>Pending</h3>
                            <div
                                className="number"
                                id="pendingRequests"
                            >
                                0
                            </div>
                        </div>

                        <div className="card">
                            <h3>Rejected</h3>
                            <div
                                className="number"
                                id="rejectedRequests"
                            >
                                0
                            </div>
                        </div>

                    </div>


                    {/* SEARCH */}

                    <div className="search-box">

                        <input
                            type="text"
                            id="searchEnrollment"
                            placeholder="Search Enrollment Request..."
                        />

                    </div>


                    {/* FILTER */}

                    <div className="search-box">

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "15px"
                            }}
                        >

                            <h2
                                style={{
                                    color: "var(--primary-deep)"
                                }}
                            >
                                Enrollment Requests
                            </h2>

                            <select
                                id="statusFilter"
                                style={{
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-soft)"
                                }}
                            >

                                <option value="All">
                                    All Requests
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Approved">
                                    Approved
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ENROLLMENT REQUESTS */}

                    <div className="section">

                        <h2>
                            Student Enrollment Requests
                        </h2>

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Student Name
                                    </th>

                                    <th>
                                        Course Name
                                    </th>

                                    <th>
                                        Enrollment Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody id="enrollmentTable">
                            </tbody>

                        </table>

                    </div>


                    {/* SELECTED ENROLLMENT */}

                    <div className="section">

                        <h2>
                            Selected Enrollment
                        </h2>

                        <div
                            id="selectedEnrollment"
                            style={{
                                padding: "40px",
                                border: "2px dashed var(--border-soft)",
                                borderRadius: "12px",
                                textAlign: "center",
                                color: "var(--text-muted)",
                                lineHeight: "30px"
                            }}
                        >

                            <h3
                                style={{
                                    color: "var(--primary-deep)",
                                    marginBottom: "15px"
                                }}
                            >
                                No Enrollment Selected
                            </h3>

                            <p>
                                Select an enrollment request from the table above
                                to view complete student and course information.
                            </p>

                        </div>

                    </div>


                    {/* ENROLLMENT SUMMARY */}

                    <div className="section">

                        <h2>
                            Enrollment Summary
                        </h2>

                        <div className="stats">

                            <div className="card">

                                <h3>
                                    Total Enrollment Requests
                                </h3>

                                <div
                                    className="number"
                                    id="summaryTotal"
                                >
                                    0
                                </div>

                                <p
                                    style={{
                                        marginTop: "12px",
                                        color: "var(--text-muted)"
                                    }}
                                >
                                    Displays the total number of enrollment requests received.
                                </p>

                            </div>


                            <div className="card">

                                <h3>
                                    Approved Requests
                                </h3>

                                <div
                                    className="number"
                                    id="summaryApproved"
                                >
                                    0
                                </div>

                                <p
                                    style={{
                                        marginTop: "12px",
                                        color: "var(--text-muted)"
                                    }}
                                >
                                    Shows the number of approved enrollments.
                                </p>

                            </div>


                            <div className="card">

                                <h3>
                                    Pending Requests
                                </h3>

                                <div
                                    className="number"
                                    id="summaryPending"
                                >
                                    0
                                </div>

                                <p
                                    style={{
                                        marginTop: "12px",
                                        color: "var(--text-muted)"
                                    }}
                                >
                                    Shows enrollment requests awaiting approval.
                                </p>

                            </div>


                            <div className="card">

                                <h3>
                                    Rejected Requests
                                </h3>

                                <div
                                    className="number"
                                    id="summaryRejected"
                                >
                                    0
                                </div>

                                <p
                                    style={{
                                        marginTop: "12px",
                                        color: "var(--text-muted)"
                                    }}
                                >
                                    Shows rejected enrollment requests.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* RECENTLY APPROVED */}

                    <div className="section">

                        <h2>
                            Recently Approved Enrollments
                        </h2>

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Approved By
                                    </th>

                                    <th>
                                        Approval Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody id="approvedTable">
                            </tbody>

                        </table>

                    </div>


                    {/* RECENT ACTIVITY */}

                    <div className="section">

                        <h2>
                            Recent Enrollment Activity
                        </h2>

                        <div
                            id="activityContainer"
                            style={{
                                padding: "40px",
                                border: "2px dashed var(--border-soft)",
                                borderRadius: "12px",
                                textAlign: "center",
                                color: "var(--text-muted)",
                                lineHeight: "30px"
                            }}
                        >

                            <h3
                                style={{
                                    color: "var(--primary-deep)",
                                    marginBottom: "15px"
                                }}
                            >
                                No Recent Activity
                            </h3>

                            <p>
                                Recent enrollment activities will appear here after
                                students submit enrollment requests.
                            </p>

                        </div>

                    </div>

                </div>

            </PageShell>


            <LegacyScript
                src="/legacy/js/manage_enrollment.js"
            />

        </>
    );
}