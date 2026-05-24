<template>
  <div class="tbar">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="ti"
      :class="{ a: activeTab === tab.id }"
      @click="$emit('change', tab.id)"
    >
      <span class="ico">{{ tab.icon }}</span>
      <span class="lbl">{{ tab.label }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ activeTab: String })
defineEmits(['change'])

const tabs = [
  { id: 'room',      icon: '🏠', label: '房間' },
  { id: 'furniture', icon: '🛋️', label: '家具' },
  { id: 'material',  icon: '🌾', label: '素材' },
]
</script>

<style scoped>
.tbar {
  height: 62px;
  flex-shrink: 0;
  background: rgba(253, 250, 246, 0.96);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(200, 190, 220, 0.25);
  display: flex;
  align-items: center;
  padding: 0 32px;
  z-index: 10;
}
.ti {
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center; gap: 3px;
  cursor: pointer; padding: 6px 0;
  border-radius: 14px;
  transition: background 0.2s;
}
.ti.a   { background: var(--pb); }
.ico    { font-size: 21px; }
.lbl    { font-size: 12px; color: var(--tm); letter-spacing: 0.2px; }
.ti.a .lbl { color: var(--p); font-weight: 500; }
</style>
