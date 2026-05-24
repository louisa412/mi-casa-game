// ══════════════════════════════════════════════════════
// 🗂️  FURNITURE CATALOG  (Dollhouse Sticker System)
// ══════════════════════════════════════════════════════

export const CATEGORIES = [
  { key: 'bed',     label: '床',   emoji: '🛏️' },
  { key: 'desk',    label: '桌子', emoji: '🪵' },
  { key: 'chair',   label: '椅子', emoji: '🪑' },
  { key: 'cabinet', label: '櫃子', emoji: '🗄️' },
  { key: 'curtain', label: '窗簾', emoji: '🪟' },
  { key: 'lamp',    label: '燈',   emoji: '💡' },
  { key: 'deco',    label: '裝飾', emoji: '🌿' },
]

export const DEFAULT_SCALES = {
  bed: 0.38, desk: 0.22, chair: 0.16, cabinet: 0.18,
  curtain: 0.20, lamp: 0.12, deco: 0.10,
}

export const DEFAULT_Y = {
  bed: 0.58, desk: 0.62, chair: 0.65, cabinet: 0.55,
  curtain: 0.40, lamp: 0.28, deco: 0.65,
}

export const CATALOG = [
  { id: 'bed_princess',     category: 'bed',     label: '公主夢幻', src: '/assets/furniture-trimmed/bed_princess.png',     cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'bed_japanese',     category: 'bed',     label: '日系木質', src: '/assets/furniture-trimmed/bed_japanese.png',     cost: { wood: 20, fabric: 10, deco:  0 } },
  { id: 'bed_nordic',       category: 'bed',     label: '北歐清新', src: '/assets/furniture-trimmed/bed_nordic.png',       cost: { wood: 22, fabric:  8, deco:  5 } },
  { id: 'bed_cream_french', category: 'bed',     label: '奶油法式', src: '/assets/furniture-trimmed/bed_cream_french.png', cost: { wood: 15, fabric: 25, deco: 10 } },
  { id: 'bed_versailles',   category: 'bed',     label: '凡爾賽',   src: '/assets/furniture-trimmed/bed_versailles.png',   cost: { wood: 25, fabric: 30, deco: 20 } },
  { id: 'bed_minimal',      category: 'bed',     label: '現代極簡', src: '/assets/furniture-trimmed/bed_minimal.png',      cost: { wood: 18, fabric:  5, deco:  0 } },
  { id: 'bed_dark_noble',   category: 'bed',     label: '暗黑貴族', src: '/assets/furniture-trimmed/bed_dark_noble.png',   cost: { wood: 28, fabric: 15, deco: 18 } },

  { id: 'desk_japanese',    category: 'desk',    label: '日系木桌', src: '/assets/furniture-trimmed/desk_japanese.png',   cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'desk_nordic',      category: 'desk',    label: '北歐白木', src: '/assets/furniture-trimmed/desk_nordic.png',     cost: { wood: 20, fabric:  5, deco:  0 } },
  { id: 'desk_industrial',  category: 'desk',    label: '工業金屬', src: '/assets/furniture-trimmed/desk_industrial.png', cost: { wood: 25, fabric:  0, deco:  8 } },
  { id: 'desk_french',      category: 'desk',    label: '法式雕花', src: '/assets/furniture-trimmed/desk_french.png',     cost: { wood: 18, fabric: 10, deco: 15 } },
  { id: 'desk_minimal',     category: 'desk',    label: '現代極簡', src: '/assets/furniture-trimmed/desk_minimal.png',    cost: { wood: 15, fabric:  0, deco:  0 } },
  { id: 'desk_study',       category: 'desk',    label: '書房大桌', src: '/assets/furniture-trimmed/desk_study.png',      cost: { wood: 28, fabric:  5, deco:  5 } },
  { id: 'desk_round',       category: 'desk',    label: '小圓桌',   src: '/assets/furniture-trimmed/desk_round.png',      cost: { wood: 12, fabric:  0, deco:  8 } },

  { id: 'chair_wood',       category: 'chair',   label: '木椅經典', src: '/assets/furniture-trimmed/chair_wood.png',   cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'chair_fabric',     category: 'chair',   label: '布面軟椅', src: '/assets/furniture-trimmed/chair_fabric.png', cost: { wood:  8, fabric: 18, deco:  5 } },
  { id: 'chair_industrial', category: 'chair',   label: '工業金屬', src: '/assets/furniture-trimmed/chair_industrial.png', cost: { wood: 15, fabric:  0, deco:  8 } },
  { id: 'chair_french',     category: 'chair',   label: '法式優雅', src: '/assets/furniture-trimmed/chair_french.png',     cost: { wood: 10, fabric: 15, deco: 12 } },
  { id: 'chair_modern',     category: 'chair',   label: '現代設計', src: '/assets/furniture-trimmed/chair_modern.png',     cost: { wood: 12, fabric:  8, deco:  5 } },
  { id: 'chair_rattan',     category: 'chair',   label: '藤編療癒', src: '/assets/furniture-trimmed/chair_rattan.png',     cost: { wood:  8, fabric:  5, deco: 10 } },

  { id: 'cabinet_japanese',   category: 'cabinet', label: '日系木櫃', src: '/assets/furniture-trimmed/cabinet_japanese.png', cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'cabinet_nordic',     category: 'cabinet', label: '北歐白櫃', src: '/assets/furniture-trimmed/cabinet_nordic.png',   cost: { wood: 25, fabric:  5, deco:  5 } },
  { id: 'cabinet_industrial', category: 'cabinet', label: '工業鐵櫃', src: '/assets/furniture-trimmed/cabinet_industrial.png', cost: { wood: 30, fabric:  0, deco: 10 } },
  { id: 'cabinet_french',     category: 'cabinet', label: '法式雕花', src: '/assets/furniture-trimmed/cabinet_french.png',     cost: { wood: 22, fabric: 12, deco: 18 } },
  { id: 'cabinet_minimal',    category: 'cabinet', label: '現代極簡', src: '/assets/furniture-trimmed/cabinet_minimal.png',    cost: { wood: 20, fabric:  0, deco:  0 } },
  { id: 'cabinet_shelf',      category: 'cabinet', label: '開放層架', src: '/assets/furniture-trimmed/cabinet_shelf.png',      cost: { wood: 18, fabric:  0, deco:  8 } },

  { id: 'curtain_navy',          category: 'curtain', label: '深藍厚簾', src: '/assets/furniture-trimmed/curtain_navy.png',          cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'curtain_sheer',         category: 'curtain', label: '日系薄紗', src: '/assets/furniture-trimmed/curtain_sheer.png',         cost: { wood:  0, fabric: 15, deco:  5 } },
  { id: 'curtain_french_double', category: 'curtain', label: '法式雙層', src: '/assets/furniture-trimmed/curtain_french_double.png', cost: { wood:  5, fabric: 22, deco: 12 } },
  { id: 'curtain_princess_lace', category: 'curtain', label: '公主蕾絲', src: '/assets/furniture-trimmed/curtain_princess_lace.png', cost: { wood:  0, fabric: 28, deco: 15 } },
  { id: 'curtain_blinds',        category: 'curtain', label: '百葉窗',   src: '/assets/furniture-trimmed/curtain_blinds.png',        cost: { wood: 18, fabric:  8, deco:  0 } },
  { id: 'curtain_palace',        category: 'curtain', label: '皇宮華麗', src: '/assets/furniture-trimmed/curtain_palace.png',        cost: { wood: 10, fabric: 35, deco: 25 } },

  { id: 'lamp_pendant',    category: 'lamp', label: '吊燈',   src: '/assets/furniture-trimmed/lamp_pendant.png',  cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'lamp_table',      category: 'lamp', label: '檯燈',   src: '/assets/furniture-trimmed/lamp_table.png',    cost: { wood:  5, fabric:  8, deco: 12 } },
  { id: 'lamp_floor',      category: 'lamp', label: '落地燈', src: '/assets/furniture-trimmed/lamp_floor.png',      cost: { wood: 12, fabric: 10, deco:  8 } },
  { id: 'lamp_crystal',    category: 'lamp', label: '水晶燈', src: '/assets/furniture-trimmed/lamp_crystal.png',    cost: { wood:  5, fabric:  0, deco: 25 } },
  { id: 'lamp_industrial', category: 'lamp', label: '工業燈', src: '/assets/furniture-trimmed/lamp_industrial.png', cost: { wood: 18, fabric:  0, deco: 10 } },
  { id: 'lamp_nightlight', category: 'lamp', label: '小夜燈', src: '/assets/furniture-trimmed/lamp_nightlight.png', cost: { wood:  5, fabric:  8, deco: 15 } },

  { id: 'deco_plant',    category: 'deco', label: '植物盆栽', src: '/assets/furniture-trimmed/deco_plant.png',    cost: { wood:  0, fabric:  0, deco:  0 } },
  { id: 'deco_bouquet',  category: 'deco', label: '花束',     src: '/assets/furniture-trimmed/deco_bouquet.png',  cost: { wood:  0, fabric:  5, deco: 15 } },
  { id: 'deco_candle',   category: 'deco', label: '香氛蠟燭', src: '/assets/furniture-trimmed/deco_candle.png',   cost: { wood:  5, fabric:  0, deco: 10 } },
  { id: 'deco_books',    category: 'deco', label: '書本堆',   src: '/assets/furniture-trimmed/deco_books.png',    cost: { wood: 12, fabric:  0, deco:  8 } },
  { id: 'deco_figurine', category: 'deco', label: '小雕像',   src: '/assets/furniture-trimmed/deco_figurine.png', cost: { wood:  8, fabric:  5, deco: 18 } },
  { id: 'deco_vinyl',    category: 'deco', label: '黑膠音響', src: '/assets/furniture-trimmed/deco_vinyl.png',    cost: { wood: 15, fabric:  0, deco: 12 } },
  { id: 'deco_crystal',  category: 'deco', label: '水晶球',   src: '/assets/furniture-trimmed/deco_crystal.png',  cost: { wood:  0, fabric:  0, deco: 22 } },
]

export const CATALOG_MAP = Object.fromEntries(CATALOG.map(item => [item.id, item]))
