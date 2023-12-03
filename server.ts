import { Request, Response, Application } from "express";
const express = require("express");
const cors = require("cors");
const app: Application = express();
const port: number = 3000;

interface IData {
  email: string;
  number: string;
}

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/", (req: Request, res: Response) => {
  try {
    const user: IData = req.body;
    setTimeout(() => {
      res.status(200).json(user);
    }, 5000);
  } catch (error) {
    res.status(500).send({ error: "Cannot receive response" });
  }
});
