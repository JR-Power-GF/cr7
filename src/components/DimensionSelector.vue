<script setup>
import { computed, ref } from 'vue'
import DimIcon from './DimIcon.js'

/**
 * 评价维度选择器：5 个维度卡片，可多选切换，已选计数实时更新
 */
const dimensions = ref([
  { id: 'finance', icon: 'finance', name: '财务风险', desc: '偿债/盈利/现金流', selected: true },
  { id: 'compliance', icon: 'compliance', name: '合规经营', desc: '资质/合同/监管', selected: true },
  { id: 'tax', icon: 'tax', name: '税务风险', desc: '申报/发票/优惠', selected: true },
  { id: 'credit', icon: 'credit', name: '信用风险', desc: '征信/被执行/处罚', selected: true },
  { id: 'operation', icon: 'operation', name: '经营风险', desc: '市场/库存/人力', selected: false },
])

const selectedCount = computed(
  () => dimensions.value.filter((d) => d.selected).length
)

function toggle(dim) {
  dim.selected = !dim.selected
}
</script>

<template>
  <section class="dim-panel">
    <div class="dim-head">
      <h2 class="dim-title">选择评价维度</h2>
      <span class="dim-hint">（可多选）</span>
      <div class="spacer"></div>
      <span class="dim-count">已选 {{ selectedCount }} / {{ dimensions.length }}</span>
    </div>

    <div class="dim-grid">
      <button
        v-for="dim in dimensions"
        :key="dim.id"
        type="button"
        class="dim-item"
        :class="{ selected: dim.selected }"
        :aria-pressed="dim.selected"
        @click="toggle(dim)"
      >
        <span class="dim-icon">
          <DimIcon :name="dim.icon" />
        </span>
        <span class="dim-name">{{ dim.name }}</span>
        <span class="dim-desc">{{ dim.desc }}</span>
        <span class="dim-status">
          {{ dim.selected ? '✓ 已选' : '点击选择' }}
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.dim-panel {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 18px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-card);
}

.dim-head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dim-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-title);
}

.dim-hint {
  font-size: 12px;
  color: var(--text-caption);
}

.spacer {
  flex: 1;
}

.dim-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--brand-primary-active);
}

.dim-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.dim-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  padding: 14px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  color: var(--text-title);
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    background 0.18s ease, border-color 0.18s ease;
}

.dim-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(22, 119, 255, 0.25);
}

.dim-item:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}

/* 选中态 */
.dim-item.selected {
  background: var(--bg-selected);
}

.dim-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--bg-icon-default);
  color: var(--text-caption);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: background 0.18s ease, color 0.18s ease;
}

.dim-item.selected .dim-icon {
  background: var(--bg-icon-selected);
  color: var(--brand-primary);
}

.dim-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-title);
  transition: color 0.18s ease;
}

.dim-item.selected .dim-name {
  color: var(--brand-primary-active);
}

.dim-desc {
  font-size: 10px;
  color: var(--text-caption);
  line-height: 1.4;
}

.dim-status {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-disabled);
  transition: color 0.18s ease;
}

.dim-item.selected .dim-status {
  color: var(--brand-primary-active);
}

@media (max-width: 1080px) {
  .dim-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 680px) {
  .dim-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
