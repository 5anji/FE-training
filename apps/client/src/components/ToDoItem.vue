<template>
  <li class="flex items-center gap-3">
    <UCheckbox
      v-model="task.done"
      :label="task.text"
      :class="{ 'line-through text-gray-500': task.done }"
    />
    <UButton
      color="red"
      variant="ghost"
      size="xs"
      @click="$emit('remove')"
    >
      ❌
    </UButton>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

interface Task {
  text: string;
  done: boolean;
}

defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  }
});

defineEmits(['remove']);
</script>

<style scoped>

</style>
