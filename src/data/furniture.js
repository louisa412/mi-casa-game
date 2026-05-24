export const SLOT_NAMES = {
  bed: '床', desk: '書桌', chair: '椅子', storage: '收納', light: '燈具',
}

export const FURNITURE = [
  { id: 'bed_japanese',     slot: 'bed',     name: '日式木床',   style: '日系白木', desc: '低矮榻榻米風格，帶來靜謐睡眠。',       cost: { wood: 0,  fabric: 0,  deco: 0  } },
  { id: 'bed_cream',        slot: 'bed',     name: '奶油軟床',   style: '奶油柔和', desc: '圓弧床架，鵝絨床品如雲般包覆。',       cost: { wood: 15, fabric: 14, deco: 6  } },
  { id: 'desk_japanese',    slot: 'desk',    name: '日式木桌',   style: '日系白木', desc: '簡約原木書桌，讓思緒清晰沉靜。',       cost: { wood: 0,  fabric: 0,  deco: 0  } },
  { id: 'desk_cream',       slot: 'desk',    name: '奶油書桌',   style: '奶油柔和', desc: '米白塗裝，搭配柔軟曲線的小書桌。',     cost: { wood: 12, fabric: 5,  deco: 8  } },
  { id: 'chair_japanese',   slot: 'chair',   name: '日式木椅',   style: '日系白木', desc: '輕巧原木椅，坐感自然舒適。',           cost: { wood: 0,  fabric: 0,  deco: 0  } },
  { id: 'chair_cream',      slot: 'chair',   name: '奶油圓椅',   style: '奶油柔和', desc: '圓弧椅背，柔軟坐墊像輕柔的擁抱。',     cost: { wood: 7,  fabric: 10, deco: 4  } },
  { id: 'storage_japanese', slot: 'storage', name: '日式書架',   style: '日系白木', desc: '開放式木層架，展示美好小物。',         cost: { wood: 0,  fabric: 0,  deco: 0  } },
  { id: 'storage_cream',    slot: 'storage', name: '奶油置物架', style: '奶油柔和', desc: '圓拱格柵設計，溫柔收納日常。',         cost: { wood: 10, fabric: 4,  deco: 10 } },
  { id: 'light_japanese',   slot: 'light',   name: '日式吊燈',   style: '日系白木', desc: '竹編燈罩，暈出柔暖金黃光線。',         cost: { wood: 0,  fabric: 0,  deco: 0  } },
  { id: 'light_cream',      slot: 'light',   name: '奶油落地燈', style: '奶油柔和', desc: '弧形燈桿，柔霧燈罩散發淡雅光芒。',     cost: { wood: 4,  fabric: 7,  deco: 12 } },
]

// ── CARD SVGs ─────────────────────────────────────────────────────────────────
// 必須帶 width/height，否則瀏覽器預設 300×150 會被 container 擠掉
export const CARD_SVGS = {

bed_japanese: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="33" width="52" height="8" rx="2" fill="#c8a272"/>
  <rect x="8" y="29" width="52" height="5" rx="2" fill="#d4af88"/>
  <rect x="8" y="16" width="13" height="15" rx="2" fill="#b8924a"/>
  <rect x="23" y="18" width="37" height="13" rx="3" fill="#f0e6d2"/>
  <rect x="25" y="20" width="11" height="8" rx="3" fill="#ffffff" opacity="0.9"/>
  <rect x="38" y="21" width="10" height="7" rx="3" fill="#ede3d5" opacity="0.8"/>
  <rect x="10" y="41" width="4" height="9" rx="1.5" fill="#a07840"/>
  <rect x="54" y="41" width="4" height="9" rx="1.5" fill="#a07840"/>
</svg>`,

bed_cream: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="31" width="56" height="12" rx="6" fill="#ddd0c0"/>
  <rect x="6" y="13" width="15" height="21" rx="7" fill="#d4c8b8"/>
  <rect x="23" y="15" width="37" height="18" rx="5" fill="#f4ede4"/>
  <rect x="25" y="17" width="12" height="9" rx="4" fill="#ffffff" opacity="0.9"/>
  <rect x="40" y="17" width="12" height="9" rx="4" fill="#ede6de" opacity="0.82"/>
  <rect x="23" y="27" width="37" height="5" rx="2" fill="#e0d4c4"/>
  <rect x="8" y="43" width="5" height="9" rx="2.5" fill="#c8bcac"/>
  <rect x="55" y="43" width="5" height="9" rx="2.5" fill="#c8bcac"/>
</svg>`,

desk_japanese: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="7" y="21" width="54" height="6" rx="2" fill="#c8a272"/>
  <rect x="9" y="27" width="5" height="26" rx="2" fill="#b8924a"/>
  <rect x="54" y="27" width="5" height="26" rx="2" fill="#b8924a"/>
  <rect x="9" y="38" width="50" height="4" rx="2" fill="#c8a272" opacity="0.7"/>
  <rect x="36" y="13" width="6" height="8" rx="1.5" fill="#8baad4"/>
  <rect x="43" y="14" width="5" height="7" rx="1.5" fill="#d09898"/>
  <ellipse cx="20" cy="18" rx="4" ry="3.5" fill="#7ab888"/>
  <rect x="19" y="20" width="2.5" height="3" rx="1" fill="#a07840"/>
</svg>`,

desk_cream: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="21" width="56" height="7" rx="3.5" fill="#e0d4c4"/>
  <rect x="15" y="28" width="38" height="16" rx="3" fill="#d8ccbc"/>
  <rect x="7" y="28" width="5" height="22" rx="2.5" fill="#dcd0c0"/>
  <rect x="56" y="28" width="5" height="22" rx="2.5" fill="#dcd0c0"/>
  <rect x="26" y="34" width="16" height="5" rx="2.5" fill="#ccc0b0"/>
  <rect x="38" y="13" width="6" height="8" rx="2" fill="#c4b8d0"/>
  <ellipse cx="21" cy="18" rx="4" ry="3.5" fill="#98c8a4"/>
  <rect x="20" y="20" width="2.5" height="3" rx="1" fill="#dcd0c0"/>
</svg>`,

chair_japanese: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="14" y="27" width="40" height="6" rx="2" fill="#c8a272"/>
  <rect x="14" y="14" width="4" height="15" rx="2" fill="#b8924a"/>
  <rect x="50" y="14" width="4" height="15" rx="2" fill="#b8924a"/>
  <rect x="14" y="14" width="40" height="5" rx="2" fill="#c8a272"/>
  <rect x="16" y="33" width="4" height="18" rx="2" fill="#b8924a"/>
  <rect x="48" y="33" width="4" height="18" rx="2" fill="#b8924a"/>
  <rect x="16" y="43" width="36" height="3" rx="1.5" fill="#c8a272"/>
</svg>`,

chair_cream: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="34" cy="32" rx="22" ry="8" fill="#ddd0c0"/>
  <ellipse cx="34" cy="29" rx="18" ry="6" fill="#ece4d8"/>
  <path d="M16 22 Q34 8 52 22 Q52 30 34 30 Q16 30 16 22Z" fill="#d8ccbc"/>
  <rect x="18" y="38" width="4" height="15" rx="2" fill="#d4c8b8"/>
  <rect x="46" y="38" width="4" height="15" rx="2" fill="#d4c8b8"/>
  <rect x="27" y="40" width="3" height="13" rx="1.5" fill="#d4c8b8"/>
  <rect x="38" y="40" width="3" height="13" rx="1.5" fill="#d4c8b8"/>
</svg>`,

storage_japanese: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="11" y="3" width="5" height="52" rx="2" fill="#b8924a"/>
  <rect x="52" y="7" width="5" height="48" rx="2" fill="#b8924a"/>
  <rect x="11" y="11" width="46" height="4" rx="2" fill="#c8a272"/>
  <rect x="11" y="25" width="46" height="4" rx="2" fill="#c8a272"/>
  <rect x="11" y="39" width="46" height="4" rx="2" fill="#c8a272"/>
  <rect x="18" y="6" width="4" height="5" rx="1" fill="#8baad4"/>
  <rect x="24" y="6" width="3.5" height="5" rx="1" fill="#d09898"/>
  <ellipse cx="41" cy="22" rx="3.5" ry="4" fill="#7ab888"/>
  <rect x="15" y="20" width="3" height="5" rx="1" fill="#d4c080"/>
</svg>`,

storage_cream: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="9" y="24" width="50" height="30" rx="4" fill="#e0d4c4"/>
  <path d="M9 32 Q34 5 59 32 L59 28 Q34 1 9 28 Z" fill="#d8ccbc"/>
  <rect x="9" y="37" width="50" height="2" rx="1" fill="#ccc0b0"/>
  <circle cx="28" cy="49" r="2.5" fill="#c4b8a8"/>
  <circle cx="40" cy="49" r="2.5" fill="#c4b8a8"/>
  <ellipse cx="22" cy="28" rx="5" ry="4" fill="#98c8a4"/>
  <rect x="40" y="24" width="5" height="7" rx="1.5" fill="#c4b8d0"/>
  <rect x="47" y="26" width="4" height="5" rx="1.5" fill="#d4c898"/>
</svg>`,

light_japanese: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="33" y="2" width="2.5" height="13" rx="1" fill="#8a7060"/>
  <ellipse cx="34" cy="15" rx="16" ry="3" fill="#b09060"/>
  <path d="M18 15 Q34 10 50 15 L45 38 Q34 43 23 38 Z" fill="#c8a272"/>
  <path d="M22 17 Q34 13 46 17 L42 34 Q34 38 26 34 Z" fill="#e8c88a" opacity="0.55"/>
  <ellipse cx="34" cy="38" rx="11" ry="2.5" fill="#b09060"/>
  <ellipse cx="34" cy="47" rx="14" ry="4.5" fill="#ffe88a" opacity="0.28"/>
</svg>`,

light_cream: `<svg width="68" height="56" viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="34" cy="53" rx="10" ry="3" fill="#d8ccbc"/>
  <rect x="32" y="28" width="4" height="25" rx="2" fill="#ddd0c0"/>
  <path d="M34 28 Q44 35 34 44" stroke="#ddd0c0" stroke-width="5" fill="none" stroke-linecap="round"/>
  <rect x="32" y="8" width="4" height="22" rx="2" fill="#ddd0c0"/>
  <ellipse cx="34" cy="8" rx="14" ry="4" fill="#d4c8b8"/>
  <path d="M20 8 Q34 1 48 8 L44 2 Q34 -2 24 2 Z" fill="#e4d8c8"/>
  <ellipse cx="34" cy="16" rx="9" ry="5" fill="#fff8e8" opacity="0.55"/>
</svg>`,

}

// ── OVERLAY SVGs (in room scene when non-default equipped) ────────────────────
export const OVERLAY_SVGS = {

storage_cream: `<svg width="100%" height="100%" viewBox="0 0 73 154" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="58" width="65" height="92" rx="6" fill="#e8ddd0" opacity="0.92"/>
  <path d="M4 74 Q36.5 28 69 74 L69 64 Q36.5 18 4 64 Z" fill="#ddd0c4" opacity="0.92"/>
  <rect x="4" y="98" width="65" height="2.5" rx="1" fill="#c8baa8"/>
  <rect x="8" y="102" width="27" height="44" rx="3" fill="#ddd0c4" opacity="0.7"/>
  <rect x="38" y="102" width="27" height="44" rx="3" fill="#ddd0c4" opacity="0.7"/>
  <circle cx="31" cy="125" r="3" fill="#b8a898"/>
  <circle cx="42" cy="125" r="3" fill="#b8a898"/>
  <ellipse cx="20" cy="86" rx="7" ry="6" fill="#98c4a4"/>
  <rect x="18" y="90" width="4" height="9" rx="1.5" fill="#c0b09a"/>
  <rect x="44" y="76" width="7" height="14" rx="2" fill="#c4b8d0"/>
  <rect x="53" y="78" width="6" height="12" rx="2" fill="#d4c898"/>
</svg>`,

bed_cream: `<svg width="100%" height="100%" viewBox="0 0 139 147" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="72" width="131" height="70" rx="8" fill="#ddd0c4" opacity="0.9"/>
  <rect x="4" y="22" width="30" height="54" rx="12" fill="#d4c8b8" opacity="0.9"/>
  <rect x="36" y="30" width="99" height="45" rx="8" fill="#f0e8e0" opacity="0.92"/>
  <rect x="42" y="35" width="32" height="21" rx="8" fill="#ffffff" opacity="0.9"/>
  <rect x="82" y="35" width="32" height="21" rx="8" fill="#f4ede6" opacity="0.84"/>
  <rect x="36" y="52" width="99" height="18" rx="4" fill="#e4d8cc" opacity="0.88"/>
  <rect x="38" y="58" width="95" height="1.5" rx="1" fill="#d8ccbc" opacity="0.5"/>
  <rect x="38" y="63" width="95" height="1.5" rx="1" fill="#d8ccbc" opacity="0.5"/>
</svg>`,

desk_cream: `<svg width="100%" height="100%" viewBox="0 0 112 127" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="34" width="104" height="15" rx="7" fill="#e0d4c4" opacity="0.92"/>
  <rect x="20" y="49" width="72" height="32" rx="4" fill="#d8ccbc" opacity="0.88"/>
  <rect x="20" y="63" width="72" height="2" rx="1" fill="#ccc0b0" opacity="0.6"/>
  <rect x="50" y="57" width="12" height="3" rx="1.5" fill="#c0b0a0"/>
  <rect x="50" y="68" width="12" height="3" rx="1.5" fill="#c0b0a0"/>
  <rect x="6" y="49" width="10" height="74" rx="5" fill="#dcd0c0" opacity="0.9"/>
  <rect x="96" y="49" width="10" height="74" rx="5" fill="#dcd0c0" opacity="0.9"/>
  <ellipse cx="28" cy="28" rx="8" ry="7" fill="#98c4a4"/>
  <rect x="25" y="32" width="5" height="5" rx="1.5" fill="#c0b09a"/>
  <rect x="68" y="20" width="10" height="14" rx="2.5" fill="#c4b8d0"/>
  <rect x="80" y="23" width="8" height="11" rx="2" fill="#d4c898"/>
</svg>`,

chair_cream: `<svg width="100%" height="100%" viewBox="0 0 99 77" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="49.5" cy="46" rx="40" ry="15" fill="#ddd0c0" opacity="0.9"/>
  <ellipse cx="49.5" cy="42" rx="34" ry="11" fill="#ece4d8" opacity="0.9"/>
  <path d="M16 26 Q49.5 5 83 26 Q83 42 49.5 42 Q16 42 16 26Z" fill="#d4c8b8" opacity="0.9"/>
  <path d="M22 26 Q49.5 10 77 26 Q77 36 49.5 36 Q22 36 22 26Z" fill="#ddd2c4" opacity="0.5"/>
  <rect x="18" y="55" width="7" height="20" rx="3.5" fill="#d0c4b4" opacity="0.9"/>
  <rect x="74" y="55" width="7" height="20" rx="3.5" fill="#d0c4b4" opacity="0.9"/>
  <rect x="30" y="57" width="5" height="18" rx="2.5" fill="#d0c4b4" opacity="0.82"/>
  <rect x="64" y="57" width="5" height="18" rx="2.5" fill="#d0c4b4" opacity="0.82"/>
</svg>`,

light_cream: `<svg width="100%" height="100%" viewBox="0 0 80 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="163" rx="18" ry="6" fill="#d8ccbc" opacity="0.9"/>
  <rect x="37" y="82" width="6" height="81" rx="3" fill="#ddd0c0" opacity="0.9"/>
  <path d="M40 82 Q58 97 40 122" stroke="#ddd0c0" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.9"/>
  <rect x="37" y="18" width="6" height="66" rx="3" fill="#ddd0c0" opacity="0.9"/>
  <ellipse cx="40" cy="17" rx="26" ry="8" fill="#d4c8b8" opacity="0.9"/>
  <path d="M14 17 Q40 5 66 17 L60 5 Q40 -1 20 5 Z" fill="#e4d8c8" opacity="0.9"/>
  <ellipse cx="40" cy="29" rx="18" ry="11" fill="#fffaec" opacity="0.58"/>
  <ellipse cx="40" cy="42" rx="12" ry="7" fill="#fff8e0" opacity="0.32"/>
</svg>`,

}

// ── Sparkle positions for 整理 FX ─────────────────────────────────────────────
export const SPARK_POSITIONS = [
  { x: 175, y: 110 }, { x: 215, y: 72  }, { x: 265, y: 155 },
  { x: 305, y: 88  }, { x: 355, y: 130 }, { x: 415, y: 58  },
  { x: 465, y: 118 }, { x: 510, y: 82  }, { x: 555, y: 145 },
  { x: 235, y: 185 }, { x: 340, y: 205 }, { x: 445, y: 190 },
  { x: 600, y: 112 }, { x: 285, y: 44  }, { x: 495, y: 45  },
]
