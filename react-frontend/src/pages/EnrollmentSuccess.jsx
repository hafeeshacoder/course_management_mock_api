import PageShell from "../components/PageShell";
import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function EnrollmentSuccess() {
    return (
        <>
            <PageCss href="/css/enrollment_success.css" />
            <PageShell variant="enrollment">
            <div className="container">
                <div className="success">✓</div>
                <h1>Enrollment Successful!</h1>
                <p>
                    Congratulations! You have successfully enrolled in the selected course.
Your enrollment has been confirmed and you can now begin learning immediately.
                </p>
                <div className="info">
                    <div className="card">
                        <h3>Course</h3>
                        <p id="courseName">Python Programming</p>
                    </div>
                    <div className="card">
                        <h3>Enrollment Date</h3>
                        <p id="enrollDate">--</p>
                    </div>
                    <div className="card">
                        <h3>Student ID</h3>
                        <p id="studentIdText">-</p>
                    </div>
                    <div className="card">
                        <h3>Status</h3>
                        <p style={{color: "var(--success)", fontWeight: "bold"}}>Successfully Enrolled</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="btn successBtn" onClick={() => window.eval("goToMyCourses()")}>My Courses</button>
                    <Link to="/courses" reloadDocument className="btn primary">
                        Browse More Courses
                    </Link>
                    <Link to="/dashboard" reloadDocument className="btn secondary">
                        Student Dashboard
                    </Link>
                </div>
            </div>
            </PageShell>
            <LegacyScript src="/legacy/js/enrollment_success.js" />
        </>
    );
}
