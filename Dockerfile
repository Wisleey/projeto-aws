# Usa a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para dentro do container
COPY . .

# Expõe a porta que o app vai rodar
EXPOSE 3333

# Comando para iniciar o app
CMD ["npm", "run", "dev"]
