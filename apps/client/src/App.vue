<template>
  <UApp>
    <RouterView />
    <div class="app">
    <h1>To-Do List</h1>
    <UInput v-model="newTask" @keyup.enter="addTask" placeholder="Add a task" />
    <UButton @click="addTask">Add</UButton>

    <ul>
      <ToDoItem
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
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
