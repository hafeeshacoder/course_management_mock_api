import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StartCourse() {
    return (
        <>
            <PageCss href="/css/start_course.css" />
            <PageShell variant="student3">
            <div className="container">
                {/* ================ HERO ================= */}
                <div className="hero">
                    <div className="hero-text">
                        <h1 id="title">Course Name</h1>
                        <p id="overview">Course Overview</p>
                    </div>
                    <div className="hero-image">
                        <img id="courseImage" alt="Course Image" />
                    </div>
                </div>
                {/* ================ COURSE INFORMATION ================= */}
                <div className="info-grid">
                    <div className="info-card">
                        <h3>Instructor</h3>
                        <p id="instructor"></p>
                    </div>
                    <div className="info-card">
                        <h3>Duration</h3>
                        <p id="duration"></p>
                    </div>
                    <div className="info-card">
                        <h3>Level</h3>
                        <p id="level"></p>
                    </div>
                    <div className="info-card">
                        <h3>Mode</h3>
                        <p id="mode"></p>
                    </div>
                </div>
                {/* ================ PROGRESS ================= */}
                <div className="progress-section">
                    <h2>Your Learning Progress</h2>
                    <div className="progress-bar">
                        <div className="progress" id="progressBar"></div>
                    </div>
                    <div className="progress-text" id="progressText">0% Completed</div>
                    <button className="start-btn">Continue Learning</button>
                </div>
                {/* ================ VIDEO LESSONS ================= */}
                <div className="section">
                    <h2>🎥 Video Lessons</h2>
                    <p style={{color: "var(--text-muted)", lineHeight: "28px"}}>
                        Watch the lessons in order. Each course loads its own YouTube videos
automatically based on the selected course.
                    </p>
                    <div id="videoContainer" className="grid">{/* Videos loaded by JavaScript */}</div>
                </div>
                {/* ================ STUDY MATERIALS ================= */}
                <div className="section">
                    <h2>📚 Study Materials</h2>
                    <p style={{color: "var(--text-muted)", lineHeight: "28px"}}>
                        These learning resources are official documentation and trusted
learning websites related to your selected course.
                    </p>
                    <div id="materialContainer" className="grid">{/* Materials loaded by JavaScript */}</div>
                </div>
                {/* ================ ASSIGNMENTS ================= */}
                {/* ================ QUIZZES ================= */}
                {/* ================ COURSE COMPLETION ================= */}
                <div className="section">
                    <h2>🏆 Complete Course</h2>
                    <p style={{color: "var(--text-muted)", lineHeight: "28px"}}>
                        After completing all lessons, assignments and quizzes,
click the button below to finish this course.
                    </p>
                    <div style={{textAlign: "center", marginTop: "30px"}}>
                        <button id="completeBtn" style={{padding: "16px 40px", background: "var(--success)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "18px", fontWeight: "bold", cursor: "pointer"}}>Complete Course</button>
                    </div>
                </div>
                {/* ================ CERTIFICATE ================= */}
                <div className="section">
                    <h2>🎓 Course Certificate</h2>
                    <p style={{color: "var(--text-muted)", lineHeight: "28px"}}>
                        Once the course is completed,
your completion certificate becomes available.
                    </p>
                    <div style={{textAlign: "center", marginTop: "30px"}}>
                        <button id="certificateBtn" disabled="" style={{padding: "16px 40px", background: "var(--border-soft)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "18px", fontWeight: "bold", cursor: "not-allowed"}}>View Certificate</button>
                    </div>
                </div>
            </div>
            {/* ================ FOOTER ================= */}
            </PageShell>
            <LegacyScript src="/legacy/js/start_course.js" />
        </>
    );
}
