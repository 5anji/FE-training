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
import { ref, onMounted } from 'vue';
import ToDoItem from './components/ToDoItem.vue';
import { useFetch } from '@vueuse/core';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTask = ref('');

const base = 'http://localhost:3000/items';

async function loadTasks() {
  const { data } = await useFetch<Task[]>(base).get().json();
  if (data.value) tasks.value = data.value;
}

async function addTask() {
  if (newTask.value.trim() !== '') {
    const { data } = await useFetch<Task>(base).post({ title: newTask.value }).json();
    if (data.value) tasks.value.unshift(data.value);
    newTask.value = '';
  }
}

async function updateTask(index: number, updatedTask: Task) {
  const { data } = await useFetch<Task>(`${base}/${updatedTask.id}`)
    .patch({
      title: updatedTask.title,
      completed: updatedTask.completed,
    })
    .json();

  // console.log(data.value);
  if (data.value) tasks.value[index] = data.value;
}
async function removeTask(index: number) {
  const id = tasks.value[index].id;
  await useFetch(`${base}/${id}`).delete();
  tasks.value.splice(index, 1);
}

onMounted(loadTasks);
</script>
