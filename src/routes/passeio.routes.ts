import { Router } from "express";
import { PasseioController } from "../controllers/PasseioController";
import { verifyAuth } from "../middlewares/auth";

const routes = Router();
const controller = new PasseioController();

// 🔐 Middleware de proteção
routes.use(verifyAuth);

/**
 * @swagger
 * tags:
 *   name: Passeios
 *   description: Endpoints de gerenciamento de passeios
 */

/**
 * @swagger
 * /passeios:
 *   post:
 *     summary: Criar um novo passeio
 *     tags: [Passeios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - preco
 *               - data
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               data:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Passeio criado com sucesso
 *       401:
 *         description: Token inválido
 */
routes.post("/", async (req, res) => {
  await controller.criar(req, res);
});

/**
 * @swagger
 * /passeios:
 *   get:
 *     summary: Listar todos os passeios do usuário autenticado
 *     tags: [Passeios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de passeios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   preco:
 *                     type: number
 *                   data:
 *                     type: string
 *                     format: date-time
 */
routes.get("/", async (req, res) => {
  await controller.listar(req, res);
});

/**
 * @swagger
 * /passeios/{id}:
 *   put:
 *     summary: Atualizar um passeio existente
 *     tags: [Passeios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do passeio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               data:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Passeio atualizado com sucesso
 */
routes.put("/:id", async (req, res) => {
  await controller.atualizar(req, res);
});

/**
 * @swagger
 * /passeios/{id}:
 *   delete:
 *     summary: Deletar um passeio
 *     tags: [Passeios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do passeio
 *     responses:
 *       200:
 *         description: Passeio deletado com sucesso
 */
routes.delete("/:id", async (req, res) => {
  await controller.deletar(req, res);
});

export { routes as passeioRoutes };
