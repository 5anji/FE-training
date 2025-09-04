<template>
  <li class="flex items-center gap-4 py-2">
    <span
      class="flex-1 font-medium"
      :class="[task.done ? 'line-through text-gray-500' : '']"
    >
      {{ task.text }}
    </span>

    <USwitch
      :model-value="task.done"
      @update:model-value="toggleTask"
    />

    <UButton
      color="error"
      variant="soft"
      size="xs"
      icon="i-lucide-x"
      @click="$emit('remove')"
    />
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface Task {
  text: string
  done: boolean
}

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  }
})

const emit = defineEmits(['remove', 'update:task'])

function toggleTask(value: boolean) {
  console.log(value)
  emit('update:task', { ...props.task, done: value })
}
</script>
