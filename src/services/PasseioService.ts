import { prisma } from "../lib/prisma";

interface PasseioData {
  titulo: string;
  descricao: string;
  preco: number;
  data: Date;
  userId: string;
}

export class PasseioService {
  async criar(data: PasseioData) {
    return await prisma.passeio.create({
      data,
      select: {
        id: true,
        titulo: true,
        descricao: true,
        preco: true,
        data: true,
        createdAt: true,
        userId: true,
      },
    });
  }

  async listar(userId: string) {
    return await prisma.passeio.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async atualizar(id: string, userId: string, data: Partial<PasseioData>) {
    await prisma.passeio.updateMany({
      where: { id, userId },
      data,
    });

    return await prisma.passeio.findUnique({
      where: { id },
    });
  }

  async deletar(id: string, userId: string) {
    const deleted = await prisma.passeio.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      throw new Error("Passeio não encontrado ou não pertence ao usuário");
    }

    return { success: true };
  }
}
