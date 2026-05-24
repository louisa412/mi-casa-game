<template>
  <!-- Portrait mode hint -->
  <div id="rotate-hint">
    <div class="hi">📱↔️</div>
    <div>請將手機橫向旋轉<br>以獲得最佳體驗</div>
  </div>

  <div id="shell-wrapper" ref="wrapperRef">
    <div id="shell">
      <audio
        ref="bgmRef"
        src="/assets/audio/saltwater-afternoons.m4a"
        loop
        preload="auto"
      ></audio>

      <!-- Main room scene (fills shell) -->
      <RoomScene />

      <!-- Bottom tab bar -->
      <TabBar :active-tab="activeTab" @change="activeTab = $event" />

      <!-- Overlays -->
      <FurniturePanel v-if="activeTab === 'furniture'" @close="activeTab = 'room'" />
      <MaterialPanel  v-if="activeTab === 'material'"  @close="activeTab = 'room'" />

      <!-- Score spawns -->
      <div
        v-for="s in store.spawns"
        :key="s.id"
        class="spawn"
        :style="{ left: s.x + 'px', top: s.y + 'px' }"
      >{{ s.text }}</div>

      <!-- Toast -->
      <Transition name="toast">
        <div v-if="store.toast" :key="store.toastKey" class="toast">
          {{ store.toast }}
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Capacitor, registerPlugin } from '@capacitor/core'
import { useGameStore }      from './stores/game.js'
import { useFurnitureStore } from './stores/furnitureStore.js'
import { useRoomStore }      from './stores/roomStore.js'
import RoomScene      from './components/RoomScene.vue'
import TabBar         from './components/TabBar.vue'
import FurniturePanel from './components/FurniturePanel.vue'
import MaterialPanel  from './components/MaterialPanel.vue'

const store     = useGameStore()
const furStore  = useFurnitureStore()
const roomStore = useRoomStore()
const activeTab = ref('room')
const wrapperRef = ref(null)
const bgmRef = ref(null)
const AudioSession = registerPlugin('AudioSession')

const CANVAS_W = 844
const CANVAS_H = 390

function updateScale() {
  const wrapper = wrapperRef.value
  if (!wrapper) return

  const style = getComputedStyle(wrapper)
  const safeX =
    parseFloat(style.getPropertyValue('--safe-left')) +
    parseFloat(style.getPropertyValue('--safe-right'))
  const safeY =
    parseFloat(style.getPropertyValue('--safe-top')) +
    parseFloat(style.getPropertyValue('--safe-bottom'))
  const viewport = window.visualViewport
  const w = (viewport?.width || window.innerWidth) - safeX
  const h = (viewport?.height || window.innerHeight) - safeY

  if (!w || !h) return
  const scale = Math.min(w / CANVAS_W, h / CANVAS_H, 1)
  document.getElementById('shell').style.setProperty('--app-scale', scale)
}

let tickTimer = null
let saveTimer = null
let bgmStarted = false
let audioSessionTimer = null

async function enforceSilentModeAwareAudio() {
  if (Capacitor.getPlatform() !== 'ios') return

  try {
    await AudioSession.useSilentMode()
  } catch (error) {
    console.warn('AudioSession silent-mode bridge unavailable', error)
    // Native audio-session support is only available in the packaged iOS app.
  }
}

function removeBgmUnlockListeners() {
  window.removeEventListener('pointerdown', startBgm)
  window.removeEventListener('touchstart', startBgm)
  window.removeEventListener('keydown', startBgm)
}

async function startBgm() {
  if (bgmStarted || !bgmRef.value) return

  const audio = bgmRef.value
  audio.volume = 0.35

  try {
    await enforceSilentModeAwareAudio()
    await audio.play()
    await enforceSilentModeAwareAudio()
    audioSessionTimer = setTimeout(enforceSilentModeAwareAudio, 250)
    bgmStarted = true
    removeBgmUnlockListeners()
  } catch {
    // Some browsers require another user gesture before audio can start.
  }
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    enforceSilentModeAwareAudio()
  }
}

onMounted(async () => {
  store.load()
  furStore.load()
  roomStore.load()
  store.tick()
  tickTimer = setInterval(store.tick,  1000)
  saveTimer = setInterval(() => { store.save(); furStore.save() }, 15_000)

  await nextTick()
  updateScale()
  setTimeout(updateScale, 300)   // 再補一次，等 iOS safe area 確定

  window.addEventListener('resize', updateScale)
  if (window.visualViewport) window.visualViewport.addEventListener('resize', updateScale)

  window.addEventListener('pointerdown', startBgm)
  window.addEventListener('touchstart', startBgm)
  window.addEventListener('keydown', startBgm)
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  clearInterval(tickTimer)
  clearInterval(saveTimer)
  window.removeEventListener('resize', updateScale)
  if (window.visualViewport) window.visualViewport.removeEventListener('resize', updateScale)
  removeBgmUnlockListeners()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  clearTimeout(audioSessionTimer)
  bgmRef.value?.pause()
})
</script>

<style scoped>
#shell-wrapper {
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #c8bedd;
  overflow: hidden;
}

#shell {
  width: 844px; height: 390px;
  background: #c8bedd;
  transform-origin: center center;
  transform: scale(var(--app-scale, 1));
  border-radius: 36px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 70px rgba(60, 40, 90, 0.45);
  flex-shrink: 0;
}

#rotate-hint {
  display: none;
  position: fixed; inset: 0; z-index: 9999;
  background: #c8bedd;
  flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; font-size: 14px; color: #5a4a7a; text-align: center;
}
#rotate-hint .hi { font-size: 36px; }
@media (orientation: portrait) {
  #rotate-hint   { display: flex; }
  #shell-wrapper { display: none; }
}

.spawn {
  position: absolute;
  font-size: 14px; font-weight: 600; color: var(--p);
  pointer-events: none; z-index: 99;
  animation: spup 1.3s ease-out forwards;
}
@keyframes spup { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-32px)} }

.toast {
  position: absolute; top: 60px; left: 50%; transform: translateX(-50%);
  background: rgba(253,250,246,0.96); backdrop-filter: blur(10px);
  border-radius: 16px; padding: 8px 16px;
  font-size: 13px; color: var(--t);
  box-shadow: 0 4px 18px var(--sh);
  z-index: 40; white-space: nowrap;
}
.toast-enter-active { animation: toastIn  0.25s ease; }
.toast-leave-active { animation: toastOut 0.40s ease forwards; }
@keyframes toastIn  { from{opacity:0;transform:translateX(-50%) translateY(-6px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
@keyframes toastOut { from{opacity:1} to{opacity:0;transform:translateX(-50%) translateY(-4px)} }
</style>
