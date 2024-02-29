import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swaggerConfig";
import connectDb from "./db/conn";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use("/api/v1/auth", authRoutes);

const start = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is required");
    }
    await connectDb(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
