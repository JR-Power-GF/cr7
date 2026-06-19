<script setup>
import AppHeader from '../components/AppHeader.vue'
import DimensionSelector from '../components/DimensionSelector.vue'

/**
 * 企业风险智能评价 — 入口页（01.3 风险评价入口）
 */
const breadcrumbs = ['首页', '营商环境', '风险评价']

const features = [
  { name: '5 大维度', sub: '全面覆盖' },
  { name: '3-5 分钟', sub: '快速出结果' },
  { name: 'PDF 报告', sub: '一键导出' },
  { name: '数据加密', sub: '安全合规' },
]
</script>

<template>
  <div class="page">
    <div class="app">
      <AppHeader />

      <div class="app-divider"></div>

      <main class="content">
        <!-- 面包屑 -->
        <nav class="breadcrumb" aria-label="面包屑">
          <template v-for="(crumb, i) in breadcrumbs" :key="crumb">
            <span
              class="crumb"
              :class="{ current: i === breadcrumbs.length - 1 }"
              >{{ crumb }}</span
            >
            <span v-if="i < breadcrumbs.length - 1" class="sep">/</span>
          </template>
        </nav>

        <!-- Hero -->
        <section class="hero">
          <div class="hero-left">
            <h1 class="hero-title">企业风险智能评价</h1>
            <p class="hero-desc">
              以「申永智能体」为底座，5 分钟完成多维度风险体检，AI
              一键生成专业评价报告与整改建议。
            </p>
            <div class="features">
              <div v-for="f in features" :key="f.name" class="feature">
                <span class="feat-check">✓</span>
                <span class="feat-text">
                  <span class="feat-name">{{ f.name }}</span>
                  <span class="feat-sub">{{ f.sub }}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="hero-badge" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="100%" height="100%">
              <path
                d="M32 7l19 6.2v15.2c0 11.4-7.9 21-19 25-11.1-4-19-13.6-19-25V13.2L32 7z"
                fill="none"
                stroke="#fff"
                stroke-width="2.6"
                stroke-linejoin="round"
              />
              <path
                d="M23.5 32l6 6 11-12"
                fill="none"
                stroke="#fff"
                stroke-width="2.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </section>

        <!-- 维度选择 -->
        <DimensionSelector />

        <!-- 操作区 -->
        <div class="actions">
          <button type="button" class="cta" @click="$router.push('/survey')">
            <span>开始风险评价</span>
            <span class="arrow">›</span>
          </button>
          <div class="actions-spacer"></div>
          <p class="actions-hint">预计 3-5 分钟 · 草稿每 30 秒自动保存</p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg-page);
  display: flex;
  justify-content: center;
  padding: 24px;
}

.app {
  width: 100%;
  max-width: 1440px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 48px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.app-divider {
  height: 1px;
  background: var(--border-light);
  width: 100%;
}

.content {
  flex: 1;
  padding: 26px 40px 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.crumb {
  color: var(--text-disabled);
}

.sep {
  color: var(--split);
}

.crumb.current {
  color: var(--text-body);
}

/* Hero */
.hero {
  display: flex;
  align-items: center;
  gap: 24px;
}

.hero-left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-title);
  line-height: 1.2;
}

.hero-desc {
  margin: 0;
  font-size: 13px;
  color: var(--text-caption);
  line-height: 1.6;
  max-width: 640px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 4px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
}

.feat-check {
  width: 18px;
  height: 18px;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feat-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.feat-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-title);
}

.feat-sub {
  font-size: 10px;
  color: var(--text-disabled);
}

.hero-badge {
  width: 132px;
  height: 132px;
  border-radius: 66px;
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 12px 28px rgba(22, 119, 255, 0.28);
  position: relative;
  animation: float 4.5s ease-in-out infinite;
}

.hero-badge::before {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 1px dashed rgba(22, 119, 255, 0.35);
  animation: spin 24s linear infinite;
}

.hero-badge svg {
  width: 64px;
  height: 64px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 操作区 */
.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.25);
}

.cta:hover {
  background: var(--brand-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(22, 119, 255, 0.35);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 2px solid var(--brand-primary-active);
  outline-offset: 2px;
}

.cta .arrow {
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  transition: transform 0.2s ease;
}

.cta:hover .arrow {
  transform: translateX(3px);
}

.actions-spacer {
  flex: 1;
}

.actions-hint {
  margin: 0;
  font-size: 12px;
  color: var(--text-caption);
}

/* 入场动画 */
.breadcrumb,
.hero,
.actions {
  animation: rise 0.5s ease both;
}
.hero {
  animation-delay: 0.08s;
}
.actions {
  animation-delay: 0.24s;
}

/* 子组件根元素淡入 */
.content > :deep(.dim-panel) {
  animation: rise 0.5s 0.16s ease both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 720px) {
  .content {
    padding: 22px 18px;
  }
  .hero {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .actions {
    flex-wrap: wrap;
  }
}
</style>
