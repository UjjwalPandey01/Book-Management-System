import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import bookRoute from "./routes/book.route.js";
import { searchBooks } from "./controllers/book.controller.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
// app.use(cors(
//     {
//         origin: ["http://localhost:5173/"],
//         methods: ["GET", "PUT", "POST", "DELETE"],
//         credentials: true
//     }
// ));

// app.get("/Ujjwal", (req, res)=>{
//     res.send("ujjwal here");
// });


app.use("/api", bookRoute);


connectDB();















app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});