const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

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

app.post("/", (req, res) => {
  try {
    console.log(req.body);
    setTimeout(() => {
      res.status(200).json(req.body);
    }, 5000);
  } catch (error) {
    res.status(500).send({ error: "Cannot receive response" });
  }
});
