<template>
  <li>
    <input type="checkbox" v-model="task.done" />
    <span :class="{ done: task.done }">{{ task.text }}</span>
    <button @click="$emit('remove')">❌</button>
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
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
