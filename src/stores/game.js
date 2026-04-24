import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

const CAPS = { wood: 90, fabric: 75, deco: 60 }
const PROD_MS = 30 * 60 * 1000
const BOOST_MS = 30 * 60 * 1000
const BOOST_MULT = 1.5
const MAX_OFF_H = 48
const INTER_MAX = 3
const SAVE_KEY = 'healing_room_v1'

export const useGameStore = defineStore('game', () => {
  // ── State ─────────────────────────────────────────────────────
  const materials = reactive({ wood: 12, fabric: 8, deco: 5 })
  const equipped = reactive({
    bed: 'bed_japanese',
    desk: 'desk_japanese',
    chair: 'chair_japanese',
    storage: 'storage_japanese',
    light: 'light_japanese',
  })
  const interactions = reactive({
    water: { n: 0 },
    clean: { n: 0 },
    lamp:  { n: 0 },
  })
  const boost = reactive({ on: false, end: 0 })
  const production = reactive({ next: Date.now() + PROD_MS, last: Date.now() })
  const dayStr = ref(new Date().toDateString())
  const spawns = ref([])
  const toast = ref(null)
  const toastKey = ref(0)
  const animating = reactive({})
  // Animation FX flags (水/整理/燈)
  const fx = reactive({ lamp: false, water: false, clean: false })

  // ── Persistence ───────────────────────────────────────────────
  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      materials, equipped, interactions, boost, production, dayStr: dayStr.value,
    }))
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
      if (d.materials)    Object.assign(materials, d.materials)
      if (d.equipped)     Object.assign(equipped, d.equipped)
      if (d.interactions) Object.assign(interactions, d.interactions)
      if (d.boost)        Object.assign(boost, d.boost)
      if (d.production)   Object.assign(production, d.production)
      if (d.dayStr)       dayStr.value = d.dayStr
    } catch (e) { /* fresh start */ }
  }

  // ── Helpers ───────────────────────────────────────────────────
  function addSpawn(text, x, y) {
    const id = Date.now() + Math.random()
    spawns.value.push({ id, text, x, y })
    setTimeout(() => {
      spawns.value = spawns.value.filter(s => s.id !== id)
    }, 1400)
  }

  function showToast(msg) {
    toast.value = msg
    toastKey.value++
    setTimeout(() => { toast.value = null }, 2800)
  }

  // ── Production tick ───────────────────────────────────────────
  function tick() {
    const now = Date.now()
    if (boost.on && now >= boost.end) boost.on = false

    const elapsed = Math.min(now - production.last, MAX_OFF_H * 3_600_000)
    const ticks = Math.floor(elapsed / PROD_MS)

    if (ticks > 0) {
      const prev = { ...materials }
      materials.wood   = Math.min(CAPS.wood,   materials.wood   + ticks)
      materials.fabric = Math.min(CAPS.fabric, materials.fabric + ticks)
      materials.deco   = Math.min(CAPS.deco,   materials.deco   + ticks)
      production.last += ticks * PROD_MS

      if (materials.wood   > prev.wood)   addSpawn(`+${ticks} 木材`, 200, 60)
      if (materials.fabric > prev.fabric) addSpawn(`+${ticks} 布料`, 380, 60)
      if (materials.deco   > prev.deco)   addSpawn(`+${ticks} 裝飾`, 560, 60)
    }

    production.next = production.last + PROD_MS

    // Daily reset
    const today = new Date().toDateString()
    if (dayStr.value !== today) {
      interactions.water.n = 0
      interactions.clean.n = 0
      interactions.lamp.n  = 0
      dayStr.value = today
      showToast('新的一天，互動次數已重置 ✨')
    }
  }

  // ── Interaction (澆水/整理/點燈) ──────────────────────────────
  function triggerFx(type) {
    fx[type] = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { fx[type] = true })
    })
    setTimeout(() => { fx[type] = false }, 2200)
  }

  function interact(type) {
    const i = interactions[type]
    if (i.n >= INTER_MAX) return

    i.n++
    boost.on  = true
    boost.end = Date.now() + BOOST_MS

    const boostedNext = production.last + Math.round(PROD_MS / BOOST_MULT)
    if (boostedNext < production.next) production.next = boostedNext

    animating[type] = true
    setTimeout(() => { animating[type] = false }, 600)

    triggerFx(type)

    const labels = {
      water: '澆水加速了素材生長 🌱',
      clean: '整理帶來清新氣息 ✨',
      lamp:  '點燈讓空間更溫暖 🕯️',
    }
    showToast(labels[type])
    save()
  }

  // ── Furniture equip ───────────────────────────────────────────
  function canAfford(cost) {
    return materials.wood >= cost.wood &&
           materials.fabric >= cost.fabric &&
           materials.deco >= cost.deco
  }

  function equipFurniture(item) {
    if (equipped[item.slot] === item.id) return
    if (!canAfford(item.cost)) {
      showToast('素材不足，無法替換家具')
      return
    }
    materials.wood   -= item.cost.wood
    materials.fabric -= item.cost.fabric
    materials.deco   -= item.cost.deco
    equipped[item.slot] = item.id
    showToast(`已換上「${item.name}」`)
    save()
  }

  return {
    materials, equipped, interactions, boost, production,
    spawns, toast, toastKey, animating, fx,
    save, load, tick, interact, equipFurniture, canAfford,
    INTER_MAX,
  }
})
