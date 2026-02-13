const express = require("express");
const path = require("path");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");
const userRoutes = require("./routes/userRoutes");
const mockRoutes = require("./routes/mockRoutes");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = ["http://localhost:5501", "http://127.0.0.1:5501"];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API routes
app.use("/videos", videoRoutes);
app.use("/users", userRoutes);

//For testing with mock data
app.use("/api/mock", mockRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
