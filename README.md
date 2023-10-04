# SimpleDesk

## A maneira mais simples de configurar e usar um sistema de helpdesk

O SimpleDesk é um software que permite que seus clientes abram tickets de suporte de forma simples, enquanto você pode rastreá-los e fornecer suporte de maneira eficiente.

### Visão Geral

Este projeto visa fornecer uma solução de helpdesk simples e eficaz para empresas e organizações de todos os tamanhos. O SimpleDesk foi desenvolvido com foco na facilidade de configuração e uso, para que você possa começar rapidamente a gerenciar solicitações de suporte dos seus clientes.

### Requisitos

Antes de começar, você precisará garantir que os seguintes componentes estejam configurados:

- **Banco de Dados**: É necessário um servidor de banco de dados MySQL. Recomendamos o uso do PlanetScale para uma opção gratuita.

- **Frontend**: Como utilizamos React, o Vercel é a plataforma recomendada para implantar o frontend.

- **Backend**: O backend foi desenvolvido em Spring Boot. Para uma opção gratuita, recomendamos o uso do railway.app.

- **Hospedagem de Imagens**: Para armazenar imagens de suporte, você pode usar o Cloudinary, que possui um plano gratuito generoso. Estamos trabalhando na integração com outros provedores, como AWS S3.

### Documentação

- [Diagrama UML](https://drive.google.com/file/d/1wmtiI8FecAXDKXtU702Ve3rqzHUxZ-bF/view?usp=sharing)

### Instruções

#### Configuração do Frontend

1. Instale as dependências com o comando:

   ```
   npm install
   ```

2. Crie um arquivo `.env` a partir do exemplo `.env.example` e configure os valores necessários.

3. Compile o frontend com o comando:

   ```
   npm run build
   ```

4. Após a conclusão da compilação, seu frontend do SimpleDesk estará pronto.

5. Faça o upload do conteúdo da pasta `dist` para seu servidor web. Se estiver usando o Apache, siga estas instruções específicas.

   - Edite ou utilize o arquivo `000-default.conf` do Apache e adicione a seguinte configuração:

   ```
   <VirtualHost *:80>
       ServerAdmin webmaster@localhost
       DocumentRoot /var/www/html

       <Directory "/var/www/html">
           Options +FollowSymlinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

   - Ative o módulo de reescrita (`rewrite module`).

   - Crie um arquivo `.htaccess` na pasta raiz e adicione o seguinte conteúdo:

   ```
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [QSA,L]
   RewriteCond %{REQUEST_URI} index.html$1
   ```

   - Reinicie o servidor Apache.

6. Se preferir, você pode executar tudo em um contêiner Docker. Um Dockerfile já está pronto para automatizar a construção.

#### Configuração do Banco de Dados

- Este sistema foi desenvolvido usando a versão mais recente do MySQL (8.0.32).

1. Crie um novo banco de dados chamado `simple_desk`.

2. Crie um novo usuário e conceda a ele privilégios para manipular e criar objetos no banco de dados `simple_desk`.

#### Configuração do Backend

1. Certifique-se de ter o Java Runtime Environment (JRE) instalado em sua máquina.

2. No diretório raiz do projeto, execute o seguinte comando para compilar o backend (verifique se o Maven está instalado em seu sistema):

   ```
   mvn package -DskipTests
   ```

3. A compilação gerará arquivos na pasta `target`. Você pode usar o arquivo `simpledesk_backend.jar` para executar os serviços do backend.

4. Agora você pode executar o backend com os seguintes parâmetros:

   - `APP_PROFILE`: prod
   - `JWT_SECRET`: você pode criar uma chave para uso e rotação conforme necessário, ou deixar em branco
   - `CORS`: insira o endereço do frontend aqui para evitar chamadas de API de outros lugares
   - `db_url`: URL do seu banco de dados com porta (exemplo: localhost:3306)
   - `db_username`: Um usuário com privilégios no banco de dados `simple_desk`.
   - `db_password`: A senha do usuário para acessar o banco de dados.

5. Você pode executar a partir do terminal com o seguinte comando:

   ```
   java -DAPP_PROFILE=prod -DJWT_SECRET=your_secret_key -DCORS=http://localhost -Ddb_url=localhost:3306 -Ddb_username=admin -Ddb_password=123456789 -jar /caminho/para/simpledesk_backend.jar
   ```

6. Se preferir, você pode executar tudo em um contêiner Docker. Um Dockerfile está pronto para automatizar a construção.

#### Executando em uma VM com Docker

Você pode criar uma VM e executá-la com o Docker como um serviço no Linux.

- Crie e preencha os parâmetros `.env` necessários.

- Registre seu serviço e inicie-o.

  ```
  [Unit]
  Description=BackEnd Server
  Requires=network-online.target docker.service
  After=network-online.target docker.service

  [Service]
  Restart=always
  User=ubuntu
  RestartSec=5
  EnvironmentFile=/home/ubuntu/.env
  ExecStartPre=-/usr/bin/docker kill backend-server
  ExecStartPre=-/usr/bin/docker rm backend-server
  ExecStartPre=/usr/bin/docker pull your_user/backend_image:main
  ExecStart=/usr/bin/docker run --name backend-server --env-file /home/ubuntu/.env -p 80:5500 your_user/backend_image:main
  ExecStop=/usr/bin/docker stop backend-server
  [Install]
  WantedBy=multi-user.target
  ```
