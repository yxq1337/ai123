# Cloudflare Pages 详细部署指南

## 📋 准备工作

✅ 代码已推送到 GitHub: https://github.com/yxq1337/ai123  
✅ 已有 Cloudflare 账户
✅ 项目已配置为静态导出模式（最新代码已包含此配置）

---

## 🔧 重要更新（已配置好）

项目已更新为**静态导出模式**，这样可以完美部署到Cloudflare Pages！

主要变更：
- ✅ `next.config.js` 已配置 `output: 'export'`
- ✅ 构建后的文件输出到 `out/` 目录

---

## 🚀 第一步：回到Cloudflare Pages项目

1. 访问：https://dash.cloudflare.com/
2. 进入你的项目：`ai123`（或者你起的项目名）
3. 点击右上角的 **Create new deployment** 或者重新配置现有的部署

---

## ⚙️ 第二步：重新配置构建设置

### 重要：更新构建设置！

在项目设置中找到 **Build settings**，然后：

1. **Framework preset**: 选择 **None**（不是Next.js！因为我们用静态导出）

2. **Build command**: `npm run build`

3. **Build output directory**: `out` （**重要！不是 .next 了！**）

4. **Root directory**: `/`

---

## 🎬 第三步：也可以直接创建新项目（推荐）

如果想重新开始，更清晰：

1. 在Cloudflare Pages点击 **Create application** → **Pages** → **Connect to Git**
2. 选择仓库 `yxq1337/ai123`
3. 配置：
   - **Project name**: `ai-tool-review` (你喜欢的名字)
   - **Production branch**: `main`
   - **Framework preset**: **None** (重要！)
   - **Build command**: `npm run build`
   - **Build output directory**: `out` (重要！)
4. 点击 **Save and Deploy**

---

## 📝 第四步：提交最新代码（重要！）

我已经修改了配置，现在需要提交这些更改：

我现在帮你做这个，或者你可以手动执行：

```bash
cd e:\网站赚钱
git add .
git commit -m "Configure static export for Cloudflare Pages"
git push
```

---

## 🔍 如果部署失败怎么办？

让我帮你提交最新代码，然后你重新部署！

---

## 总结关键配置

| 设置 | 值 |
|------|-----|
| Framework preset | **None** (不是Next.js！) |
| Build command | `npm run build` |
| Build output directory | **out** |

这是最关键的更改！因为用了静态导出，所以输出目录从 `.next` 变成了 `out`，框架预设也要选None。
