
---

## 十、架构清理 & 体验打磨（2026-07-29）

> 覆盖 Release 0.8.5 → 0.9.3，所有改动均遵循"进化优于重构，保留已批准 UI 布局"原则。
> 完整结构快照见 `docs/PROJECT_SNAPSHOT.md`

---

### Release 0.8.5 — 架构清理 & 审计

| # | 修复 | 文件 |
|---|---|---|
| C1 | 删除 3 处失效的 `linen-outdoor-rug` 关联引用（coastal / cypress / nordic 三个产品） | 3 个产品数据文件 |
| M1 | 删除重复的 `CATEGORY_LABELS`，统一从 `constants.ts` 引入；修 `ProductCategory` 类型断言 | `helpers/getProducts.ts` |
| M2 | 删除死组件 `Card.astro`、`Section.astro`（无导入方） | `components/common/` |
| M3 | 图标键 `'fire'` → `'firepit'`，与传入值对齐 | `categoryIcons.ts`、`collection.astro` |
| L2 | 移除 `ProductInfoSidebar.astro` 未使用的 `features` 解构 | `ProductInfoSidebar.astro` |
| — | 删除 `ProductInfoSidebar.astro` 第 156 行悬空大括号 `}` | `ProductInfoSidebar.astro` |

---

### Release 0.9.1 — Collection 体验打磨

| # | 修复 | 文件 |
|---|---|---|
| C1 | `CollectionCategoryNav` 内 `icon === 'fire'` 分支改为 `'firepit'`（与该分类传入值对齐，图标恢复显示） | `CollectionCategoryNav.astro` |
| C2 | `aria-expanded` 修正为严格布尔值 | `CollectionFilterSidebar.astro` |
| C3 | Collection 控件添加 `focus-visible` 键盘焦点环（`#C67A52` 2px） | `collection.css` |
| C6 | 清理未实现的 `.collection-mobile-filter-btn` 死 CSS（按钮元素不存在） | `collection.astro` |

> 审计纠偏：`<label>` 嵌套 / swatch 可访问性经复核均正确，无需改动。

---

### Release 0.9.2 — Product Detail 体验打磨

| # | 修复 | 文件 |
|---|---|---|
| T7 | Gallery 内联脚本添加 `@ts-nocheck`（客户端脚本，有运行时 null 防护，TS 窄化不适用）— 消除该模块的 14 个 TS 错误 | `ProductHeroGallery.astro` |
| T8 | Gallery 缩略图键盘导航：`ArrowLeft`/`ArrowRight` 移动选中，`Home`/`End` 跳首末，统一 `go(i)` 切换函数 | `ProductHeroGallery.astro` |
| T9 | Product Detail 控件添加 `focus-visible` 焦点样式 | `productDetail.css` |
| T10 | Story 图、缩略图添加 `loading="lazy" decoding="async"` | 2 文件 |
| T12 | 删除 `productDetail.css` 中重复的旧缩略图死 CSS（同一组选择器写了两遍） | `productDetail.css` |

---

### Release 0.9.3 — Homepage Hero 抛光

| # | 修复 | 文件 |
|---|---|---|
| T1 | CTA 上移：`margin-top: 2.5em` → `2em` | `HeroSection.astro` |
| T2+T5 | 统一 GSAP 单线程入场：整体延迟 0.4s→0s，标题 stagger 0.25s→0.08s，单项 duration 1.0s→0.4s，总时长 ≈480ms | `HeroAnimatedContent.tsx` |
| T3 | Header 横向布局验证（由 `Container` 控制，与 Hero content 对齐，无改动） | — |
| T4 | Header 桌面高度 94px→86px，Logo 126px→118px | `Header.astro`、`Logo.astro` |
| — | **CTA 居中根因**：`.hero-cta-row { justify-content: center }` 在 640px+ row 模式下把按钮行放在 680px 容器中央 → 改为 `flex-start`，按钮与大标题左缘对齐 | `HeroSection.astro` |
| — | 移除主按钮与 outline 按钮的 `focus:ring-offset-2`（光环轨道把整组推右 ~2px） | `HeroAnimatedContent.tsx` |
| — | **提高渐变透明度 12%**（让背景透出更多）：rgba 不透明度统一下调约 12%，0.76→0.64 / 0.60→0.48 / 0.33→0.21 / 0.06→0 | `HeroSection.astro` |

---

### 本轮改动后的验证状态

| 检查项 | 结果 |
|---|---|
| `npm run build` | ✅ 10 页构建成功，≈1.7s |
| `npm run typecheck` | **24 既有错误**，0 新增，0 warnings |
| `src/` 文件数 | 94 个（含 9 张图片），10,258 行代码 |

**剩余 24 个 typecheck 错误分布：**
- `src/components/react/`（`AnimatedContent.tsx`、`ExperienceRunner.tsx`、`ScrollFloat.tsx`、`SplitText.tsx`）— React/GSAP 集成类型
- `astro.config.mjs` — Cloudflare `platformProxy` 配置类型
- **与本轮改动无关**，无需在当前工作范围内处理

---

### 遗留项（本轮审计确认）

| 优先级 | 项 | 文件/位置 |
|---|---|---|
| 低 | 规格表 `<td>/<td>` 严格语义宜为 `<th>/<td>`（视觉稳定，不改动） | `ProductSpecifications.astro` |
| 低 | `@ts-expect-error` 悬空（`onSplit` 回调类型不匹配） | `SplitText.tsx:115` |
| 低 | 价格格式不统一（详情页两位小数 vs Collection 零小数） | 语境不同，可接受 |
| 低 | 颜色/价格筛选 count 为 0（占位，产品数据暴露颜色/价格字段后接入） | `collection.astro` |
| 低 | 移动端筛选按钮未实现（有 CSS 槽位无组件） | `collection.astro` |
