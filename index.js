import express from "express";
import "dotenv/config";
import { connectDB } from "./mongoDB/mongoconnect.js";
import cors from "cors";
import { router } from "./routes/number-generate.js";
import { routerUser } from "./routes/user.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
// app.use(express.static("public"));

app.use("/api/numbers", router);
app.use("/api/users", routerUser);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4005;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
// Exportar para Vercel
export default app;

// import express from "express";
// import "dotenv/config";
// import { connectDB } from "./mongoDB/mongoconnect.js";
// import cors from "cors";
// import { router } from "./routes/number-generate.js";
// import { routerUser } from "./routes/user.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PORT = process.env.PORT || 4005;

// const app = express();

// connectDB();
// app.use(express.json());
// app.use(cors());

// app.use(express.static("public"));
// //TODO! EMPIEZA LA LOGICA DE LA RIFA DEFINITIVA ULTIMA 3$ EL TICKET

// app.use("/api/numbers", router);

// app.use("/api/users", routerUser);

// //TODO! EMPIEZA LA LOGICA DE LA RIFA FLASH
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
