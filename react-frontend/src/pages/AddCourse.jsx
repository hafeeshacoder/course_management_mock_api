import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AddCourse() {
    return (
        <>
            <PageCss href="/css/add_course.css" />
            <PageShell variant="admin">
            <div className="container">
                <div className="banner">
                    <h1>Add New Course</h1>
                    <p>
                        Create a new course by entering all the required information.
The course will be available for students after publishing.
                    </p>
                </div>
                {/* ================= COURSE INFORMATION ================= */}
                <div className="form-box">
                    <h2>Course Information</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Course Name</label>
                            <input type="text" placeholder="Enter Course Name" id="courseName" />
                        </div>
                        <div className="input-box">
                            <label>Course Code</label>
                            <input type="text" placeholder="Example: CS101" id="courseCode" />
                        </div>
                        <div className="input-box">
                            <label>Instructor Name</label>
                            <input type="text" placeholder="Enter Instructor Name" id="instructor" />
                        </div>
                        <div className="input-box">
                            <label>Duration</label>
                            <input type="text" placeholder="Example: 8 Weeks" id="duration" />
                        </div>
                        <div className="input-box">
                            <label>Course Level</label>
                            <select id="level">
                                <option>Select Level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Category</label>
                            <select id="category">
                                <option>Select Category</option>
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
                            <input type="text" placeholder="Paste Image URL" id="image" />
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
                <div className="form-box">
                    <h2>Course Description</h2>
                    <div className="input-box">
                        <label>Course Overview</label>
                        <textarea placeholder="Enter a detailed overview of the course, its objectives, learning approach and expected outcomes." id="overview"></textarea>
                    </div>
                </div>
                {/* ================= LEARNING OUTCOMES ================= */}
                <div className="form-box">
                    <h2>Learning Outcomes</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Outcome 1</label>
                            <input type="text" placeholder="Example: Understand programming fundamentals" id="outcome" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 2</label>
                            <input type="text" placeholder="Example: Build real-world applications" id="outcome2" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 3</label>
                            <input type="text" placeholder="Example: Develop problem-solving skills" id="outcome3" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 4</label>
                            <input type="text" placeholder="Example: Work with industry tools" id="outcome4" />
                        </div>
                        <div className="input-box">
                            <label>Outcome 5</label>
                            <input type="text" placeholder="Example: Prepare for certification" id="outcome5" />
                        </div>
                    </div>
                </div>
                {/* ================= PREREQUISITES ================= */}
                <div className="form-box">
                    <h2>Course Prerequisites</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Prerequisite 1</label>
                            <input type="text" placeholder="Example: Basic Computer Knowledge" id="prerequistite1" />
                        </div>
                        <div className="input-box">
                            <label>Prerequisite 2</label>
                            <input type="text" placeholder="Example: Internet Access" id="prerequisite2" />
                        </div>
                        <div className="input-box">
                            <label>Prerequisite 3</label>
                            <input type="text" placeholder="Example: No prior programming experience required" id="prerequisite3" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE SYLLABUS ================= */}
                <div className="form-box">
                    <h2>Course Syllabus</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Module 1</label>
                            <input type="text" placeholder="Introduction and Course Overview" id="module1" />
                        </div>
                        <div className="input-box">
                            <label>Module 2</label>
                            <input type="text" placeholder="Core Concepts" id="module2" />
                        </div>
                        <div className="input-box">
                            <label>Module 3</label>
                            <input type="text" placeholder="Practical Sessions" id="module3" />
                        </div>
                        <div className="input-box">
                            <label>Module 4</label>
                            <input type="text" placeholder="Mini Project" id="module4" />
                        </div>
                        <div className="input-box">
                            <label>Module 5</label>
                            <input type="text" placeholder="Assessment and Certification" id="module5" />
                        </div>
                    </div>
                </div>
                {/* ================= VIDEO LESSONS ================= */}
                <div className="form-box">
                    <h2>Video Lessons</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Video Lesson 1</label>
                            <input type="url" placeholder="https://www.youtube.com/watch?v=..." id="v1" />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 2</label>
                            <input type="url" placeholder="https://www.youtube.com/watch?v=..." id="v2" />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 3</label>
                            <input type="url" placeholder="https://www.youtube.com/watch?v=..." id="v3" />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 4</label>
                            <input type="url" placeholder="https://www.youtube.com/watch?v=..." id="v4" />
                        </div>
                        <div className="input-box">
                            <label>Video Lesson 5</label>
                            <input type="url" placeholder="https://www.youtube.com/watch?v=..." id="v5" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE MATERIALS ================= */}
                <div className="form-box">
                    <h2>Course Materials</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Lecture Notes (PDF)</label>
                            <input type="text" placeholder="Python Notes.pdf" id="l1" />
                        </div>
                        <div className="input-box">
                            <label>Lab Manual</label>
                            <input type="text" placeholder="Python Lab Manual.pdf" id="lab" />
                        </div>
                        <div className="input-box">
                            <label>Reference Book</label>
                            <input type="text" placeholder="Programming Reference.pdf" id="reference" />
                        </div>
                        <div className="input-box">
                            <label>Additional Resources</label>
                            <input type="text" placeholder="GitHub / Documentation / Website" id="additional" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE SETTINGS ================= */}
                <div className="form-box">
                    <h2>Course Settings</h2>
                    <div className="form-grid">
                        <div className="input-box">
                            <label>Maximum Students</label>
                            <input type="number" placeholder="100" id="maxstudents" />
                        </div>
                        <div className="input-box">
                            <label>Course Language</label>
                            <select id="courselanguage">
                                <option>English</option>
                                <option>Tamil</option>
                                <option>Hindi</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Certificate Available</label>
                            <select id="certificateavailability">
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Enrollment Type</label>
                            <select id="enrollmenttype">
                                <option>Open</option>
                                <option>Approval Required</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Course Start Date</label>
                            <input type="date" id="sd" />
                        </div>
                        <div className="input-box">
                            <label>Course End Date</label>
                            <input type="date" id="ed" />
                        </div>
                    </div>
                </div>
                {/* ================= COURSE PREVIEW ================= */}
                <div className="form-box">
                    <h2>Course Preview</h2>
                    <div style={{textAlign: "center"}}>
                        <img src="https://picsum.photos/900/350" id="previewImage" style={{width: "100%", maxWidth: "900px", borderRadius: "8px", border: "3px solid var(--border)", boxShadow: "6px 6px 0 var(--border)"}} />
                        <p style={{marginTop: "15px", color: "var(--text-muted)"}}>The selected course image will appear here after backend integration.</p>
                    </div>
                </div>
                {/* ================= ACTION BUTTONS ================= */}
                <div className="form-box">
                    <div style={{display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap"}}>
                        <button id="publishBtn" style={{padding: "15px 35px", background: "var(--primary)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Publish Course</button>
                        <button id="draftBtn" style={{padding: "15px 35px", background: "var(--secondary)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Save Draft</button>
                        <button type="reset" id="resetBtn" style={{padding: "15px 35px", background: "var(--text-muted)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Reset</button>
                        <button onClick={() => window.eval("window.location.href='admin_dashboard.html'")} style={{padding: "15px 35px", background: "var(--danger)", color: "white", border: "3px solid var(--border)", borderRadius: "8px", boxShadow: "4px 4px 0 var(--border)", fontSize: "16px", fontWeight: "bold", cursor: "pointer"}}>Back</button>
                    </div>
                </div>
            </div>
            {/* ================= FOOTER ================= */}
            </PageShell>
            <LegacyScript src="/legacy/js/add_course.js" />
        </>
    );
}
