<template>
  <div class="pov" @click.self="$emit('close')">
    <div class="pnl">
      <div class="ph" />
      <div class="ptitle">家具替換</div>

      <div v-for="slot in slots" :key="slot" class="ssec">
        <div class="stit">{{ SLOT_NAMES[slot] }}</div>
        <div class="fcards">
          <div
            v-for="item in itemsBySlot(slot)"
            :key="item.id"
            class="fc"
            :class="{ eq: isEquipped(item) }"
          >
            <div v-if="isEquipped(item)" class="ebdg">使用中</div>
            <div class="fp" v-html="CARD_SVGS[item.id]" />
            <div class="fn">{{ item.name }}</div>
            <div class="fst">{{ item.style }}</div>
            <div class="fd">{{ item.desc }}</div>
            <div class="fco">
              <span class="ct" :class="{ bad: materials.wood   < item.cost.wood   }">🪵 {{ item.cost.wood }}</span>
              <span class="ct" :class="{ bad: materials.fabric < item.cost.fabric }">🧶 {{ item.cost.fabric }}</span>
              <span class="ct" :class="{ bad: materials.deco   < item.cost.deco   }">🌿 {{ item.cost.deco }}</span>
            </div>
            <button
              v-if="!isEquipped(item)"
              class="eqbtn"
              :disabled="!store.canAfford(item.cost)"
              @click="store.equipFurniture(item)"
            >
              {{ store.canAfford(item.cost) ? '替換此家具' : '素材不足' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js'
import { FURNITURE, SLOT_NAMES, CARD_SVGS } from '../data/furniture.js'

defineEmits(['close'])

const store = useGameStore()
const { materials, equipped } = store

const slots = Object.keys(SLOT_NAMES)
const itemsBySlot = (slot) => FURNITURE.filter(f => f.slot === slot)
const isEquipped  = (item) => equipped[item.slot] === item.id
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
.ptitle { font-size: 14px; font-weight: 600; color: var(--t); margin-bottom: 14px; letter-spacing: 0.5px; }
.ssec   { margin-bottom: 18px; }
.stit   { font-size: 9.5px; color: var(--tm); letter-spacing: 1px; margin-bottom: 8px; display: flex; align-items: center; gap: 7px; }
.stit::after { content: ''; flex: 1; height: 1px; background: rgba(200, 190, 220, 0.3); }

.fcards { display: flex; gap: 9px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
.fcards::-webkit-scrollbar { display: none; }

.fc {
  flex-shrink: 0; width: 140px;
  background: #f7f0e6; border-radius: 14px;
  padding: 12px; cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.15s;
  position: relative;
}
.fc:active { transform: scale(0.97); }
.fc.eq     { border-color: var(--ps); background: #f0eaf8; }

.fp   { height: 64px; display: flex; align-items: center; justify-content: center; margin-bottom: 9px; }
.fp :deep(svg) { max-width: 68px; max-height: 60px; }
.fn   { font-size: 11.5px; color: var(--t); font-weight: 600; margin-bottom: 2px; }
.fst  { font-size: 9px; color: var(--tm); margin-bottom: 5px; }
.fd   { font-size: 9px; color: var(--tm); line-height: 1.55; margin-bottom: 7px; }
.fco  { display: flex; gap: 4px; flex-wrap: wrap; }

.ct     { font-size: 9px; background: rgba(200, 190, 220, 0.2); color: var(--t); border-radius: 5px; padding: 2px 5px; }
.ct.bad { color: #c05050; background: rgba(200, 80, 80, 0.1); }

.ebdg { position: absolute; top: 7px; right: 7px; font-size: 8px; background: var(--ps); color: #5a4880; border-radius: 5px; padding: 2px 5px; }
.eqbtn {
  width: 100%; background: var(--pb); border: none;
  border-radius: 7px; padding: 5px;
  font-family: inherit; font-size: 10px; color: var(--p);
  cursor: pointer; margin-top: 4px;
}
.eqbtn:hover    { background: #cec2e8; }
.eqbtn:disabled { opacity: 0.5; cursor: default; }
</style>
