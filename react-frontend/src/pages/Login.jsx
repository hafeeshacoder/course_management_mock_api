import {
    Link
} from "react-router-dom";

import PageCss
    from "../components/PageCss";

import LegacyScript
    from "../components/LegacyScript";


function Login() {

    return (

        <>

            <PageCss
                href="/css/login.css"
            />


            <div className="container">

                <Link
                    to="/"
                    className="back-btn"
                >
                    ← Back to Home
                </Link>


                <h2>
                    LOGIN PORTAL
                </h2>


                <div className="tabs">

                    <button
                        className="active"
                        id="studentBtn"
                        type="button"
                    >
                        🎓 Student
                    </button>


                    <button
                        id="adminBtn"
                        type="button"
                    >
                        👨‍💼 Admin
                    </button>

                </div>


                <p
                    className="role-text"
                    id="role"
                >
                    Student Login
                </p>


                <form>

                    <div className="input-box">

                        <label>
                            Email
                        </label>


                        <input
                            type="email"
                            placeholder="Enter Email"
                            id="email"
                        />

                    </div>


                    <div className="input-box">

                        <label>
                            Password
                        </label>


                        <input
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                        />

                    </div>


                    <div
                        style={{
                            textAlign: "right",
                            marginTop: "-8px",
                            marginBottom: "20px"
                        }}
                    >

                        <Link
                            to="/forgot-password"
                            style={{
                                color: "var(--primary)",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "bold"
                            }}
                        >
                            Forgot Password?
                        </Link>

                    </div>


                    <button
                        type="button"
                        className="login-btn"
                    >
                        Login
                    </button>

                </form>


                <div className="register">

                    <h3 id="registerTitle">
                        New Student?
                    </h3>


                    <p id="registerText">
                        Don't have a student account?
                    </p>


                    <a
                        href="/register"
                        id="registerLink"
                    >
                        Student Register
                    </a>

                </div>

            </div>


            <LegacyScript
                src="/legacy/js/login.js"
            />

        </>

    );

}


export default Login;