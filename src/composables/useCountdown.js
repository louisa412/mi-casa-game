import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Returns a reactive formatted countdown string (MM:SS)
 * that updates every second based on a target timestamp.
 */
export function useCountdown(getTargetMs) {
  const display = ref('00:00')

  function update() {
    const diff = Math.max(0, getTargetMs() - Date.now())
    const m = Math.floor(diff / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    display.value = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  let timer = null
  onMounted(() => { update(); timer = setInterval(update, 1000) })
  onUnmounted(() => clearInterval(timer))

  return { display }
}
