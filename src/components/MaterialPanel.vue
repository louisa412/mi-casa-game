<template>
  <div class="pov" @click.self="$emit('close')">
    <div class="pnl">
      <div class="ph" />
      <div class="ptitle">素材倉庫</div>
      <p class="hint">木材15分鐘、布料30分鐘、裝飾45分鐘各產出1個，離線最多累積48小時。<br>使用互動行為可讓接下來30分鐘加速 1.5×。</p>

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

      <div class="save-box">
        <button class="save-toggle" @click="transferOpen = !transferOpen">
          存檔搬家
        </button>

        <div v-if="transferOpen" class="save-tools">
          <div class="save-actions">
            <button class="save-btn" @click="exportSave">匯出存檔</button>
            <button class="save-btn alt" @click="importSave">匯入存檔</button>
          </div>

          <textarea
            v-model="transferText"
            class="save-text"
            spellcheck="false"
            placeholder="先在舊 App 按匯出存檔，再到新 App 貼上並按匯入存檔。"
          />

          <div class="save-msg">{{ transferMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/game.js'

defineEmits(['close'])

const { materials } = useGameStore()
const transferOpen = ref(false)
const transferText = ref('')
const transferMessage = ref('')

const items = [
  { key: 'wood',   name: '木材', icon: '🪵', desc: '每15分鐘產出1個，需求量最高。上限90個。', cap: 90 },
  { key: 'fabric', name: '布料', icon: '🧶', desc: '每30分鐘產出1個，用於軟質家具。上限75個。', cap: 75 },
  { key: 'deco',   name: '裝飾', icon: '🌿', desc: '每45分鐘產出1個，讓空間有生氣。上限60個。', cap: 60 },
]

const pct = (key) => Math.min(100, Math.round(materials[key] / items.find(i => i.key === key).cap * 100))

const SAVE_KEYS = [
  'mi_casa_game_v3',
  'mi_casa_furniture_v3',
  'mi_casa_room_v1',
  'healing_room_v1',
]

async function exportSave() {
  const payload = {
    app: 'mi-casa',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: Object.fromEntries(SAVE_KEYS.map(key => [key, localStorage.getItem(key)])),
  }

  transferText.value = btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
  transferMessage.value = '已產生匯出碼'

  try {
    await navigator.clipboard?.writeText(transferText.value)
    transferMessage.value = '已產生匯出碼，也已複製'
  } catch {}
}

function importSave() {
  try {
    const payload = JSON.parse(decodeURIComponent(escape(atob(transferText.value.trim()))))
    if (payload?.app !== 'mi-casa' || !payload.data) throw new Error('Invalid save')

    for (const key of SAVE_KEYS) {
      const value = payload.data[key]
      if (typeof value === 'string') localStorage.setItem(key, value)
    }

    transferMessage.value = '匯入完成，正在重開'
    setTimeout(() => window.location.reload(), 350)
  } catch {
    transferMessage.value = '匯入碼讀不到，請重新貼上'
  }
}
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
.ptitle { font-size: 16px; font-weight: 600; color: var(--t); margin-bottom: 10px; letter-spacing: 0.2px; }
.hint   { font-size: 12px; color: var(--tm); line-height: 1.8; margin-bottom: 14px; }

.mcards { display: flex; flex-direction: column; gap: 10px; }
.mcard  { background: #f7f0e6; border-radius: 13px; padding: 13px 15px; display: flex; align-items: center; gap: 11px; }
.mico   { font-size: 26px; }
.minf   { flex: 1; }
.mn     { font-size: 14px; color: var(--t); font-weight: 600; margin-bottom: 2px; }
.md     { font-size: 11.5px; color: var(--tm); line-height: 1.55; }
.mbar   { height: 3px; background: rgba(200, 190, 220, 0.3); border-radius: 2px; margin-top: 6px; overflow: hidden; }
.mbf    { height: 100%; background: var(--ps); border-radius: 2px; transition: width 0.5s ease; }
.mstat  { text-align: right; font-size: 11px; color: var(--tm); line-height: 1.9; }
.mnum   { font-size: 21px; font-weight: 600; color: var(--t); }

.save-box {
  margin-top: 12px;
  border-top: 1px solid rgba(200, 190, 220, 0.34);
  padding-top: 12px;
}
.save-toggle,
.save-btn {
  border: none;
  border-radius: 12px;
  background: var(--pb);
  color: var(--p);
  font-weight: 600;
  cursor: pointer;
}
.save-toggle {
  width: 100%;
  height: 38px;
  font-size: 13px;
}
.save-tools {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
.save-actions {
  display: flex;
  gap: 8px;
}
.save-btn {
  flex: 1;
  height: 34px;
  font-size: 12px;
}
.save-btn.alt {
  background: #f7f0e6;
  color: var(--t);
}
.save-text {
  min-height: 76px;
  resize: vertical;
  border: 1px solid rgba(200, 190, 220, 0.5);
  border-radius: 12px;
  background: #fffaf3;
  color: var(--t);
  font-size: 11px;
  line-height: 1.4;
  padding: 9px 10px;
  outline: none;
}
.save-msg {
  min-height: 16px;
  color: var(--tm);
  font-size: 11px;
  text-align: center;
}
</style>
