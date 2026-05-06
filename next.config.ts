import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity'],
  async redirects() {
    return [
      // Pages n8n supprimées → article de blog n8n
      { source: '/n8n-pricing', destination: '/blog/c-est-quoi-n8n', permanent: true },
      { source: '/n8n-install', destination: '/blog/c-est-quoi-n8n', permanent: true },
      { source: '/n8n-formation', destination: '/blog/c-est-quoi-n8n', permanent: true },
      // Page service supprimée → article de blog équivalent
      { source: '/automatisation-commerciale-ia-efficacite', destination: '/blog/automatisation-commerciale-ia-efficacite', permanent: true },
      // Typo dans slug (commercial sans 'e') → slug correct
      { source: '/blog/plan-action-commercial-exemple', destination: '/blog/plan-action-commerciale-exemple', permanent: true },
      // Page stratégie prospection supprimée → service Deep Signal
      { source: '/strategie-prospection-outils-automatisation', destination: '/services/deepsignal', permanent: true },
      // Articles dupliqués supprimés → originaux
      { source: '/blog/automatiser-prospection-commerciale-2', destination: '/blog/automatiser-prospection-commerciale', permanent: true },
      { source: '/blog/comment-optimiser-seo-site-web-2', destination: '/blog/comment-optimiser-seo-site-web', permanent: true },
      // Anciennes pages WordPress supprimées → articles proches
      { source: '/methode-pilotage-commercial', destination: '/blog/plan-action-commerciale-exemple', permanent: true },
      { source: '/structurer-demarche-commerciale', destination: '/blog/plan-action-commerciale-exemple', permanent: true },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      }
    }
    return config
  },
}

export default nextConfig
