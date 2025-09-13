<script lang="ts" setup>
import { useFetch } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import ToDoItem from './components/ToDoItem.vue'

interface Task {
  id: number
  title: string
  completed: boolean
}

const tasks = ref<Task[]>([])
const newTask = ref('')

const base = 'http://localhost:3000/items'

const fetchOptions = {
  timeout: 5000,
}

async function loadTasks() {
  const { data, error } = await useFetch<Task[]>(base, fetchOptions).get().json()
  if (error.value) {
    console.error('Failed to load tasks:', error.value)
    return
  }
  if (data.value)
    tasks.value = data.value
}

async function addTask() {
  if (newTask.value.trim() !== '') {
    const { data, error } = await useFetch<Task>(base, fetchOptions)
      .post({ title: newTask.value })
      .json()

    if (error.value) {
      console.error('Failed to add task:', error.value)
      return
    }
    if (data.value)
      tasks.value.unshift(data.value)
    newTask.value = ''
  }
}

async function updateTask(index: number, updatedTask: Task) {
  const { data, error } = await useFetch<Task>(`${base}/${updatedTask.id}`, fetchOptions)
    .patch({
      title: updatedTask.title,
      completed: updatedTask.completed,
    })
    .json()

  if (error.value) {
    console.error('Failed to update task:', error.value)
    return
  }
  if (data.value)
    tasks.value[index] = data.value
}

async function removeTask(index: number) {
  const id = tasks.value[index].id
  const { error } = await useFetch(`${base}/${id}`, fetchOptions).delete()

  if (error.value) {
    console.error('Failed to delete task:', error.value)
    return
  }
  tasks.value.splice(index, 1)
}

onMounted(loadTasks)
</script>

<template>
  <UApp>
    <RouterView />
    <div class="app">
      <!-- <UInput v-model="newTask" @keyup.enter="addTask" placeholder="Add a task" /> -->

      <div class="max-w-xl mx-auto p-6 space-y-6">
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-bold text-primary tracking-wide text-center">
            To-Do List
          </h1>
          <div class="h-1 w-16 bg-primary rounded-full mt-2" />
        </div>
        <TaskStats />
        <!-- Your existing to-do list here -->
        <div class="flex items-center gap-2">
          <UInput
            v-model="newTask" class="flex-1" placeholder="Add a task" autocomplete="off" autofocus
            @keyup.enter="addTask"
          />

          <UButton icon="i-lucide-plus" @click="addTask" />
        </div>

        <ul>
          <ToDoItem
            v-for="(task, index) in tasks" :key="index" :task="task"
            class="divide-y divide-gray-200 dark:divide-gray-800" @update:task="updateTask(index, $event)"
            @remove="removeTask(index)"
          />
        </ul>
      </div>
    </div>
  </UApp>
</template>
