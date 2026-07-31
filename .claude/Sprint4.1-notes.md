## Sprint 4.1 — 问题记录

### 问题 1：板块标题字体不生效

**现象**：CSS 和 HTML 中正确写了 Tailwind 类 `lg:text-[4rem]`，浏览器计算字体大小仍然是 30-44px。

**根因**：`src/styles/global.css` 中的全局规则 `h2 { font-size: clamp(2rem, 3.5vw, 3.25rem) }` 覆盖了所有 Tailwind 字号类。这个选择器特异性更高（element selector vs class），所以 Tailwind 类被完全忽略。

**修复**：
```css
/* 移除前 */
h1 { font-size: clamp(2.75rem, 5vw, 4.5rem); ... }
h2 { font-size: clamp(2rem, 3.5vw, 3.25rem); ... }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); ... }

/* 移除后 — 只保留 line-height 和 letter-spacing */
h1 { line-height: 1.05; letter-spacing: -0.015em; }
h2 { line-height: 1.1; }
h3 { line-height: 1.25; }
```
字号完全交给各 section 的 Tailwind 类控制。

**结果**：所有 section H2 标题现在正确显示为 64px（4rem），CTA 为 56px（3.5rem）。

---

### 问题 2：刷新出现黑屏 + 所有动画和 hero 按钮丢失

**现象**：刷新页面后，hero 区域显示为纯黑背景（`bg-gray-900`），大标题可见但 hero 按钮消失，所有 SplitText 字体动效全部丢失。

**根因**：项目位于 Windows 路径 `D:\工作文件\Project\My personal website`（含中文字符）。Vite 无法正确解析含中文的项目路径，导致所有 Astro island 的 JS 模块动态加载失败：
```
TypeError: Failed to fetch dynamically imported module:
http://localhost:4321/@id/D:/%E5%B7%A5%E4%BD%9C%E6%96%87%E4%BB%B6/Project/My%20personal%20website/src/components/react/HeroAnimatedContent.tsx
```
每个 React island（`client:load` / `client:visible`）都会报错，所以 hero 按钮（React component）和所有 SplitText 动效全部消失，只剩 SSR 的 HTML 骨架。

**修复**：将整个项目复制到纯 ASCII 路径 `D:\Projects\Today-Website`，然后从新路径启动开发服务器。

**操作步骤**：
```bash
# 1. 复制项目到新路径
cp -r "D:\工作文件\Project\My personal website" "D:\Projects\Today-Website"

# 2. 从新路径启动
cd "D:\Projects\Today-Website"
npm run dev

# 3. 确认无 hydration 错误（console error 为空）
```

**验证**：刷新页面，hero 按钮显示，hero 标题 SplitText 动画正常（字符 div 已创建），所有 22 个 Astro island 全部水合成功。

---

### 问题 3：旧路径空目录无法删除（cwd 锁定）

**现象**：删除旧路径项目后，shell 的工作目录被锁定在空目录上，`rm -rf` 报 "Device or resource busy"。

**原因**：终端会话的 working directory 在 session 初始化时绑定到了旧路径。虽然项目文件已清空，但操作系统不允许删除当前所在目录。

**影响**：`preview_start` 工具使用会话 cwd 查找 `package.json`，所以总是报错 ENOENT。

**解决方案**：重启终端会话，让工作目录自动设置为 `D:\Projects\Today-Website`。

---

## 当前项目状态

- **项目路径**：`D:\Projects\Today-Website`
- **开发服务器**：`npm run dev` 端口 4321
- **Hero 标题**：64px，SplitText 动画正常
- **板块标题**：全部 64px（4rem），CTA 56px（3.5rem）
- **body 字体**：17px，行高 1.8
- **Image 圆角**：统一 16px
- **Footer**：暖米色 #F5F2ED
- **无 hydration 错误**
