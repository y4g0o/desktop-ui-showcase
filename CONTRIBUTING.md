# Contributing to desktop-ui-showcase

🇺🇸 [English](#-english) · 🇧🇷 [Português](#-português)

---

## 🇺🇸 English

Thanks for your interest! 🎨 This repo is a small showcase, so the best contributions are polish: accessibility, responsiveness, cleanup and translations, while keeping each project's look.

### Setup

```bash
git clone https://github.com/y4g0o/desktop-ui-showcase.git
cd desktop-ui-showcase
```

- **`1-metro-ui/`, `2-tabela/`, `4-portfolio/`**: plain HTML + CSS. Open `index.html` in a browser, or run `python3 -m http.server 8000` at the repo root (needed for the portfolio's `../` thumbnails if your browser blocks `file://`).
- **`3-app-componentes/`** (SolidJS + Vite + Tailwind 4 + daisyUI 5), with Node.js installed:

```bash
cd 3-app-componentes
npm install
npm run dev
```

### Checks

There are no automated tests. Before opening a PR:

- For the SolidJS app: `npm run build` must pass (it runs the TypeScript check `tsc -b` and the Vite build).
- For the static pages: open them and compare with each folder's `screenshot.png`; nothing should break visually unless that's the point of the PR.
- If you change how a page looks, **update its `screenshot.png`** (same size as the current one) and mention it in the PR.

### Style

- Keep each project self-contained in its numbered folder; no shared build step for the static pages.
- Static pages: semantic HTML, plain CSS, inline SVG icons (no icon fonts, no JS frameworks). Reuse the existing CSS variables (e.g. the `--tn-*` Tokyo Night tokens in `4-portfolio/style.css`).
- SolidJS app: put reusable pieces in `src/ui/` and export them from `src/ui/index.ts`; prefer Tailwind/daisyUI classes over new CSS.
- Interface text is in Portuguese; code identifiers follow the existing mix (Portuguese names like `BarraLateral`, `Embaixo`).

### PR flow

1. Open an issue (or comment on one) to say what you'll work on.
2. Fork and create a branch: `fix/metro-viewport`, `feat/portfolio-links`, …
3. Keep PRs small: one project folder and one concern per PR.
4. Describe the change, attach before/after screenshots for anything visual.

### 🌱 Good first issues

1. **Add the viewport meta tag** to `1-metro-ui/index.html` and `4-portfolio/index.html` (only `2-tabela` and `3-app-componentes` have it), then add basic media queries in their `style.css`.
2. **Keyboard-accessible tiles**: the Metro tiles in `1-metro-ui/index.html` are `<div class="tile">`; turn them into `<a>`/`<button>` and add a `:focus-visible` style in `1-metro-ui/style.css`.
3. **Reduced motion**: the blinking cursor in `4-portfolio/style.css` (`animation: pisca …`) should stop under `@media (prefers-reduced-motion: reduce)`.
4. **Remove the duplicated SVG**: `3-app-componentes/modelo_preview.svg` is identical to `3-app-componentes/public/modelo_preview.svg`, and the app only loads `/modelo_preview.svg` from `public/`.
5. **One package manager**: `3-app-componentes/` has both `bun.lock` and `package-lock.json`; keep one and document it in the README.
6. **Meaningful metadata**: `3-app-componentes/index.html` has `<title>Trabalho</title>` and `package.json` is named `trabalho_n2`; give them a real name (e.g. "3D Model Printer").

---

## 🇧🇷 Português

Valeu pelo interesse! 🎨 Este repositório é uma vitrine pequena, então as melhores contribuições são de acabamento: acessibilidade, responsividade, limpeza e traduções, mantendo o visual de cada projeto.

### Preparação

```bash
git clone https://github.com/y4g0o/desktop-ui-showcase.git
cd desktop-ui-showcase
```

- **`1-metro-ui/`, `2-tabela/`, `4-portfolio/`**: HTML + CSS puros. Abra o `index.html` no navegador, ou rode `python3 -m http.server 8000` na raiz do repositório (necessário para as miniaturas `../` do portfólio se o navegador bloquear `file://`).
- **`3-app-componentes/`** (SolidJS + Vite + Tailwind 4 + daisyUI 5), com Node.js instalado:

```bash
cd 3-app-componentes
npm install
npm run dev
```

### Checagens

Não há testes automatizados. Antes de abrir um PR:

- No app SolidJS: o `npm run build` precisa passar (ele roda a checagem do TypeScript `tsc -b` e o build do Vite).
- Nas páginas estáticas: abra e compare com o `screenshot.png` da pasta; nada deve quebrar visualmente, a não ser que esse seja o objetivo do PR.
- Se mudar o visual de uma página, **atualize o `screenshot.png` dela** (mesmo tamanho do atual) e avise no PR.

### Estilo

- Cada projeto fica autocontido na sua pasta numerada; sem build compartilhado para as páginas estáticas.
- Páginas estáticas: HTML semântico, CSS puro, ícones em SVG embutido (sem fonte de ícones, sem framework JS). Reaproveite as variáveis CSS existentes (ex.: os tokens `--tn-*` do Tokyo Night em `4-portfolio/style.css`).
- App SolidJS: peças reutilizáveis em `src/ui/`, exportadas pelo `src/ui/index.ts`; prefira classes do Tailwind/daisyUI a CSS novo.
- Os textos da interface são em português; os identificadores seguem a mistura atual (nomes em português como `BarraLateral`, `Embaixo`).

### Fluxo de PR

1. Abra uma issue (ou comente numa) dizendo no que vai trabalhar.
2. Faça fork e crie um branch: `fix/metro-viewport`, `feat/portfolio-links`, …
3. PRs pequenos: uma pasta de projeto e um assunto por PR.
4. Descreva a mudança e anexe prints de antes/depois para qualquer coisa visual.

### 🌱 Boas primeiras issues

1. **Adicionar a meta tag de viewport** em `1-metro-ui/index.html` e `4-portfolio/index.html` (só `2-tabela` e `3-app-componentes` têm), depois media queries básicas nos `style.css` deles.
2. **Blocos acessíveis por teclado**: os blocos da Metro em `1-metro-ui/index.html` são `<div class="tile">`; transforme em `<a>`/`<button>` e adicione um estilo `:focus-visible` em `1-metro-ui/style.css`.
3. **Movimento reduzido**: o cursor piscando em `4-portfolio/style.css` (`animation: pisca …`) deve parar com `@media (prefers-reduced-motion: reduce)`.
4. **Remover o SVG duplicado**: `3-app-componentes/modelo_preview.svg` é idêntico a `3-app-componentes/public/modelo_preview.svg`, e o app só carrega `/modelo_preview.svg` da `public/`.
5. **Um só gerenciador de pacotes**: `3-app-componentes/` tem `bun.lock` e `package-lock.json`; mantenha um e documente no README.
6. **Metadados com sentido**: `3-app-componentes/index.html` tem `<title>Trabalho</title>` e o `package.json` se chama `trabalho_n2`; dê um nome de verdade (ex.: "3D Model Printer").
