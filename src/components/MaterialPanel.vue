<template>
  <div class="pov" @click.self="$emit('close')">
    <div class="pnl">
      <div class="ph" />
      <div class="ptitle">素材倉庫</div>
      <p class="hint">每30分鐘自動產出1個素材，離線最多累積48小時。<br>使用互動行為可讓接下來30分鐘加速 1.5×。</p>

      <div class="mcards">
        <div v-for="item in items" :key="item.key" class="mcard">
          <div class="mico">{{ item.icon }}</div>
          <div class="minf">
            <div class="mn">{{ item.name }}</div>
            <div class="md">{{ item.desc }}</div>
            <div class="mbar">
              <div class="mbf" :style="{ width: pct(item.key) + '%' }" />
            </div>
          </div>
          <div class="mstat">
            <div class="mnum">{{ materials[item.key] }}</div>
            <div>/ {{ item.cap }}</div>
            <div>{{ pct(item.key) }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js'

defineEmits(['close'])

const { materials } = useGameStore()

const items = [
  { key: 'wood',   name: '木材', icon: '🪵', desc: '木材堆每30分鐘產出1個，需求量最高。上限90個。', cap: 90 },
  { key: 'fabric', name: '布料', icon: '🧶', desc: '織布機緩緩產出，用於軟質家具。上限75個。',       cap: 75 },
  { key: 'deco',   name: '裝飾', icon: '🌿', desc: '植物素材少量但珍貴，讓空間有生氣。上限60個。',  cap: 60 },
]

const pct = (key) => Math.min(100, Math.round(materials[key] / items.find(i => i.key === key).cap * 100))
</script>

<style scoped>
.pov {
  position: absolute; inset: 0;
  background: rgba(70, 50, 100, 0.22);
  z-index: 20;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.pnl {
  background: var(--ws);
  border-radius: 24px 24px 0 0;
  padding: 14px 16px 16px;
  max-height: 76%;
  overflow-y: auto;
  scrollbar-width: none;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
}
.pnl::-webkit-scrollbar { display: none; }
@keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }

.ph     { width: 36px; height: 4px; background: #d8ceea; border-radius: 2px; margin: 0 auto 12px; }
.ptitle { font-size: 14px; font-weight: 600; color: var(--t); margin-bottom: 10px; letter-spacing: 0.5px; }
.hint   { font-size: 10px; color: var(--tm); line-height: 1.8; margin-bottom: 14px; }

.mcards { display: flex; flex-direction: column; gap: 10px; }
.mcard  { background: #f7f0e6; border-radius: 13px; padding: 13px 15px; display: flex; align-items: center; gap: 11px; }
.mico   { font-size: 26px; }
.minf   { flex: 1; }
.mn     { font-size: 12px; color: var(--t); font-weight: 600; margin-bottom: 2px; }
.md     { font-size: 9.5px; color: var(--tm); line-height: 1.55; }
.mbar   { height: 3px; background: rgba(200, 190, 220, 0.3); border-radius: 2px; margin-top: 6px; overflow: hidden; }
.mbf    { height: 100%; background: var(--ps); border-radius: 2px; transition: width 0.5s ease; }
.mstat  { text-align: right; font-size: 9.5px; color: var(--tm); line-height: 1.9; }
.mnum   { font-size: 19px; font-weight: 600; color: var(--t); }
</style>
