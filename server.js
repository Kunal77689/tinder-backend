import express from "express";
import mongoose from "mongoose";
import Cards from "./DbCards.js";
import Cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:U9oaWdmEphgX4l41@cluster0.w0hpy.mongodb.net/?retryWrites=true&w=majority";
//middlewares
app.use(express.json());
app.use(Cors());
//db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
//api endpoints
app.get("/", (req, res) => res.status(200).send("Hello"));
app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//listener
app.listen(port, () => console.log(`listening on port: ${port}`));
