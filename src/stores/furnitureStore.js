import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CATALOG_MAP, DEFAULT_SCALES, DEFAULT_Y } from '../data/furnitureCatalog.js'

const SAVE_KEY = 'mi_casa_furniture_v3'

export const useFurnitureStore = defineStore('furniture', () => {
  const placedItems = ref([])
  const selectedId  = ref(null)

  const selectedItem = computed(() =>
    placedItems.value.find(i => i.id === selectedId.value) ?? null
  )

  function placedCount(catalogId) {
    return placedItems.value.filter(i => i.catalogId === catalogId).length
  }

  function addItem(catalogItem) {
    const maxZ = placedItems.value.reduce((m, i) => Math.max(m, i.zIndex), 0)
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    placedItems.value.push({
      id,
      catalogId: catalogItem.id,
      category:  catalogItem.category,
      label:     catalogItem.label,
      src:       catalogItem.src,
      x:      0.5,
      y:      DEFAULT_Y[catalogItem.category] ?? 0.55,
      scale:  DEFAULT_SCALES[catalogItem.category] ?? 0.18,
      scaleX: 1.0,   // horizontal stretch multiplier (1 = no stretch)
      zIndex: maxZ + 1,
    })
    selectedId.value = id
    save()
  }

  function removeItem(id) {
    placedItems.value = placedItems.value.filter(i => i.id !== id)
    if (selectedId.value === id) selectedId.value = null
    save()
  }

  function updatePos(id, x, y) {
    const item = placedItems.value.find(i => i.id === id)
    if (!item) return
    item.x = Math.max(0, Math.min(1, x))
    item.y = Math.max(0, Math.min(1, y))
  }

  function adjustScale(id, delta) {
    const item = placedItems.value.find(i => i.id === id)
    if (!item) return
    item.scale = Math.max(0.05, Math.min(0.9, item.scale + delta))
    save()
  }

  function adjustScaleX(id, delta) {
    const item = placedItems.value.find(i => i.id === id)
    if (!item) return
    item.scaleX = Math.max(0.3, Math.min(4.0, (item.scaleX ?? 1) + delta))
    save()
  }

  function bringForward(id) {
    const item = placedItems.value.find(i => i.id === id)
    if (item) { item.zIndex += 1; save() }
  }

  function sendBack(id) {
    const item = placedItems.value.find(i => i.id === id)
    if (item) { item.zIndex = Math.max(1, item.zIndex - 1); save() }
  }

  function select(id) { selectedId.value = id }

  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(placedItems.value))
  }

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(SAVE_KEY) || '[]')
      if (Array.isArray(data)) {
        placedItems.value = data.map(item => ({
          ...item,
          src: CATALOG_MAP[item.catalogId]?.src ?? item.src,
        }))
      }
    } catch {}
  }

  function reset() {
    placedItems.value = []
    selectedId.value  = null
    save()
  }

  return {
    placedItems, selectedId, selectedItem,
    placedCount,
    addItem, removeItem, updatePos, adjustScale, adjustScaleX,
    bringForward, sendBack, select,
    save, load, reset,
  }
})
