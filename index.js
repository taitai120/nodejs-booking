import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";

dotenv.config();

const app = express();
const DB = process.env.DB;
const PORT = process.env.PORT || 8801;

// CONNECT DB
mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
});

const connect = async () => {
    try {
        await mongoose.connect(
            DB.replace("<password>", process.env.DB_PASSWORD)
        );
        console.log("Connect to DB");
    } catch (err) {
        throw err;
    }
};

// MIDDLEWAWRES
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

// ERRORS
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        status: "fail",
        code: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(PORT, () => {
    connect();
    console.log("App running");
});
