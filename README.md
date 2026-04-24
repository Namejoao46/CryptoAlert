# 💰 CryptoAlert - Monitor de Notícias Cripto

> Uma aplicação Full Stack robusta desenvolvida com **React Native (Expo)**, **Express** e **Drizzle ORM** para gerenciar e monitorar notícias do mercado financeiro digital.

---

## 📝 Sobre o Projeto
O **CryptoAlert** é um sistema de gerenciamento de notícias focado em criptomoedas. Ele permite que usuários acompanhem o sentimento do mercado (Alta, Baixa ou Neutro) através de uma interface mobile moderna, integrada a um ecossistema persistente de dados.

### 🛠️ Funcionalidades Principais
- **CRUD Completo**: Cadastro, listagem e exclusão de notícias em tempo real.
- **Análise de Sentimento**: Identificação visual de tendências (🚀 Alta, 📉 Baixa, 😐 Neutro).
- **Persistência com Drizzle**: Integração eficiente entre a API e o banco de dados SQLite.
- **Multi-plataforma**: Testado e funcional em Android, iOS (via Expo Go) e Web.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **React Native / Expo** | Framework mobile com sistema de rotas (Expo Router). |
| **TypeScript** | Desenvolvimento com tipagem segura em todo o projeto. |
| **Express** | Servidor HTTP para a API REST do sistema. |
| **Drizzle ORM** | ORM moderno para manipulação do banco de dados SQLite. |
| **Axios** | Cliente HTTP para integração entre Mobile e Backend. |

---

## 📥 Passo a Passo para Instalação e Uso

### 1. Configurar o Backend
Abra o terminal na pasta `backend` e execute:
```bash
npm install
npx drizzle-kit push   # Sincronizar o banco de dados
npx tsx src/index.ts   # Iniciar o servidor na porta 4000
```

### 2. Configurar o Mobile
```bash
npm install
baseURL: 'http://localhost:4000' # Para testes via Web (W)
# ou use o seu IP Local para testes no celular real
npx expo start #Inicie o App
```

---

## 👥 Colaboradores

| Foto | Nome | GitHub | Função |
| :---: | :--- | :--- | :--- |
| <img src="https://github.com/Namejoao46.png" width="60px"> | **João Paulo** | [@Namejoao46](https://github.com/Namejoao46) | Lead Developer |
| <img src="https://github.com/jenifer3105.png" width="60px"> | **Jenifer** | [@jenifer3105](https://github.com/jenifer3105) | Developer |
| <img src="https://github.com/Brittoexe.png" width="60px"> | **Leandro** | [@Brittoexe](https://github.com/Brittoexe) | Developer |
| <img src="https://github.com/Jessicarocha7.png" width="60px"> | **Jessica** | [@Jessicarocha7](https://github.com/Jessicarocha7) | Developer |

---

### ✨ Projeto desenvolvido para a disciplina de Programação de APP.

---