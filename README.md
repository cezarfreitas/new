# Projeto EasyPanel Deploy

Este projeto está configurado para deploy automático no EasyPanel em VPS.

## 🚀 Deploy no EasyPanel

### Pré-requisitos
- VPS com EasyPanel instalado
- Docker configurado no VPS
- Acesso ao painel do EasyPanel

### Configuração no EasyPanel

1. **Criar Nova Aplicação**
   - Acesse seu painel EasyPanel
   - Clique em "Create App"
   - Escolha "Docker" como tipo

2. **Configurar Docker**
   - Repository: `seu-usuario/seu-repo`
   - Branch: `main`
   - Dockerfile path: `./Dockerfile`

3. **Configurar Porta**
   - Port: `3000`
   - Protocol: `HTTP`

4. **Variáveis de Ambiente**
   \`\`\`
   NODE_ENV=production
   PORT=3000
   HOSTNAME=0.0.0.0
   \`\`\`

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build e deploy automático

## 🔧 Desenvolvimento Local

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
\`\`\`

## 🐳 Docker Local

\`\`\`bash
# Build da imagem
docker build -t easypanel-app .

# Executar container
docker run -p 3000:3000 easypanel-app
\`\`\`

## 📊 Monitoramento

- Health check: `/api/health`
- Logs disponíveis no painel EasyPanel
- Métricas de performance automáticas

## 🔄 CI/CD

O projeto está configurado para:
- Build automático no push
- Deploy automático no EasyPanel
- Health checks automáticos
- Rollback em caso de falha

## 📝 Estrutura do Projeto

\`\`\`
├── app/                 # Aplicação Next.js
├── Dockerfile          # Configuração Docker
├── docker-compose.yml  # Compose para desenvolvimento
├── next.config.mjs     # Configuração Next.js
└── README.md          # Este arquivo
\`\`\`

## 🛠️ Troubleshooting

### Build Falha
- Verifique os logs no EasyPanel
- Confirme se todas as dependências estão no package.json

### Aplicação não Inicia
- Verifique se a porta 3000 está disponível
- Confirme as variáveis de ambiente

### Performance
- Use `npm run build` antes do deploy
- Configure cache adequadamente
- Monitore uso de memória no VPS
