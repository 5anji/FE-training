<template>
  <UCard class="rounded-2xl shadow max-w-xl mx-auto">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-bar-chart" class="text-primary w-5 h-5" />
        <span class="text-lg font-semibold">Task Stats</span>
      </div>
    </template>

    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span>Total</span>
        <span class="font-medium text-blue-600">{{ stats?.total ?? 0 }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span>Completed</span>
        <span class="font-medium text-green-600">{{ stats?.completed ?? 0 }}</span>
      </div>

      <UProgress
        v-model="progressValue"
        :color="progressColor"
        class="mt-3 transition-all duration-300"
        size="lg"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEventSource } from '@vueuse/core'

const { data, error } = useEventSource('http://localhost:3000/items/stats')

const stats = computed(() => data.value ? JSON.parse(data.value) : null)

const completionRate = computed(() => {
  if (!stats.value || stats.value.total === 0) return 0
  return (stats.value.completed / stats.value.total) * 100
})

const progressValue = ref(0)

watch(completionRate, (newRate) => {
  const start = progressValue.value
  const diff = newRate - start
  const stepCount = 10
  let step = 0

  const animate = () => {
    step++
    progressValue.value = start + (diff * step) / stepCount
    if (step < stepCount) requestAnimationFrame(animate)
  }

  animate()
})

const progressColor = computed(() => {
  if (completionRate.value === 100) return 'success'
  if (completionRate.value >= 50) return 'primary'
  if (completionRate.value > 0) return 'warning'
  return 'error'
})

if (error) console.error('SSE connection error:', error)
</script>
