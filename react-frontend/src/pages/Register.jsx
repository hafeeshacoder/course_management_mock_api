import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Register() {
    return (
        <>
            <PageCss href="/css/student_register.css" />
                        <div className="container">
                <Link to="/" className="back-btn">
                    ← Back to Home
                </Link>
                <h2>Student Registration</h2>
                <form id="registerForm">
                    <div className="input-box">
                        <label>Student Name</label>
                        <input type="text" placeholder="Enter Full Name" id="studentName" required="" />
                    </div>
                    <div className="input-box">
                        <label>Student ID</label>
                        <input type="text" placeholder="Enter Student ID" id="studentId" required="" />
                    </div>
                    <div className="input-box">
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter Email" id="studentEmail" required="" />
                    </div>
                    <div className="input-box">
                        <label>Department</label>
                        <select id="department" required="">
                            <option value="">Select Department</option>
                            <option>Computer Science</option>
                            <option>Information Technology</option>
                            <option>Electronics & Communication</option>
                            <option>Electrical & Electronics</option>
                            <option>Mechanical Engineering</option>
                            <option>Civil Engineering</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input type="password" placeholder="Create Password" id="password" required="" />
                    </div>
                    <div className="input-box">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" id="confirmPassword" required="" />
                    </div>
                    <button type="submit" id="registerBtn">Register</button>
                </form>
                <div className="login">
                    <p>Already have an account?</p>
                    <Link to="/login">
                        Login Here
                    </Link>
                </div>
            </div>
            <LegacyScript src="/legacy/js/student_register.js" />
        </>
    );
}
