<template>
  <UApp>
    <RouterView />
    <div class="app">
    <h1>To-Do List</h1>
    <!-- <UInput v-model="newTask" @keyup.enter="addTask" placeholder="Add a task" /> -->
    <div class="flex items-center gap-2">
      <UInput
        v-model="newTask"
        class="flex-1"
        @keyup.enter="addTask"
        placeholder="Add a task"
        autocomplete="off"
        autofocus
      />

      <UButton
        @click="addTask"
        icon="i-lucide-plus"
      />
    </div>

    <ul>
      <ToDoItem
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        class="divide-y divide-gray-200 dark:divide-gray-800"
        @update:task="updateTask(index, $event)"
        @remove="removeTask(index)"
      />
    </ul>
  </div>
  </UApp>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ToDoItem from './components/ToDoItem.vue';

interface Task {
  text: string;
  done: boolean;
}

const tasks = ref<Task[]>([]);
const newTask = ref('');

function addTask() {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ text: newTask.value, done: false });
    newTask.value = '';
  }
}

function updateTask(index: number, updatedTask: Task) {
  tasks.value[index] = updatedTask
}

function removeTask(index: number) {
  tasks.value.splice(index, 1);
}
</script>

<style scoped>
.app {
  max-width: 400px;
  margin: auto;
  font-family: sans-serif;
}
</style>
