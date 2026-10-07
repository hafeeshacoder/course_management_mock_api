import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function ResetPassword() {
    return (
        <>
            <PageCss href="/css/reset_password.css" />
                        <div className="container">
                <div className="left">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop" alt="Reset Password" />
                </div>
                <div className="right">
                    <h2>Reset Password</h2>
                    <p>
                        Create a new password for your account.
Make sure your password is strong and easy to remember.
                    </p>
                    <form id="resetPasswordForm">
                        <div className="input-box">
                            <label>New Password</label>
                            <input type="password" id="newPassword" placeholder="Enter New Password" required="" />
                        </div>
                        <div className="input-box">
                            <label>Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm New Password" required="" />
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
            <LegacyScript src="/legacy/js/reset_password.js" />
        </>
    );
}
