# Spotify Challenge - Staff Frontend Engineer

Aplicação para listar artistas do Spotify com busca, filtros e detalhes, utilizando a API pública do Spotify.

## 🚀 Stack Tecnológica

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **Context API** + `useReducer` - Gerenciamento de estado
- **React Query** - Data fetching e cache
- **React Hook Form** + **Zod** - Formulários e validação
- **i18n** - Internacionalização (PT-BR / EN-US)
- **Recharts** - Visualização de dados

## 📋 Pré-requisitos

- Node.js 18+ e npm/yarn
- Credenciais da API do Spotify (Client ID e Client Secret)

## 🔑 Configurando as Credenciais do Spotify

### Passo 1: Criar uma aplicação no Spotify Developer Dashboard

1. Acesse [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Faça login com sua conta Spotify
3. Clique em **"Create app"**
4. Preencha os dados:
   - **App name**: `Spotify Challenge` (ou qualquer nome)
   - **App description**: Aplicação para desafio técnico
   - **Redirect URI**: `http://localhost:5173` (não é necessário para Client Credentials Flow)
   - Marque a checkbox concordando com os Termos
5. Clique em **"Save"**

### Passo 2: Obter Client ID e Client Secret

1. Na página da sua aplicação, clique em **"Settings"**
2. Você verá o **Client ID** (copie-o)
3. Clique em **"View client secret"** para ver o **Client Secret** (copie-o)

### Passo 3: Configurar as variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e adicione suas credenciais:

```env
VITE_SPOTIFY_CLIENT_ID=seu_client_id_aqui
VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

⚠️ **IMPORTANTE**: O arquivo `.env` está no `.gitignore` e não deve ser commitado!

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Arquitetura do Projeto

```
src/
├── @types/              # Definições de tipos TypeScript
│   └── spotify.ts       # Tipos da API do Spotify
├── api/                 # Configuração e funções da API
│   ├── axios.ts         # Instância configurada do Axios + interceptors
│   ├── config.ts        # Configurações da API
│   └── spotify.ts       # Funções para consumir a API do Spotify
├── components/          # Componentes reutilizáveis
│   ├── layout/          # Componentes de layout (Header, Footer)
│   ├── ui/              # Componentes base (Shadcn UI)
│   └── charts/          # Componentes de gráficos
├── context/             # Context API
│   └── FavoritesContext.tsx
├── features/            # Componentes "smart" (contêineres)
│   ├── artist-search/   # Listagem e busca de artistas
│   ├── artist-details/  # Detalhes do artista
│   └── favorites-form/  # Formulário de músicas favoritas
├── hooks/               # Custom hooks
│   ├── useFavorites.ts
│   └── useSpotifyApi.ts
├── lib/                 # Utilitários e configurações
│   ├── i18n.ts
│   ├── queryClient.ts
│   └── utils.ts
├── pages/               # Páginas (rotas)
│   ├── Home.tsx
│   └── Artist.tsx
└── schemas/             # Schemas Zod
    └── favoriteSongSchema.ts
```

## 🔐 Autenticação com a API do Spotify

Este projeto utiliza o **Client Credentials Flow** do Spotify:

- O token de acesso é obtido automaticamente via interceptor do Axios
- O token é armazenado em memória e renovado automaticamente quando expira
- Todos os requests para a API do Spotify incluem automaticamente o `Authorization` header

### Como funciona

1. O arquivo `src/api/axios.ts` contém a lógica de autenticação
2. Antes de cada requisição, o interceptor verifica se há um token válido
3. Se não houver ou se estiver expirado, um novo token é solicitado
4. Em caso de erro 401, o token é renovado automaticamente

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Compila para produção
npm run preview    # Preview da build de produção
npm run lint       # Executa o ESLint
npm run lint:fix   # Corrige problemas do ESLint automaticamente
```

## 📚 Recursos da API Implementados

- ✅ Busca de artistas por nome
- ✅ Detalhes de um artista específico
- ✅ Top tracks de um artista
- ✅ Álbuns de um artista (paginado)
- ✅ Artistas relacionados
- ✅ Detalhes de um álbum
- ✅ Tracks de um álbum (paginado)

## 🌐 Internacionalização (i18n)

A aplicação suporta dois idiomas:
- **PT-BR** (Português do Brasil) - padrão
- **EN-US** (Inglês Americano)

O usuário pode alternar entre os idiomas através do componente `LanguageToggle` no header.

Todas as traduções estão em `src/locales/`.

## Formulários e Validação

Os formulários utilizam:
- **React Hook Form** - Gerenciamento performático
- **Zod** - Validação de schemas com type-safety
- **@hookform/resolvers** - Integração entre RHF e Zod

Exemplo de schema em `src/schemas/favoriteSongSchema.ts`.

## �🔗 Links Úteis

- [Documentação da API do Spotify](https://developer.spotify.com/documentation/web-api)
- [Console da API do Spotify](https://developer.spotify.com/console)
- [Dashboard do Spotify for Developers](https://developer.spotify.com/dashboard)

## 📖 Documentação Adicional

- [LIBS-SETUP.md](./docs/LIBS-SETUP.md) - Guia detalhado de configuração das bibliotecas
- [NEXT-STEPS.md](./NEXT-STEPS.md) - Próximos passos do desenvolvimento

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
