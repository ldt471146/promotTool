# AI 提示词优化器 v0.1

提示词优化桌面/网页应用。当前实现为原生 JavaScript + Vite 前端，并同时保留 Electron 与 Tauri 壳层。

## 当前实现状态（2026-03-05）

- 前端入口：`index.html` -> `src/app-new.js`
- 状态与数据：`src/data.js`
- 网页开发端口：`http://localhost:5173`
- Electron 开发加载地址：`http://localhost:5173`
- Tauri 开发加载地址：`http://localhost:5173`

## 快速启动

```bash
npm install
```

### 1) Web 开发

```bash
npm run dev
```

访问 `http://localhost:5173`

### 2) Electron 开发

先启动 Vite：

```bash
npm run dev
```

再开一个终端启动 Electron：

```bash
npm run electron:dev
```

### 3) Tauri 开发

```bash
npm run tauri:dev
```

## 打包

```bash
# Web
npm run build

# Electron
npm run electron:build

# Tauri
npm run tauri:build
```

## 功能概览

1. 提示词优化（快速/深度模式）
2. 模板库（内置 + 自定义导入）
3. 历史记录（保存、导入、导出）
4. 收藏夹（备注、复用、导出）
5. 多模型 API 配置（OpenAI/Claude/Gemini 兼容接口）

## 技术栈

- 原生 JavaScript（无框架）
- Vite 5
- Tailwind CDN
- Electron 40
- Tauri（当前 `src-tauri` 为 1.x 配置）

## 文档说明

- `实施方案.md`：中长期规划文档（含 Vue/TS/SQLite 方向），不等同于当前代码实现。
- 当前代码结构与运行方式以本 README 为准。
