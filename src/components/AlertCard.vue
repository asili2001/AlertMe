<template>
    <div :class="counting ? 'bg-[linear-gradient(to_right,#42d39280,#647eff80)]' : 'bg-[linear-gradient(to_right,#42d39226,#647eff26)]'" class="grid grid-rows-3 grid-cols-3 grid-flow-col gap-4 w-full rounded-xl p-3 bg-[linear-gradient(to_right,#42d39280,#647eff80)]">
        <div class="text-xl dark:text-white col-span-2 row-span-1">
            {{taskData.name}}
        </div>
        <div class=" text-sm dark:text-white col-span-2 row-span-1">
            {{taskData.description}}
        </div>
        <div class="flex flex-col justify-center items-center dark:text-gray-200 text-sm col-span-1 row-span-3">
            <vue-countdown :time="milliseconds" v-slot="{ days, hours, minutes, seconds } " @end="onCountdownEnd">
                <div>
                    <span class="text-lg font-bold text-red-500 dark:text-white">{{days}}</span> Dagar
                </div>
                <div>
                    <span class="text-lg font-bold text-red-500 dark:text-white">{{hours}}</span> Timmar
                </div>
                <div>
                    <span class="text-lg font-bold text-red-500 dark:text-white">{{minutes}}</span> Minuter
                </div>
                <div>
                    <span class="text-lg font-bold text-red-500 dark:text-white">{{seconds}}</span> sekunder
                </div>
            </vue-countdown>
        </div>
        <button class=" h-7 w-16 rounded-xl text-white bg-red-500 text-sm col-start-1 row-start-3" @click = "deleteTask">Remove.</button>
    </div>
    <timeIsUpModal v-if="modalDisplayed" @close-modal = "()=>modalDisplayed = false" :taskData = "this.taskData"/>
</template>

<script>
    import VueCountdown from '@chenfengyuan/vue-countdown';
    import timeIsUpModal from '@/components/timeIsUpModal.vue'

    export default{
        name : 'AlertCard',
        data(){
            return{
                milliseconds : 0,
                counting : true,
                modalDisplayed : false,

            }
        },
        created(){
            this.calculateTime();
        },
        props : ['taskData'],
        components : {
            VueCountdown,
            timeIsUpModal
        },
        methods : {
            deleteTask(){
                console.log(this.taskData.id, "delete");
                this.$emit('delete-task', this.taskData.id);
            },

            calculateTime(){
                const currentDate = new Date();
                const date = new Date(currentDate.getFullYear(), this.taskData.month, this.taskData.day, this.taskData.hour, this.taskData.minute);
                const x = date.getTime() - currentDate.getTime()
                // const daysTime = (x)/(1000 * 60 * 60 * 24);
                // const hoursTime = ((x)%(1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                // const minutesTime = ((x)%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60)

                // this.days = parseInt(daysTime);
                // this.hours = parseInt(hoursTime);
                // this.minutes = parseInt(minutesTime);
                this.milliseconds = x
            },
            onCountdownEnd(){
                this.counting = false;
                if (!this.taskData.finished){
                    this.modalDisplayed =  true;
                    
                    const getTasks = JSON.parse(localStorage.getItem('tasks'));
                    if(getTasks){
                        const taskIndex = getTasks.findIndex((task) => task.id === this.taskData.id);
                        getTasks[taskIndex].finished = true;

                        localStorage.setItem('tasks', JSON.stringify(getTasks));
                    }

                }

            }
        }

    }

</script>
