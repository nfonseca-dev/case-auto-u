## Descrição do Projeto
Este diretório contém o código-fonte do backend do projeto, desenvolvido com Django.

## Estrutura do Projeto
- `core/`: Contém as configurações principais do projeto Django.
- `inbox/`: Contém a aplicação Django com visualizações e URLs.
- `manage.py`: Script de gerenciamento do Django.
- `requirements.txt`: Lista de dependências do projeto.
- `README.md`: Documentação do backend.

## Instalação e Configuração
1. Certifique-se de ter o Python (Python >= 3.12) e o pip instalados.
   Python >= 3.12 pode ser baixado em [python.org](https://www.python.org/).
2. Navegue até o diretório `backend`:
   ```bash
   cd backend
   ```
3. Crie um ambiente virtual (opcional, mas recomendado):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # No Windows use `.<|venv\Scripts\activate`
   ```
4. Instale as dependências do projeto:
   ```bash
   pip install -r requirements.txt
   ```
5. Configure as variáveis de ambiente, se necessário, criando um arquivo `.env` na raiz do diretório `backend`.
6. Aplique as migrações do banco de dados:
   ```bash
   python manage.py migrate
   ```
7. Inicie o servidor de desenvolvimento:
   ```bash
   python manage.py runserver   
    ```
## Scripts Disponíveis
No diretório `backend`, você pode executar os seguintes scripts:
- `python manage.py runserver`: Inicia o servidor de desenvolvimento.
- `python manage.py migrate`: Aplica as migrações do banco de dados.
- `python manage.py shell`: Abre um shell interativo do Django.
- `python manage.py makemigrations`: Cria novas migrações com base nas alterações dos 