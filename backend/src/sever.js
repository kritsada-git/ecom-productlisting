import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/category.js";
import itemRoutes from "./routes/item.js";
// import discountRoutes from "./routes/discountRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/item", itemRoutes);
// app.use("/api/discounts", discountRoutes);

app.get("/", (req, res) => {
	res.send("API is running...");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});