# Gean & Juliana — site do casamento

Site do casamento de Gean Costa e Juliana Silva, 13 de novembro de 2027, em Belém - PA.

Feito com [Next.js](https://nextjs.org) e [Tailwind CSS](https://tailwindcss.com).

## Rodando localmente

Requer [Node.js](https://nodejs.org) (versão LTS).

```bash
npm install     # instala as dependências (só na primeira vez)
npm run dev     # abre o site em http://localhost:3000
```

Outros comandos:

```bash
npm run lint    # verifica problemas no código
npm run build   # gera a versão de produção
npm start       # roda a versão de produção gerada pelo build
```

## Onde editar

- Nomes, data, horários e endereços: `src/lib/wedding.ts`
- Conteúdo da página: `src/app/page.tsx`
- Cores e fontes: `src/app/globals.css` e `src/app/layout.tsx`
