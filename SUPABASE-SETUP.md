# 🚀 Configuração do Supabase

## Passo a Passo para Configurar o Supabase

### 1. 📊 **Criar as Tabelas**

1. Acesse o **Supabase Studio**: `http://localhost:3001`
2. Vá em **SQL Editor**
3. Execute o script `scripts/01-create-tables.sql`
4. Execute o script `scripts/02-setup-realtime.sql`

### 2. 🔑 **Configurar Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
\`\`\`

### 3. 🔧 **Testar a Conexão**

1. Inicie o Supabase: `docker-compose up -d`
2. Aguarde 2-3 minutos para tudo inicializar
3. Acesse: `http://localhost:3001` (Supabase Studio)
4. Verifique se as tabelas foram criadas

### 4. 📝 **Testar os Formulários**

1. Inicie a aplicação: `npm run dev`
2. Acesse: `http://localhost:3000`
3. Teste o formulário de newsletter
4. Teste o formulário de contato
5. Verifique os dados no Supabase Studio

### 5. 📊 **Verificar os Dados**

No Supabase Studio:
1. Vá em **Table Editor**
2. Selecione a tabela `leads` ou `contacts`
3. Veja os dados inseridos pelos formulários

### 6. 🔒 **Segurança (RLS)**

As tabelas já estão configuradas com:
- ✅ **Row Level Security** habilitado
- ✅ **Políticas** para inserção pública
- ✅ **Políticas** para leitura apenas admin

### 7. 🚀 **Deploy no VPS**

Para deploy no VPS, atualize as variáveis:

\`\`\`env
# No VPS
NEXT_PUBLIC_SUPABASE_URL=http://seu-vps:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
\`\`\`

## 🛠️ **Comandos Úteis**

\`\`\`bash
# Iniciar Supabase
docker-compose up -d

# Ver logs do Supabase
docker-compose logs -f

# Parar Supabase
docker-compose down

# Resetar dados (cuidado!)
docker-compose down -v
\`\`\`

## 📋 **Estrutura das Tabelas**

### `leads` (Newsletter)
- `id` - UUID (Primary Key)
- `email` - String (Unique)
- `name` - String (Optional)
- `source` - String (newsletter, hero_form, etc.)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### `contacts` (Formulário de Contato)
- `id` - UUID (Primary Key)
- `name` - String
- `email` - String
- `subject` - String (Optional)
- `message` - Text
- `status` - String (new, read, replied)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### `page_views` (Analytics)
- `id` - UUID (Primary Key)
- `page` - String
- `user_agent` - Text
- `ip_address` - INET
- `referrer` - String
- `created_at` - Timestamp

## ✅ **Checklist de Configuração**

- [ ] Supabase rodando (`docker-compose up -d`)
- [ ] Tabelas criadas (SQL scripts executados)
- [ ] Variáveis de ambiente configuradas
- [ ] Aplicação conectando ao Supabase
- [ ] Formulários funcionando
- [ ] Dados sendo salvos
- [ ] Admin panel mostrando dados

## 🆘 **Troubleshooting**

### Erro de Conexão
\`\`\`bash
# Verificar se Supabase está rodando
docker-compose ps

# Ver logs de erro
docker-compose logs supabase-db
\`\`\`

### Tabelas não aparecem
1. Verifique se executou os scripts SQL
2. Aguarde 2-3 minutos após criar
3. Refresh no Supabase Studio

### Formulários não salvam
1. Verifique as variáveis de ambiente
2. Veja o console do navegador
3. Verifique as políticas RLS
