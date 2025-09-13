<script setup lang="ts">
import { ref, watch } from 'vue'

interface Task {
  title: string
  completed: boolean
}

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['remove', 'update:task'])

const localDone = ref(props.task.completed)

watch(localDone, (val) => {
  emit('update:task', { ...props.task, completed: val })
})

watch(
  () => props.task.completed,
  (val) => {
    localDone.value = val
  },
)
</script>

<template>
  <li class="flex items-center gap-4 py-2">
    <span
      class="flex-1 font-medium"
      :class="[task.completed ? 'line-through text-gray-500' : '']"
    >
      {{ task.title }}
    </span>

    <USwitch
      v-model="localDone"
      unchecked-icon="i-lucide-x"
      checked-icon="i-lucide-check"
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
