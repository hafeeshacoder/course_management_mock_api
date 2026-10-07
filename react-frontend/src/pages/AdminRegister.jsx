import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminRegister() {
    return (
        <>
            <PageCss href="/css/admin_register.css" />
                        <div className="container">
                <Link to="/" className="back-btn">
                    ← Back to Home
                </Link>
                <h2>LOGIN PORTAL</h2>
                <h2>Administrator Registration</h2>
                <form id="adminRegisterForm">
                    <div className="input-box">
                        <label>Administrator Name</label>
                        <input type="text" placeholder="Enter Full Name" id="adminName" required="" />
                    </div>
                    <div className="input-box">
                        <label>Administrator ID</label>
                        <input type="text" placeholder="Enter Administrator ID" id="adminId" required="" />
                    </div>
                    <div className="input-box">
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter Email" id="adminEmail" required="" />
                    </div>
                    <div className="input-box">
                        <label>Designation</label>
                        <select id="designation" required="">
                            <option value="">Select Designation</option>
                            <option>Principal</option>
                            <option>Head of Department (HOD)</option>
                            <option>Faculty</option>
                            <option>Course Coordinator</option>
                            <option>System Administrator</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input type="password" placeholder="Create Password" id="adminPassword" required="" />
                    </div>
                    <div className="input-box">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" id="adminConfirmPassword" required="" />
                    </div>
                    <button type="submit" id="adminBtn">Register</button>
                </form>
                <div className="login">
                    <p>Already have an account?</p>
                    <Link to="/login">
                        Login Here
                    </Link>
                </div>
            </div>
            <LegacyScript src="/legacy/js/admin_register.js" />
        </>
    );
}
