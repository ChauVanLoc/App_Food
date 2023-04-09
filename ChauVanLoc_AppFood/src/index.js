const express = require("express");
const cors = require("cors");
const rootRouter = require("./routers/root.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", rootRouter);

app.listen(1234, () => console.log("Connected"));
