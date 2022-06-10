<template>
    <div ref="anim" class="flex flex-col gap-5 p-5 items-center fixed -bottom-1/2 left-0 w-full h-[400px] dark:bg-[#2B2B2B] transition duration-150 ease-in-out md:w-[500px] md:m-auto md:left-1/2 md:-translate-x-1/2 ">
        <h1 class="text-white text-2xl">New Task</h1>
        <div class="flex flex-col gap-3 w-full">
            <input class=" h-12 w-full bg-[#464646] rounded focus:outline-none text-white p-3" type="text" placeholder="Task Name" v-model="selectedTaskName">
            <input class=" h-12 w-full bg-[#464646] rounded focus:outline-none text-white p-3" type="text" placeholder="Task Description" v-model="selectedTaskDescription">
        </div>
        <div class="grid grid-cols-2 w-full gap-3">
            <select @change="newDateReset('month', selectedMonthInput, selectedDayInput, selectedHourInput)" class="bg-[#464646] h-12 text-white" v-model="selectedMonthInput">
                <option :value= "currentMonth.number" selected>{{currentMonth.name}}</option>
                <option v-for="month in monthsLeft" v-bind:key="month.number" :value=month.number>{{month.name}}</option>
            </select>

            <select @change="newDateReset('day', selectedMonthInput, selectedDayInput, selectedHourInput)" class="bg-[#464646] h-12 text-white" v-model="selectedDayInput">
                <option v-for="(day, index) in daysLeft" v-bind:key="index" :value="day.number">day {{day.number}}</option>
            </select>

            <select @change="newDateReset('hour', selectedMonthInput, selectedDayInput, selectedHourInput)" class="bg-[#464646] h-12 text-white" v-model="selectedHourInput">
                <option v-for = "(hour, index) in hoursLeft" v-bind:key = "index" :value="hour.number">{{hour.number}} o'clock</option>
            </select>

            <select class="bg-[#464646] h-12 text-white" v-model="selectedMinuteInput">
                <option v-for = "(minute, index) in minutesLeft" v-bind:key = "index" :value="minute.number">{{minute.number}} minutes</option>
            </select>
        </div>

        <button @click="submitTask" class=" h-12 w-4/5 text-white rounded-2xl text-2xl bg-[linear-gradient(to_right,#42d39280,#647eff80)]">Submit Task</button>
    </div>
</template>

<script>
import anime from 'animejs'


export default{
    name : 'AddTaskModal',
    data(){
        return{
            currentDay : null,
            daysLeft : [],
            currentMonth : null,
            monthsLeft : [],
            currentTime : null,
            hoursLeft : [],
            minutesLeft : [],

            selectedMonthInput : new Date().getMonth(),
            selectedDayInput : new Date().getDate(),
            selectedHourInput : new Date().getHours(),
            selectedMinuteInput : new Date().getMinutes(),
            selectedTaskName : '',
            selectedTaskDescription : '',
        }
    },
    mounted() {
        anime({
            targets: this.$refs.anim,
            bottom: '0',
            easing: 'cubicBezier(.5, .05, .1, .3)',
            duration : 300
        })
    },
    methods: {
        setCurrentDateTime(reset){
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

             const currentDateTime = new Date();

            //set the currents
            this.currentDay = {number : currentDateTime.getDate(), name : days[currentDateTime.getDay()], dayNumber : currentDateTime.getDay()}
            this.currentMonth = {number : currentDateTime.getMonth(), name : months[currentDateTime.getMonth()]}
            this.currentTime = {hour : currentDateTime.getHours(), minutes : currentDateTime.getMinutes()};

            const isLeapYear = (year) => {
                return new Date(year, 1, 29).getDate() === 29;
            }


            if (reset === 'months'){
                this.monthsLeft = [];

                this.selectedMonthInput = currentDateTime.getMonth();

                for(let i = 11 - currentDateTime.getMonth(); i < 12; i++){
                    this.monthsLeft.push({number : i, name : months[i]})
                }
            }

            if(reset === 'days'){
                this.daysLeft = [];

                this.selectedDayInput = currentDateTime.getDate();

                if(currentDateTime.getMonth() === 0 || currentDateTime.getMonth() === 2 || currentDateTime.getMonth() === 4 || currentDateTime.getMonth() === 6 || currentDateTime.getMonth() === 7 || currentDateTime.getMonth() === 9 || currentDateTime.getMonth() === 11 ){
                    for(let i = currentDateTime.getDate(); i < 32; i++){
                        this.daysLeft.push({number : i})
                    }
                }else if(currentDateTime.getMonth() === 1){
                    if(isLeapYear(currentDateTime.getFullYear())){
                        for(let i = currentDateTime.getDate(); i < 29; i++){
                            this.daysLeft.push({number : i})
                        }
                    }else{
                        for(let i = currentDateTime.getDate(); i < 30; i++){
                            this.daysLeft.push({number : i})
                        }
                    }
                }else{
                    for(let i = currentDateTime.getDate(); i < 31; i++){
                        this.daysLeft.push({number : i})
                    }
                }

            }

            if(reset === 'hours'){
                this.hoursLeft = [];

                this.selectedHourInput = currentDateTime.getHours();

                for(let i = currentDateTime.getHours(); i < 24; i++ ){
                    this.hoursLeft.push({number : i})
                }
            }

            if(reset === 'minutes'){
                this.minutesLeft = [];

                this.selectedMinuteInput = currentDateTime.getMinutes();

                for(let i = currentDateTime.getMinutes(); i < 60; i++ ){
                    this.minutesLeft.push({number : i})
                }
            }

        },

        newDateReset(action, selectedMonth, selectedDay, selectedHour){
            selectedMonth = parseInt(selectedMonth)
            selectedDay = parseInt(selectedDay)
            selectedHour = parseInt(selectedHour)
            const currentDateTime = new Date();
            const isLeapYear = (year) => {
                return new Date(year, 1, 29).getDate() === 29;
            }

            if(action === 'month'){

                if(currentDateTime.getMonth() !== selectedMonth){

                    this.daysLeft = [];
                    this.hoursLeft = [];
                    this.minutesLeft = [];

                    if(selectedMonth === 0 || selectedMonth === 2 || selectedMonth === 4 || selectedMonth === 6 || selectedMonth === 7 || selectedMonth === 9 || selectedMonth === 11 ){
                        for(let i = 1; i < 32; i++){
                            this.daysLeft.push({number : i})
                        }
                    }else if(selectedMonth === 1){
                        if(isLeapYear(currentDateTime.getFullYear())){
                            for(let i = currentDateTime.getDate(); i < 29; i++){
                                this.daysLeft.push({number : i})
                            }
                        }else{
                            for(let i = currentDateTime.getDate(); i < 29; i++){
                                this.daysLeft.push({number : i})
                            }
                        }
                    }
                    else{
                        for(let i = 1; i < 31; i++){
                            this.daysLeft.push({number : i})
                        }
                    }


                    for(let i = 0; i < 24; i++ ){
                        this.hoursLeft.push({number : i})
                    }

                    for(let i = 0; i < 60; i++ ){
                        this.minutesLeft.push({number : i})
                    }

                    return;
            
                }else {

                    this.setCurrentDateTime('days');
                    this.setCurrentDateTime('hours');
                    this.setCurrentDateTime('minutes');
                }

            }

            if(action === 'day'){

                if(currentDateTime.getDate() !== selectedDay){
                    this.hoursLeft = [];
                    this.minutesLeft = [];

                    for(let i = 0; i < 24; i++ ){
                        this.hoursLeft.push({number : i})
                    }
                    for(let i = 0; i < 60; i++ ){
                        this.minutesLeft.push({number : i})
                    }

                    return;
                }else{
                    if(currentDateTime.getMonth() === selectedMonth ){
                        this.setCurrentDateTime('hours');
                        this.setCurrentDateTime('minutes');
                    }
                }
            }

            if(action === 'hour'){
                if(currentDateTime.getHours() !== selectedHour){
                    this.minutesLeft = [];

                    for(let i = 0; i < 60; i++ ){
                        this.minutesLeft.push({number : i})
                    }
                    return;
                }else{
                    if(currentDateTime.getDate() === selectedDay){
                        this.setCurrentDateTime('minutes');
                    }
                }
            }
        }, 

        submitTask(){
            const data = {name: this.selectedTaskName, description: this.selectedTaskDescription, month : this.selectedMonthInput, day: this.selectedDayInput, hour: this.selectedHourInput, minute: this.selectedMinuteInput, finished : false}
            this.$emit('get-data', data)
        }
    },
    created(){
        this.setCurrentDateTime('months');
        this.setCurrentDateTime('days');
        this.setCurrentDateTime('hours');
        this.setCurrentDateTime('minutes');
    }
}
</script>
