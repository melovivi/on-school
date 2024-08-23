# Sobre o projeto
On-School é um projeto de gestão de conteúdo e acesso a recursos educacionais online, direcionados a professores da rede pública de educação.


## Tecnologias utilizadas
  - Node.js
  - Fastify
  - PostgreSQL
  - Docker
  - Jest


##  Pré-requisitos 
Para rodar o projeto localmente, você precisará ter instalado em sua máquina:

- Docker
- Node.js (versão 14 ou superior)
- Npm

## Como instalar e executar o projeto
1. Clone o repositório:
```sh
git clone https://github.com/brugomes/on-school.git
```

2. Para iniciar o banco de dados PostgreSQL usando Docker Compose, vá no diretório ```/docker``` e execute o comando:
```
docker-compose up -d
```

3. Instale as dependências do projeto:
```
npm install
```

4. Execute as migrações do banco de dados:
```
npm run typeorm migration:run
```

5. Inicie o servidor de desenvolvimento:
```
npm run start:dev
```

## Testes
Para rodar todos os teste, execute:
```
npm run test
```

## Construção
Para construir o projeto para produção, execute:
```
npm run build
```
