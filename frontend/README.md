## Descrição do Projeto
Este diretório contém o código-fonte do frontend do projeto, desenvolvido com React. O frontend é responsável pela interface do usuário e pela interação com o backend.

## Estrutura do Projeto
- `src/`: Contém o código-fonte do aplicativo React.
  - `components/`: Componentes reutilizáveis da interface do usuário.
  - `pages/`: Páginas principais do aplicativo.
  - `services/`: Serviços para comunicação com o backend.
- `public/`: Arquivos públicos, como `index.html` e ícones.
- `package.json`: Gerenciador de dependências e scripts do projeto.
- `README.md`: Documentação do frontend.


## Instalação e Configuração
1. Certifique-se de ter o Node.js(Node.js >= 20.19) e o npm instalados.
    Node.js >= 20.19 pode ser baixado em [nodejs.org](https://nodejs.org/).
    yarn ou npm podem ser usados como gerenciadores de pacotes.
2. Navegue até o diretório `frontend`:
   ```bash
   cd frontend
   ```
3. Instale as dependências do projeto:
   ```bash
    npm install
    # ou, se estiver usando yarn
    yarn install
   ```
4. Configure as variáveis de ambiente, se necessário, criando um arquivo `.env` na raiz do diretório `frontend`.

## Scripts Disponíveis
No diretório `frontend`, você pode executar os seguintes scripts:
- `npm start ou yarn start`: Inicia o servidor de desenvolvimento.
- `npm run build ou yarn build`: Cria uma versão otimizada do aplicativo para produção.
- `npm test ou yarn test`: Executa os testes do aplicativo.
- `npm run eject ou yarn eject`: Ejetar a configuração padrão do Create React App (use com
    cautela).
    
