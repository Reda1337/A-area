

<template>
  <div class="container mx-auto">
    <div class="ml-20 content-start text-white grid gap-3 lg:grid-cols-3">
      <div class="mt-20 border ">
        <img class="rounded-[50px] h-full w-full" :src="animeDetails.animeImg"/>
      </div>
      <div class="mt-20 lg:col-span-2 bg-gray-800">
        <div class="h-5/6 w-full">
          <h1 class="mt-10 ml-5 font-sans text-4xl antialiased font-bold">{{animeDetails.animeTitle}}</h1>
          <div class="flex mb-4 mt-4 ml-7 ">
            <p class="text-gray-300 font-bold">alt: </p>
            <p class="ml-5 text-gray-400">{{animeDetails.otherNames}}</p>
          </div>
          <div class="flex mb-4 ml-7 ">
            <p class="text-gray-300 font-bold">year: </p>
            <p class="ml-5 text-gray-400">{{animeDetails.releasedDate}}</p>
          </div>
          <div class="flex mb-4 ml-7 ">
            <p class="text-gray-300 font-bold">status: </p>
            <p class="ml-5 text-gray-400">{{animeDetails.status}}</p>
          </div>
          <div class="flex mb-4 ml-7 ">
            <p class="text-gray-300 font-bold">genre: </p>
            <div class="flex relative ">
              <div
                  class="bg-blue-700 p-1 ml-2 rounded text-white"
                  v-for="item in animeDetails.genres"
                  :key="item"
              >
                {{item}}
              </div>
            </div>
          </div>
          <p class="max-h-60 overflow-y-scroll pl-5 pr-10 mt-20 text-xl text-gray-200 italic">
            {{animeDetails.synopsis}}
          </p>
        </div>
      </div>
    </div>
    <div class="text-white">{{episodeUrls}}</div>
    <!-- <div class="test-player-wrap">
      <vue3-video-player :core="HLSCore" :src="'' + $route.params.episodeId">
      </vue3-video-player>
    </div> -->
  </div>
</template>

<script>
export default {
  computed: {
    animeDetails() {
      const data = this.$store.getters.getAnimeDetails;
      console.log({data});
      return data
    },
    episodeUrls() {
      const data = this.$store.getters.getEpisodeUrls;
      return data
    },
  },
  async created() {

  },
  
}
</script>

<style scoped>

</style>