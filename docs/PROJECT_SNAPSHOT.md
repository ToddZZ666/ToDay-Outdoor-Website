# 项目结构快照 — Project Snapshot

> 快照时间：2026-07-29 12:07 CST
> 项目：my-personal-website v0.1.0
> 运行时：Astro 7 → 静态输出 → Cloudflare Pages

---

## 一、概览

| 指标 | 数值 |
|---|---|
| 源文件 (src/) | **94 个**（不含图片） |
| 代码总行数 | **10,258 行** |
| 静态资源 (public/) | **336 个** |
| 文档 (docs/) | **11 份** |
| 运行中依赖 | **9** |
| 开发依赖 | **10** |
| 构建输出 | **10 页**（static → Cloudflare Pages） |
| TypeScript 既有警告 | **38 个**（全部位于 `ProductHeroGallery.astro` 内联脚本，构建不受影响） |

---

## 二、目录结构

```
D:\Projects\Today-Website/
│
├── 📄 根配置
│   ├── astro.config.mjs
│   ├── tsconfig.json
│   ├── eslint.config.js
│   ├── .prettierrc / .prettierignore
│   ├── .editorconfig / .gitignore
│   ├── package.json
│   └── reasonix.toml
│
├── 📄 根文档
│   ├── README.md
│   ├── CHANGELOG.md
│   ├── CLAUDE.md            ← Agent 工作规则
│   └── HANDOFF.md           ← 项目交接记录
│
├── 📁 docs/ (11 份)
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── DEVELOPMENT_WORKFLOW.md
│   ├── DEPLOYMENT.md
│   ├── CODING_STANDARDS.md
│   ├── CHANGELOG_GUIDELINES.md
│   ├── ROADMAP.md
│   ├── BRAND_GUIDELINES.md
│   ├── CONTENT_STRATEGY.md
│   └── SEO_GUIDE.md
│
├── 📁 scripts/
│   └── enhance-frames.cjs    ← 帧图处理脚本
│
├── 📁 public/ (336 资源)
│   ├── favicon.ico / favicon.svg / logo.svg
│   ├── images/
│   │   ├── hero/              ← 首页 Hero 图（含 AI 生成）
│   │   ├── about/             ← 关于页素材
│   │   ├── coastal-library/   ← 海岸图书馆场景（18 张）
│   │   └── coastal-sofa/      ← 沙发产品图（7 张）
│   └── experience/
│       ├── frames/            ← 150 帧 webp
│       └── frames-4k/         ← 150 帧 webp（4K）
│
└── 📁 src/ (94 文件 / 10,258 行)
│
│   📁 assets/ (9)                ← Astro 图像处理素材
│   │   ├── coastal-sofa/ (8)
│   │   └── premium-materials/ (1)
│
│   📁 components/ (18)            ← 可复用组件
│   │   ├── common/ (2)
│   │   │   ├── Button.astro
│   │   │   └── Logo.astro
│   │   ├── layout/ (5)
│   │   │   ├── BaseHead.astro
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── MobileMenu.astro
│   │   ├── experience/ (1)
│   │   │   └── ExperienceCanvas.astro
│   │   └── react/ (7)            ← Framer Motion / GSAP
│   │       ├── Stack.tsx / Stack.css
│   │       ├── ScrollFloat.tsx / ScrollFloat.css
│   │       ├── SplitText.tsx
│   │       ├── StoryStack.tsx
│   │       ├── AnimatedContent.tsx
│   │       ├── HeroAnimatedContent.tsx
│   │       └── ExperienceRunner.tsx
│
│   📁 data/ (5)                   ← 静态配置数据
│   │   ├── siteConfig.ts
│   │   ├── brandValues.ts
│   │   ├── categoryIcons.ts
│   │   └── experience/
│   │       ├── chapters.ts
│   │       └── brandOverlayConfig.ts
│
│   📁 layouts/ (1)
│   │   └── MainLayout.astro
│
│   📁 models/product/ (13)        ← 产品模型（单一数据源）⭐
│   │   ├── types.ts               ← Product / ColorOption 等类型定义
│   │   ├── constants.ts           ← CATEGORY_LABELS / 常量
│   │   ├── schema.ts              ← Zod 校验模式
│   │   ├── index.ts               ← 模型入口
│   │   ├── data/ (6)              ← 5 款产品 + index
│   │   └── helpers/ (3)           ← getProduct / getProducts / getRelatedProducts
│
│   📁 pages/ (6)                  ← 路由页面
│   │   ├── index.astro            ← 首页
│   │   ├── about.astro
│   │   ├── collection.astro       ← 产品集合
│   │   ├── contact.astro
│   │   ├── experience.astro       ← 沉浸式体验
│   │   └── products/[slug].astro  ← 动态产品详情页
│
│   📁 scripts/experience/ (14)    ← 体验页游戏引擎
│   │   ├── Engine / AnimationPlayer / ChapterController
│   │   ├── CanvasRenderer / FrameLoader / ScrollTrigger
│   │   ├── EventBus / ExitManager / OverlayManager
│   │   ├── DebugOverlay
│   │   ├── config / entry / index
│   │   └── experience-exit.css / experience-overlay.css
│
│   📁 sections/ (30)              ← 页面区块（最大目录）
│   │   ├── 首页: HeroSection / FeaturedCollection / Craftsmanship
│   │   │     CTASection / DesignPhilosophy / InspirationSection / StoryTimeline
│   │   ├── About: AboutHeroParallax / BrandStory / BrandManifesto
│   │   │     BrandHighlights / AboutCTA
│   │   ├── Collection: CollectionEditorialHeader / CollectionProductGrid
│   │   │     CollectionCategoryNav / CollectionFilterSidebar
│   │   │     CollectionCustomBanner / CollectionBrandValues
│   │   ├── Product: ProductHeroGallery / ProductInfoSidebar
│   │   │     ProductBespokeBanner / ProductBreadcrumb
│   │   │     ProductFeaturesRow / ProductSpecifications
│   │   │     ProductMaterials / ProductOurStory / ProductRelatedProducts
│   │   └── CSS: about.css / collection.css / productDetail.css
│
│   📁 styles/
│   │   └── global.css
│
│   📁 types/ (2)
│   │   ├── index.ts
│   │   └── experience.ts
│
│   📁 utils/
│   │   └── index.ts
│
│   └── global.d.ts                ← Engine 全局类型声明
```

---

## 三、关键架构要点

| 区域 | 当前状态 |
|---|---|
| **产品数据源** | `src/models/product/data/` — 5 款产品，单一权威来源 |
| **产品模型** | `types.ts` + `schema.ts`（Zod）+ `constants.ts` — 类型 / 校验 / 常量分离 |
| **动态路由** | `products/[slug].astro` — 通过 slug 解析到具体产品数据 |
| **体验引擎** | 14 模块独立游戏引擎（Engine → FrameLoader → CanvasRenderer） |
| **React 层** | 仅用于动画（Framer Motion / GSAP），与 Astro 页面解耦 |
| **依赖规模** | 19 个依赖，轻量（Astro 7 + Tailwind 4 + GSAP + Framer Motion） |

---

## 四、近期审计变更（2026-07-29）

本轮架构审计（Release 0.8.5）已完成的修复：

| # | 修复 | 文件 |
|---|---|---|
| C1 | 删除 3 处失效的 `linen-outdoor-rug` 关联引用 | 3 个产品数据文件 |
| M1 | 删除重复的 `CATEGORY_LABELS`，统一使用引入的常量 | `helpers/getProducts.ts` |
| M2 | 删除未使用组件 `Card.astro`、`Section.astro` | `components/common/` |
| M3 | 图标键 `'fire'` → `'firepit'`，删除手动桥接 | `categoryIcons.ts`、`collection.astro` |
| L2 | 移除未使用的 `features` 解构 | `ProductInfoSidebar.astro` |
| — | 删除 `ProductInfoSidebar.astro` 第 156 行悬空大括号 | `ProductInfoSidebar.astro` |

验证：`npm run build` ✅（10 页）· `npm run typecheck` ✅（38 既有错误，无新增）
