

<template>
  <div class="container mx-auto">
    <div class="ml-20 content-start text-white grid gap-3 lg:grid-cols-3">
      <div class="mt-20  ">
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
    <div v-if="showVideo === true" class="mt-20 ml-20  mb-20 grid lg:grid-cols-6 gap-1">
      <div v-if="bkp === false" class="col-span-5">
        <vue3-video-player :core="HLSCore" :src="watchFile" :title="$route.params.episodeId">
        </vue3-video-player>
      </div>
      <div v-else class="col-span-5">
        <vue3-video-player :core="HLSCore" :src="watchBkpFile" :title="$route.params.episodeId">
        </vue3-video-player>
      </div>
      <div class="text-white">
        <div class="flex flex-row lg:flex-col">
          <div @click="episodeUrl" class="cursor-pointer rounded p-2 ml-2 mt-2 bg-blue-700">WATCH SERVER</div>
          <div @click="episodeBkpUrl" class="cursor-pointer rounded ml-2 p-2 mt-2 bg-blue-700">BUCKUP SERVER</div>
        </div>
      </div>
    </div>
    <h1 class="ml-20 text-3xl mb-5 text-white">Episodes</h1>
    <div class="ml-20 overflow-y-scroll mb-20 max-h-screen text-white grid md:gap-4 md:grid-cols-3 lg:grid-cols-4">
      <div 
          class="w-full bg-gray-800 cursor-pointer"
          v-for="item in animeDetails.episodesList"
          :key="item.episodeNum"
          @click="watchEpisode(item.episodeId)"
      >
        <img :src="animeDetails.animeImg" class="rounded w-full" />
        <h1 class="p-3 text-2xl">{{$route.params.animeId + ' ' + item.episodeNum}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import HLSCore from "@cloudgeek/playcore-hls";

export default {
  data() {
    return {
      HLSCore,
      bkp: false
    };
  },
  computed: {
    animeDetails() {
      const data = this.$store.getters.getAnimeDetails;
      return data
    },
    watchFile() {
      const data = this.$store.getters.getEpisodeUrls;
      return data.sources[0].file
    },
    watchBkpFile() {
      const data = this.$store.getters.getEpisodeUrls;
      return data.sources_bk[0].file
    },
    episodeUrls () {
      const data = this.$store.getters.getEpisodeUrls;
      return data
    },
    showVideo() {
      const data = this.$store.getters.getShowVideo;
      return data
    }
  },
  methods: {
    async watchEpisode(episodeId) {
      this.$store.dispatch("DISPLAY_LOADER", { show: true });
      try {
        await this.$store.dispatch("loadAnimeDetails", this.$route.params.animeId);
        await this.$store.dispatch("loadAnimeWatchingUrls", episodeId);
        this.$store.dispatch("DISPLAY_LOADER", { show: false });
        this.$router.push({ name: "watch", params: { animeId: this.$route.params.animeId, episodeId } });
      } catch (e) {
        this.$store.dispatch("DISPLAY_LOADER", { show: false });
        console.log(e);
      }
    },
    episodeUrl() {
      this.bkp = false
    },
    episodeBkpUrl() {
      this.bkp = true
    }
  },
  
}
</script>

<style scoped>

</style>