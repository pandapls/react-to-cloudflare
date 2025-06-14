# React MVC 模板

一个基于 **React + Webpack + TypeScript** 的现代前端项目模板，支持 **Tailwind CSS**、**SWC** 构建、**ESLint + Prettier** 代码规范、**Jest** 单元测试等，适合中小型 React 项目开发。

---

## 🚀 功能特性

- 🎯 **TypeScript**：类型安全，提升开发体验
- ⚡ **SWC**：替代 Babel，构建速度更快
- 🎨 **Tailwind CSS**：实用优先的 CSS 框架，快速样式开发
- 🛠️ **Webpack**：支持开发与生产环境的高效构建
- 🧹 **ESLint + Prettier**：结合 Airbnb 规范，确保代码一致性
- ✅ **Jest**：强大的单元测试支持
- 💅 **PostCSS & CSS 模块**：灵活的样式处理
- 📦 **npm**：高效的依赖管理
- 🔍 **Bundle 分析**：内置 Webpack Bundle Analyzer，优化打包体积

---

## 📋 前置条件

确保安装以下工具：

- **Node.js**（建议 >= 18.x）
- **npm**（建议 >= 9.x）

---

## 📦 安装

1. 克隆仓库：

   ```bash
   git clone https://github.com/pandapls/react-mvc-template.git
   ```

2. 进入项目目录：

   ```bash
   cd react-mvc-template
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

---

## 🛠️ 脚本命令

在项目根目录运行以下命令：

| 命令                    | 描述                                     |
| ----------------------- | ---------------------------------------- |
| `npm run client:dev`    | 开发模式构建                             |
| `npm run client:server` | 启动开发服务器（支持热重载）             |
| `npm run client:prod`   | 生产模式构建（优化输出）                 |
| `npm run lint`          | 运行 ESLint 检查代码                     |
| `npm run lint:fix`      | 运行 ESLint 和 TypeScript 检查并自动修复 |

---

## 📂 项目结构

```plaintext
react-mvc-template/
├── src/                 # 源代码
│   ├── models/         # 数据模型
│   ├── views/          # React 组件（UI）
│   ├── controllers/    # 业务逻辑
│   └── index.tsx       # 入口文件
├── public/             # 静态资源
├── webpack.config.js   # Webpack 配置文件
├── package.json        # 项目元数据和脚本
└── README.md           # 项目文档
```

---

## 📚 依赖

### 生产依赖

- **react**, **react-dom**：React 19 核心库
- **tailwindcss**, **postcss**, **css-loader**：Tailwind CSS 样式支持
- **@tailwindcss/postcss**：Tailwind 与 PostCSS 集成

### 开发依赖

- **@swc/core**, **swc-loader**：快速 TypeScript/JavaScript 编译
- **@types/react**, **@types/react-dom**：TypeScript 类型定义
- **eslint**, **eslint-plugin-react**, **eslint-config-airbnb-typescript**：代码质量检查
- **webpack**, **webpack-cli**, **webpack-dev-server**：模块打包与开发服务器
- **jest**：单元测试框架
- **clean-webpack-plugin**, **terser-webpack-plugin**, **mini-css-extract-plugin**：Webpack 优化
- **webpack-bundle-analyzer**：打包体积分析

---

## 🤝 贡献

欢迎为项目贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/YourFeature`
3. 提交更改：`git commit -m 'Add YourFeature'`
4. 推送分支：`git push origin feature/YourFeature`
5. 提交 Pull Request

如有问题或建议，请在 [GitHub Issues](https://github.com/pandapls/react-mvc-template/issues) 提交。

---

## 📄 许可证

本项目采用 **ISC 许可证**。详情请见 [LICENSE](https://github.com/pandapls/react-mvc-template/blob/main/LICENSE) 文件。

---

🌟 **感谢使用 React MVC 模板！** 祝您开发愉快！ 😄
