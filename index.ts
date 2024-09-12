import express from "express";
import cors from "cors";
import "express-async-errors";
import { playerRouter } from "./routers/player";
import { adminRouter } from "./routers/admin";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/player", playerRouter);
app.use("/test", adminRouter);

app.listen(3001, "0.0.0.0", () => {
  console.log("Program działa na adresie http://localhost:3001");
});
