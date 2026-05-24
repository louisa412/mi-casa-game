<template>
  <div class="rbar">
    <div class="ri">
      <div class="riw">🪵</div>
      <div>
        <div class="rl">木材</div>
        <div class="rv">{{ materials.wood }}</div>
      </div>
    </div>

    <div class="rdiv" />

    <div class="ri">
      <div class="riw">🧶</div>
      <div>
        <div class="rl">布料</div>
        <div class="rv">{{ materials.fabric }}</div>
      </div>
    </div>

    <div class="rdiv" />

    <div class="ri">
      <div class="riw">🌿</div>
      <div>
        <div class="rl">裝飾</div>
        <div class="rv">{{ materials.deco }}</div>
      </div>
    </div>

    <div class="rdiv" />

    <div class="ri rci">
      <div class="riw">⏱</div>
      <div>
        <div class="rl">下次產出</div>
        <div class="rcv">
          {{ display }}
          <span v-if="boostActive" class="bdot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game.js'
import { useCountdown } from '../composables/useCountdown.js'

const store = useGameStore()
const { materials, boost, production } = store

const { display } = useCountdown(() => production.next)
const boostActive = computed(() => boost.on && Date.now() < boost.end)
</script>

<style scoped>
.rbar {
  height: 56px;
  flex-shrink: 0;
  background: rgba(253, 250, 246, 0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(200, 190, 220, 0.2);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
}
.ri   { display: flex; align-items: center; gap: 7px; flex: 1; }
.riw  { width: 30px; height: 30px; background: var(--pb); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.rl   { font-size: 9px; color: var(--tm); letter-spacing: 0.5px; }
.rv   { font-size: 15px; font-weight: 600; color: var(--t); line-height: 1.2; }
.rdiv { width: 1px; height: 26px; background: rgba(200, 190, 220, 0.3); flex-shrink: 0; }
.rci  { flex: 1.4; }
.rcv  { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--p); font-weight: 500; }
.bdot {
  display: inline-block;
  width: 6px; height: 6px;
  background: #d4a860;
  border-radius: 50%;
  margin-left: 4px;
  animation: pulse 0.8s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }
</style>
