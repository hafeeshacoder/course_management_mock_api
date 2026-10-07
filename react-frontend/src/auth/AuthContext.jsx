import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";


/*
 * Login state is kept in the mock API
 * (db.json -> "session"), not in localStorage.
 *
 * session = {
 *   loggedInStudentId,
 *   loggedInAdminId,
 *   resetRole,
 *   resetEmail
 * }
 */

const AuthContext =
    createContext(null);


export function AuthProvider({
    children
}) {

    const [
        loggedInStudent,
        setLoggedInStudent
    ] = useState(null);

    const [
        loggedInAdmin,
        setLoggedInAdmin
    ] = useState(null);

    const [
        authLoading,
        setAuthLoading
    ] = useState(true);


    async function loadSession() {

        try {

            const {
                data: session
            } = await api.get(
                "/session"
            );

            if (session.loggedInStudentId) {

                const {
                    data
                } = await api.get(
                    `/students/${session.loggedInStudentId}`
                );

                setLoggedInStudent(data);

            } else {

                setLoggedInStudent(null);

            }

            if (session.loggedInAdminId) {

                const {
                    data
                } = await api.get(
                    `/admins/${session.loggedInAdminId}`
                );

                setLoggedInAdmin(data);

            } else {

                setLoggedInAdmin(null);

            }

        } catch (error) {

            console.error(
                "Unable to load session:",
                error
            );

            setLoggedInStudent(null);

            setLoggedInAdmin(null);

        } finally {

            setAuthLoading(false);

        }

    }


    useEffect(() => {

        loadSession();

    }, []);


    async function loginStudent(student) {

        setLoggedInStudent(student);

        await api.patch(
            "/session",
            {
                loggedInStudentId: student.id
            }
        );

    }


    async function loginAdmin(admin) {

        setLoggedInAdmin(admin);

        await api.patch(
            "/session",
            {
                loggedInAdminId: admin.id
            }
        );

    }


    async function logoutStudent() {

        setLoggedInStudent(null);

        await api.patch(
            "/session",
            {
                loggedInStudentId: null
            }
        );

    }


    async function logoutAdmin() {

        setLoggedInAdmin(null);

        await api.patch(
            "/session",
            {
                loggedInAdminId: null
            }
        );

    }


    async function logout(role) {

        try {

            if (role === "admin") {

                await logoutAdmin();

            } else {

                await logoutStudent();

            }

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        }

    }


    return (

        <AuthContext.Provider
            value={{
                loggedInStudent,
                loggedInAdmin,
                authLoading,
                loginStudent,
                loginAdmin,
                logoutStudent,
                logoutAdmin,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    return useContext(
        AuthContext
    );

}
