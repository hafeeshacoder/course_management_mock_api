# EduBloom Mock API

A [json-server](https://github.com/typicode/json-server) REST API that replaces the
browser `localStorage` the app used before. All data lives in `db.json`.

```bash
cd mock-api
npm install
npm start          # http://localhost:5000
```

| Resource       | Endpoint            | Purpose                                              |
| -------------- | ------------------- | ---------------------------------------------------- |
| `courses`      | `/courses`          | Course catalogue (also used by admin add/edit/delete) |
| `students`     | `/students`         | Student accounts                                     |
| `admins`       | `/admins`           | Administrator accounts                               |
| `enrollments`  | `/enrollments`      | Enrollment requests + each student's learning progress |
| `session`      | `/session`          | Who is logged in + the password-reset hand-off       |

Demo accounts (already in `db.json`):

* Student: `student@edubloom.com` / `student123`
* Admin: `admin@edubloom.com` / `admin123`

To reset everything, stop the server and restore `db.json` from git / the original zip.
