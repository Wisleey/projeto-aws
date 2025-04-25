import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { verifyAuth } from "../middlewares/auth";

const userRoutes = Router();
const controller = new UserController();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */
userRoutes.post("/register", (req: Request, res: Response) => {
  controller.register(req, res);
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Realizar login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: wisley@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *             required:
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro ao autenticar usuário
 */
userRoutes.post("/login", (req: Request, res: Response) => {
  controller.login(req, res);
});

/**
 * @swagger
 * /user/private:
 *   get:
 *     summary: Rota protegida com token JWT
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado
 *       401:
 *         description: Token inválido ou não fornecido
 */
userRoutes.get("/private", verifyAuth, (req: Request, res: Response): void => {
  res.status(200).json({
    message: `Olá, usuário ${req.userId}! Rota protegida acessada.`,
  });
});

export { userRoutes };
