import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function ForgotPassword() {
    return (
        <>
            <PageCss href="/css/forgot_password.css" />
                        <div className="container">
                <div className="left">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop" />
                </div>
                <div className="right">
                    <h2>Forgot Password</h2>
                    <p>
                        Enter your registered email address.
A password reset link will be sent to your email.
                    </p>
                    <form id="forgotPasswordForm">
                        <div className="input-box">
                            <label>Email Address</label>
                            <input type="email" id="email" placeholder="Enter Registered Email" required="" />
                        </div>
                        <button type="submit" id="resetBtn">Reset Password</button>
                    </form>
                    <div className="back">
                        <Link to="/login">
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
            <LegacyScript src="/legacy/js/forgot_password.js" />
        </>
    );
}
