import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function EditCourse() {
    return (
        <>
            <PageCss href="/css/edit_courses.css" />
            <PageShell variant="admin">
            {/* ================= HEADER ================= */}
            {/* ================= CONTAINER ================= */}
            <div className="container">
                {/* ================= BANNER ================= */}
                <div className="banner">
                    <h1>Edit Existing Courses</h1>
                    <p>
                        Select one of the available courses below to update its
information, syllabus, videos, materials or instructor details.

Only courses available in the Course Catalog can be edited.
                    </p>
                </div>
                {/* ================= SEARCH ================= */}
                <div className="search-box">
                    <input type="text" id="searchCourse" placeholder="Search Course Name..." />
                </div>
                {/* ================= AVAILABLE COURSES ================= */}
                <div className="section">
                    <h2>Available Courses</h2>
                    <p style={{marginBottom: "20px", color: "var(--text-muted)", lineHeight: "28px"}}>Choose a course below to edit its information.</p>
                    <div id="courseList">
                        {/* Courses will be loaded dynamically
from edit_course.js */}
                    </div>
                </div>
                {/* ================= EDIT COURSE FORM ================= */}
                <div className="section">
                    <h2>Edit Selected Course</h2>
                    <p style={{color: "var(--text-muted)", marginBottom: "25px", lineHeight: "28px"}}>
                        After selecting a course,
its details will automatically
appear below.
                    </p>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Course Name</label>
                            <input type="text" id="courseName" placeholder="Course Name" />
                        </div>
                        <div className="input-box">
                            <label>Course Code</label>
                            <input type="text" id="courseCode" placeholder="CS101" />
                        </div>
                        <div className="input-box">
                            <label>Instructor</label>
                            <input type="text" id="instructor" placeholder="Instructor Name" />
                        </div>
                        <div className="input-box">
                            <label>Duration</label>
                            <input type="text" id="duration" placeholder="8 Weeks" />
                        </div>
                        <div className="input-box">
                            <label>Course Level</label>
                            <select id="level">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Category</label>
                            <select id="category">
                                <option>Programming</option>
                                <option>Web Development</option>
                                <option>Database</option>
                                <option>Artificial Intelligence</option>
                                <option>Machine Learning</option>
                                <option>Cloud Computing</option>
                                <option>Cyber Security</option>
                                <option>Mobile App Development</option>
                                <option>DevOps</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Course Image URL</label>
                            <input type="text" id="image" placeholder="https://..." />
                        </div>
                        <div className="input-box">
                            <label>Status</label>
                            <select id="status">
                                <option>Active</option>
                                <option>Draft</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================= COURSE DESCRIPTION ================= */}
                <div className="section">
                    <h2>Course Description</h2>
                    <div className="input-box">
                        <label>Course Overview</label>
                        <textarea id="overview" rows="8" placeholder="Enter course overview..."></textarea>
                    </div>
                </div>
                {/* ================= LEARNING OUTCOMES ================= */}
                <div className="section">
                    <h2>Learning Outcomes</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Outcome 1</label>
                            <input type="text" id="outcome1" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 2</label>
                            <input type="text" id="outcome2" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 3</label>
                            <input type="text" id="outcome3" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 4</label>
                            <input type="text" id="outcome4" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 5</label>
                            <input type="text" id="outcome5" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE PREREQUISITES ================= */}
                <div className="section">
                    <h2>Course Prerequisites</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Prerequisite 1</label>
                            <input type="text" id="pre1" />
                        </div>
                        <div className="input-box">
                            <label>Prerequisite 2</label>
                            <input type="text" id="pre2" />
                        </div>
                        <div className="input-box">
                            <label>Prerequisite 3</label>
                            <input type="text" id="pre3" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE SYLLABUS ================= */}
                <div className="section">
                    <h2>Course Syllabus</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Module 1</label>
                            <input type="text" id="module1" placeholder="Introduction" />
                        </div>
                        <div className="input-box">
                            <label>Module 2</label>
                            <input type="text" id="module2" placeholder="Core Concepts" />
                        </div>
                        <div className="input-box">
                            <label>Module 3</label>
                            <input type="text" id="module3" placeholder="Practical Sessions" />
                        </div>
                        <div className="input-box">
                            <label>Module 4</label>
                            <input type="text" id="module4" placeholder="Mini Project" />
                        </div>
                        <div className="input-box">
                            <label>Module 5</label>
                            <input type="text" id="module5" placeholder="Final Assessment" />
                        </div>
                    </div>
                </div>
                {/* ================= VIDEO LESSONS ================= */}
                <div className="section">
                    <h2>Video Lessons</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Video Lesson 1</label>
                            <input type="url" id="video1" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 2</label>
                            <input type="url" id="video2" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 3</label>
                            <input type="url" id="video3" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 4</label>
                            <input type="url" id="video4" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 5</label>
                            <input type="url" id="video5" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE MATERIALS ================= */}
                <div className="section">
                    <h2>Course Materials</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Lecture Notes</label>
                            <input type="text" id="notes" placeholder="Python Notes.pdf" />
                        </div>
                        <div className="input-box">
                            <label>Lab Manual</label>
                            <input type="text" id="lab" placeholder="Lab Manual.pdf" />
                        </div>
                        <div className="input-box">
                            <label>Assignment</label>
                            <input type="text" id="assignment" placeholder="Assignment.pdf" />
                        </div>
                        <div className="input-box">
                            <label>Reference Book</label>
                            <input type="text" id="reference" placeholder="Reference Book" />
                        </div>
                        <div className="input-box">
                            <label>Additional Resource</label>
                            <input type="text" id="resource" placeholder="Documentation / GitHub" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE PREVIEW ================= */}
                <div className="section">
                    <h2>Course Preview</h2>
                    <img id="previewImage" src="https://picsum.photos/900/350" alt="Course Preview" style={{width: "100%", maxWidth: "700px", display: "block", margin: "auto", borderRadius: "8px", border: "3px solid var(--border)", boxShadow: "6px 6px 0 var(--border)"}} />
                </div>
                {/* ================= ACTION BUTTONS ================= */}
                <div className="section">
                    <div style={{display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap"}}>
                        <button id="updateBtn" style={{padding: "15px 35px", background: "var(--primary)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Update Course</button>
                        <button id="deleteBtn" style={{padding: "15px 35px", background: "var(--danger)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Delete Course</button>
                        <button id="resetBtn" type="button" style={{padding: "15px 35px", background: "var(--text-muted)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Reset</button>
                        <button type="button" onClick={() => window.eval("window.location.href='admin_dashboard.html'")} style={{padding: "15px 35px", background: "var(--success)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Back to Dashboard</button>
                    </div>
                </div>
            </div>
            {/* ================= FOOTER ================= */}
            </PageShell>
            <LegacyScript src="/legacy/js/edit_course.js" />
        </>
    );
}
