/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para otimizar o build para produção
  output: 'standalone',
  
  // Configurações de imagem para EasyPanel
  images: {
    unoptimized: true,
  },
  
  // Configurações de compressão
  compress: true,
  
  // Configurações para VPS
  experimental: {
    outputFileTracingRoot: undefined,
  },
  
  // Configurações para ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configurações para TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
