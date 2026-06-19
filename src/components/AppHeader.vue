<script setup>
/**
 * 顶部导航栏
 * Logo · 品牌 · 消息（带红点）· 用户信息
 */
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <span class="logo-text">汇</span>
    </div>

    <div class="brand">
      <p class="brand-name">一网汇</p>
      <p class="brand-sub">数智化平台</p>
    </div>

    <div class="spacer"></div>

    <button class="nav-item" type="button">
      <span>消息</span>
      <span class="msg-dot"></span>
    </button>

    <span class="nav-divider"></span>

    <button class="nav-item user" type="button">
      <span class="avatar">高</span>
      <span class="user-name">高放</span>
      <span class="caret">▾</span>
    </button>
  </header>
</template>

<style scoped>
.app-header {
  height: 56px;
  padding: 0 24px;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: var(--shadow-card);
}

.logo {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.brand-name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-title);
  line-height: 1.2;
}

.brand-sub {
  margin: 0;
  font-size: 10px;
  color: var(--text-caption);
  line-height: 1.2;
}

.spacer {
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-body);
  font-size: 13px;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: var(--brand-primary);
}

.msg-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--danger);
  box-shadow: 0 0 0 2px #fff;
}

.nav-divider {
  width: 1px;
  height: 20px;
  background: var(--divider);
}

.user {
  gap: 8px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: var(--brand-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.user-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-title);
}

.caret {
  font-size: 11px;
  color: var(--text-caption);
}
</style>
