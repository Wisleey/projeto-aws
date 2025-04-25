// src/interfaces/IUser.ts
export interface CreateUserInput {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthInput {
  email: string;
  senha: string;
}
