# Spotify Artist Explorer

Este projeto é um desafio técnico para uma posição de Staff Frontend Engineer. É uma aplicação web para pesquisar, explorar e gerenciar informações sobre artistas do Spotify, construída com uma stack de tecnologia moderna e robusta.

## Funcionalidades Principais

- **Busca de Artistas**: Pesquise artistas no Spotify com resultados paginados.
- **Detalhes do Artista**: Visualize informações detalhadas sobre um artista, incluindo suas faixas e álbuns mais populares.
- **Visualização de Dados**: Gráficos interativos que exibem a popularidade das faixas e outras métricas.
- **Gerenciamento de Favoritos**: Adicione e gerencie uma lista local de músicas favoritas.
- **Internacionalização**: Suporte para Inglês (en-US) e Português (pt-BR).

## Destaques da Arquitetura & Stack Tecnológica

A arquitetura enfatiza uma clara separação de responsabilidades, segurança de tipos (type safety) e uma experiência de desenvolvimento moderna.

- **Gerenciamento de Estado**:
  - **Server State**: Gerenciado pelo **React Query** para todas as interações com a API do Spotify, fornecendo cache, revalidação e busca de dados otimizada.
  - **Client State**: Gerenciado pela **Context API** do React com `useReducer` para o estado da interface do usuário local, como as músicas favoritas do usuário, persistido no Local Storage.

- **Roteamento**:
  - O **TanStack Router** é usado para roteamento baseado em arquivos e com tipagem segura, permitindo a divisão automática de código (code splitting) e integração perfeita com hooks de busca de dados.

- **UI & Estilização**:
  - **Tailwind CSS** para uma abordagem de estilização utility-first.
  - **Shadcn/ui** para um conjunto de componentes de UI acessíveis e componentizáveis, permitindo um desenvolvimento rápido sem sacrificar o controle sobre o código.

### Stack Tecnológica Completa

- **Framework**: React 19
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Testes**: Vitest
- **Estilização**: Tailwind CSS
- **Componentes de UI**: Shadcn/ui
- **Busca de Dados**: React Query & Axios
- **Roteamento**: TanStack Router
- **Formulários**: React Hook Form & Zod
- **Gráficos**: Recharts
- **i18n**: i18next

## Começando

### Pré-requisitos

- Node.js v18+
- npm ou yarn
- Uma conta de desenvolvedor do Spotify com credenciais de API (Client ID e Client Secret).

### Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/andradehenrique/kanastra-spotify-challenge.git
    cd kanastra-spotify-challenge
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` no diretório raiz copiando o arquivo de exemplo:
    ```bash
    cp .env.example .env
    ```
    Em seguida, adicione suas credenciais da API do Spotify ao arquivo `.env`:
    ```
    VITE_SPOTIFY_CLIENT_ID=seu_client_id_do_spotify
    VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret_do_spotify
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento em `localhost`.
- `npm run build`: Compila a aplicação para produção.
- `npm run preview`: Visualiza a build de produção localmente.
- `npm run test`: Executa os testes unitários uma vez.
- `npm run test:ui`: Inicia o Vitest em modo UI para uma experiência de teste interativa.
- `npm run test:coverage`: Gera um relatório de cobertura de testes.
- `npm run lint`: Executa o ESLint para análise estática do código.
- `npm run lint:fix`: Corrige automaticamente os problemas de linting reportados pelo ESLint.
