# 把 Mi Casa 加進 run_all.sh

## 你需要知道兩件事

### 1. App 的 Bundle ID
在 `capacitor.config.ts` 裡你設定的：
```
com.yourname.micasa
```

### 2. 你的 Xcode Scheme 名稱
Capacitor 建立的 iOS project，scheme 預設叫做 `App`，
project 路徑是 `ios/App/App.xcworkspace`

---

## 加入 run_all.sh 的片段

把以下加進你的 `~/run_all.sh`：

```bash
# ─── Mi Casa ──────────────────────────────────────────────────
MICASA_DIR="/Users/luisachen/Desktop/Dulce的資料夾2026/我的APP/Mi\ Casa "   # 改成你實際的路徑
MICASA_BUNDLE="com.luisalifelab.micasa"        # 改成你的 bundle ID
MICASA_SCHEME="App"
MICASA_WORKSPACE="$MICASA_DIR/ios/App/App.xcworkspace"

echo "▶ Building Mi Casa..."
cd "$MICASA_DIR"
npm run build
npx cap sync ios

xcodebuild \
  -workspace "$MICASA_WORKSPACE" \
  -scheme "$MICASA_SCHEME" \
  -configuration Debug \
  -destination "platform=iOS Simulator,name=$SIM_NAME" \
  -derivedDataPath "$MICASA_DIR/ios/build" \
  build \
  | xcpretty    # 選用：brew install xcpretty 讓 log 更乾淨

MICASA_APP=$(find "$MICASA_DIR/ios/build" -name "App.app" | head -1)

echo "▶ Installing Mi Casa to Simulator..."
xcrun simctl install "$SIM_UDID" "$MICASA_APP"

echo "▶ Launching Mi Casa..."
xcrun simctl launch "$SIM_UDID" "$MICASA_BUNDLE"
# ──────────────────────────────────────────────────────────────
```

---

## 假設你的 run_all.sh 已有這樣的結構

```bash
#!/bin/bash
SIM_NAME="iPhone 15 Pro"
SIM_UDID=$(xcrun simctl list devices | grep "$SIM_NAME" | grep "Booted\|Shutdown" | head -1 | grep -E -o '[A-F0-9-]{36}')

# 啟動 Simulator
xcrun simctl boot "$SIM_UDID" 2>/dev/null || true
open -a Simulator

# ... 你原本的其他 apps ...

# ← 在這裡貼上上方的 Mi Casa 片段
```

---

## 完整的首次設定流程

```bash
cd ~/path/to/healing-room

# 1. 安裝 Capacitor
npm install

# 2. Build web
npm run build

# 3. 加入 iOS platform（只需要做一次）
npx cap add ios

# 4. Sync
npx cap sync ios

# 5. 產生 icon（需要一張 1024x1024 的 icon.png）
chmod +x gen-icons.sh
./gen-icons.sh icon.png

# 6. 用 Xcode 開啟，設定 Signing（選你的 Apple ID）
npx cap open ios
# Xcode → Signing & Capabilities → Team → 選你的帳號

# 7. 之後就可以用 run_all.sh 一鍵跑了
```

---

## 常用指令速查

```bash
npm run cap:sync   # build + sync（每次改完 code 後執行）
npm run cap:open   # 打開 Xcode
```
