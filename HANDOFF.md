# 项目交接文档 — ToDay Website

> **用途：** 供全新 AI 会话（无上下文）快速理解项目全貌并接手工作。
> **生成时间：** 2026-07-25（最后更新：2026-07-31 14:30 CST）
> **项目版本：** 0.9.4（Collection 3D Tilt 统一 + Bespoke Banner 修色）

---

## 一、项目概览

### 项目是什么

**ToDay** — Premium Outdoor Living 品牌的企业官网。定位为长期运营的国际高端品牌站，目标是成为高端户外家具领域的数字门面。

### 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 框架 | Astro | `output: 'static'` 全静态构建，`build.format: 'file'` |
| 语言 | TypeScript | strict mode |
| 样式 | Tailwind CSS 4.x + 自定义 CSS | `@tailwindcss/vite` |
| 部署 | Cloudflare Pages | @astrojs/cloudflare adapter |
| 构建输出 | `dist4/` | Astro 配置 `outDir: 'dist4'` |
| 动画（React 组件） | React 19 + GSAP | `@astrojs/react`，`gsap` + ScrollTrigger |
| 动画（原生 JS） | `src/motion/` | 纯 rAF 引擎，无依赖 |

### 当前页面

| 页面 | 路由 | 继承 MainLayout | 说明 |
|------|------|:--:|------|
| 首页 | `/` | ✅ | Hero + Inspiration + Featured Collection + Brand Highlights + CTA |
| Collection | `/collection` | ✅ | 产品列表（统一注册表，5 个卡片 → 详情页） |
| Product Detail | `/products/[slug]` | ✅ | 动态详情页（5 个自动生成，旧版 sections 布局） |
| About Us | `/about` | ✅ | 编辑式杂志品牌页 |
| Experience | `/experience` | ❌ | 电影级全屏体验（150 帧 4K，7 章），纯黑底 Canvas |
| Contact | `/contact` | ✅ | 全屏 hero 编辑图 + 联系表 |

**已删除的页面：**
- `/product-detail.html`（旧版硬编码海岸沙发详情页）→ 已被 `[slug].astro` 完全替代

---

## 二、项目当前进度（截至 2026-07-31）

### 已完成 ✅

| 阶段 | 内容 |
|------|------|
| Sprint 1–3 | 框架基础 + 首页 + Collection 页基础结构 |
| Sprint 4 | Product Detail（Coastal Sectional Sofa）V1–V3 视觉迭代 |
| Sprint 5 | **Product Model — Repository Pattern**（见 §四） |
| Sprint 6 | About Us 全屏 editorial 布局 |
| Sprint 11 | Cinematic Experience 系统（150 帧 4K，见 §五） |
| 发布 0.8 | Product System 集成：Collection 接入注册表、动态详情页、16 个废弃文件清理 |
| 0.9.x | Contact 页、Hero 体验打磨、**Collection 5 张卡片统一 3D Tilt + Zoom** |

### Collection 卡片 3D Tilt 统一（0.9.4）

所有 5 个产品卡片使用**同一套** 3D 倾斜 + 悬停缩放效果，消除了之前按 `idx` 分 4 支的条件模板：

- `CollectionProductGrid.astro`：每个卡片统一带有 `data-tilt` + `data-tilt-layered` 属性，内部 3 层 DOM（`tilt-layer-image` / `tilt-layer-title` / `tilt-layer-cta`）包裹在 `.tilt-card-inner` 中
- `tiltCard.js`：rAF 驱动引擎；缩放由 `card.hasAttribute('data-tilt-layered')` 门控（`CONFIG.hoverScale = 1.05`），合入同一个 transform（`scale` 前置到 `rotateX/rotateY/translateZ`）
- 移动端（`innerWidth < 768`）和 `prefers-reduced-motion` 自动禁用

### Bespoke Banner 背景修色（0.9.4）

- **Collection 页**的 Bespoke 板块（`CollectionCustomBanner.astro`）背景改为 `#FFFFFF`（白色），与周围板块统一
- **Detail 页**的 BespokeBanner（`productDetail.css` → `.detail-bespoke-banner`）保持 `#FAF8F5` 奶油底（用户误指后的还原，见 §十）

---

## 三、各网页架构

### 3.1 首页 `/`（`src/pages/index.astro`）

```
MainLayout
├─ HeroSection.astro              # 全屏 hero（背景图 + SplitText 标题 + CTA）
├─ InspirationSection.astro       # Inspiration 双图编辑布局
├─ FeaturedCollection.astro       # 精选产品轮播（目前硬编码，待接入 Product System）
├─ BrandHighlights.astro          # 品牌亮点（数字 + 文案）
└─ CTASection.astro               # 底部行动召唤
```

共享样式：各组件内联 `<style is:global>`；布局由 Tailwind 控制。

### 3.2 Collection `/collection`（`src/pages/collection.astro`）

```
MainLayout
├─ CollectionEditorialHeader.astro  # 编辑式页头（面包屑 + 大标题 + 描述 + 配图）
├─ CollectionCategoryNav.astro      # 横向品类导航（图标 + 文字，mobile 隐藏图标 + 横滑）
├─ CollectionProductGrid.astro      # 产品网格（过滤侧栏 + 工具栏 + 产品卡片列表）
│   ├─ CollectionFilterSidebar.astro # 折叠式筛选侧栏（checkbox / radio）
│   ├─ Toolbar（内联于 Grid）        # 数量 + 排序下拉
│   └─ 5 × CollectionProduct-card    # 3D Tilt 卡片（data-tilt + data-tilt-layered）
├─ CollectionBrandValues.astro      # 品牌价值观
└─ CollectionCustomBanner.astro     # Bespoke 板块（白底 #FFFFFF）
```

- 数据：`getProductCards()` / `getCategories()` from `src/models/product/index.ts`
- 客户端筛选：`collection.astro` 内联脚本读取卡片的 `data-category` 属性
- 样式：`src/sections/collection.css`（共享）
- **3D Tilt 卡片 CSS**（`collection.css` L602–685）：`preserve-3d` + 各层 `translateZ`（image 400–600px / title 100px / cta 160px）；`tilt-card-inner` 用 `isolation: isolate` + `z-index: 9999` 避免图像越界被邻卡遮挡

### 3.3 Product Detail `/products/[slug]`（`src/pages/products/[slug].astro`）

```
MainLayout
├─ ProductBreadcrumb.astro
├─ ProductHeroGallery.astro         # 主图 + 缩略图 Carousel
├─ ProductInfoSidebar.astro         # 名称 / 价格 / 颜色 / 配置
├─ ProductOurStory.astro            # 品牌故事（数据驱动）
├─ ProductFeaturesRow.astro         # 特性行
├─ ProductMaterials.astro           # 材质平铺图 + 亮点
├─ ProductSpecifications.astro      # 规格表 + 尺寸图（diagramImage 参数化）
├─ ProductRelatedProducts.astro     # 关联产品卡片
├─ ProductBespokeBanner.astro       # Bespoke 板块（奶油底 #FAF8F5）
└─ CollectionBrandValues.astro      # 复用 Collection 品牌价值观
```

- 路由：`getStaticPaths()` 用 `getAllProductSlugs()` 自动生成 5 条路线
- 无效 slug → `Astro.redirect('/collection')`
- `Product` → 旧版 props 转换（gallery 排序 → `{src,alt,thumb}`；colorOptions 启发式拆 fabric/frame；dimension 缩写名映射）
- 样式：`src/sections/productDetail.css`（共享于所有 detail section）

### 3.4 About Us `/about`（`src/pages/about.astro`）

```
MainLayout
├─ Section 1 — Hero                 # 全屏 parallax 主图 + 品牌字标 + 编辑标题
├─ Section 2 — Our Story            # 品牌引言双栏
├─ Section 3 — Design Philosophy    # 设计哲学（DesignPhilosophy.astro）
├─ Section 4 — Craftsmanship        # 工艺（Craftsmanship.astro，图文双栏）
├─ Section 5 — Story Timeline       # 时间线（StoryTimeline.astro）
├─ Section 6 — Brand Manifesto      # 宣言（BrandManifesto.astro）
└─ Section 7 — CTA                  # AboutCTA.astro
```

- 样式：`src/sections/about.css`
- Hero 用 `src/components/react/AboutHeroParallax` 视差

### 3.5 Experience `/experience`（`src/pages/experience.astro`）

```
<!doctype html>                    # 不继承 MainLayout，纯黑底全屏
├─ <head>（noindex, nofollow）
└─ ExperienceCanvas.astro           # 全屏 Canvas + 输入层 + 叠加层
    └─ Engine.ts（编排）
        ├─ ChapterController.ts     # 章节调度
        ├─ AnimationPlayer.ts       # 24fps 帧动画
        ├─ ScrollTrigger.ts         # wheel + touch 输入
        ├─ FrameLoader.ts           # 150 帧预加载
        ├─ CanvasRenderer.ts        # DPR 适配全屏绘制
        ├─ OverlayManager.ts        # rAF 品牌叠加层 tween
        └─ EventBus.ts              # 事件总线
```

详见 §五。

### 3.6 Contact `/contact`（`src/pages/contact.astro`）

```
MainLayout
├─ Section 1 — Hero                 # 全屏编辑图（渐隐遮罩）+ SplitText "Let's Start the Conversation"
└─ Section 2 — Contact Form          # 联系表单（双栏：表单 + 联系信息）
```

- Hero 80dvh 高全屏图 + `bg-gradient-to-t` 黑色遮罩保证文字可读性
- 标题使用 `src/components/react/SplitText`（字级入场动画）

### 3.7 共享层

| 层 | 路径 | 内容 |
|----|------|------|
| MainLayout | `src/layouts/MainLayout.astro` | 所有页面（除 Experience）共享的壳 |
| Header | `src/components/layout/Header.astro` | Logo + 导航链接 |
| Navigation | `src/components/layout/Navigation.astro` | 导航菜单数据 + 结构 |
| Footer | `src/components/layout/Footer.astro` | 页脚 |
| MobileMenu | `src/components/layout/MobileMenu.astro` | 移动端菜单（**open={false} 硬编码，待修**） |
| BaseHead | `src/components/layout/BaseHead.astro` | 通用 `<head>` |
| Button | `src/components/common/Button.astro` | 通用按钮（filled / outline / size） |
| SplitText | `src/components/react/SplitText` | 字级拆分入场动画（React + GSAP） |
| Global 样式 | `src/styles/global.css` | Tailwind 入口 + 设计 Token |

---

## 四、产品系统（Product Model — Repository Pattern）

### 核心架构

```
src/models/product/
  index.ts            ← 唯一入口（页面层只 import 这里）
    │
    ├── types.ts      ← Product / ProductCard / ProductHeroImage / ...
    ├── schema.ts     ← 校验规则（占位，预留 zod/io-ts）
    ├── constants.ts  ← CATEGORY_LABELS
    │
    ├── data/         ← 产品数据（内部，页面不直接访问）
    │   ├── index.ts  ← 注册中心（productRegistry + getProduct(slug)）
    │   ├── coastal-sectional-sofa.ts
    │   ├── riviera-dining-table.ts
    │   ├── cypress-coffee-table.ts
    │   ├── nordic-lounge-chair.ts
    │   └── granite-fire-pit-table.ts
    │
    └── helpers/      ← Repository 层
        ├── getProduct.ts         ← getProduct(slug), getAllProductSlugs()
        ├── getProducts.ts        ← getProducts(), getProductsAsCards(), getCategories()
        └── getRelatedProducts.ts ← getRelatedProducts(slug, refs)

页面层调用（示例）：
  import { getProduct, getProductsAsCards, getCategories,
            getRelatedProducts, getAllProductSlugs }
    from '../models/product';

Collection 页：
  ← getProductsAsCards() → CollectionProductGrid → /products/{slug}

产品详情页 [slug].astro：
  ← getProduct(slug) → 映射为旧版 section props → 渲染
  ← getRelatedProducts(slug, refs) → related product cards
```

**好处：** 将来把数据源从本地文件换成 CMS / Shopify Headless，只需改 `helpers/` 和 `data/`，页面层代码完全不用动。

### 数据结构

每个产品遵循 `src/models/product/types.ts` 的 `Product` 接口：

```typescript
interface Product {
  slug: string;
  category: string;
  categoryName: string;
  name: string;
  shortDescription: string;
  price: number;
  priceFrom?: boolean;
  currency?: string;
  status: 'active' | 'coming-soon' | 'discontinued';
  gallery: GalleryImage[];
  colorOptions: ColorOption[];
  configurations: ProductConfiguration[];
  story: ProductStory;
  features: ProductFeature[];
  materialHighlights: MaterialHighlight[];
  materialFlatlay?: string;
  specifications: ProductSpecification[];
  dimensions: ProductDimensions;
  dimensionDrawing?: string;
  relatedProducts: RelatedProductRef[];
  seo: ProductSEO;
}
```

### 新增产品流程

1. 在 `src/models/product/data/` 创建 `new-product.ts`，遵循 `Product` 接口
2. 在 `src/models/product/data/index.ts` 的 `productRegistry` 中注册
3. 运行 `npm run build`，Collection 卡片 + Detail 页面自动出现
4. 只需 10–20 分钟数据录入

### 关联产品解析

`relatedProducts` 使用 slug 引用，`getRelatedProducts()` 自动解析并警告缺失项：
```typescript
relatedProducts: [
  { slug: 'coastal-sectional-sofa' },
  { slug: 'cypress-coffee-table' },
]
```

---

## 五、Cinematic Experience 系统

### 概述

全屏电影级体验页，150 帧 4K WebP 逐章播放，由滚动/滑动驱动。

### 架构

```
ScrollTrigger ──→ ChapterController ──→ AnimationPlayer
(next/prev)            │                    │
                       └─ EventBus ──→ OverlayManager
                       │
                       FrameLoader ──→ CanvasRenderer
```

### 核心模块

| 文件 | 职责 |
|------|------|
| `Engine.ts` | 编排者：组装模块、驱动 RAF 渲染、事件总线代理、Overlay 挂载 |
| `ChapterController.ts` | 章节调度：`playNext()` / `playPrevious()` / landing 判定 |
| `AnimationPlayer.ts` | 帧动画：`playForward()` / `playBackward()`，24fps |
| `ScrollTrigger.ts` | 输入层：wheel（deltaY）+ touch，播放期间 lock |
| `FrameLoader.ts` | 帧预加载：全部 150 帧 WebP |
| `CanvasRenderer.ts` | Canvas 2D 绘制：DPR 适配，全屏 4K |
| `EventBus.ts` | 事件总线：`chapter:enter/leave`, `animation:start/end`, `frame:change` |
| `OverlayManager.ts` | 品牌叠加层：rAF tween（opacity/blur/scale/translateY） |
| `config.ts` | `totalFrames=150, fps=24, frameUrlPattern` |
| `chapters.ts` | 7 章定义 |
| `brandOverlayConfig.ts` | 逐章叠加层配置 |
| `experience-overlay.css` | Cinema 风格 CSS |

### 章节结构（7 章，150 帧）

| 章节 | ID | 类型 | 帧范围 | 帧数 |
|------|----|------|--------|------|
| Morning | `morning` | static | 1–15 | 15 |
| Morning→Noon | `morning-to-noon` | transition | 16–50 | 35 |
| Noon | `noon` | static | 51–65 | 15 |
| Noon→Sunset | `noon-to-sunset` | transition | 66–100 | 35 |
| Sunset | `sunset` | static | 101–115 | 15 |
| Sunset→Night | `sunset-to-night` | transition | 116–145 | 30 |
| Night | `night` | static | 146–150 | 5 |

### 品牌叠加层

| 章节 | 阶段 | 内容 |
|------|------|------|
| Morning | environment | 无叠加，纯沉浸 |
| Noon | emotion | "Every space has its own rhythm." |
| Sunset | emotion | "Where time stands still." |
| Night | brand | 1s 停顿 → Logo → Tagline → CTA "Enter ToDay" |

### 动画时序

base 800ms, stagger 350ms, logo 1400ms, tagline 800ms, cta 700ms, brandPause 1000ms, text 900ms。全部 rAF tween，easeOut/easeIn。

### 4K 增强

- `scripts/enhance-frames.cjs`：sharp.js，720p → 4K（3840×2160），Lanczos3 3×，unsharp mask
- 用法：`node scripts/enhance-frames.cjs --apply`
- 输入：`public/experience/frames/`（1280×720）
- 输出：`public/experience/frames-4k/`（3840×2160，329–716 KB/张）

---

## 六、动画效果分类

项目动画分两大体系：**React + GSAP 体系** 和 **原生 rAF 体系**。

### A. React + GSAP 体系（`src/components/react/`）

| 组件 | 位置 | 效果 | 机制 |
|------|------|------|------|
| `SplitText` | Hero、Contact | 字级（或词级）拆分入场，逐字上升淡入 | GSAP splitText-like + stagger |
| `ScrollReveal` | 各 section 通用 | 元素随滚动进入视口时淡入 + 上移 | GSAP ScrollTrigger |
| `AboutHeroParallax` | About Hero | 主图随滚动视差移动 | GSAP ScrollTrigger scrub |

### B. 原生 rAF 体系（`src/motion/`）

| 文件 | 位置 | 效果 | 机制 |
|------|------|------|------|
| `tiltCard.js` | Collection 5 张卡片 | 3D 倾斜 + 悬停缩放（见 §C） | rAF 阻尼循环，无依赖 |

### C. TiltCard 3D Tilt（重点，`src/motion/tiltCard.js`）

```
用户移入卡片
   ├─ onEnter: targetLift = 8px; targetScale = 1.05（仅 data-tilt-layered）
   ├─ onMove:  按指针偏移设 targetRX / targetRY（max ±7° X / ±12° Y）
   ├─ RAF loop: damping=0.28 平滑跟随
   └─ onLeave: 归零，620ms CSS transition 收尾
```

- **transform 合成**（单 frame 一个 style.transform）：`scale(N) rotateX(Ndeg) rotateY(Ndeg) translateZ(Npx)`
- **CSS 深度分离**：`tilt-card-inner { transform-style: preserve-3d }` + 各层 `translateZ`（见 3.2）
- **门控**：`prefers-reduced-motion` 或 `innerWidth < 768` 时完全禁用（`initTiltCards` 直接 return）
- **防重入**：`card.__tiltWired` 标记，避免多次调用
- **Astro 集成方式**：裸 `<script>`（无 client:load / type="module"），由 Astro 打包

### D. CSS 纯过渡（无 JS）

| 位置 | 效果 |
|------|------|
| 普通产品卡片 hover | `translateY(-4px)` + 图像 `scale(1.03)` |
| 品类导航 | `scaleX` 下划线展开 + 颜色切换 |
| 缩略图 Carousel | 淡入切换 |
| `detail-bespoke-banner` hover 图 | `scale(1.02)` |
| 各 section 入场 | `ScrollReveal`（GSAP，见 §A） |

---

## 七、使用过的 Skill 与工具

| 工具 / Skill | 用途 |
|--------------|------|
| **Stitch MCP**（Google） | UI 原型生成：`create_project` / `generate_screen_from_text` / `edit_screens` / `apply_design_system` / `get_screen` |
| **SenseNova MCP** | 设计参考图生成：`generate_infographic`（灵感图片、参考构图） |
| **Design Sync**（claude.ai/design） | 设计系统组件管理（preview cards / `@dsCard`） |
| **Browser Preview**（`preview_*`） | 开发服务器预览、DOM 检查、响应式测试（截图在部分环境不可用，改用 `preview_eval` DOM 验证） |
| **WebSearch / WebFetch** | 设计调研、竞品参考、Stitch 文档查询 |
| **Sharp.js** | 4K 帧增强（Lanczos3 重采样） |
| **本地 CLI** | `npm run dev` / `npm run build` / `npm run typecheck` |

### Stitch 工具已知限制（已验证）

| 限制 | 对策 |
|------|------|
| `create_design_system` 始终报错 | 改为在 `generate_screen_from_text` prompt 中描述风格 |
| `generate_screen_from_text` 超长 prompt 超时 | 分两步：先骨架，再细节 |
| `deviceType` 默认 MOBILE | 必须显式指定 `"DESKTOP"` |
| `download_assets` 返回空 | 改用 Google CDN URL（支持 `=w2400`） |

---

## 八、设计系统

### 颜色

| 用途 | 色值 | CSS 变量 |
|------|------|----------|
| 页面背景 | `#FAF8F5` | `--color-background` |
| 品牌主色 | `#C67A52` | `--color-brand` |
| 品牌悬停 | `#B36842` | `--color-brand-hover` |
| 品牌柔和 | `#F0E2D8` | `--color-brand-soft` |
| 标题文字 | `#222222` | `--color-text-heading` |
| 正文文字 | `#5E5E5E` | `--color-text-body` |
| 弱化文字 | `#8A847E` | `--color-text-muted` |
| 边框 | `#EAE5DF` | `--color-border` |
| Surface | `#FFFFFF` | `--color-surface` |

### 字体

| 用途 | 字体 |
|------|------|
| 标题/展示 | "Cormorant Garamond", Georgia, serif |
| 正文 | "Inter", -apple-system, sans-serif |

### CSS 规范

- 所有过渡统一 `250ms ease`（TiltCard 用 `220ms` move / `620ms` rest）
- Section Padding 统一 `96px 0`
- 产品图片：`border-radius: 12px`（卡片圆角）
- 缩略图 Carousel：Desktop 4 张 / Tablet 3 张 / Mobile 2 张
- 构建输出目录：`dist4/`（注意不是默认的 `dist/`）

---

## 九、项目结构

```
Today-Website/
├── public/
│   ├── images/
│   │   ├── coastal-library/    # 海岸沙发资产库（18 张）
│   │   ├── hero/               # Hero 背景图
│   │   ├── inspiration/        # Inspiration 图片
│   │   └── about/              # About Us 图片（about-hero.png）
│   ├── experience/
│   │   ├── frames/             # 原始帧 1280×720, 150 帧, .webp
│   │   └── frames-4k/          # 4K 帧 3840×2160, 150 帧, .webp
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── common/             # Button, Container, Logo
│   │   ├── layout/             # Header, Footer, Navigation, MobileMenu, BaseHead
│   │   ├── react/              # SplitText, ScrollReveal, AboutHeroParallax
│   │   └── experience/         # ExperienceCanvas.astro
│   ├── data/
│   │   ├── brandValues.ts
│   │   ├── categoryIcons.ts
│   │   ├── siteConfig.ts
│   │   └── experience/         # chapters.ts, brandOverlayConfig.ts
│   ├── models/
│   │   └── product/            # Product Model（Repository Pattern，见 §四）
│   ├── motion/
│   │   └── tiltCard.js         # 3D Tilt 引擎（见 §六.C）
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── index.astro         # 首页
│   │   ├── about.astro         # About Us
│   │   ├── collection.astro    # Collection
│   │   ├── contact.astro       # Contact
│   │   ├── experience.astro    # 体验页（全屏）
│   │   └── products/[slug].astro # 动态详情页
│   ├── sections/
│   │   ├── HeroSection.astro / InspirationSection.astro / FeaturedCollection.astro
│   │   ├── BrandHighlights.astro / BrandStory.astro / CTASection.astro
│   │   ├── Collection*.astro   # Collection 页 6 个区块
│   │   ├── Product*.astro      # 详情页 9 个区块
│   │   ├── DesignPhilosophy.astro / Craftsmanship.astro / StoryTimeline.astro
│   │   ├── BrandManifesto.astro / AboutCTA.astro / AboutHeroParallax.astro
│   │   ├── about.css
│   │   ├── collection.css
│   │   └── productDetail.css
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   └── index.ts            # SiteConfig / NavLink（无导入方，待清理）
│   └── scripts/experience/     # 体验引擎（11 文件）
├── scripts/
│   └── enhance-frames.cjs
├── HANDOFF.md
├── CLAUDE.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 十、遇到过的问题与解决

### 构建类

| 问题 | 根因 | 解决 |
|------|------|------|
| **EPERM 构建冲突** — `npm run build` 报文件被占用 | Preview 服务器持有 `dist4/client` 打开 | **构建前先停 Preview**（`preview_stop` 或关闭 dev server） |
| **Experience 黑屏** | `Engine._frameIndex` 初始 -1，`ChapterController` 未回调 `onFrame` | 在 `Engine.initialize()` 中设置初始帧 |
| **Experience 反向播放方向错** | `AnimationPlayer.play()` 忽略 direction | 反向用 `_frameB - offset` |
| **ESM 加载 sharp 失败** | Astro 模块系统中 `require('sharp')` 不兼容 | 脚本改用 `.cjs` 后缀 |

### TiltCard 类

| 问题 | 根因 | 解决 |
|------|------|------|
| **Tilt 在 Collection 网格中不可见** | 卡片网格 230×304 太小，原 maxX/maxY 过小 | 提升至 maxX=7 / maxY=12 |
| **悬停时倾斜 + 缩放冲突** | 两个 transform 互相覆盖 | 合入**同一个** `style.transform`（scale 前置），单 frame 更新 |
| **`data-tilt-layered` 未生效** | 缩放门控依赖该属性，DOM 缺失 | 确保卡片同时带 `data-tilt` + `data-tilt-layered` |
| **旧版 4 支条件模板（idx 分支）难维护** | 按 idx 分 Coastal/Riviera/Cypress/其他四支，重复代码 | **统一单分支**：所有卡片同一套 `data-tilt` + `data-tilt-layered` + 3 层 DOM |
| **`data-tilt-deeper` 属性已弃用** | Cypress 曾用 deeper 变体（translateZ 600px） | 已移除，统一使用 `data-tilt-layered`（CSS 中 `data-tilt-deeper` 规则保留但无卡片使用） |

### Bespoke Banner 误操作

| 问题 | 根因 | 解决 |
|------|------|------|
| **改错 Bespoke banner** | 用户要求去掉 Bespoke 板块背景，我误改了 **Detail 页**的 `detail-bespoke-banner` | 用户说"还原修改"后澄清是 **Collection 页**；还原 Detail（`#FAF8F5`），把白色（`#FFFFFF`）改到 `CollectionCustomBanner.astro` |
| **教训** | Collection 页与 Detail 页各有一个 BespokeBanner，名相似但位置不同 | 涉及 "Bespoke" 改动时，先确认是哪个页面 |

### 浏览器验证类

| 问题 | 根因 | 解决 |
|------|------|------|
| **Preview 截图超时/失败** | Browser 面板未显示 / 未完成合成 | 改用 `preview_eval` 读 DOM 做结构验证，不依赖截图 |
| **Console 日志无法读取** | Preview 环境限制 | 通过代码审查 + `npm run build` 通过性验证 |

### Experience 系统（见 §五）

| 问题 | 根因 | 解决 |
|------|------|------|
| **4K 帧过大** | 原始 720p 帧画质不足 | `enhance-frames.cjs` 锐化放大，单张 329–716 KB |

---

## 十一、未完成的工作 & 待办事项

### 高优先级

1. **产品图片** — 仅海岸沙发有完整资产库。其余 4 个产品用 Unsplash 占位图，需替换为最终摄影。
2. **MobileMenu JS 交互** — 当前 `open={false}` 硬编码，需真实 toggle 状态管理。
3. **首页 Featured Collection 数据源** — 目前硬编码，应改为从 Product System 读取。

### 中优先级

4. **SEO 增强** — JSON-LD 结构化数据（Product, BreadcrumbList, Organization）。
5. **404 页面** — 创建 `src/pages/404.astro`。
6. **`linen-outdoor-rug` orphan** — 三个产品引用该 slug，创建数据文件后自动连接。

### 低优先级

7. **i18n 支持** — 多语言路由。
8. **CMS 集成** — 后续接入 CMS 管理产品数据。
9. **E-commerce** — 购物车、结账。
10. **`types/index.ts` 清理** — 无导入方，待评估是否删除。
11. **既有 TS 警告（46 个）** — 旧版遗留（ProductHeroGallery 空值、未使用 prop 等），待评估运行时影响。
12. **Collection 筛选仅客户端** — URL 参数生效，无服务端过滤。
13. **颜色/价格筛选项计数为 0** — 占位符。

---

## 十二、已知问题 & 注意事项

### 构建注意事项

```bash
npm run dev          # 开发服务器
npm run build        # 生产构建（输出到 dist4/）
npm run typecheck    # 类型检查
```

- Cloudflare dev 模式本地可能不兼容：`npx serve dist4/client -p 4321`
- **构建输出在 `dist4/`**（注意不是 `dist/`），由 `astro.config.mjs` 的 `outDir: 'dist4'` 决定
- 构建前确保 Preview / dev server 已停，否则 EPERM

### 产品系统注意事项

- **统一入口：`src/models/product/index.ts`** — 所有页面层只 import 这个文件
- **新增产品**只需注册表操作，无需改动路由
- 旧版 `src/sections/Product*.astro` 是活跃组件（详情页布局），**不要删除**
- `ProductSpecifications.diagramImage` 支持各产品独立尺寸图
- **`types/product.ts` 和 `types/productDetail.ts` 已删除** — 类型统一到 `models/product/types.ts`
- `types/index.ts` 无导入方，待评估

### Experience 页注意事项

- **`/experience` 独立全屏页**，不继承 `MainLayout`，纯黑底全屏 Canvas
- 滚动在过渡章节播放期间被 lock
- 4K 帧约 50+ MB，引擎初始化时预加载全部 150 帧
- `<meta name="robots" content="noindex, nofollow" />`

### TiltCard 注意事项

- 卡片必须包含直接子元素 `.tilt-card-inner`，否则 `initTiltCards` 抛异常
- 移动端与 reduced-motion 用户自动禁用
- `initTiltCards(selector)` 的默认 selector 是 `.card-item[data-tilt]`，Collection 页需传入 `.collection-product-card[data-tilt]`
- CSS 中 `data-tilt-deeper` 规则已无使用卡片，可择机清理

### 设计 Token 注意事项

- Collection 页背景为 `#FFFFFF`（白）；其他页面默认 `#FAF8F5`（奶油）
- Collection BespokeBanner 为 `#FFFFFF`；Detail BespokeBanner 为 `#FAF8F5`

---

## 十三、文件速查

| 功能 | 路径 |
|------|------|
| 首页入口 | `src/pages/index.astro` |
| About Us | `src/pages/about.astro` |
| About Us 样式 | `src/sections/about.css` |
| Collection 页 | `src/pages/collection.astro` |
| Collection 样式 | `src/sections/collection.css` |
| Collection 产品网格 | `src/sections/CollectionProductGrid.astro` |
| Collection Bespoke Banner | `src/sections\CollectionCustomBanner.astro` |
| 动态产品详情 | `src/pages/products/[slug].astro` |
| 详情页共享样式 | `src/sections/productDetail.css` |
| Detail Bespoke Banner | `src/sections/ProductBespokeBanner.astro` |
| Contact 页 | `src/pages/contact.astro` |
| 体验页入口 | `src/pages/experience.astro` |
| Experience 引擎 | `src/scripts/experience/Engine.ts` |
| 4K 增强脚本 | `scripts/enhance-frames.cjs` |
| TiltCard 引擎 | `src/motion/tiltCard.js` |
| Product Model 入口 | `src/models/product/index.ts` |
| Product Model 类型 | `src/models/product/types.ts` |
| Product Model 注册中心 | `src/models/product/data/index.ts` |
| 全局布局 | `src/layouts/MainLayout.astro` |
| Header | `src/components/layout/Header.astro` |
| Footer | `src/components/layout/Footer.astro` |
| MobileMenu | `src/components/layout/MobileMenu.astro` |
| SplitText 组件 | `src/components/react/SplitText` |
| 全局样式 | `src/styles/global.css` |
| Astro 配置 | `astro.config.mjs` |
