import express from "express";
import cors from "cors";
import connectDb from "./db/conn";
import authController from "./controllers/authController";
import { validateRegisterInputs } from "./middleware/validateInputs";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = "mongodb://127.0.0.1:27017";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.post("/api/v1/register", validateRegisterInputs(), authController.registerUser);

const start = async () => {
  try {
    await connectDb(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
