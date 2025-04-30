# Cat Explorer - Aplicação React

Aplicação web desenvolvida em React para explorar diferentes raças de gatos utilizando a The Cat API.

## Funcionalidades

* Lista diversas raças de gatos com imagens.
* Campo de busca para filtrar raças pelo nome na página inicial.
* Exibe detalhes completos de cada raça em uma página dedicada (rota dinâmica), incluindo:
    * Múltiplas imagens em formato de galeria.
    * Descrição, temperamento, origem, peso, expectativa de vida.
    * Níveis de características (energia, afeto, etc.).
    * Links para fontes externas (Wikipedia, Vetstreet, etc.), quando disponíveis.
* Interface com indicadores visuais de carregamento e erro.
* Design responsivo básico.

## Aplicação Online

Você pode acessar a aplicação online através deste link:

[**cat-explorer-fb.netlify.app** ](https://cat-explorer-fb.netlify.app/)

## Screenshots

## Página Inicial:
![Print da Página Inicial](https://github.com/user-attachments/assets/23bf60ea-812c-452c-b482-05c2849961b6)

## Página de Detalhes:
![Print da Página de Detalhes](https://github.com/user-attachments/assets/fb479f59-b81c-4b9e-943e-450ad2a7678b)


## Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface.
* **Vite:** Ferramenta de build e servidor de desenvolvimento.
* **React Router DOM:** Para gerenciamento de rotas (navegação entre páginas).
* **Axios:** Para realizar requisições HTTP à The Cat API.
* **The Cat API:** API externa para obter dados sobre gatos e suas raças.
* **CSS:** Para estilização básica.

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento:

**Pré-requisitos:**

* Node.js (versão X.Y.Z ou superior) - Verifique com `node -v`
* npm (versão X.Y.Z ou superior) - Verifique com `npm -v` ou Yarn
* Git

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/cat-app.git](https://github.com/FelipeBattarra/Cats_React.git) # Substitua pela URL do seu repo
    cd cat-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *Ou, se você usar Yarn:*
    ```bash
    # yarn install
    ```

3.  **Configure a API Key:**
    * Obtenha sua API Key em [https://thecatapi.com/](https://thecatapi.com/).
    * Abra o arquivo `src/services/catApi.js`.
    * Substitua o placeholder `'SUA_API_KEY_AQUI'` pela sua chave real:
        ```javascript
        const API_KEY = 'SUA_API_KEY_AQUI'; // Substitua aqui
        ```
    *(Nota: Para projetos reais, considere usar variáveis de ambiente .env para armazenar chaves de API)*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *Ou, se você usar Yarn:*
    ```bash
    # yarn dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## Estrutura do Projeto

```
cat-app/
├── public/             # Arquivos estáticos
├── src/
│   ├── assets/         # Recursos como imagens (se houver)
│   ├── components/     # Componentes React reutilizáveis (BreedCard, Layout)
│   ├── pages/          # Componentes de página (HomePage, BreedDetailPage)
│   ├── services/       # Lógica de API (catApi.js)
│   ├── App.css         # Estilos globais do App
│   ├── App.jsx         # Componente principal com as rotas
│   ├── index.css       # Estilos globais
│   ├── main.jsx        # Ponto de entrada da aplicação React
├── .gitignore          # Arquivos ignorados pelo Git
├── index.html          # HTML principal
├── package.json        # Dependências e scripts do projeto
├── README.md           # Este arquivo
├── vite.config.js      # Configuração do Vite
```

## Autor

**Guilherme Borges Rocha**
