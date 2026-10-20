'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Liga o comportamento do site (login, formulários, abas, tema, acessibilidade, bolhas)
// depois que a página já está na tela. A ordem importa: auth primeiro, forms por último.
export default function Boot() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const steps = [
        () => import('../lib/legacy/auth'),
        () => import('../lib/legacy/bubbles'),
        () => import('../lib/legacy/theme'),
        () => import('../lib/legacy/nav'),
        () => import('../lib/legacy/accessibility'),
        () => import('../lib/legacy/forms'),
      ];
      for (const load of steps) {
        if (cancelled) return;
        await load();
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <Script
      src="https://vlibras.gov.br/app/vlibras-plugin.js"
      strategy="afterInteractive"
      onReady={() => {
        if (window.VLibras && !window.__vlibrasIniciado) {
          window.__vlibrasIniciado = true;
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      }}
    />
  );
}
