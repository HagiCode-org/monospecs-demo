# monospecs-demo

Monospecs 多仓库管理示例项目。

## 什么是 Monospecss 是一个多？

Monospec仓库管理工具，帮助你在一个仓库中管理多个子仓库。通过 `monospecs.yaml` 配置文件，你可以定义所有子仓库的路径、URL 和显示名称，然后使用 Node 脚本一键克隆所有仓库。

## 项目结构

```
monospecs-demo/
├── monospecs.yaml          # 仓库配置
├── .gitignore             # 排除 repos/ 目录
├── package.json           # 项目依赖
├── README.md              # 本文件
├── scripts/
│   └── clone-repos.js     # 一键拉取所有仓库
└── repos/
    └── .gitkeep           # 克隆的仓库将放在这里
```

## 快速开始

### 1. 克隆本仓库

```bash
git clone https://github.com/HagiCode-org/monospecs-demo.git
cd monospecs-demo
```

### 2. 一键拉取所有子仓库

```bash
# 使用 npm
npm run clone

# 或直接使用 node
node scripts/clone-repos.js
```

这将根据 `monospecs.yaml` 中的配置，自动克隆以下仓库到 `repos/` 目录：
- `repos/main` - 主仓库
- `repos/monospecs-demo` - 本仓库
- `repos/docs` - 文档仓库

## 配置说明

在 `monospecs.yaml` 中配置你的仓库：

```yaml
version: "1.0"
commit_when_archive: true

repositories:
- path: "repos/my-repo"
  url: "https://github.com/username/repo.git"
  displayName: "我的仓库"
  icon: "📦"
```

字段说明：
- `path`: 仓库在本地的相对路径
- `url`: 仓库的 Git URL
- `displayName`: 显示名称
- `icon`: 图标（可选）

## 与主仓库的关联

本项目是 [hagicode-mono](https://github.com/newbe36524/hagicode-mono) 主仓库的 monospecs 配置示例。

如果你已经克隆了主仓库，可以参考本项目的结构来管理自己的多仓库项目。
