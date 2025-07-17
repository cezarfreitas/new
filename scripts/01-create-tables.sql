-- Script para criar as tabelas no Supabase
-- Execute este script no Supabase Studio > SQL Editor

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabelas para a landing page
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    source VARCHAR(100) DEFAULT 'newsletter',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    referrer VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON public.page_views(page);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para permitir inserção pública
CREATE POLICY "Allow public insert on leads" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on contacts" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on page_views" ON public.page_views
    FOR INSERT WITH CHECK (true);

-- Políticas RLS para permitir leitura apenas para service_role
CREATE POLICY "Allow service_role select on leads" ON public.leads
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Allow service_role select on contacts" ON public.contacts
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Allow service_role select on page_views" ON public.page_views
    FOR SELECT USING (auth.role() = 'service_role');

-- Inserir dados de exemplo
INSERT INTO public.leads (email, name, source) VALUES 
('exemplo@email.com', 'João Silva', 'newsletter'),
('teste@email.com', 'Maria Santos', 'hero_form')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.contacts (name, email, subject, message) VALUES 
('Pedro Costa', 'pedro@email.com', 'Dúvida sobre serviços', 'Gostaria de saber mais informações sobre os serviços oferecidos.')
ON CONFLICT DO NOTHING;
