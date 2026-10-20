// Cabeçalhos de segurança aplicados em todas as páginas.
const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' é exigido pelos scripts de inicialização do próprio Next.js
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://vlibras.gov.br`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vlibras.gov.br",
  "font-src 'self' data: https://fonts.gstatic.com https://vlibras.gov.br",
  "img-src 'self' data: blob: https://vlibras.gov.br",
  "media-src 'self' blob: https://vlibras.gov.br",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vlibras.gov.br",
  "frame-src https://vlibras.gov.br",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
