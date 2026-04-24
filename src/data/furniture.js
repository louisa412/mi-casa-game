export const SLOT_NAMES = {
  bed: '床',
  desk: '桌',
  chair: '椅',
  storage: '收納',
  light: '光源',
}

export const FURNITURE = [
  { id: 'bed_japanese',     slot: 'bed',     name: '白木床架',   style: '日系白木', cost: { wood: 25, fabric: 10, deco: 5  }, desc: '清淡木紋，晨光透窗恰好落在此處' },
  { id: 'bed_cream',        slot: 'bed',     name: '奶油軟床',   style: '奶油柔和', cost: { wood: 12, fabric: 22, deco: 6  }, desc: '柔軟布料包覆，深陷其中忘記煩憂' },
  { id: 'desk_japanese',    slot: 'desk',    name: '原木書桌',   style: '日系白木', cost: { wood: 20, fabric: 3,  deco: 7  }, desc: '桌面留有歲月痕跡，書香暗藏其中' },
  { id: 'desk_cream',       slot: 'desk',    name: '藤編矮桌',   style: '奶油柔和', cost: { wood: 8,  fabric: 12, deco: 10 }, desc: '編織紋理帶來溫度，茶杯放在這裡最合適' },
  { id: 'chair_japanese',   slot: 'chair',   name: '木格椅',     style: '日系白木', cost: { wood: 15, fabric: 5,  deco: 3  }, desc: '背靠微微傾斜，坐下便想翻書' },
  { id: 'chair_cream',      slot: 'chair',   name: '布藝椅',     style: '奶油柔和', cost: { wood: 8,  fabric: 18, deco: 4  }, desc: '毛絨布面，讓人不願起身' },
  { id: 'storage_japanese', slot: 'storage', name: '格子書架',   style: '日系白木', cost: { wood: 22, fabric: 2,  deco: 8  }, desc: '書本按顏色排列，偶爾找不到想讀的那本' },
  { id: 'storage_cream',    slot: 'storage', name: '柳編收納',   style: '奶油柔和', cost: { wood: 10, fabric: 8,  deco: 12 }, desc: '藤編籃放在角落，裝滿了說不定某天會用到的東西' },
  { id: 'light_japanese',   slot: 'light',   name: '原木吊燈',   style: '日系白木', cost: { wood: 18, fabric: 5,  deco: 12 }, desc: '傍晚六點亮起，橘光暈開整個房間' },
  { id: 'light_cream',      slot: 'light',   name: '羊皮落地燈', style: '奶油柔和', cost: { wood: 6,  fabric: 15, deco: 15 }, desc: '柔白燈罩，照不遠但照得剛好' },
]

// SVGs shown inside furniture overlay zones when a non-default piece is equipped
export const OVERLAY_SVGS = {
  bed_cream: `<svg viewBox="0 0 130 95" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="13" width="116" height="26" rx="10" fill="#e8d8c8" stroke="#d0c0b0" stroke-width=".6"/><circle cx="26" cy="26" r="3" fill="#c8b8a8"/><circle cx="44" cy="23" r="3" fill="#c8b8a8"/><circle cx="65" cy="26" r="3" fill="#c8b8a8"/><circle cx="86" cy="23" r="3" fill="#c8b8a8"/><circle cx="104" cy="26" r="3" fill="#c8b8a8"/><rect x="7" y="37" width="8" height="42" rx="3" fill="#d4c4b0"/><rect x="115" y="37" width="8" height="42" rx="3" fill="#d4c4b0"/><rect x="12" y="39" width="106" height="34" rx="4" fill="#f2e8de"/><ellipse cx="35" cy="52" rx="19" ry="10" fill="#faf4ee" stroke="#e8ddd6" stroke-width=".6"/><rect x="15" y="58" width="100" height="13" rx="5" fill="#ecddd0"/><path d="M17,64 Q65,61 113,64" stroke="#ddd0c0" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`,
  desk_cream: `<svg viewBox="0 0 110 85" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="22" width="102" height="12" rx="6" fill="#e0cdb0" stroke="#c8b898" stroke-width=".6"/><line x1="20" y1="23" x2="20" y2="33" stroke="#c8b898" stroke-width="1" stroke-opacity=".5"/><line x1="40" y1="23" x2="40" y2="33" stroke="#c8b898" stroke-width="1" stroke-opacity=".5"/><line x1="60" y1="23" x2="60" y2="33" stroke="#c8b898" stroke-width="1" stroke-opacity=".5"/><line x1="80" y1="23" x2="80" y2="33" stroke="#c8b898" stroke-width="1" stroke-opacity=".5"/><path d="M9,34 Q6,34 6,39 L6,56 Q6,60 9,60 L101,60 Q104,60 104,56 L104,39 Q104,34 101,34 Z" fill="#d8c4a0"/><path d="M63,8 Q60,14 60,21 L80,21 Q80,14 77,8 Z" fill="#d0c8b8"/><rect x="63" y="8" width="13" height="3.5" rx="2" fill="#c0b8a8"/><ellipse cx="70" cy="5.5" rx="4.5" ry="3.5" fill="#8aac78" opacity=".85"/><rect x="25" y="12" width="20" height="11" rx="1.5" fill="#b8c8d8"/></svg>`,
  chair_cream: `<svg viewBox="0 0 75 95" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="13" width="61" height="36" rx="11" fill="#e8d8c8" stroke="#d0c0b0" stroke-width=".6"/><circle cx="37" cy="30" r="4" fill="#c8b8a8"/><path d="M7,48 Q4,48 4,52 L4,63 L71,63 L71,52 Q71,48 68,48 Z" fill="#d4c4b0"/><rect x="7" y="48" width="61" height="16" rx="7" fill="#e8d8c8"/><path d="M13,64 Q9,80 7,89" stroke="#c0b0a0" stroke-width="5.5" fill="none" stroke-linecap="round"/><path d="M62,64 Q66,80 68,89" stroke="#c0b0a0" stroke-width="5.5" fill="none" stroke-linecap="round"/></svg>`,
  storage_cream: `<svg viewBox="0 0 82 108" xmlns="http://www.w3.org/2000/svg"><path d="M9,26 Q6,33 6,46 L6,88 Q6,97 41,98 Q76,97 76,88 L76,46 Q76,33 73,26 Z" fill="#d4b88a"/><line x1="7" y1="39" x2="75" y2="39" stroke="#c4a878" stroke-width="2" stroke-opacity=".6"/><line x1="6" y1="54" x2="76" y2="54" stroke="#c4a878" stroke-width="2" stroke-opacity=".6"/><line x1="6" y1="69" x2="76" y2="69" stroke="#c4a878" stroke-width="2" stroke-opacity=".6"/><line x1="6" y1="84" x2="76" y2="84" stroke="#c4a878" stroke-width="2" stroke-opacity=".6"/><ellipse cx="41" cy="26" rx="35" ry="9.5" fill="#c8a870" stroke="#b89860" stroke-width="1.2"/><path d="M14,23 Q10,10 20,7 Q30,4 33,18" stroke="#b89060" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M68,23 Q72,10 62,7 Q52,4 49,18" stroke="#b89060" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M14,23 Q41,19 68,23 Q68,14 41,14 Q14,14 14,23 Z" fill="#e8ddd0" opacity=".7"/></svg>`,
  light_cream: `<svg viewBox="0 0 65 130" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="123" rx="21" ry="6" fill="#c8b898"/><rect x="29" y="50" width="7" height="75" rx="3.5" fill="#d0c0a8"/><path d="M11,50 Q32,38 53,50 Q53,68 32,74 Q11,68 11,50 Z" fill="#f2e8dc" stroke="#ddd0c0" stroke-width="1"/><path d="M16,53 Q32,44 48,53" stroke="#e0d4c4" stroke-width="1.2" fill="none"/><ellipse cx="32" cy="74" rx="19" ry="7" fill="#fff8e0" opacity=".55"/></svg>`,
}

// SVGs shown in the furniture shop cards
export const CARD_SVGS = {
  bed_japanese: `<svg viewBox="0 0 90 65" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="78" height="16" rx="4" fill="#c8a870"/><rect x="6" y="27" width="6" height="30" rx="2" fill="#b89060"/><rect x="78" y="27" width="6" height="30" rx="2" fill="#b89060"/><rect x="9" y="28" width="72" height="27" rx="2" fill="#eddfc8"/><ellipse cx="27" cy="38" rx="14" ry="8" fill="#f5eee4"/><rect x="11" y="40" width="68" height="13" rx="3" fill="#d8c8b0"/></svg>`,
  bed_cream: `<svg viewBox="0 0 90 65" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="9" width="78" height="20" rx="8" fill="#e8d8c8"/><circle cx="22" cy="19" r="2" fill="#c8b8a8"/><circle cx="50" cy="19" r="2" fill="#c8b8a8"/><rect x="9" y="29" width="72" height="25" rx="3" fill="#f2e8de"/><ellipse cx="26" cy="38" rx="14" ry="8" fill="#faf4ee"/><rect x="11" y="42" width="68" height="12" rx="4" fill="#ecddd0"/></svg>`,
  desk_japanese: `<svg viewBox="0 0 90 65" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="18" width="82" height="9" rx="2" fill="#c8a870"/><rect x="7" y="27" width="76" height="17" rx="2" fill="#d4b880"/><rect x="9" y="44" width="6" height="16" rx="1.5" fill="#b89060"/><rect x="75" y="44" width="6" height="16" rx="1.5" fill="#b89060"/></svg>`,
  desk_cream: `<svg viewBox="0 0 90 65" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="18" width="82" height="11" rx="5" fill="#e0cdb0"/><path d="M8,29 Q5,33 5,45 Q5,49 8,49 L82,49 Q85,49 85,45 L85,33 Q85,29 82,29 Z" fill="#d8c4a0"/><ellipse cx="60" cy="7" rx="5" ry="4" fill="#8aac78" opacity=".85"/></svg>`,
  chair_japanese: `<svg viewBox="0 0 58 72" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="8" width="48" height="30" rx="3" fill="#c8a870"/><rect x="5" y="37" width="48" height="11" rx="3" fill="#c8a870"/><rect x="7" y="48" width="5" height="20" rx="2" fill="#b09060"/><rect x="46" y="48" width="5" height="20" rx="2" fill="#b09060"/></svg>`,
  chair_cream: `<svg viewBox="0 0 58 72" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="11" width="48" height="28" rx="9" fill="#e8d8c8"/><circle cx="29" cy="24" r="3" fill="#c8b8a8"/><rect x="5" y="38" width="48" height="12" rx="5" fill="#e8d8c8"/><path d="M10,50 Q8,63 6,69" stroke="#c0b0a0" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M48,50 Q50,63 52,69" stroke="#c0b0a0" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,
  storage_japanese: `<svg viewBox="0 0 68 90" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="62" height="82" rx="3" fill="#c8a870"/><rect x="3" y="42" width="62" height="4" fill="#a88a50"/><rect x="8" y="8" width="8" height="16" rx="1" fill="#b0a8d0"/><rect x="18" y="9" width="7" height="15" rx="1" fill="#d4c090"/><rect x="27" y="7" width="9" height="17" rx="1" fill="#a8c8b0"/><rect x="38" y="10" width="7" height="14" rx="1" fill="#c8a0a8"/></svg>`,
  storage_cream: `<svg viewBox="0 0 68 80" xmlns="http://www.w3.org/2000/svg"><path d="M8,20 Q5,26 5,36 L5,68 Q5,75 34,76 Q63,75 63,68 L63,36 Q63,26 60,20 Z" fill="#d4b88a"/><ellipse cx="34" cy="20" rx="29" ry="7.5" fill="#c8a870"/><path d="M12,18 Q9,8 17,6 Q25,4 28,14" stroke="#b89060" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M56,18 Q59,8 51,6 Q43,4 40,14" stroke="#b89060" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  light_japanese: `<svg viewBox="0 0 70 85" xmlns="http://www.w3.org/2000/svg"><line x1="35" y1="0" x2="35" y2="20" stroke="#888" stroke-width="1.5"/><path d="M19,22 Q35,16 51,22 L46,50 Q35,54 24,50 Z" fill="#d4c070" stroke="#c0aa58"/><circle cx="35" cy="30" r="4.5" fill="#fff8d0" opacity=".9"/></svg>`,
  light_cream: `<svg viewBox="0 0 55 95" xmlns="http://www.w3.org/2000/svg"><ellipse cx="27" cy="89" rx="18" ry="5" fill="#c8b898"/><rect x="24" y="40" width="6" height="51" rx="3" fill="#d0c0a8"/><path d="M9,40 Q27,30 45,40 Q45,57 27,62 Q9,57 9,40 Z" fill="#f2e8dc" stroke="#ddd0c0" stroke-width=".5"/></svg>`,
}

// Sparkle positions for 整理 effect
export const SPARK_POSITIONS = [
  { x: 180, y: 60 }, { x: 220, y: 90 }, { x: 310, y: 55 }, { x: 350, y: 110 },
  { x: 400, y: 70 }, { x: 450, y: 95 }, { x: 500, y: 60 }, { x: 530, y: 130 },
  { x: 580, y: 80 }, { x: 620, y: 110 }, { x: 260, y: 140 }, { x: 470, y: 150 },
  { x: 670, y: 90 }, { x: 340, y: 180 }, { x: 160, y: 130 },
]
