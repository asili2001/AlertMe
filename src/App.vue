<template>
  <div v-if="!welcome">
      <div class=" w-full h-full m-auto p-5 md:w-[750px]">
        <div class="flex justify-between items-center">
          <h1 class="dark:text-white text-2xl px-2 py-5">Alert Me</h1>
          <label class="switch">
            <input type="checkbox" checked @change="toggleTheme">
            <span class="slider round"></span>
          </label>
        </div>


        <div class="flex flex-col gap-5">
          <div v-if="savedTasks.length < 1" class="flex flex-col items-center justify-center h-[500px] gap-12">
            <img :src="noTask" alt="no task" class="h-[250px] opacity-50">
            <h1 class="dark:text-white text-slate-800 text-2xl">No Tasks yet</h1>
          </div>
          <AlertCard v-for="task in savedTasks" v-bind:key="task.id" :taskData = "task" @delete-task = "deleteTask"/>
        </div>
      </div>
      <AddTaskButton @click="modalOpen = true"/>
      <div @click.self = "modalOpen = false" v-if="modalOpen" class="fixed top-0 left-0 h-full w-full bg-[#20202080] backdrop-blur-sm">
        <AddTaskModal @get-data = "submitTask"/>
      </div>
  </div>

  <WelcomePage v-if="welcome" @continue = "()=>welcome = false" />

</template>

<script>
import AlertCard from '@/components/AlertCard.vue';
import AddTaskButton from '@/components/AddTaskButton.vue'
import AddTaskModal from '@/components/AddTaskModal.vue';
import WelcomePage from '@/components/WelcomePage.vue';

export default {
  name: 'App',
  data(){
    return {
      noTask : require('@/assets/notask.png'),
      loading : true,
      modalOpen : false,
      submittedData : null,
      savedTasks : [],
      welcome : true
    }
  },
  components: {
    AlertCard,
    AddTaskButton,
    AddTaskModal,
    WelcomePage
},
  created() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks){
      this.savedTasks = savedTasks;
    }

    this.loading = false;
  },
  methods : {
    submitTask(data){
      if(!localStorage.getItem('tasks')){
        localStorage.setItem('tasks', '[]');
        this.savedTasks = [];
      }

      if(!JSON.parse(localStorage.getItem('tasks'))){
        localStorage.setItem('tasks', '[]')
      }

      this.savedTasks.push({id : Math.floor(Math.random() * 100), name: data.name, description : data.description, month: data.month, day: data.day, hour: data.hour, minute: data.minute, finished : data.finished})
      localStorage.setItem('tasks', JSON.stringify([...this.savedTasks]))
    },
    deleteTask(id){
      const getTasks = JSON.parse(localStorage.getItem('tasks'));
      if(getTasks){
          const taskIndex = getTasks.findIndex((task) => task.id === id);
          getTasks.splice(taskIndex, 1);
          this.savedTasks = getTasks;

          localStorage.setItem('tasks', JSON.stringify(getTasks));
      }
    },
    toggleTheme(){
      const htmlEl = document.documentElement;
      htmlEl.classList.toggle('dark');
    }
  }
}
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(255, 234, 45);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #000000;
}

input:checked + .slider::before{
    background-color: #ffffff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>