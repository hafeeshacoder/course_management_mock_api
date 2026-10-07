import PageShell from "../components/PageShell";
import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Home() {
    return (
        <>
            <PageCss href="/css/index.css" />
            <PageShell variant="home">
            <section className="hero">
                <div className="hero-text">
                    <h1>Grow Your Skills with EduBloom</h1>
                    <p>
                        A complete platform for students to register, enroll in courses,
track learning progress and receive notifications. Administrators
can efficiently manage students, courses and reports.
                    </p>
                    <Link to="/login" className="btn">
                        Get Started
                    </Link>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" />
            </section>
            <section className="features">
                <h2>Our Features</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Student Registration</h3>
                        <p>Create an account securely.</p>
                    </div>
                    <div className="card">
                        <h3>Course Enrollment</h3>
                        <p>Browse and enroll in available courses.</p>
                    </div>
                    <div className="card">
                        <h3>Learning Progress</h3>
                        <p>Track completed and pending modules.</p>
                    </div>
                    <div className="card">
                        <h3>Admin Management</h3>
                        <p>Manage courses, students and reports.</p>
                    </div>
                </div>
            </section>
            </PageShell>
            
        </>
    );
}
