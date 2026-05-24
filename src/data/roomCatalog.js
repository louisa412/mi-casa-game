// ══════════════════════════════════════════════════════
// 🏠  ROOM CATALOG
//  新增房間：在 ROOMS array 加一筆即可
//  cost: 解鎖素材成本，第一間永遠免費
// ══════════════════════════════════════════════════════

export const ROOMS = [
  {
    id:    'room_princess',
    label: '公主玫瑰房',
    src:   '/assets/rooms/room_princess.png',
    cost:  { wood: 0, fabric: 0, deco: 0 },
  },
]

export const ROOMS_MAP = Object.fromEntries(ROOMS.map(r => [r.id, r]))
