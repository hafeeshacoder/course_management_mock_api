/*
 * EduBloom shared API helper (window.EduAPI)
 * ------------------------------------------------------------
 * Used by the page scripts in /legacy/js.
 * Talks to the mock REST API (json-server, mock-api/db.json).
 *
 * This replaces the old localStorage helpers: nothing is stored
 * in the browser any more. Keep BASE_URL in sync with
 * src/services/api.js.
 *
 * Resources: courses, students, admins, enrollments, session
 */
(function (global) {
    "use strict";

    var BASE_URL = global.EDUBLOOM_API_URL || "http://localhost:3001/api";

    var DEFAULT_SESSION = {
        loggedInStudentId: null,
        loggedInAdminId: null,
        resetRole: null,
        resetEmail: null
    };


    // ==========================================
    // LOW LEVEL REQUEST
    // ==========================================

    async function request(method, path, body) {

        var options = {
            method: method,
            headers: {}
        };

        if (body !== undefined) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }

        var response;

        try {
            response = await fetch(BASE_URL + path, options);
        } catch (networkError) {
            var offline = new Error(
                "Cannot reach the Express API at " + BASE_URL +
                ". Start it with:  cd backend  &&  npm start  (and  cd mock-api  &&  npm start)"
            );
            offline.offline = true;
            throw offline;
        }

        if (!response.ok) {
            var failure = new Error(
                method + " " + path + " failed (" + response.status + ")"
            );
            failure.status = response.status;
            throw failure;
        }

        var text = await response.text();

        return text ? JSON.parse(text) : null;
    }

    function get(path) { return request("GET", path); }
    function post(path, body) { return request("POST", path, body); }
    function put(path, body) { return request("PUT", path, body); }
    function patch(path, body) { return request("PATCH", path, body); }
    function remove(path) { return request("DELETE", path); }


    // ==========================================
    // SMALL HELPERS
    // ==========================================

    function esc(value) {
        return String(value === undefined || value === null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function sameId(a, b) {
        return String(a) === String(b);
    }

    function getQueryParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function showError(error, fallback) {
        console.error(error);
        alert(
            error && error.offline
                ? error.message
                : (fallback || "Something went wrong. Please try again.")
        );
    }

    function redirect(path) {
        window.location.href = path;
    }

    function statusFromProgress(progress) {
        if (progress >= 100) return "Completed";
        if (progress > 0) return "In Progress";
        return "Enrolled";
    }

    function todayLong() {
        return new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }


    // ==========================================
    // SESSION  (replaces loggedInStudent / loggedInAdmin)
    // ==========================================

    async function getSession() {
        try {
            var session = await get("/session");
            return Object.assign({}, DEFAULT_SESSION, session);
        } catch (error) {
            if (error.offline) throw error;
            return Object.assign({}, DEFAULT_SESSION);
        }
    }

    function updateSession(changes) {
        return patch("/session", changes);
    }

    async function getLoggedInStudent() {
        var session = await getSession();
        if (!session.loggedInStudentId) return null;
        try {
            return await get("/students/" + session.loggedInStudentId);
        } catch (error) {
            if (error.offline) throw error;
            return null;
        }
    }

    async function getLoggedInAdmin() {
        var session = await getSession();
        if (!session.loggedInAdminId) return null;
        try {
            return await get("/admins/" + session.loggedInAdminId);
        } catch (error) {
            if (error.offline) throw error;
            return null;
        }
    }

    // Returns the student, or sends the visitor to the login page.
    async function requireStudent() {
        try {
            var student = await getLoggedInStudent();
            if (student) return student;
        } catch (error) {
            showError(error);
            return null;
        }
        redirect("/login");
        return null;
    }

    async function requireAdmin() {
        try {
            var admin = await getLoggedInAdmin();
            if (admin) return admin;
        } catch (error) {
            showError(error);
            return null;
        }
        redirect("/login");
        return null;
    }


    // ==========================================
    // LOGIN
    // ==========================================

    async function login(role, email, password) {

        var wanted = String(email).trim().toLowerCase();

        if (role === "student") {

            var students = await get("/students");

            var student = students.find(function (user) {
                return String(user.email).toLowerCase() === wanted &&
                    user.password === password;
            });

            if (!student) {
                return {
                    success: false,
                    message: "Invalid Student Email or Password."
                };
            }

            await patch("/students/" + student.id, {
                lastLogin: new Date().toLocaleString()
            });

            await updateSession({ loggedInStudentId: student.id });

            return {
                success: true,
                message: "Student Login Successful.",
                user: student
            };
        }

        if (role === "admin") {

            var admins = await get("/admins");

            var admin = admins.find(function (user) {
                return String(user.email).toLowerCase() === wanted &&
                    user.password === password;
            });

            if (!admin) {
                return {
                    success: false,
                    message: "Invalid Administrator Email or Password."
                };
            }

            await patch("/admins/" + admin.id, {
                lastLogin: new Date().toLocaleString()
            });

            await updateSession({ loggedInAdminId: admin.id });

            return {
                success: true,
                message: "Administrator Login Successful.",
                user: admin
            };
        }

        return { success: false, message: "Invalid role." };
    }

    async function logout(role) {
        if (role === "admin") {
            await updateSession({ loggedInAdminId: null });
        } else {
            await updateSession({ loggedInStudentId: null });
        }
    }


    // ==========================================
    // COURSES / ENROLLMENTS
    // ==========================================

    function getCourses() {
        return get("/courses");
    }

    function getCourse(id) {
        return get("/courses/" + encodeURIComponent(id));
    }

    // Deleting a course also deletes its enrollments.
    function deleteCourse(id) {
        return remove(
            "/courses/" + encodeURIComponent(id) + "?_dependent=enrollments"
        );
    }

    function getEnrollments() {
        return get("/enrollments");
    }

    function getStudentEnrollments(studentRefId) {
        return get(
            "/enrollments?studentRefId=" + encodeURIComponent(studentRefId)
        );
    }

    async function getEnrollment(studentRefId, courseId) {
        var list = await get(
            "/enrollments?studentRefId=" + encodeURIComponent(studentRefId) +
            "&courseId=" + encodeURIComponent(courseId)
        );
        return list.length ? list[0] : null;
    }


    // ==========================================
    // YOUTUBE / MATERIAL HELPERS (admin form links -> objects)
    // ==========================================

    function youtubeId(url) {
        if (!url) return null;
        var match = String(url).match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
    }

    function videoFromLink(link, number, fallbackImage) {
        var id = youtubeId(link);
        return {
            title: "Lesson " + number,
            thumbnail: id
                ? "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg"
                : (fallbackImage || "https://picsum.photos/400/225"),
            link: link
        };
    }

    function materialFromLink(link, number) {
        return {
            title: "Resource " + number,
            description: "Course material provided by the instructor.",
            link: link
        };
    }

    // Rebuild a list of videos/materials from form links, keeping the
    // richer objects (custom titles / thumbnails) that already exist.
    function mergeLinks(links, existing, factory) {
        existing = existing || [];
        var result = [];
        links.forEach(function (link) {
            link = String(link || "").trim();
            if (!link) return;
            var found = existing.find(function (item) {
                return item.link === link;
            });
            result.push(found || factory(link, result.length + 1));
        });
        return result;
    }


    global.EduAPI = {
        BASE_URL: BASE_URL,
        get: get,
        post: post,
        put: put,
        patch: patch,
        remove: remove,
        esc: esc,
        sameId: sameId,
        getQueryParam: getQueryParam,
        showError: showError,
        redirect: redirect,
        statusFromProgress: statusFromProgress,
        todayLong: todayLong,
        getSession: getSession,
        updateSession: updateSession,
        getLoggedInStudent: getLoggedInStudent,
        getLoggedInAdmin: getLoggedInAdmin,
        requireStudent: requireStudent,
        requireAdmin: requireAdmin,
        login: login,
        logout: logout,
        getCourses: getCourses,
        getCourse: getCourse,
        deleteCourse: deleteCourse,
        getEnrollments: getEnrollments,
        getStudentEnrollments: getStudentEnrollments,
        getEnrollment: getEnrollment,
        youtubeId: youtubeId,
        videoFromLink: videoFromLink,
        materialFromLink: materialFromLink,
        mergeLinks: mergeLinks
    };

})(window);
