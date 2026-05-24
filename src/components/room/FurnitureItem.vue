<template>
  <div
    class="furniture-item"
    :class="{ selected: isSelected }"
    :style="itemStyle"
    @pointerdown.stop="onPointerDown"
  >
    <img
      :src="item.src"
      :alt="item.label"
      draggable="false"
      @error="onImgError"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFurnitureStore } from '../../stores/furnitureStore.js'

const props = defineProps({
  item:       { type: Object,  required: true },
  stageW:     { type: Number,  required: true },
  stageH:     { type: Number,  required: true },
})

const furStore = useFurnitureStore()
const isSelected = computed(() => furStore.selectedId === props.item.id)

const itemStyle = computed(() => ({
  position:  'absolute',
  left:      (props.item.x * 100) + '%',
  top:       (props.item.y * 100) + '%',
  width:     (props.item.scale * 100) + '%',
  height:    'auto',
  transform: `translate(-50%, -50%) scaleX(${props.item.scaleX ?? 1})`,
  zIndex:    props.item.zIndex,
  cursor:    'grab',
  touchAction: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
}))

// ── Drag ─────────────────────────────────────────────────────────────────
const isDragging = ref(false)
let startPointerX = 0
let startPointerY = 0
let startItemX    = 0
let startItemY    = 0

function onPointerDown(e) {
  e.preventDefault()
  furStore.select(props.item.id)

  isDragging.value = true
  startPointerX = e.clientX
  startPointerY = e.clientY
  startItemX    = props.item.x
  startItemY    = props.item.y

  window.addEventListener('pointermove', onPointerMove, { passive: false })
  window.addEventListener('pointerup',   onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(e) {
  if (!isDragging.value) return
  e.preventDefault()

  const dx = (e.clientX - startPointerX) / props.stageW
  const dy = (e.clientY - startPointerY) / props.stageH

  furStore.updatePos(
    props.item.id,
    startItemX + dx,
    startItemY + dy,
  )
}

function onPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false
  furStore.save()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup',   onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
}

function onImgError(e) {
  // Show a placeholder square when image is missing
  e.target.style.display = 'none'
  const parent = e.target.parentElement
  if (!parent.querySelector('.placeholder')) {
    const ph = document.createElement('div')
    ph.className = 'placeholder'
    ph.textContent = props.item.label[0]
    parent.appendChild(ph)
  }
}
</script>

<style scoped>
.furniture-item {
  position: absolute;
  line-height: 0;
  transition: filter 0.12s;
}

.furniture-item img {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
  /* Sticker-style drop shadow */
  filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.22));
}

.furniture-item.selected {
  outline: 2px solid rgba(180, 140, 220, 0.85);
  outline-offset: 2px;
  border-radius: 4px;
}

.furniture-item.selected img {
  filter: drop-shadow(0px 4px 8px rgba(150, 100, 200, 0.45));
}

.furniture-item :deep(.placeholder) {
  width: 60px;
  height: 60px;
  background: rgba(200, 180, 230, 0.5);
  border: 2px dashed rgba(150, 120, 200, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #9a8eb8;
}
</style>
