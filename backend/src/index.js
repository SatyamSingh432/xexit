import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectMongoDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server started on PORT ${PORT}`);
});
