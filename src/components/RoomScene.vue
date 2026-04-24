<template>
  <div class="scene">
    <!-- Side floor fill -->
    <div class="floor-l" />
    <div class="floor-r" />
    <div class="floor-t" />

    <!-- Room background image -->
    <img :src="roomImg" class="rimg" alt="療癒小室" />

    <!-- ── 點燈 effects ── -->
    <div class="lamp-glow" :class="{ active: fx.lamp }" :key="'lg' + fx.lamp" />
    <div class="lamp-shine" :class="{ active: fx.lamp }" :key="'ls' + fx.lamp" />
    <div class="lantern-glow" :class="{ active: fx.lamp }" :key="'lt' + fx.lamp" />

    <!-- ── 澆水 effects ── -->
    <div class="leaf-group leaf-hang" :class="{ active: fx.water }" :key="'lh' + fx.water">🪴</div>
    <div class="leaf-group leaf-win"  :class="{ active: fx.water }" :key="'lw' + fx.water" style="animation-delay:0.15s">🌿</div>
    <div class="water-drops" :class="{ active: fx.water }" :key="'wd' + fx.water">
      <span class="wdrop" style="left:4px;top:0;animation-delay:0.10s">💧</span>
      <span class="wdrop" style="left:14px;top:4px;animation-delay:0.22s">💧</span>
      <span class="wdrop" style="left:-4px;top:6px;animation-delay:0.34s">💧</span>
    </div>

    <!-- ── 整理 sparkle effects ── -->
    <div class="sparkle-group" :class="{ active: fx.clean }" :key="'sg' + fx.clean">
      <div
        v-for="(sp, i) in SPARK_POSITIONS"
        :key="i"
        class="spark"
        :style="{
          left: sp.x + 'px',
          top: sp.y + 'px',
          '--tx': ((i % 2 === 0 ? 1 : -1) * (8 + (i % 12))) + 'px',
          '--ty': -(6 + (i % 10)) + 'px',
          animationDelay: (i * 0.06) + 's',
          background: ['rgba(200,190,255,0.9)', 'rgba(255,220,180,0.9)', 'rgba(180,220,200,0.9)', 'rgba(255,200,200,0.9)'][i % 4],
        }"
      />
    </div>

    <!-- ── Furniture overlay zones ── -->
    <!-- Storage -->
    <div class="fz zsto" :class="{ on: !isDefault.storage }">
      <div v-if="!isDefault.storage" class="fz-inner" v-html="overlaySvg('storage')" />
    </div>

    <!-- Light: pendant (default) vs floor lamp (cream) -->
    <template v-if="isDefault.light">
      <div class="fz zlmp" />
    </template>
    <template v-else>
      <div class="fz zflp on">
        <div class="fz-inner" v-html="overlaySvg('light')" />
      </div>
    </template>

    <!-- Bed -->
    <div class="fz zbed" :class="{ on: !isDefault.bed }">
      <div v-if="!isDefault.bed" class="fz-inner" v-html="overlaySvg('bed')" />
    </div>

    <!-- Desk -->
    <div class="fz zdsk" :class="{ on: !isDefault.desk }">
      <div v-if="!isDefault.desk" class="fz-inner" v-html="overlaySvg('desk')" />
    </div>

    <!-- Chair -->
    <div class="fz zchr" :class="{ on: !isDefault.chair }">
      <div v-if="!isDefault.chair" class="fz-inner" v-html="overlaySvg('chair')" />
    </div>

    <!-- ── Action buttons ── -->
    <div class="actbts">
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
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game.js'
import { OVERLAY_SVGS, SPARK_POSITIONS } from '../data/furniture.js'
import roomImg from '../assets/room.jpg'

const store = useGameStore()
const { equipped, interactions, animating, fx, INTER_MAX } = store

const isDefault = computed(() => ({
  storage: equipped.storage === 'storage_japanese',
  bed:     equipped.bed     === 'bed_japanese',
  desk:    equipped.desk    === 'desk_japanese',
  chair:   equipped.chair   === 'chair_japanese',
  light:   equipped.light   === 'light_japanese',
}))

function overlaySvg(slot) {
  return OVERLAY_SVGS[equipped[slot]] || ''
}

const buttons = [
  { type: 'water', icon: '🪣', label: '澆水' },
  { type: 'clean', icon: '🧹', label: '整理' },
  { type: 'lamp',  icon: '🕯️', label: '點燈' },
]
</script>

<style scoped>
.scene {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #b88855;
}

.rimg {
  position: absolute;
  width: 556px; height: 340px;
  left: 144px; top: -34px;
  pointer-events: none;
  z-index: 1;
}

.floor-l { position: absolute; left: 0;   top: 0; width: 144px; height: 100%; background: linear-gradient(to right, #a07030, #c5987a); z-index: 0; }
.floor-r { position: absolute; right: 0;  top: 0; width: 145px; height: 100%; background: linear-gradient(to left,  #a07030, #c5987a); z-index: 0; }
.floor-t { position: absolute; left: 0; right: 0; top: 0; height: 30px; background: linear-gradient(to bottom, #d8d0c8, transparent); z-index: 0; }

/* ── 點燈 ── */
.lamp-glow {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: radial-gradient(ellipse 55% 60% at 50% 30%, rgba(255,220,120,0.38) 0%, rgba(255,210,100,0.18) 40%, transparent 80%);
  opacity: 0; transition: opacity 0s;
}
.lamp-glow.active { opacity: 1; animation: lampFade 1.8s ease-out forwards; }
@keyframes lampFade { 0%{opacity:0} 15%{opacity:1} 60%{opacity:0.85} 100%{opacity:0} }

.lamp-shine {
  position: absolute; left: 390px; top: 8px;
  width: 80px; height: 80px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,240,160,0.9) 0%, rgba(255,230,120,0.5) 35%, transparent 70%);
  pointer-events: none; z-index: 4;
  opacity: 0; transform: scale(0.6);
}
.lamp-shine.active { animation: shinePop 1.6s ease-out forwards; }
@keyframes shinePop { 0%{opacity:0;transform:scale(0.5)} 12%{opacity:1;transform:scale(1.2)} 30%{opacity:0.9;transform:scale(1)} 100%{opacity:0;transform:scale(0.9)} }

.lantern-glow {
  position: absolute; left: 580px; top: 140px;
  width: 60px; height: 60px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,180,60,0.95) 0%, rgba(255,160,40,0.5) 40%, transparent 70%);
  pointer-events: none; z-index: 4;
  opacity: 0; transform: scale(0.4);
}
.lantern-glow.active { animation: lanternPop 1.8s ease-out forwards; }
@keyframes lanternPop { 0%{opacity:0;transform:scale(0.3)} 10%{opacity:1;transform:scale(1.3)} 25%{opacity:0.85;transform:scale(1)} 70%{opacity:0.5;transform:scale(1.05)} 100%{opacity:0} }

/* ── 澆水 ── */
.leaf-group {
  position: absolute; z-index: 4; pointer-events: none;
  font-size: 20px; line-height: 1;
  opacity: 0; transform-origin: top center;
}
.leaf-group.active { opacity: 1; animation: leafShake 1.4s ease-out forwards; }
@keyframes leafShake {
  0%  { opacity: 0; transform: rotate(0deg) }
  8%  { opacity: 1; transform: rotate(-18deg) }
  20% { transform: rotate(14deg) }
  32% { transform: rotate(-12deg) }
  44% { transform: rotate(9deg) }
  56% { transform: rotate(-6deg) }
  68% { transform: rotate(4deg) }
  80% { transform: rotate(-2deg) }
  90% { opacity: 1; transform: rotate(0deg) }
  100%{ opacity: 0; transform: rotate(0deg) }
}
.leaf-hang { left: 252px; top: 2px; }
.leaf-win  { left: 232px; top: 112px; }

.water-drops {
  position: absolute; left: 248px; top: 24px;
  z-index: 4; pointer-events: none; opacity: 0;
}
.water-drops.active { animation: dropsFade 1.2s ease-out forwards; }
@keyframes dropsFade { 0%{opacity:0} 10%{opacity:1} 80%{opacity:0.6} 100%{opacity:0} }
.wdrop { position: absolute; font-size: 11px; animation: dropFall 1s ease-in forwards; }
@keyframes dropFall { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(28px);opacity:0} }

/* ── 整理 ── */
.sparkle-group { position: absolute; inset: 0; z-index: 4; pointer-events: none; opacity: 0; }
.sparkle-group.active { animation: sparkleFade 1.5s ease-out forwards; }
@keyframes sparkleFade { 0%{opacity:0} 8%{opacity:1} 70%{opacity:0.7} 100%{opacity:0} }
.spark {
  position: absolute; width: 5px; height: 5px; border-radius: 50%;
  animation: sparkFloat 1.2s ease-out forwards;
}
@keyframes sparkFloat { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0} }

/* ── Furniture zones ── */
.fz {
  position: absolute; z-index: 3; border-radius: 12px;
  transition: all 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
  overflow: hidden; pointer-events: none;
}
.fz.on {
  background: rgba(252, 246, 238, 0.86);
  backdrop-filter: blur(10px) saturate(1.2);
  border: 1.5px solid rgba(210, 190, 160, 0.5);
  box-shadow: 0 6px 24px rgba(130, 90, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  animation: swapIn 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
}
@keyframes swapIn { 0%{opacity:0;transform:scale(0.88)} 100%{opacity:1;transform:scale(1)} }
.fz-inner { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 6px; }
.fz-inner :deep(svg) { filter: drop-shadow(0 2px 4px rgba(100,70,30,0.18)); }

/* Slot positions (landscape 844×272 scene) */
.zsto { left: 294px; top: 21px;  width: 73px;  height: 154px; }
.zbed { left: 310px; top: 79px;  width: 139px; height: 147px; }
.zdsk { left: 450px; top: 33px;  width: 112px; height: 127px; }
.zchr { left: 434px; top: 87px;  width: 99px;  height: 77px;  }
.zlmp { left: 367px; top: 0;     width: 83px;  height: 76px;  }
.zflp { left: 450px; top: 60px;  width: 80px;  height: 170px; }

/* ── Action buttons ── */
.actbts { position: absolute; bottom: 12px; right: 14px; display: flex; gap: 8px; z-index: 5; }
.ab {
  width: 60px; height: 68px;
  background: rgba(255, 252, 248, 0.9);
  backdrop-filter: blur(10px);
  border: none; border-radius: 16px;
  box-shadow: 0 2px 12px var(--sh);
  cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  transition: transform 0.15s;
}
.ab:active { transform: scale(0.93); }
.ab.used   { opacity: 0.4; pointer-events: none; }
.ab .bi    { font-size: 20px; }
.ab .bl    { font-size: 9px; color: var(--t); letter-spacing: 0.3px; }
.ab .bc    { font-size: 8.5px; color: var(--tm); }
.ab.anim .bi { animation: btnB 0.5s ease; }
@keyframes btnB { 0%, 100% { transform: scale(1) } 40% { transform: scale(1.4) } }
</style>
