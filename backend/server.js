const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 3001;
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:5000";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const app = express();

// Allow the React dev server (Vite) to call Express from the browser.
app.use(
    cors({
        origin: [FRONTEND_ORIGIN, "http://127.0.0.1:5173"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
);

// Console log so you can see every request passing through Express.
app.use((req, res, next) => {
    console.log(`[Express] ${req.method} ${req.originalUrl}`);
    next();
});

// Simple health check (answered by Express itself).
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", forwardingTo: JSON_SERVER_URL });
});

// Forward everything else under /api to JSON Server:
//   GET http://localhost:3001/api/courses  ->  GET http://localhost:5000/courses
// NOTE: do not add express.json() before this proxy; the raw body is streamed
// straight through to JSON Server.
app.use(
    createProxyMiddleware("/api", {
        target: JSON_SERVER_URL,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        onError: (err, req, res) => {
            console.error("[Express] JSON Server unreachable:", err.message);
            if (!res.headersSent) {
                res.writeHead(502, { "Content-Type": "application/json" });
            }
            res.end(
                JSON.stringify({
                    error: `Cannot reach JSON Server at ${JSON_SERVER_URL}. Start it with: cd mock-api && npm start`
                })
            );
        }
    })
);

app.listen(PORT, () => {
    console.log(`Express API running at http://localhost:${PORT}/api`);
    console.log(`Forwarding to JSON Server at ${JSON_SERVER_URL}`);
});
