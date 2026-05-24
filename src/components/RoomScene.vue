<template>
  <div class="scene" @pointerdown="onSceneClick">

    <!-- ── Room Background ──────────────────────────────────────── -->
    <div ref="stageRef" class="room-stage">
      <img :src="roomBg" class="room-bg" alt="Mi Casa" />

      <!-- ── Furniture sticker layer ──────────────────────────── -->
      <div class="furniture-layer">
        <FurnitureItem
          v-for="item in sortedItems"
          :key="item.id"
          :item="item"
          :stage-w="stageSize.w"
          :stage-h="stageSize.h"
        />
      </div>

      <!-- ── Game FX overlays ──────────────────────────────────── -->
      <div class="lamp-glow"  :class="{ active: fx.lamp  }" :key="'lg' + fx.lamp"  />
      <div class="lamp-shine" :class="{ active: fx.lamp  }" :key="'ls' + fx.lamp"  />

      <div class="leaf-group" :class="{ active: fx.water }" :key="'lh' + fx.water">🪴</div>
      <div class="water-drops" :class="{ active: fx.water }" :key="'wd' + fx.water">
        <span class="wdrop" style="left:4px;top:0;animation-delay:0.10s">💧</span>
        <span class="wdrop" style="left:14px;top:4px;animation-delay:0.22s">💧</span>
        <span class="wdrop" style="left:-4px;top:6px;animation-delay:0.34s">💧</span>
      </div>

      <div class="sparkle-group" :class="{ active: fx.clean }" :key="'sg' + fx.clean">
        <div
          v-for="(sp, i) in SPARK_POSITIONS"
          :key="i"
          class="spark"
          :style="{
            left: sp.x + 'px', top: sp.y + 'px',
            '--tx': ((i % 2 === 0 ? 1 : -1) * (8 + (i % 12))) + 'px',
            '--ty': -(6 + (i % 10)) + 'px',
            animationDelay: (i * 0.06) + 's',
            background: ['rgba(200,190,255,0.9)','rgba(255,220,180,0.9)','rgba(180,220,200,0.9)','rgba(255,200,200,0.9)'][i % 4],
          }"
        />
      </div>
    </div>

    <!-- ── Resource bar (floating overlay) ──────────────────────── -->
    <div class="resource-overlay">
      <div class="res-item">
        <span class="res-icon">🪵</span>
        <span class="res-label">木材</span>
        <span class="res-val">{{ materials.wood }}</span>
      </div>
      <div class="res-divider" />
      <div class="res-item">
        <span class="res-icon">🧶</span>
        <span class="res-label">布料</span>
        <span class="res-val">{{ materials.fabric }}</span>
      </div>
      <div class="res-divider" />
      <div class="res-item">
        <span class="res-icon">🌿</span>
        <span class="res-label">裝飾</span>
        <span class="res-val">{{ materials.deco }}</span>
      </div>
      <div class="res-divider" />
      <div class="res-item">
        <span class="res-icon">⏱</span>
        <span class="res-label">下次</span>
        <span class="res-val res-timer">
          {{ countdown }}
          <span v-if="boostActive" class="bdot" />
        </span>
      </div>
    </div>

    <!-- ── Selected item controls ────────────────────────────────── -->
    <Transition name="ctrl-fade">
      <div v-if="furStore.selectedItem" class="ctrl-bar" @pointerdown.stop>
        <button class="ctrl-btn" @click="furStore.adjustScale(furStore.selectedId, 0.03)" title="放大">＋</button>
        <button class="ctrl-btn" @click="furStore.adjustScale(furStore.selectedId, -0.03)" title="縮小">－</button>
        <div class="ctrl-divider" />
        <button class="ctrl-btn" @click="furStore.adjustScaleX(furStore.selectedId, 0.1)" title="橫向拉寬">↔＋</button>
        <button class="ctrl-btn" @click="furStore.adjustScaleX(furStore.selectedId, -0.1)" title="橫向縮窄">↔－</button>
        <div class="ctrl-divider" />
        <button class="ctrl-btn" @click="furStore.bringForward(furStore.selectedId)" title="前移">↑</button>
        <button class="ctrl-btn" @click="furStore.sendBack(furStore.selectedId)" title="後移">↓</button>
        <button class="ctrl-btn ctrl-del" @click="furStore.removeItem(furStore.selectedId)" title="刪除">✕</button>
        <div class="ctrl-label">{{ furStore.selectedItem?.label }}</div>
      </div>
    </Transition>

    <!-- ── Task panel ─────────────────────────────────────────────── -->
    <div class="task-panel" :class="{ open: taskOpen }" @pointerdown.stop @click.stop>
      <button class="task-toggle" @click="taskOpen = !taskOpen">
        <span>☑</span>
        <span class="task-toggle-label">任務</span>
      </button>
      <div v-if="taskOpen" class="task-actions">
        <button
          v-for="btn in buttons"
          :key="btn.type"
          class="ab"
          :class="{ used: interactions[btn.type].n >= INTER_MAX, anim: animating[btn.type] }"
          @click="store.interact(btn.type)"
        >
          <span class="bi">{{ btn.icon }}</span>
          <span class="bl">{{ btn.label }}</span>
          <span class="bc">({{ interactions[btn.type].n }}/{{ INTER_MAX }})</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import { useGameStore }      from '../stores/game.js'
import { useFurnitureStore } from '../stores/furnitureStore.js'
import { useRoomStore }      from '../stores/roomStore.js'
import { useCountdown }      from '../composables/useCountdown.js'
import { SPARK_POSITIONS }   from '../data/furniture.js'
import FurnitureItem         from './room/FurnitureItem.vue'

const store     = useGameStore()
const furStore  = useFurnitureStore()
const roomStore = useRoomStore()
const roomBg    = computed(() => roomStore.currentRoom.src)

const { materials, interactions, animating, fx, boost, production, INTER_MAX } = store
const boostActive = computed(() => boost.on && Date.now() < boost.end)
const { display: countdown } = useCountdown(() => production.next)

const taskOpen = ref(false)
const buttons  = [
  { type: 'water', icon: '🪣', label: '澆水' },
  { type: 'clean', icon: '🧹', label: '整理' },
  { type: 'lamp',  icon: '🕯️', label: '點燈' },
]

// ── Stage size tracking (for relative coords) ───────────────────────
const stageRef  = ref(null)
const stageSize = reactive({ w: 844, h: 280 })

function updateStageSize() {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  // Divide by CSS scale applied to parent shell
  const shell = document.getElementById('shell')
  const scale = shell ? parseFloat(getComputedStyle(shell).getPropertyValue('--app-scale') || '1') : 1
  stageSize.w = rect.width  / scale
  stageSize.h = rect.height / scale
}

onMounted(() => {
  updateStageSize()
  window.addEventListener('resize', updateStageSize)
  if (window.visualViewport) window.visualViewport.addEventListener('resize', updateStageSize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateStageSize)
  if (window.visualViewport) window.visualViewport.removeEventListener('resize', updateStageSize)
})

// ── Sorted items (render back-to-front) ─────────────────────────────
const sortedItems = computed(() =>
  [...furStore.placedItems].sort((a, b) => a.zIndex - b.zIndex)
)

// ── Deselect on background tap ───────────────────────────────────────
function onSceneClick(e) {
  if (!e.target.closest('.furniture-item') && !e.target.closest('.ctrl-bar')) {
    furStore.select(null)
  }
}
</script>

<style scoped>
.scene {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #8a7060;
}

/* ── Room stage fills scene ─────────────────────────────────────────── */
.room-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.room-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  pointer-events: none;
  /* Soften slightly to blend stickers better */
  filter: saturate(0.88) brightness(0.97);
}

.furniture-layer {
  position: absolute;
  inset: 0;
}

/* ── Resource overlay (top-left glass card) ─────────────────────────── */
.resource-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(253, 250, 246, 0.86);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 6px 12px;
  box-shadow: 0 2px 14px rgba(60, 40, 80, 0.18);
}
.res-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  gap: 1px;
}
.res-icon  { font-size: 15px; line-height: 1; }
.res-label { font-size: 10px; color: var(--tm); letter-spacing: 0.2px; }
.res-val   { font-size: 15px; font-weight: 700; color: var(--t); line-height: 1.2; }
.res-timer { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--p); }
.res-divider { width: 1px; height: 24px; background: rgba(200, 190, 220, 0.3); }
.bdot {
  display: inline-block;
  width: 5px; height: 5px;
  background: #d4a860;
  border-radius: 50%;
  margin-left: 3px;
  animation: pulse 0.8s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── Selected item controls ─────────────────────────────────────────── */
.ctrl-bar {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(253, 250, 246, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 6px 12px;
  box-shadow: 0 4px 20px rgba(60, 40, 80, 0.28);
}
.ctrl-btn {
  width: 32px; height: 32px;
  border: none;
  border-radius: 10px;
  background: var(--pb);
  color: var(--t);
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.1s;
}
.ctrl-btn:active { transform: scale(0.9); }
.ctrl-del { background: rgba(240, 180, 180, 0.6); color: #c05050; }
.ctrl-divider { width: 1px; height: 20px; background: rgba(200,190,220,0.35); margin: 0 2px; }
.ctrl-label {
  font-size: 12px; color: var(--tm);
  padding-left: 4px; max-width: 72px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ctrl-fade-enter-active, .ctrl-fade-leave-active { transition: opacity 0.15s, transform 0.15s; }
.ctrl-fade-enter-from, .ctrl-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(8px); }

/* ── Task panel ─────────────────────────────────────────────────────── */
.task-panel {
  position: absolute;
  right: 10px; bottom: 12px;
  z-index: 20;
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
}
.task-toggle {
  height: 32px; padding: 0 10px;
  border: none; border-radius: 16px;
  background: rgba(253,250,246,.90);
  color: var(--t);
  box-shadow: 0 2px 12px var(--sh);
  display: flex; align-items: center; gap: 5px; cursor: pointer;
  font-size: 14px;
}
.task-toggle:active { transform: scale(.95); }
.task-toggle-label { font-size: 12px; font-weight: 600; }
.task-actions {
  display: flex; gap: 8px; padding: 8px;
  border-radius: 18px;
  background: rgba(255,252,248,.58);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 18px var(--sh);
}
.ab {
  width: 58px; height: 64px;
  background: rgba(255,252,248,.9); backdrop-filter: blur(10px);
  border: none; border-radius: 14px;
  box-shadow: 0 2px 10px var(--sh);
  cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  transition: transform .15s;
}
.ab:active { transform: scale(.93); }
.ab.used   { opacity:.4; pointer-events:none; }
.ab .bi    { font-size: 18px; }
.ab .bl    { font-size: 10.5px; color: var(--t); }
.ab .bc    { font-size: 9.5px; color: var(--tm); }
.ab.anim .bi { animation: btnB .5s ease; }
@keyframes btnB { 0%,100%{transform:scale(1)} 40%{transform:scale(1.4)} }

/* ── FX ────────────────────────────────────────────────────────────── */
.lamp-glow {
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background: radial-gradient(ellipse 55% 60% at 50% 30%, rgba(255,220,120,.38) 0%, rgba(255,210,100,.18) 40%, transparent 80%);
  opacity:0;
}
.lamp-glow.active { opacity:1; animation:lampFade 1.8s ease-out forwards; }
@keyframes lampFade { 0%{opacity:0} 15%{opacity:1} 60%{opacity:.85} 100%{opacity:0} }

.lamp-shine {
  position:absolute; left:46%; top:8px;
  width:70px; height:70px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,240,160,.9) 0%, rgba(255,230,120,.5) 35%, transparent 70%);
  pointer-events:none; z-index:4; opacity:0; transform:scale(.6);
}
.lamp-shine.active { animation:shinePop 1.6s ease-out forwards; }
@keyframes shinePop { 0%{opacity:0;transform:scale(.5)} 12%{opacity:1;transform:scale(1.2)} 30%{opacity:.9;transform:scale(1)} 100%{opacity:0;transform:scale(.9)} }

.leaf-group {
  position:absolute; left:30%; top:10px; z-index:4; pointer-events:none;
  font-size:20px; line-height:1; opacity:0; transform-origin:top center;
}
.leaf-group.active { opacity:1; animation:leafShake 1.4s ease-out forwards; }
@keyframes leafShake {
  0%{opacity:0;transform:rotate(0deg)} 8%{opacity:1;transform:rotate(-18deg)}
  20%{transform:rotate(14deg)} 32%{transform:rotate(-12deg)} 44%{transform:rotate(9deg)}
  56%{transform:rotate(-6deg)} 68%{transform:rotate(4deg)} 80%{transform:rotate(-2deg)}
  90%{opacity:1;transform:rotate(0deg)} 100%{opacity:0}
}
.water-drops { position:absolute; left:30%; top:30px; z-index:4; pointer-events:none; opacity:0; }
.water-drops.active { animation:dropsFade 1.2s ease-out forwards; }
@keyframes dropsFade { 0%{opacity:0} 10%{opacity:1} 80%{opacity:.6} 100%{opacity:0} }
.wdrop { position:absolute; font-size:11px; animation:dropFall 1s ease-in forwards; }
@keyframes dropFall { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(28px);opacity:0} }

.sparkle-group { position:absolute; inset:0; z-index:4; pointer-events:none; opacity:0; }
.sparkle-group.active { animation:sparkleFade 1.5s ease-out forwards; }
@keyframes sparkleFade { 0%{opacity:0} 8%{opacity:1} 70%{opacity:.7} 100%{opacity:0} }
.spark {
  position:absolute; width:5px; height:5px; border-radius:50%;
  animation:sparkFloat 1.2s ease-out forwards;
}
@keyframes sparkFloat { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0} }
</style>
