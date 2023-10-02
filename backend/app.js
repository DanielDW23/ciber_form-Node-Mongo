import express from "express";
import db from "./database/db.js";
import axios from "axios";
import formRouter from "./routes/formRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";

import "dotenv/config";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/form", formRouter);
app.use("/users", userRouter);

const port = process.env.PORT_APP || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
