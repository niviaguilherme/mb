# 🎬 Catálogo de Streaming

Um aplicativo web moderno para descobrir e gerenciar seus filmes e séries favoritos.

![Screenshot do Catálogo de Streaming](https://i.imgur.com/8S5uGJw.jpg)

## ✨ Funcionalidades

- **Navegação intuitiva** por uma ampla coleção de filmes e séries
- **Sistema de favoritos** para salvar e gerenciar títulos de interesse
- **Busca avançada** com sugestões em tempo real
- **Visualização detalhada** de cada título com informações sobre sinopse, elenco e avaliações
- **Design responsivo** para uma experiência consistente em dispositivos móveis e desktop
- **Tema escuro** para maior conforto visual

## 🚀 Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework React com renderização do lado do servidor
- **[React 18](https://react.dev/)** - Biblioteca para construção de interfaces
- **[Material UI 5](https://mui.com/)** - Sistema de design robusto e componentes pré-estilizados
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário

## 🛠️ Como Executar Localmente

Certifique-se de ter [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado.

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/streaming-catalog.git
   cd streaming-catalog
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar o aplicativo.

## 📦 Build e Deploy

Para gerar uma versão de produção:

```bash
npm run build
```

Para executar a versão de produção localmente:

```bash
npm start
```

### 🌐 Deploy na Vercel

Este projeto está configurado para deploy na [Vercel](https://vercel.com/), uma plataforma especializada em hospedagem de aplicações Next.js.

1. Crie uma conta na Vercel e conecte com seu repositório GitHub
2. Importe o projeto e a Vercel automaticamente detectará as configurações do Next.js
3. Configure variáveis de ambiente, se necessário
4. Aproveite recursos como preview de pull requests e implantação automática

## 📂 Estrutura do Projeto

```
streaming-catalog/
├── public/            # Arquivos estáticos
├── src/
│   ├── app/           # Rotas e páginas da aplicação
│   ├── components/    # Componentes reutilizáveis
│   ├── contexts/      # Contextos React (incluindo TitleContext)
│   ├── data/          # Dados estáticos (JSON de títulos)
│   └── types/         # Definições de tipos TypeScript
├── next.config.mjs    # Configuração do Next.js
└── package.json       # Dependências e scripts
```

## 🧪 Testes

Execute testes com Jest:

```bash
npm test
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ por [Seu Nome](https://github.com/seu-usuario)
