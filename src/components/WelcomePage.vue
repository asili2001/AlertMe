<template>
    <div class="flex flex-col justify-center items-center fixed top-0 left-0 h-full w-full dark:bg-[#20202080] bg-white backdrop-blur-lg" >
    <div class="flex flex-col justify-center items-center gap-8 h-[250px] w-4/5 md:w-[400px] dark:bg-[#303030] rounded-2xl p-4">
      <div class="flex flex-col items-center font-[system-ui] gap-3">
          <h1 class=" text-5xl dark:text-white text-slate-800">Welcome</h1>
          <p class=" text-2xl dark:text-white text-slate-800">To AlertMe :)</p>
      </div>
      <button @click="bodyWallpaper(false); $emit('continue', true)" class=" h-12 w-4/5 text-white rounded-2xl text-2xl bg-[linear-gradient(to_right,#42d39280,#647eff80)]">Continue</button>
    </div>
  </div>
</template>

<script>
export default{
    name : 'WelcomePage',
    data(){
      return{
        wallpaper : require('@/assets/wallpaper.gif')
      }
    },
    methods: {
        bodyWallpaper(append) {
          const appEl = document.getElementById('app');
          if(append){
            appEl.style.backgroundImage = `url(${this.wallpaper})`;
          }else{
            appEl.style.backgroundImage = `unset`;
          }
        }
    },
    created(){
      this.bodyWallpaper(true)
    }
}
</script>
