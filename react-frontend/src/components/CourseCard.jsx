import {
    Link
} from "react-router-dom";


function CourseCard({
    image,
    alt,
    title,
    description,
    courseKey
}) {

    return (

        <div className="card">

            {image && (

                <img
                    src={image}
                    alt={alt || title}
                />

            )}


            <h3>
                {title}
            </h3>


            <p>
                {description}
            </p>


            {/*
              * The selected course id travels in the URL,
              * so nothing has to be stored in the browser.
              */}

            <Link
                className="btn viewCourseBtn"
                to={`/course-details?id=${encodeURIComponent(courseKey)}`}
                reloadDocument
                data-course={courseKey}
            >
                View Details
            </Link>

        </div>

    );

}


export default CourseCard;
