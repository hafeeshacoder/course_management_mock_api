import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentDashboard() {
    return (
        <>
            <PageCss href="/css/student_dashboard.css" />
            <PageShell variant="student3">
            <div className="container">
                <div className="profile">
                    <div className="left-profile">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop" />
                        <div>
                            <h2>Student Dashboard</h2>
                            <div className="student-info">
                                <p>
                                    <b>Email :</b>
                                    <span id="studentEmail"></span>
                                </p>
                                <p>
                                    <b>Department :</b>
                                    <span id="studentDepartment"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop" width="220" />
                </div>
                <div style={{width: "260px", background: "var(--primary)", color: "white", padding: "25px", borderRadius: "8px", textAlign: "center", border: "3px solid var(--border)", boxShadow: "6px 6px 0 var(--border)"}}>
                    <h2>Welcome!</h2>
                    <p style={{marginTop: "15px", lineHeight: "25px"}}>Manage your enrolled courses, monitor your learning progress, and stay updated with your academic activities from one place.</p>
                </div>
            </div>
            <div className="stats">
                <div className="card">
                    <h3>Courses Enrolled</h3>
                    <div className="number" id="enrolledCount">0</div>
                </div>
                <div className="card">
                    <h3>Courses Completed</h3>
                    <div className="number" id="completedCount">0</div>
                </div>
                <div className="card">
                    <h3>Assignments Submitted</h3>
                    <div className="number" id="assignmentCount">0</div>
                </div>
                <div className="card">
                    <h3>Overall Progress</h3>
                    <div className="number" id="overallProgress">0%</div>
                </div>
            </div>
            <div className="main">
                <div>
                    <div className="section">
                        <h2>My Courses</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Status</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody id="courseTable"></tbody>
                        </table>
                    </div>
                    <div className="section">
                        <h2>Recent Notifications</h2>
                        <div id="notificationContainer"></div>
                    </div>
                </div>
                <div>
                    <div className="section">
                        <h2>Learning Progress</h2>
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop" width="100%" />
                        <p style={{textAlign: "center", color: "gray", marginTop: "15px"}}>Progress analytics will be displayed here.</p>
                    </div>
                    <div className="section">
                        <h2>Quick Overview</h2>
                        <div id="quickOverview"></div>
                    </div>
                </div>
            </div>
            </PageShell>
            <LegacyScript src="/legacy/js/student_dashboard.js" />
        </>
    );
}
