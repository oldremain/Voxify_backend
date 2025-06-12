import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://voxify-zeta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Разрешаем запросы без origin (например, от Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Доступ запрещён политикой CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwCluZ9VfnsrMs0sswC0HyNxPnhzlEirOAiJyEYKD174gXV0PTjGK06rKiHq10RlcWjfQ/exec";

app.post("/api/gas", async (req, res) => {
  try {
    const response = await axios.post(GAS_URL, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => console.log("Сервер запущен на http://localhost:8080"));
