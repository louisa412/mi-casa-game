import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { CATALOG } from '../data/furnitureCatalog.js'

const CAPS      = { wood: 90, fabric: 75, deco: 60 }
const PROD_MS   = {
  wood:   15 * 60 * 1000,
  fabric: 30 * 60 * 1000,
  deco:   45 * 60 * 1000,
}
const BOOST_MS  = 30 * 60 * 1000
const BOOST_MULT = 1.5
const MAX_OFF_H  = 48
const INTER_MAX  = 3
const SAVE_KEY   = 'mi_casa_game_v3'
const LEGACY_SAVE_KEY = 'healing_room_v1'
const MATERIAL_KEYS = ['wood', 'fabric', 'deco']
const EXTRA_COPY_COST = {
  bed:     { wood: 18, fabric: 10, deco: 0 },
  desk:    { wood: 14, fabric: 0,  deco: 4 },
  chair:   { wood: 10, fabric: 8,  deco: 3 },
  cabinet: { wood: 18, fabric: 4,  deco: 4 },
  curtain: { wood: 0,  fabric: 16, deco: 6 },
  lamp:    { wood: 6,  fabric: 6,  deco: 10 },
  deco:    { wood: 4,  fabric: 0,  deco: 12 },
}

// Items with no cost are unlocked by default
const FREE_IDS = new Set(
  CATALOG.filter(i => !i.cost.wood && !i.cost.fabric && !i.cost.deco).map(i => i.id)
)

export const useGameStore = defineStore('game', () => {
  const materials    = reactive({ wood: 12, fabric: 8, deco: 5 })
  const interactions = reactive({ water: { n: 0 }, clean: { n: 0 }, lamp: { n: 0 } })
  const boost        = reactive({ on: false, end: 0 })
  const production   = reactive({
    next: Date.now() + PROD_MS.wood,
    last: {
      wood: Date.now(),
      fabric: Date.now(),
      deco: Date.now(),
    },
  })
  const dayStr       = ref(new Date().toDateString())
  const spawns       = ref([])
  const toast        = ref(null)
  const toastKey     = ref(0)
  const animating    = reactive({})
  const fx           = reactive({ lamp: false, water: false, clean: false })

  // ── Furniture inventory ─────────────────────────────────────────────────
  const ownedCounts = reactive(
    Object.fromEntries([...FREE_IDS].map(id => [id, 1]))
  )

  function isItemUnlocked(id) {
    return ownedCount(id) > 0
  }

  function ownedCount(id) {
    return ownedCounts[id] || 0
  }

  function getFurnitureCost(item) {
    const isFreeStarter = FREE_IDS.has(item.id)
    if (isFreeStarter && ownedCount(item.id) > 0) {
      return EXTRA_COPY_COST[item.category] || { wood: 8, fabric: 8, deco: 8 }
    }
    return item.cost
  }

  function canAfford(cost) {
    return materials.wood   >= (cost.wood   || 0)
        && materials.fabric >= (cost.fabric || 0)
        && materials.deco   >= (cost.deco   || 0)
  }

  function unlockItem(item) {
    const cost = getFurnitureCost(item)
    if (!canAfford(cost)) { showToast('素材不足 🪵'); return false }
    materials.wood   -= (cost.wood   || 0)
    materials.fabric -= (cost.fabric || 0)
    materials.deco   -= (cost.deco   || 0)
    ownedCounts[item.id] = ownedCount(item.id) + 1
    showToast(`✨ ${item.label} +1`)
    save()
    return true
  }

  // ── Interactions ────────────────────────────────────────────────────────
  function interact(type) {
    const inter = interactions[type]
    if (!inter || inter.n >= INTER_MAX) return
    inter.n += 1

    // Trigger visual FX
    fx[type] = false
    requestAnimationFrame(() => { fx[type] = true })

    animating[type] = true
    setTimeout(() => { animating[type] = false }, 500)

    // Activate boost
    boost.on  = true
    boost.end = Date.now() + BOOST_MS
    save()
  }

  // ── Production timer ────────────────────────────────────────────────────
  function getBoostedAmount(time) {
    const boostOn = boost.on && time <= boost.end
    return boostOn ? Math.round(1 * BOOST_MULT) : 1
  }

  function produceMaterial(key, times) {
    if (times <= 0) return 0
    let gained = 0
    for (let i = 1; i <= times; i++) {
      const intervalEnd = production.last[key] + (i * PROD_MS[key])
      const amount = getBoostedAmount(intervalEnd)
      materials[key] = Math.min(CAPS[key], materials[key] + amount)
      gained += amount
    }
    return gained
  }

  function tick() {
    const now = Date.now()
    normalizeProduction(now)

    const missedMax = MAX_OFF_H * 60 * 60 * 1000
    let totalGained = 0

    for (const key of MATERIAL_KEYS) {
      const elapsedMs = Math.min(now - production.last[key], missedMax)
      const produce   = Math.floor(elapsedMs / PROD_MS[key])
      if (produce > 0) {
        totalGained += produceMaterial(key, produce)
        production.last[key] += produce * PROD_MS[key]
      }
    }

    production.next = getNextProductionTime()
    if (totalGained > 0) {
      showToast(`素材 +${totalGained}`)
      save()
    }

    // Reset daily interactions
    const todayStr = new Date().toDateString()
    if (todayStr !== dayStr.value) {
      dayStr.value = todayStr
      Object.values(interactions).forEach(i => { i.n = 0 })
      save()
    }

    // Expire boost
    if (boost.on && now >= boost.end) { boost.on = false; save() }
  }

  // ── Spawns / Toast ───────────────────────────────────────────────────────
  function addSpawn(text, x, y) {
    const id = Date.now() + Math.random()
    spawns.value.push({ id, text, x, y })
    setTimeout(() => { spawns.value = spawns.value.filter(s => s.id !== id) }, 1400)
  }

  function showToast(msg) {
    toast.value = msg; toastKey.value++
    setTimeout(() => { toast.value = null }, 2800)
  }

  function getNextProductionTime() {
    return Math.min(...MATERIAL_KEYS.map(key => production.last[key] + PROD_MS[key]))
  }

  function normalizeProduction(now = Date.now()) {
    if (!production.last || typeof production.last !== 'object') {
      const legacyLast = Number(production.last || 0)
      const legacyNext = Number(production.next || 0)
      const migratedLast = legacyLast || (legacyNext ? legacyNext - (30 * 60 * 1000) : now)
      production.last = {
        wood: migratedLast,
        fabric: migratedLast,
        deco: migratedLast,
      }
    }

    for (const key of MATERIAL_KEYS) {
      if (!production.last[key] || production.last[key] > now) {
        production.last[key] = now
      }
    }

    production.next = getNextProductionTime()
  }

  // ── Persistence ──────────────────────────────────────────────────────────
  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      materials,
      unlockedIds: Object.keys(ownedCounts).filter(id => ownedCounts[id] > 0),
      ownedCounts,
      interactions,
      boost,
      production,
      dayStr: dayStr.value,
    }))
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
      const legacy = !d.materials ? loadLegacySave() : null
      const saveData = d.materials ? d : legacy

      if (saveData?.materials) Object.assign(materials, saveData.materials)
      if (d.unlockedIds) {
        for (const id of [...FREE_IDS, ...d.unlockedIds]) {
          if (!ownedCounts[id]) ownedCounts[id] = 1
        }
      }
      if (d.ownedCounts) Object.assign(ownedCounts, d.ownedCounts)
      if (legacy?.equipped) restoreLegacyOwnedItems(legacy.equipped)
      if (saveData?.interactions) Object.assign(interactions, saveData.interactions)
      if (saveData?.boost)        Object.assign(boost, saveData.boost)
      if (saveData?.production)   Object.assign(production, saveData.production)
      if (saveData?.dayStr)       dayStr.value = saveData.dayStr
    } catch {}
    normalizeProduction()
    save()
  }

  function loadLegacySave() {
    try {
      return JSON.parse(localStorage.getItem(LEGACY_SAVE_KEY) || 'null')
    } catch {
      return null
    }
  }

  function restoreLegacyOwnedItems(equipped) {
    const legacyIdMap = {
      chair_japanese: 'chair_wood',
      storage_japanese: 'cabinet_japanese',
      light_japanese: 'lamp_pendant',
    }

    for (const legacyId of Object.values(equipped)) {
      const catalogId = legacyIdMap[legacyId] || legacyId
      if (CATALOG.some(item => item.id === catalogId)) {
        ownedCounts[catalogId] = Math.max(ownedCount(catalogId), 1)
      }
    }
  }

  return {
    materials, interactions, boost, production, dayStr,
    spawns, toast, toastKey, animating, fx, ownedCounts,
    INTER_MAX,
    isItemUnlocked, ownedCount, getFurnitureCost, canAfford, unlockItem,
    interact, tick,
    addSpawn, showToast,
    save, load,
  }
})
