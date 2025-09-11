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

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Task {
  text: string
  title: string
  completed: boolean
}

type Props = {
  task: Task
}

const props = defineProps<Props>()
const emit = defineEmits(['remove', 'update:task'])

// keep a local ref so v-model works on USwitch
const localDone = ref(props.task.completed)

// whenever localDone changes, emit update to parent
watch(localDone, (val) => {
  emit('update:task', { ...props.task, completed: val })
})

// also sync localDone if parent updates task
watch(
  () => props.task.completed,
  (val) => {
    localDone.value = val
  }
)
</script>
