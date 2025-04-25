import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserInput, AuthInput } from "../interfaces/IUser"; // Importe as interfaces

// ... (manter as interfaces)

export class UserService {
  async create({ nome, email, senha }: CreateUserInput) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("Email já cadastrado.");

    const hash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: { nome, email, senha: hash },
      select: { id: true, nome: true, email: true }, // Não retornar a senha
    });

    return user;
  }

  async auth({ email, senha }: AuthInput) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Credenciais inválidas.");

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) throw new Error("Credenciais inválidas.");

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  }
}
