// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { passeioRoutes } from "./routes/passeio.routes";
import { userRoutes } from "./routes/user.routes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express(); // 🔥 Agora cria primeiro o app

setupSwagger(app);

app.use(cors());
app.use(express.json());

// Rotas
app.use("/passeios", passeioRoutes);
app.use("/user", userRoutes);

// Rodar servidor só se NÃO estiver rodando testes
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// ✅ Agora SIM exporta no final
export { app };
