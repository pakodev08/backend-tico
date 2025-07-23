import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./mongoDB/mongoconnect.js";
import cors from "cors";
import { router } from "./routes/number-generate.js";
import { routerUser } from "./routes/user.js";
import { routerGuerra } from "./routes/userGuerra.js";
import {numbersGuerra} from "./routes/numbers-guerra.js"
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4005;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: ["https://frontend-rifa-tico.vercel.app", "https://albertorifas.com",  "https://www.albertorifas.com", "https://ganador-rifa-tico.vercel.app", "http://localhost:5173"],
  credentials: true
}));
connectDB();
// app.use(express.static(`public`));

app.use(`/api/numbers`, router);
app.use(`/api/users`, routerUser);

app.use(`/guerra/users`, routerGuerra);
app.use(`/guerra/numbers`, numbersGuerra);
app.use(`/api/expose`, exposeNumbersRouter)

app.get(`/api/oldusers`, async (req, res) => {
  try {
    // Opción 1: Usando mongoose.connection (si usas Mongoose)
    const collection = mongoose.connection.db.collection("oldusers");
    const users = await collection.find({}).toArray(); // Agregar .toArray()
    
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error("Error al obtener oldusers:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener oldusers",
      error: error.message
    });
  }
});

// app.use(express.static(path.join(__dirname, `public`)));

// app.get(`*`, (req, res) => {
//   res.sendFile(path.join(__dirname, `public`, `index.html`));
// });

// Solo para desarrollo local
// if (process.env.NODE_ENV !== 'production') {

// }
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// Exportar para Vercel
export default app;

// import express from `express`;
// import `dotenv/config`;
// import { connectDB } from `./mongoDB/mongoconnect.js`;
// import cors from `cors`;
// import { router } from `./routes/number-generate.js`;
// import { routerUser } from `./routes/user.js`;
// import path from `path`;
// import { fileURLToPath } from `url`;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PORT = process.env.PORT || 4005;

// const app = express();

// connectDB();
// app.use(express.json());
// app.use(cors());

// app.use(express.static(`public`));
// //TODO! EMPIEZA LA LOGICA DE LA RIFA DEFINITIVA ULTIMA 3$ EL TICKET

// app.use(`/api/numbers`, router);

// app.use(`/api/users`, routerUser);

// //TODO! EMPIEZA LA LOGICA DE LA RIFA FLASH
// app.get(`*`, (req, res) => {
//   res.sendFile(path.join(__dirname, `public`, `index.html`));
// });

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
