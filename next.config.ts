import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Só para testes: permite abrir o servidor de desenvolvimento pelo celular,
  // usando o IP do computador na rede de casa (ex.: http://192.168.1.13:3000).
  // Sem isso o Next bloqueia os scripts e nada interativo funciona (menu, contador).
  allowedDevOrigins: ["192.168.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
