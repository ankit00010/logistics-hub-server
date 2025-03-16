const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

dotenv.config();
connectDB();

const app = express();
// app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "https://aalogistics.vercel.app/",
    methods: ["POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend's origin
//   credentials: true, // Allow requests with credentials (cookies)
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allowed methods (adjust as needed)
// }));
app.use(cookieParser());
app.use(morgan("dev"));

// Add rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 3 requests per windowMs
});

app.use(limiter);

const userRoutes = require("./routes/userRoutes");
const constantRouter = require("./routes/constantRoutes");
app.use(constantRouter);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
