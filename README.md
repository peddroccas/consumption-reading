## **Sistema de Leitura de Medidores**

### **Visão Geral**

Este serviço back-end foi desenvolvido para automatizar a leitura de medidores de água e gás, utilizando processamento de imagens com inteligência artificial. A aplicação é capaz de receber imagens de medidores, extrair os valores de consumo e armazená-los em um banco de dados.

### **Funcionalidades Principais**

* **Upload de Imagens:** Recebe imagens de medidores em formato base64.
* **Processamento de Imagens:** Utiliza a API do Google Gemini para extrair os valores de consumo das imagens.
* **Validação e Armazenamento:** Valida os dados extraídos e armazena as leituras em um banco de dados.
* **Confirmação e Correção:** Permite a confirmação ou correção manual das leituras.
* **Histórico de Leituras:** Permite consultar o histórico de leituras de um cliente específico.

### **Tecnologias Utilizadas**
- ![Docker](https://img.shields.io/badge/Docker-0db7ed?style=flat&logo=docker&logoColor=white) Docker: Contenerização do ambiente de desenvolvimento e produção.
- ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-8cc4ff?style=flat&logo=docker&logoColor=white) Docker Compose: Definição e gerenciamento de serviços Docker.
- ![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white) Fastify: Framework Node.js leve e performante para APIs.
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) Node.js: Ambiente de execução JavaScript para o back-end.
- ![Zod](https://img.shields.io/badge/Zod-2c3e50?style=flat&logo=typescript&logoColor=white) Zod: Validação de dados robusta e tipo-segura.
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) Prisma: ORM para interação com o banco de dados.
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) PostgreSQL: Banco de dados relacional.


### **Configuração do Projeto**
* **Requisitos:**
  * Docker
  * Docker Compose
  * Node.js (versão compatível)
  * npm ou yarn
* **Instalação:**
  1. Clone o repositório.
  2. Crie um arquivo `.env` com as variáveis de ambiente necessárias:
     
    ```
    GEMINI_API_KEY=your_gemini_api_key
    ```

### **Execução**
* Inicie o ambiente de desenvolvimento:
  ```bash
  docker compose up --build
