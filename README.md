# 慢時光 · 療癒小室

療癒系橫式房間佈置遊戲。Vue 3 + Pinia + Vite。

## 快速開始

```bash
npm install
npm run dev
```

瀏覽器打開 http://localhost:5173，**橫向**操作。

## 部署到 Vercel

```bash
npm run build        # 產生 dist/
# 推到 GitHub → 在 vercel.com 連接 repo → 自動部署
```

## 之後包成 App（選用）

```bash
npm install @capacitor/core @capacitor/ios @capacitor/cli
npx cap init
npm run build
npx cap add ios
npx cap copy
npx cap open ios    # 在 Xcode 打開
```

## 專案結構

```
src/
├── App.vue                    # 根元件，timer 管理
├── main.js                    # Vue + Pinia 初始化
├── style.css                  # 全域樣式
├── assets/
│   └── room.jpg               # 房間背景圖
├── data/
│   └── furniture.js           # 家具目錄、SVG、sparkle positions
├── stores/
│   └── game.js                # Pinia store：素材/裝備/互動/生產循環
├── composables/
│   └── useCountdown.js        # 倒數計時 composable
└── components/
    ├── ResourceBar.vue        # 頂部素材列
    ├── RoomScene.vue          # 房間場景 + 互動動畫 + 家具 overlay
    ├── TabBar.vue             # 底部分頁
    ├── FurniturePanel.vue     # 家具替換面板
    └── MaterialPanel.vue      # 素材倉庫面板
```

## 核心循環

- 每 30 分鐘自動產出 1 個素材（木材/布料/裝飾）
- 離線最多累積 48 小時
- 澆水/整理/點燈：每日各 3 次，觸發 30 分鐘 1.5× 加速
- 每個互動有獨立場景動畫（葉子抖動、燈光爆亮、粉塵粒子）
- 素材上限：木材 90、布料 75、裝飾 60
- 家具：5 個 slot × 2 款式（日系白木 / 奶油柔和）
