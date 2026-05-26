# react-spa-devcontainer-template

React で SPA を構築する際のプロジェクトテンプレート。

- memo
  - docker-compose.yml の name は各プロジェクトに合わせて変更する。
  - VSCode + DevContainers での開発のみを想定するため docker-compose.yml には ports を記載しない。VSCode いい感じに ports 転送してくれる。
- todo
  - mui や react-router 初期実装を行う。
  - build の手順を記載する。

## レイアウト実装方針

レイアウトは `Box` / `Stack` を中心に、Flexboxベースで実装する。  
`Grid` はカラム配置や複雑な2次元配置が必要な場合に使用する。  
`sx` はCSS標準に近い指定を中心に利用し、複雑なスタイルはCSSまたは共通コンポーネントに切り出す。  
一覧表示は `Table` / `DataGrid` を使用する。

## setup project

<!-- ここにvscodeでdevcontainerでコンテナで開く旨を記載する -->

```bash
npm install
```

## debug

1. ターミナルで Vite を起動する。

```bash
npm run dev
```

2. 通知にでてくる`ブラウザーで開く`を押下する。
   ブレークポイントを有効化したい場合は当該操作をスキップして後続を実施。

3. VS Code の PORTS タブで `5173` の転送先ホストポートを確認する。
4. VS Code の「実行とデバッグ」から `Vite in Chrome` を起動する。
5. 入力欄が表示されたら、転送先ホストポートを入力する。
   通常は `5173` のままでよい。

## build

```bash

```

## creat project

```bash
# https://ja.react.dev/learn

# https://ja.vite.dev/guide/
# Ignore files and continue
npm create vite@9.0.7 . -- --template react-ts

# https://reactrouter.com/home
npm install react-router

# https://mui.com/material-ui/getting-started/installation/
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/roboto
```

デバッグのために /vite.config.ts の defineConfig に以下を追記。

```ts
server: {
  host: "0.0.0.0",
},
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
