<template>
  <div class="tray" @pointerdown.stop>

    <!-- Category tabs -->
    <div class="cat-tabs">
      <button
        v-for="cat in CATEGORIES"
        :key="cat.key"
        class="cat-tab"
        :class="{ active: activeCat === cat.key }"
        @click="activeCat = cat.key"
      >
        <span>{{ cat.emoji }}</span>
        <span class="cat-label">{{ cat.label }}</span>
      </button>
    </div>

    <!-- Item grid -->
    <div class="item-grid">
      <div
        v-for="item in categoryItems"
        :key="item.id"
        class="item-card"
        :class="{
          locked: ownedCount(item) === 0,
          exhausted: ownedCount(item) > 0 && availableCount(item) <= 0,
        }"
        @click="onItemTap(item)"
      >
        <div class="item-img-wrap">
          <img :src="item.src" :alt="item.label" @error="onImgError" />
          <div class="count-badge">{{ placedCount(item) }}/{{ ownedCount(item) }}</div>
          <div v-if="availableCount(item) <= 0" class="lock-overlay">
            <div class="lock-icon">{{ ownedCount(item) === 0 ? '🔒' : '+1' }}</div>
            <div class="lock-cost">
              <span v-if="itemCost(item).wood">🪵{{ itemCost(item).wood }}</span>
              <span v-if="itemCost(item).fabric">🧶{{ itemCost(item).fabric }}</span>
              <span v-if="itemCost(item).deco">🌿{{ itemCost(item).deco }}</span>
              <span v-if="!itemCost(item).wood && !itemCost(item).fabric && !itemCost(item).deco">免費</span>
            </div>
          </div>
        </div>
        <div class="item-name">{{ item.label }}</div>
      </div>
    </div>

    <!-- Close -->
    <button class="close-btn" @click="$emit('close')">✕ 完成</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore }      from '../stores/game.js'
import { useFurnitureStore } from '../stores/furnitureStore.js'
import { CATEGORIES, CATALOG } from '../data/furnitureCatalog.js'

defineEmits(['close'])

const game    = useGameStore()
const furStore = useFurnitureStore()

const activeCat = ref(CATEGORIES[0].key)

const categoryItems = computed(() =>
  CATALOG.filter(i => i.category === activeCat.value)
)

function onItemTap(item) {
  if (availableCount(item) <= 0) {
    if (!game.unlockItem(item)) return
  }
  furStore.addItem(item)
  // Don't close tray so user can add more
}

function ownedCount(item) {
  return game.ownedCount(item.id)
}

function placedCount(item) {
  return furStore.placedCount(item.id)
}

function availableCount(item) {
  return ownedCount(item) - placedCount(item)
}

function itemCost(item) {
  return game.getFurnitureCost(item)
}

function onImgError(e) {
  e.target.style.opacity = '0.3'
}
</script>

<style scoped>
.tray {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 25;
  background: rgba(253, 250, 246, 0.96);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(200, 190, 220, 0.35);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 24px rgba(60, 40, 80, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 68%;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* ── Category tabs ─────────────────────────────────────────────── */
.cat-tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px 6px;
  overflow-x: auto;
  flex-shrink: 0;
  scrollbar-width: none;
}
.cat-tabs::-webkit-scrollbar { display: none; }

.cat-tab {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 10px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: var(--tm);
  cursor: pointer;
  font-size: 16px;
  transition: background 0.15s;
}
.cat-tab .cat-label {
  font-size: 11px;
  letter-spacing: 0.1px;
}
.cat-tab.active {
  background: var(--pb);
  color: var(--t);
}

/* ── Item grid ─────────────────────────────────────────────────── */
.item-grid {
  display: flex;
  gap: 8px;
  padding: 8px 12px 10px;
  overflow-x: auto;
  flex: 1;
  align-items: flex-start;
  scrollbar-width: none;
}
.item-grid::-webkit-scrollbar { display: none; }

.item-card {
  flex-shrink: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.12s;
}
.item-card:active { transform: scale(0.95); }

.item-img-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  background: rgba(220, 215, 235, 0.4);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(200, 190, 230, 0.3);
}
.item-img-wrap img {
  max-width: 85%;
  max-height: 85%;
  object-fit: contain;
  display: block;
}

.lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(240, 235, 250, 0.78);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 13px;
}
.lock-icon { font-size: 18px; }
.count-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  min-width: 28px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  background: rgba(253, 250, 246, 0.92);
  color: var(--t);
  box-shadow: 0 1px 6px rgba(60, 40, 80, 0.18);
  font-size: 10.5px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  z-index: 2;
}
.lock-cost {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
  font-size: 10.5px;
  color: var(--tm);
  font-weight: 600;
}
.lock-cost span { white-space: nowrap; }

.item-card.locked .item-img-wrap {
  opacity: 0.65;
}
.item-card.exhausted .item-img-wrap {
  opacity: 0.82;
}

.item-name {
  font-size: 12px;
  color: var(--t);
  text-align: center;
  line-height: 1.2;
}

/* ── Close button ─────────────────────────────────────────────── */
.close-btn {
  flex-shrink: 0;
  margin: 0 12px 10px;
  height: 36px;
  border: none;
  border-radius: 18px;
  background: var(--pb);
  color: var(--t);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.close-btn:active { background: var(--ps); }
</style>
