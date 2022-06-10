<template>
    <section class="flex flex-col justify-center items-center fixed top-0 left-0 h-full w-full bg-[#20202080] backdrop-blur-sm">
        <div class="flex flex-col justify-between items-center h-[500px] w-4/5 md:w-[400px] dark:bg-[#303030] bg-white rounded-2xl p-6">
            <h1 class="dark:text-white  text-slate-800 text-4xl">Time's Up!!</h1>
            <img :src="timeIsUpGif" alt="time is up" class="h-40">
            <p class="dark:text-white  text-slate-800  text-xl">Its time to "{{this.taskData.name}}"</p>
            <button @click="closeModal" class=" h-12 w-4/5 text-white rounded-2xl text-2xl bg-[linear-gradient(to_right,#42d39280,#647eff80)]">Got It</button>
        </div>

        <video ref = "audioControl" controls autoplay loop muted hidden>
            <source src="https://www.mboxdrive.com/Oneplus%2010%20Pro%20!%20OnePlus%20!%20OnePlus%2010%20Pro.mp3" type="audio/x-m4a">
        </video>
    </section>
</template>

<script>
export default{
    name : 'timeIsUpModal',
    data(){
        return{
            timeIsUpGif : require('@/assets/timeisup.gif'),

        }
    },
    props : ['taskData'],
    mounted(){
        const audioEl = this.$refs.audioControl;
        setTimeout(()=>{
            audioEl.play()
            audioEl.muted = false;
        }, 100)
    },
    methods : {
        closeModal(){
            this.$refs.audioControl.pause;
            this.$emit('close-modal');
        }
    }
}
</script>