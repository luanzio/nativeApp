<h1>🚀 Posts App</h1>

<h2>📝 Descrição</h2>
<p>
O <strong>Posts App</strong> é um aplicativo mobile desenvolvido em React Native que permite aos usuários visualizar, criar, editar e gerenciar posts. A aplicação utiliza Redux para gerenciamento de estado e realiza operações integrando com a API JSONPlaceholder.
</p>

<h2>🛠️ Tecnologias e Ferramentas Utilizadas</h2>
<ul>
  <li><strong>React Native</strong>: Framework para desenvolvimento mobile.</li>
  <li><strong>TypeScript</strong>: Superconjunto de JavaScript para tipagem estática.</li>
  <li><strong>Redux</strong>: Biblioteca para gerenciamento de estado.</li>
  <li><strong>Redux Toolkit</strong>: Conjunto de ferramentas para simplificar o uso do Redux.</li>
  <li><strong>Axios</strong>: Cliente HTTP para realizar requisições à API.</li>
  <li><strong>React Navigation</strong>: Biblioteca de navegação para o React Native.</li>
  <li><strong>react-native-dotenv</strong>: Biblioteca para gerenciar variáveis de ambiente.</li>
  <li><strong>JSONPlaceholder</strong>: API REST fake para testes e protótipos.</li>
</ul>

<h2>📂 Estrutura de Pastas</h2>
<pre>
<code>
/assets                  # Arquivos de mídia, como imagens
/src
├── api                 # Serviços de API e integração
│   ├── services        # Funções para chamadas de API
├── screens             # Telas do aplicativo
├── store               # Configuração do Redux e slices
│   ├── slices          # Slices do Redux
├── types               # Definições de tipos e interfaces
App.tsx                 # Arquivo principal do aplicativo
.env                    # Arquivo de variáveis de ambiente
babel.config.js         # Configuração do Babel
tsconfig.json           # Configuração do TypeScript
README.md               # Documentação do projeto
</code>
</pre>

<h2>⚙️ Instalação e Execução</h2>

<h3>Pré-requisitos</h3>
<ul>
  <li><strong>Node.js</strong> e <strong>npm</strong> instalados.</li>
  <li><strong>Expo CLI</strong> (se estiver usando Expo).</li>
</ul>

<h3>Passos para Instalação</h3>
<ol>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/luanzio/nativeApp.git
cd posts-app</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Crie o arquivo <code>.env</code> na raiz do projeto e adicione o link da API:
    <pre><code>API_URL=https://jsonplaceholder.typicode.com</code></pre>
  </li>
  <li>Execute o projeto:
    <pre><code>npm start</code></pre>
  </li>
</ol>

<h2>🧩 Funcionalidades</h2>
<ul>
  <li><strong>Visualizar Posts</strong>: Listagem de posts com título, autor e imagem.</li>
  <li><strong>Visualizar Detalhes</strong>: Detalhamento de um post específico, incluindo comentários.</li>
  <li><strong>Criar Post</strong>: Funcionalidade para criar um novo post.</li>
  <li><strong>Editar Post</strong>: Edição de posts existentes ao dar um LongPress num post específico.</li>
  <li><strong>Navegação Intuitiva</strong>: Fluxo de navegação entre as telas do aplicativo.</li>
</ul>

<h2>🔄 Fluxo de Navegação</h2>
<ol>
  <li><strong>HomeScreen</strong>: Tela inicial com um botão para acessar a lista de posts.</li>
  <li><strong>PostListScreen</strong>: Lista todos os posts.</li>
  <li><strong>PostDetailsScreen</strong>: Mostra os detalhes de um post selecionado, junto com os comentários.</li>
  <li><strong>EditPostScreen</strong>: Permite a edição de um post.</li>
  <li><strong>CreatePostScreen</strong>: Permite a criação de um novo post.</li>
</ol>
