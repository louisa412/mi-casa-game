import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ROOMS, ROOMS_MAP } from '../data/roomCatalog.js'

const SAVE_KEY = 'mi_casa_room_v1'

export const useRoomStore = defineStore('room', () => {
  const currentRoomId  = ref(ROOMS[0].id)
  const unlockedRoomIds = ref(new Set([ROOMS[0].id]))

  const currentRoom = computed(() => ROOMS_MAP[currentRoomId.value] ?? ROOMS[0])

  function isRoomUnlocked(id) {
    return unlockedRoomIds.value.has(id)
  }

  function switchRoom(id) {
    if (!isRoomUnlocked(id)) return false
    currentRoomId.value = id
    save()
    return true
  }

  // Returns true on success, false if can't afford
  function unlockRoom(room, materials) {
    if (isRoomUnlocked(room.id)) { switchRoom(room.id); return true }
    const { wood = 0, fabric = 0, deco = 0 } = room.cost
    if (materials.wood < wood || materials.fabric < fabric || materials.deco < deco) return false
    materials.wood   -= wood
    materials.fabric -= fabric
    materials.deco   -= deco
    unlockedRoomIds.value = new Set([...unlockedRoomIds.value, room.id])
    switchRoom(room.id)
    save()
    return true
  }

  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      currentRoomId:    currentRoomId.value,
      unlockedRoomIds:  [...unlockedRoomIds.value],
    }))
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
      if (d.currentRoomId)   currentRoomId.value  = d.currentRoomId
      if (d.unlockedRoomIds) unlockedRoomIds.value = new Set([ROOMS[0].id, ...d.unlockedRoomIds])
    } catch {}
  }

  return {
    currentRoomId, currentRoom, unlockedRoomIds,
    isRoomUnlocked, switchRoom, unlockRoom,
    save, load,
  }
})
