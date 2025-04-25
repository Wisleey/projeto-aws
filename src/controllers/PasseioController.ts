import { Request, Response } from "express";
import { PasseioService } from "../services/PasseioService";

const service = new PasseioService();

export class PasseioController {
  async criar(req: Request, res: Response) {
    try {
      const { titulo, descricao, preco, data } = req.body;

      if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const passeio = await service.criar({
        titulo,
        descricao,
        preco,
        data: new Date(data),
        userId: req.userId,
      });

      return res.status(201).json(passeio);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const passeios = await service.listar(req.userId);
      return res.json(passeios);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const passeioAtualizado = await service.atualizar(
        id,
        req.userId,
        req.body
      );

      return res.json(passeioAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      await service.deletar(id, req.userId);
      return res.json({ message: "Passeio deletado com sucesso." });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
