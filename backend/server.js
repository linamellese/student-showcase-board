const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// More flexible CORS configuration
// Use dynamic origin reflection so dev server ports don't require listing
app.use(
   cors({
      origin: (origin, cb) => cb(null, true), // reflect request origin
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
   }),
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
   next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes); // ADD THIS

// Health check route
app.get("/api/health", (req, res) => {
   res.json({
      status: "OK",
      message: "Server is running",
      timestamp: new Date().toISOString(),
      database: process.env.DB_NAME,
   });
});

// 404 handler
app.use("*", (req, res) => {
   res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({
      message: "Something went wrong!",
      error: process.env.NODE_ENV === "development" ? err.message : {},
   });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
   try {
      // Connect to database
      await connectDB();

      // Start listening
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
         console.log(`Environment: ${process.env.NODE_ENV}`);
         console.log(
            `CORS enabled for: ${process.env.CLIENT_URL || "multiple origins"}`,
         );
      });
   } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
   }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
   console.log("UNHANDLED REJECTION! 💥 Shutting down...");
   console.log(err.name, err.message);
   process.exit(1);
});
