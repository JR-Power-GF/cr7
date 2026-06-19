<script setup>
import { ref, computed } from 'vue'

/* ------------------------------------------------------------------ *
 * 风险问卷 —— 数据模型
 * 5 个模块共 24 题，与 Figma 一致：
 *   财务风险 5 · 合规经营 4 · 税务风险 4 · 信用风险 5 · 经营风险 6
 * ------------------------------------------------------------------ */

const modules = [
  { id: 0, name: '财务风险' },
  { id: 1, name: '合规经营' },
  { id: 2, name: '税务风险' },
  { id: 3, name: '信用风险' },
  { id: 4, name: '经营风险' },
]

// 单选/多选的统一题目结构
const questions = [
  // —— 财务风险（1–5）——
  { module: 0, type: 'single', title: '近一年企业现金流是否出现过持续紧张？', options: [['a', '经常紧张'], ['b', '偶尔紧张'], ['c', '基本平稳'], ['d', '持续充裕']] },
  { module: 0, type: 'single', title: '当前资产负债率所处区间？', options: [['a', '低于 40%'], ['b', '40%–60%'], ['c', '60%–80%'], ['d', '高于 80%']] },
  { module: 0, type: 'single', title: '是否存在短期债务集中到期偿付压力？', options: [['a', '压力较大'], ['b', '有一定压力'], ['c', '压力较小'], ['d', '无压力']] },
  { module: 0, type: 'single', title: '应收账款周转天数同比变化？', options: [['a', '明显拉长'], ['b', '略有拉长'], ['c', '基本持平'], ['d', '有所缩短']] },
  { module: 0, type: 'single', title: '主营业务毛利率同比？', options: [['a', '大幅下滑'], ['b', '小幅下滑'], ['c', '基本持平'], ['d', '稳步提升']] },
  // —— 合规经营（6–9）——
  { module: 1, type: 'single', title: '企业是否取得完整经营所需资质证照？', options: [['a', '已全部取得'], ['b', '基本取得'], ['c', '部分缺失'], ['d', '缺失较多']] },
  { module: 1, type: 'single', title: '近一年是否按时完成工商年报与公示？', options: [['a', '是，按时完成'], ['b', '延迟完成'], ['c', '尚未完成']] },
  { module: 1, type: 'single', title: '是否建立合规与内部控制制度？', options: [['a', '已建立并有效运行'], ['b', '已建立但执行一般'], ['c', '尚未建立']] },
  { module: 1, type: 'multiple', title: '近一年内，企业是否发生过以下合规问题？（可多选）', extra: '若存在上述问题，请简述影响与整改情况（选填）', options: [['a', '受到过行政处罚'], ['b', '存在未决诉讼或仲裁'], ['c', '合同违约记录'], ['d', '资质证照过期或缺失']] },
  // —— 税务风险（10–13）——
  { module: 2, type: 'single', title: '近一年是否按时足额申报纳税？', options: [['a', '是，按时足额'], ['b', '基本按时'], ['c', '偶有延迟'], ['d', '存在欠缴']] },
  { module: 2, type: 'single', title: '是否享受税收优惠或补贴政策？', options: [['a', '多项优惠'], ['b', '部分优惠'], ['c', '未享受']] },
  { module: 2, type: 'single', title: '是否存在历史欠税或滞纳金？', options: [['a', '存在且金额较大'], ['b', '存在但金额较小'], ['c', '无']] },
  { module: 2, type: 'single', title: '发票管理与使用是否规范？', options: [['a', '规范'], ['b', '基本规范'], ['c', '不够规范']] },
  // —— 信用风险（14–18）——
  { module: 3, type: 'single', title: '企业及实控人当前征信记录情况？', options: [['a', '良好'], ['b', '一般'], ['c', '存在不良'], ['d', '较差']] },
  { module: 3, type: 'single', title: '是否存在对外担保？', options: [['a', '金额较大'], ['b', '金额适中'], ['c', '金额较小'], ['d', '无']] },
  { module: 3, type: 'single', title: '银行授信额度使用率？', options: [['a', '高于 80%'], ['b', '50%–80%'], ['c', '低于 50%'], ['d', '无授信']] },
  { module: 3, type: 'single', title: '是否被列入经营异常或严重违法名单？', options: [['a', '被列入'], ['b', '曾被列入'], ['c', '未被列入']] },
  { module: 3, type: 'single', title: '近一年是否有逾期还款记录？', options: [['a', '多次逾期'], ['b', '偶有逾期'], ['c', '无逾期']] },
  // —— 经营风险（19–24）——
  { module: 4, type: 'single', title: '主营业务收入同比变化？', options: [['a', '明显下降'], ['b', '略有下降'], ['c', '基本持平'], ['d', '稳步增长']] },
  { module: 4, type: 'single', title: '核心客户集中度（前五大客户占比）？', options: [['a', '高于 70%'], ['b', '40%–70%'], ['c', '低于 40%']] },
  { module: 4, type: 'single', title: '关键岗位人员近一年变动情况？', options: [['a', '频繁变动'], ['b', '偶有变动'], ['c', '基本稳定']] },
  { module: 4, type: 'single', title: '是否依赖单一供应商或渠道？', options: [['a', '高度依赖'], ['b', '部分依赖'], ['c', '渠道多元']] },
  { module: 4, type: 'single', title: '数字化 / 信息化建设投入水平？', options: [['a', '投入不足'], ['b', '中等水平'], ['c', '持续投入']] },
  { module: 4, type: 'single', title: '是否制定应急预案与风险预警机制？', options: [['a', '已制定并演练'], ['b', '已制定'], ['c', '尚未制定']] },
]

const TOTAL = questions.length

// 答案存储：单选存 key(string)，多选存 key 数组，未答存 null
const answers = ref(Array(TOTAL).fill(null))
// 前 8 题标记为已答（财务 5 + 合规前 3），第 9 题预设多选答案，与 Figma 一致
;[0, 1, 2, 3, 4].forEach((i) => (answers.value[i] = questions[i].options[0][0]))
;[5, 6, 7].forEach((i) => (answers.value[i] = questions[i].options[0][0]))
answers.value[8] = ['b', 'd']

// 多选题的选填补充说明
const remarks = ref(Array(TOTAL).fill(''))
remarks.value[8] = ''

// 当前题号（第 9 题）
const current = ref(8)
const draftToast = ref('草稿已自动保存 · 刚刚')

const question = computed(() => questions[current.value])
const currentModule = computed(() => question.value.module)

/* 是否作答 */
function isAnswered(index) {
  const a = answers.value[index]
  return a !== null && (!Array.isArray(a) || a.length > 0)
}

// 已回答：不含当前正在作答的题（勾选属草稿，翻题后才计入），贴合问卷真实计数
const answeredCount = computed(() =>
  answers.value.filter((_, i) => i !== current.value && isAnswered(i)).length
)
const progressPct = computed(() => Math.round((answeredCount.value / TOTAL) * 100))
const remainingMin = computed(() => Math.max(1, Math.round((TOTAL - answeredCount.value) * 0.15)))

/* 模块统计 */
function moduleAnswered(id) {
  return questions.filter((_, i) => questions[i].module === id && i !== current.value && isAnswered(i)).length
}
function moduleTotal(id) {
  return questions.filter((q) => q.module === id).length
}
function moduleState(id) {
  const answered = moduleAnswered(id)
  const total = moduleTotal(id)
  if (answered >= total) return 'done'
  if (id === currentModule.value) return 'active'
  return 'idle'
}

/* 选项选择：多选 toggle / 单选 set */
function isSelected(key) {
  const a = answers.value[current.value]
  return Array.isArray(a) ? a.includes(key) : a === key
}
function selectOption(key) {
  const q = question.value
  if (q.type === 'multiple') {
    const arr = Array.isArray(answers.value[current.value]) ? [...answers.value[current.value]] : []
    const i = arr.indexOf(key)
    if (i >= 0) arr.splice(i, 1)
    else arr.push(key)
    answers.value[current.value] = arr
  } else {
    answers.value[current.value] = key
  }
  draftToast.value = '草稿已自动保存 · 刚刚'
}

/* 翻题 / 跳转 */
function goTo(index) {
  current.value = Math.min(TOTAL - 1, Math.max(0, index))
}
function goToModule(id) {
  const idx = questions.findIndex((q) => q.module === id)
  if (idx >= 0) goTo(idx)
}
</script>

<template>
  <div class="survey">
    <!-- ============ 顶部导航栏 ============ -->
    <header class="topbar">
      <div class="brand">
        <div class="brand__logo">汇</div>
        <div class="brand__text">
          <p class="brand__name">一网汇</p>
          <p class="brand__sub">数智化平台</p>
        </div>
      </div>
      <div class="topbar__spacer"></div>
      <div class="topbar__msg">
        <span>消息</span>
        <span class="dot dot--red"></span>
      </div>
      <div class="topbar__divider"></div>
      <div class="user">
        <div class="user__avatar">高</div>
        <span class="user__name">高放</span>
        <span class="user__caret">▾</span>
      </div>
    </header>
    <div class="topbar__line"></div>

    <!-- ============ 主体 ============ -->
    <main class="body">
      <!-- 左侧：答题进度 -->
      <aside class="sidebar">
        <p class="sidebar__title">答题进度</p>

        <button
          v-for="m in modules"
          :key="m.id"
          class="module"
          :class="`module--${moduleState(m.id)}`"
          @click="goToModule(m.id)"
        >
          <span class="module__badge">
            <!-- 已完成：绿色圆 + 对勾 -->
            <svg v-if="moduleState(m.id) === 'done'" class="module__check" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <!-- 进行中：题号 -->
            <span v-else>{{ m.id + 1 }}</span>
          </span>
          <span class="module__info">
            <span class="module__name">{{ m.name }}</span>
            <span class="module__meta">已答 {{ moduleAnswered(m.id) }} / {{ moduleTotal(m.id) }}</span>
          </span>
        </button>
      </aside>

      <!-- 右侧：问题区 -->
      <section class="content">
        <!-- 进度信息 -->
        <div class="meta">
          <p class="meta__count">已回答 {{ answeredCount }} / {{ TOTAL }}</p>
          <p class="meta__time"> · 预计还需 {{ remainingMin }} 分钟</p>
        </div>
        <div class="save">
          <span class="dot dot--green"></span>
          <span class="save__text">{{ draftToast }}</span>
        </div>
        <div class="progress">
          <div class="progress__fill" :style="{ width: progressPct + '%' }"></div>
        </div>

        <!-- 问题卡片 -->
        <div class="card">
          <div class="card__head">
            <p class="card__seq">第 {{ current + 1 }} 题</p>
            <p class="card__dim">  ·  {{ modules[currentModule].name }}</p>
            <div class="card__headspacer"></div>
            <span class="tag">{{ question.type === 'multiple' ? '多选' : '单选' }}</span>
          </div>

          <h2 class="card__title">{{ question.title }}</h2>

          <ul class="options">
            <li v-for="[key, label] in question.options" :key="key">
              <label
                class="option"
                :class="{ 'option--on': isSelected(key) }"
              >
                <input
                  class="option__input"
                  :type="question.type === 'multiple' ? 'checkbox' : 'radio'"
                  name="current-question"
                  :checked="isSelected(key)"
                  @change="selectOption(key)"
                />
                <span class="checkbox">
                  <svg v-if="isSelected(key)" class="checkbox__tick" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="option__label">{{ label }}</span>
              </label>
            </li>
          </ul>

          <!-- 选填说明（仅多选题） -->
          <div v-if="question.extra" class="remark">
            <p class="remark__label">{{ question.extra }}</p>
            <textarea
              class="remark__box"
              rows="2"
              placeholder="请输入说明…"
              v-model="remarks[current]"
            ></textarea>
          </div>

          <div class="notice">
            <span class="notice__q">?</span>
            <span class="notice__text">勾选后将纳入合规风险加权计算，影响最终评分</span>
          </div>
        </div>

        <!-- 导航按钮 -->
        <div class="nav">
          <button class="btn btn--ghost" :disabled="current === 0" @click="goTo(current - 1)">
            ‹ 上一题
          </button>
          <button class="btn btn--text">保存草稿</button>
          <div class="nav__spacer"></div>
          <button class="btn btn--primary" :disabled="current === TOTAL - 1" @click="goTo(current + 1)">
            下一题 ›
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.survey {
  min-height: 100vh;
  background: var(--bg-page);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* ---------- 顶部导航 ---------- */
.topbar {
  height: 56px;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand__logo {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--brand-primary);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  display: grid;
  place-items: center;
}
.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.brand__name {
  margin: 0;
  font-weight: 700;
  font-size: 15px;
  color: var(--text-strong);
}
.brand__sub {
  margin: 0;
  font-size: 10px;
  color: var(--text-soft);
}
.topbar__spacer {
  flex: 1;
}
.topbar__msg {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
}
.topbar__divider {
  width: 1px;
  height: 20px;
  background: var(--tag-border);
}
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.user__avatar {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: var(--brand-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: grid;
  place-items: center;
}
.user__name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-strong);
}
.user__caret {
  font-size: 11px;
  color: var(--text-soft);
}
.topbar__line {
  height: 1px;
  background: var(--divider-strong);
}

/* 通用圆点 */
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}
.dot--red {
  background: #ff4d4f;
}
.dot--green {
  background: var(--success);
}

/* ---------- 主体两栏 ---------- */
.body {
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: stretch;
  padding: 22px 32px 24px;
}

/* ---------- 左侧侧边栏 ---------- */
.sidebar {
  width: 264px;
  flex-shrink: 0;
  background: var(--bg-card);
  border-radius: var(--radius-card);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;
}
.sidebar__title {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 14px;
  color: var(--text-strong);
}
.module {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px;
  border: none;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;
}
.module + .module {
  box-shadow: 0 -1px 0 0 var(--divider);
}
.module:hover {
  background: #fafafa;
}
.module--active {
  background: var(--brand-bg);
  box-shadow: none;
}
.module__badge {
  width: 26px;
  height: 26px;
  border-radius: 13px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: var(--tag-border);
  color: var(--text-disabled);
  font-weight: 700;
  font-size: 12px;
}
.module--active .module__badge {
  background: var(--brand-primary);
  color: #fff;
}
.module--done .module__badge {
  background: var(--success);
}
.module__check {
  width: 14px;
  height: 14px;
}
.module__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.2;
}
.module__name {
  font-size: 12px;
  color: var(--text-strong);
}
.module--active .module__name {
  color: var(--brand-primary-active);
  font-weight: 500;
}
.module__meta {
  font-size: 10px;
  color: var(--text-soft);
}

/* ---------- 右侧内容区 ---------- */
.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.meta {
  display: flex;
  align-items: center;
}
.meta__count {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-strong);
}
.meta__time {
  margin: 0;
  font-size: 12px;
  color: var(--text-soft);
}
.save {
  display: flex;
  align-items: center;
  gap: 6px;
}
.save__text {
  font-size: 11px;
  color: var(--success);
}
.progress {
  height: 7px;
  width: 100%;
  max-width: 900px;
  background: var(--divider-strong);
  border-radius: 4px;
  overflow: hidden;
}
.progress__fill {
  height: 100%;
  background: var(--brand-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* 问题卡片 */
.card {
  background: var(--bg-card);
  border-radius: var(--radius-card);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
.card__head {
  display: flex;
  align-items: center;
}
.card__seq {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--brand-primary-active);
}
.card__dim {
  margin: 0;
  font-size: 12px;
  color: var(--text-soft);
  white-space: pre;
}
.card__headspacer {
  flex: 1;
}
.tag {
  font-size: 11px;
  color: var(--text-soft);
}
.card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-strong);
  line-height: 1.5;
}

/* 选项 */
.options {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 14px;
  background: var(--bg-option);
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.option--on {
  background: var(--brand-bg-selected);
}
.option__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.checkbox {
  width: 17px;
  height: 17px;
  border-radius: 4px;
  background: #e0e0e0;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  transition: background 0.15s ease;
}
.option--on .checkbox {
  background: var(--brand-primary);
}
.checkbox__tick {
  width: 13px;
  height: 13px;
}
.option__label {
  font-size: 13px;
  color: var(--text-strong);
}
.option--on .option__label {
  color: var(--brand-primary-active);
  font-weight: 500;
}

/* 选填说明 */
.remark {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.remark__label {
  margin: 0;
  font-size: 12px;
  color: var(--text);
}
.remark__box {
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-family: inherit;
  font-size: 12px;
  color: var(--text-strong);
  line-height: 1.6;
}
.remark__box::placeholder {
  color: var(--text-disabled);
}
.remark__box:focus {
  background: var(--bg-card);
  box-shadow: inset 0 0 0 1px var(--brand-primary);
}

/* 提示 */
.notice {
  display: flex;
  align-items: center;
  gap: 6px;
}
.notice__q {
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background: var(--brand-primary);
  color: #fff;
  font-weight: 700;
  font-size: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.notice__text {
  font-size: 11px;
  color: var(--text-soft);
}

/* 导航按钮 */
.nav {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav__spacer {
  flex: 1;
}
.btn {
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  font-family: inherit;
  transition: opacity 0.15s ease, background 0.15s ease;
}
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
.btn--ghost {
  background: var(--bg-card);
  padding: 11px 20px;
  font-size: 13px;
  color: var(--text);
}
.btn--ghost:not(:disabled):hover {
  background: #f5f5f5;
}
.btn--text {
  background: transparent;
  padding: 11px 4px;
  font-size: 12px;
  color: var(--text-soft);
}
.btn--text:hover {
  color: var(--text);
}
.btn--primary {
  background: var(--brand-primary);
  color: #fff;
  padding: 11px 24px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn--primary:not(:disabled):hover {
  background: var(--brand-primary-active);
}

/* 焦点可见性 */
.option:focus-within {
  box-shadow: 0 0 0 2px var(--brand-primary);
}
.btn:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
</style>
