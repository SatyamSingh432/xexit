import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectMongoDB } from "./config/db.js";
import { authRouter } from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => res.json({ status: "ok" }));

app.use("/api", authRouter);

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server started on PORT ${PORT}`);
});
