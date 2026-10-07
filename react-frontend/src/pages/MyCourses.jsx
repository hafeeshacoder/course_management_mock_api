import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function MyCourses() {
    return (
        <>
            <PageCss href="/css/my_courses.css" />
            <PageShell variant="student3">
            <div className="container">
                {/* ================ WELCOME ================= */}
                <div className="welcome">
                    <div className="welcome-text">
                        <h1>My Learning Dashboard</h1>
                        <p>
                            Welcome to your personalized learning space.
Access all your enrolled courses, continue learning,
track your progress, complete quizzes,
submit assignments and download certificates after successfully finishing each course.
                        </p>
                    </div>
                    <div className="welcome-card">
                        <h2 id="totalCourses">0</h2>
                        <p>Enrolled Courses</p>
                    </div>
                </div>
                {/* ================ STATISTICS ================= */}
                <div className="stats">
                    <div className="stat-card">
                        <h3>Enrolled Courses</h3>
                        <span id="enrolledCount">0</span>
                    </div>
                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <span id="progressCount">0</span>
                    </div>
                    <div className="stat-card">
                        <h3>Completed</h3>
                        <span id="completedCount">0</span>
                    </div>
                    <div className="stat-card">
                        <h3>Certificates</h3>
                        <span id="certificateCount">0</span>
                    </div>
                </div>
                {/* ================ MY ENROLLED COURSES ================= */}
                <div className="section">
                    <h2>My Enrolled Courses</h2>
                    <div id="courseContainer">{/* JavaScript will generate enrolled course cards here */}</div>
                </div>
                {/* ================ OVERALL LEARNING PROGRESS ================= */}
                <div className="section">
                    <h2>Overall Learning Progress</h2>
                    <p style={{fontSize: "17px", color: "var(--text-muted)", marginBottom: "20px"}}>Monitor your learning progress across all enrolled courses.</p>
                    <div className="progress-title">Overall Progress</div>
                    <div className="progress">
                        <div className="progress-fill" id="overallProgress" style={{width: "0%"}}></div>
                    </div>
                    <div className="progress-text" id="overallProgressText">0% Completed</div>
                    <div className="course-info">
                        <div className="info-box">
                            <h4>Lessons Completed</h4>
                            <p id="lessonCount">0</p>
                        </div>
                        <div className="info-box">
                            <h4>Videos Watched</h4>
                            <p id="videoCount">0</p>
                        </div>
                    </div>
                </div>
                {/* ================ COMPLETED COURSES ================= */}
                {/* ================ CERTIFICATES ================= */}
                {/* ================ RECENT ACTIVITY ================= */}
                <div className="section">
                    <h2>Recent Activity</h2>
                    <div id="activityContainer">
                        <div className="empty">
                            <h3>No Recent Activity</h3>
                            <p>
                                Your recently watched videos, completed lessons,
submitted assignments and quiz attempts will appear here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ================ FOOTER ================= */}
            </PageShell>
            <LegacyScript src="/legacy/js/my_courses.js" />
        </>
    );
}
