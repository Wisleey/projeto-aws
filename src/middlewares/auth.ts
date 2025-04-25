import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const verifyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (!/^Bearer$/i.test(scheme) || !token) {
    res.status(401).json({ error: "Token mal formatado." });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    res.status(401).json({ error: "Token inválido." });
  }
};
