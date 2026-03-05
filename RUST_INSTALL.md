# Rust 安装到 D 盘指南

## 步骤 1：下载 Rust 安装器

访问：https://www.rust-lang.org/tools/install
下载 `rustup-init.exe`

## 步骤 2：设置环境变量（安装前）

在命令提示符中运行：
```cmd
set RUSTUP_HOME=D:\.rustup
set CARGO_HOME=D:\.cargo
```

## 步骤 3：运行安装器

```cmd
rustup-init.exe
```

选择 "1) Proceed with installation (default)"

## 步骤 4：永久设置环境变量

1. 右键"此电脑" → "属性" → "高级系统设置" → "环境变量"
2. 在"用户变量"中添加：
   - `RUSTUP_HOME` = `D:\.rustup`
   - `CARGO_HOME` = `D:\.cargo`
3. 在 `Path` 中添加：`D:\.cargo\bin`

## 步骤 5：验证安装

```cmd
rustc --version
cargo --version
```

## 安装完成后

回到项目目录运行：
```cmd
cd D:\aigent\promot
npm run tauri:dev
```
