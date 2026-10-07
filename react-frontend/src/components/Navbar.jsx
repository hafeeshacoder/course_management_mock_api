import {
    NavLink
} from "react-router-dom";

import {
    useAuth
} from "../auth/AuthContext";


function Navbar({
    variant = "student"
}) {

    const {
        logout
    } = useAuth();


    async function handleLogout() {

        const role =
            variant.startsWith("admin")
                ? "admin"
                : "student";

        await logout(role);

        alert("Logged Out Successfully.");

        window.location.href = "/login";

    }


    return (

        <header>

            <div className="logo">

                {variant.startsWith("admin")
                    ? "EduBloom Admin"
                    : "EduBloom"}

            </div>


            <nav>

                {/* HOME */}

                {variant === "home" && (

                    <>

                        <NavLink
                            to="/"
                            reloadDocument
                        >
                            Home
                        </NavLink>


                        <NavLink
                            to="/login"
                            reloadDocument
                        >
                            Login
                        </NavLink>


                        <button
                            id="logoutBtn"
                            onClick={handleLogout}
                            className="logout-btn"
                            style={{
                                display: "none"
                            }}
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* STUDENT */}

                {variant === "student" && (

                    <>

                        <NavLink
                            to="/courses"
                            reloadDocument
                        >
                            Explore Courses
                        </NavLink>


                        <NavLink
                            to="/my-courses"
                            reloadDocument
                        >
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* STUDENT WITH DASHBOARD */}

                {variant === "student3" && (

                    <>

                        <NavLink
                            to="/dashboard"
                            reloadDocument
                        >
                            Dashboard
                        </NavLink>


                        <NavLink
                            to="/courses"
                            reloadDocument
                        >
                            Explore Courses
                        </NavLink>


                        <NavLink
                            to="/my-courses"
                            reloadDocument
                        >
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* CERTIFICATE */}

                {variant === "cert" && (

                    <>

                        <NavLink
                            to="/dashboard"
                            reloadDocument
                        >
                            Dashboard
                        </NavLink>


                        <NavLink
                            to="/my-courses"
                            reloadDocument
                        >
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* ENROLLMENT SUCCESS */}

                {variant === "enrollment" && (

                    <>

                        <NavLink
                            to="/courses"
                            reloadDocument
                        >
                            Explore Courses
                        </NavLink>


                        <NavLink
                            to="/dashboard"
                            reloadDocument
                        >
                            Dashboard
                        </NavLink>


                        <NavLink
                            to="/my-courses"
                            reloadDocument
                        >
                            My Courses
                        </NavLink>


                        <button
                            id="logoutBtn"
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* ADMIN */}

                {variant === "admin" && (

                    <>

                        <NavLink
                            to="/admin-dashboard"
                            reloadDocument
                        >
                            Dashboard
                        </NavLink>


                        <button
                            id="logoutBtn"
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    </>

                )}


                {/* ADMIN DASHBOARD */}

                {variant === "adminnone" && (

                    <button
                        id="logoutBtn"
                            onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                )}

            </nav>

        </header>

    );

}


export default Navbar;