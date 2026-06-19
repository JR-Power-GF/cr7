<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main class="container">
    <h1>⚽ CR7 Vue Project</h1>
    <p class="subtitle">一个简单的 Vue 3 + Vite 前端项目</p>
    <button type="button" @click="count++">点击次数:{{ count }}</button>
    <p class="hint">编辑 <code>src/App.vue</code> 后保存即可热更新</p>
  </main>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-soft);
  margin-bottom: 2rem;
}

button {
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

button:hover {
  opacity: 0.85;
}

.hint {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--color-text-soft);
}

code {
  background: rgba(0, 0, 0, 0.06);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}
</style>
