import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import connectDb from "./db/conn";
import { swaggerSpec } from "./configs/swaggerConfig";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = "mongodb://127.0.0.1:27017";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use("/api/v1/auth", authRoutes);

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
