<template>
  <div class="slot-panel">
    <div
      v-for="[slot, cfg] in slots"
      :key="slot"
      class="slot-row"
      :class="{ active: store.selectedSlot === slot }"
      @click="store.select(slot)"
    >
      <span class="slot-emoji">{{ cfg.emoji }}</span>

      <div class="slot-info">
        <div class="slot-name">{{ cfg.label }}</div>
        <div class="slot-var">{{ store.getVariant(slot).label }}</div>
      </div>

      <div class="var-switcher" @click.stop>
        <button class="var-btn" @click="store.changeVariant(slot, -1)">‹</button>
        <span class="var-count">
          {{ store.positions[slot].varIndex + 1 }} / {{ cfg.variants.length }}
        </span>
        <button class="var-btn" @click="store.changeVariant(slot, +1)">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATALOG } from '@/data/furnitureCatalog'
import { useFurnitureStore } from '@/stores/furnitureStore'

const store = useFurnitureStore()
const slots = computed(() => Object.entries(CATALOG))
</script>

<style scoped>
.slot-panel {
  width: 100%;
  max-width: 900px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slot-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  color: #f0e6ff;
}
.slot-row:hover  { background: rgba(255,255,255,0.07); }
.slot-row.active { background: rgba(147,112,219,0.18); border-color: rgba(147,112,219,0.6); }

.slot-emoji { font-size: 18px; width: 26px; text-align: center; flex-shrink: 0; }

.slot-info  { flex: 1; min-width: 0; }
.slot-name  { font-size: 13px; font-weight: 700; }
.slot-var   { font-size: 11px; color: rgba(240,230,255,0.5); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.var-switcher { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.var-btn {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #f0e6ff;
  font-size: 14px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
  font-family: inherit;
}
.var-btn:hover { background: rgba(147,112,219,0.5); }
.var-count { font-size: 11px; color: rgba(240,230,255,0.45); min-width: 32px; text-align: center; }
</style>
