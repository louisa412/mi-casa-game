<template>
  <!-- Portrait mode hint -->
  <div id="rotate-hint">
    <div class="hi">📱↔️</div>
    <div>請將手機橫向旋轉<br>以獲得最佳體驗</div>
  </div>

  <!-- Main app shell: landscape 844×390 -->
  <div id="shell">
    <ResourceBar />
    <RoomScene />
    <TabBar :active-tab="activeTab" @change="activeTab = $event" />

    <!-- Panels (slide up over room) -->
    <FurniturePanel v-if="activeTab === 'furniture'" @close="activeTab = 'room'" />
    <MaterialPanel  v-if="activeTab === 'material'"  @close="activeTab = 'room'" />

    <!-- Resource spawn pop-ups -->
    <div
      v-for="s in store.spawns"
      :key="s.id"
      class="spawn"
      :style="{ left: s.x + 'px', top: s.y + 'px' }"
    >
      {{ s.text }}
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="store.toast" :key="store.toastKey" class="toast">
        {{ store.toast }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from './stores/game.js'
import ResourceBar    from './components/ResourceBar.vue'
import RoomScene      from './components/RoomScene.vue'
import TabBar         from './components/TabBar.vue'
import FurniturePanel from './components/FurniturePanel.vue'
import MaterialPanel  from './components/MaterialPanel.vue'

const store = useGameStore()
const activeTab = ref('room')

let tickTimer = null
let saveTimer = null

onMounted(() => {
  store.load()
  store.tick()
  tickTimer = setInterval(store.tick, 1000)
  saveTimer = setInterval(store.save, 15_000)
})

onUnmounted(() => {
  clearInterval(tickTimer)
  clearInterval(saveTimer)
})
</script>

<style scoped>
#shell {
  width: 844px;
  height: 390px;
  background: #c8bedd;
  border-radius: 36px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 70px rgba(60, 40, 90, 0.45);
}

.spawn {
  position: absolute;
  font-size: 12px; font-weight: 600;
  color: var(--p);
  pointer-events: none;
  z-index: 20;
  animation: spup 1.3s ease-out forwards;
}
@keyframes spup { 0% { opacity: 1; transform: translateY(0) } 100% { opacity: 0; transform: translateY(-32px) } }

.toast {
  position: absolute;
  top: 68px; left: 50%; transform: translateX(-50%);
  background: rgba(253, 250, 246, 0.96);
  backdrop-filter: blur(10px);
  border-radius: 16px; padding: 8px 16px;
  font-size: 11px; color: var(--t);
  box-shadow: 0 4px 18px var(--sh);
  z-index: 30;
  white-space: nowrap;
}
.toast-enter-active { animation: toastIn 0.25s ease; }
.toast-leave-active { animation: toastOut 0.4s ease forwards; }
@keyframes toastIn  { from { opacity: 0; transform: translateX(-50%) translateY(-6px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
@keyframes toastOut { from { opacity: 1 } to { opacity: 0; transform: translateX(-50%) translateY(-4px) } }
</style>
