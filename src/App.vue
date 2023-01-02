<template>
  <main>
    <!-- Header -->
    <header>
      <img src="./assets/pinia.svg" alt="pini logo">
      <h1> {{name}} </h1>
    </header>

    <!-- New task form -->
    <div class="new-taks-form">
      <TaskForm/>
    </div>
    <!-- Filter -->
    <nav class="filter">
      <button id="reset" @click="taskStore.$reset()">Reset</button>
      <button @click="filter='all'">All tasks</button>
      <button @click="filter='fav'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="isLoading"> Loading...</div>

    <!-- all tasks lists -->
    <div class="task-list" v-if="filter==='all'" >
      <p> You have <b>{{ totalCount}}</b> total tasks</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <!-- fav tasks lists -->
    <div class="task-list" v-if="filter==='fav'">
      <p> You have <b>{{ favCount}}</b> favorite tasks</p>
      <div v-for="task in favorite">
        <TaskDetails :task="task"/>
      </div>

    </div>

  </main>
</template>

<script>
import {useTaskStore} from "@/stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import {ref} from "vue";
import TaskForm from "./components/TaskForm.vue";
import {storeToRefs} from "pinia";
export default {
  components:{
    TaskForm,
    TaskDetails,
  },
  setup(){
    // fetching the data
    const taskStore = useTaskStore();
    const {tasks,isLoading,favorite,totalCount,favCount} = storeToRefs(taskStore)
    taskStore.getTasks()
    const filter = ref('all');
    return {taskStore,filter,tasks,isLoading,favorite,totalCount,favCount};
  }
}
</script>
<style scoped>

</style>
