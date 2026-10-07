import {
    useState
} from "react";

import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import CourseCard from "../components/CourseCard";

import {
    useCourses
} from "../context/CourseContext";


function Courses() {

    const {
        courses,
        loading,
        error
    } = useCourses();

    const [
        search,
        setSearch
    ] = useState("");


    /*
     * Students only see published courses.
     * Drafts / inactive courses stay in the admin panel.
     */

    const visibleCourses =
        courses.filter((course) => {

            const isPublished =
                (course.status || "Active") === "Active";

            const matches =
                (course.courseName || "")
                    .toLowerCase()
                    .includes(
                        search.trim().toLowerCase()
                    );

            return isPublished && matches;

        });


    return (

        <>

            <PageCss
                href="/css/courses.css"
            />

            <PageShell
                variant="student"
            >

                <section
                    className="features"
                    id="courseList"
                >

                    <input
                        type="text"
                        id="searchCourse"
                        placeholder="Search Courses..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                    <h2>
                        Available Courses
                    </h2>

                    <div
                        className="cards"
                        id="courseContainer"
                    >

                        {loading && (

                            <p>Loading courses...</p>

                        )}

                        {error && (

                            <p>{error}</p>

                        )}

                        {!loading &&
                            !error &&
                            visibleCourses.length === 0 && (

                                <p>No courses found.</p>

                            )}

                        {!loading &&
                            !error &&
                            visibleCourses.map((course) => (

                                <CourseCard
                                    key={course.id}
                                    image={course.image}
                                    alt={course.courseName}
                                    title={course.courseName}
                                    description={course.overview}
                                    courseKey={course.id}
                                />

                            ))
                        }

                    </div>

                </section>

            </PageShell>

        </>

    );

}


export default Courses;
