<template>
  <div class="container mx-auto">
    <div class="mt-10 flex flex-wrap border border-black">
      <div class="ml-3 grow-0 w-[500px]">
        <h1 class="font-mono text-5xl text-white">Latest Episodes</h1>
      </div>
      <div
        class="ml-3 flex mt-10 lg:mt-0 justify-start lg:justify-end grow relatve items-end"
      >
        <div class="relative">
          <mdicon name="magnify" class="text-blue-900 absolute mt-2 ml-1" />
          <input
            placeholder="Anime Name..."
            class="border border-blue-900 w-72 h-10 focus:outline focus:outline-blue-500 pl-7 rounded"
          />
        </div>
      </div>
    </div>
    <div
      class="ml-3 overflow-y-scroll content-start mt-20 grid gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-2 lg:grid-cols-5 lg:gap-2 h-screen"
    >
      <div
        class="cursor-pointer bg-gray-800 rounded-[10px]"
        v-for="animeEpisode in latestEpisodes"
        :key="animeEpisode.animeId"
        @click="watchEpisode(animeEpisode.animeId, animeEpisode.episodeId)"
      >
        <img :src="animeEpisode.animeImg" class="w-full h-5/6" />
        <div class="flex flex-col text-white relative">
          <div class="absolute rounded -top-9 left-2 bg-white text-black p-1">
            {{ animeEpisode.subOrDub }}
          </div>
          <div class="absolute rounded right-2 -top-9 bg-red-500 p-1">
            Episode {{ animeEpisode.episodeNum }}
          </div>
          <div
            class="font-sans text-xl flex justify-center align-center text-gray-300 p-3"
          >
            <div class="">{{ animeEpisode.animeTitle }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="test-player-wrap">
      <vue3-video-player :core="HLSCore" src="https://wwwx15.gogocdn.stream/videos/hls/o2CH8Rw7LZmT13b1nY2KSg/1667658162/194654/9f11c469545a167de45769fe76e00090/ep.6.1667642953.m3u8" title="test">
      </vue3-video-player>
    </div> -->
  </div>
</template>

<script>
import HLSCore from "@cloudgeek/playcore-hls";

export default {
  data() {
    return {
      HLSCore,
    };
  },
  computed: {
    latestEpisodes() {
      const data = this.$store.getters.getLatestAnimeList;
      return data;
    },
  },
  created() {
    this.$store.dispatch("loadLatestEpisodes");
  },
  methods: {
    async watchEpisode(animeId, episodeId) {
      this.$store.dispatch("DISPLAY_LOADER", {show: true});
      try {
        await this.$store.dispatch("loadAnimeDetails", animeId);
        await this.$store.dispatch("loadAnimeWatchingUrls", episodeId);
        this.$store.dispatch("DISPLAY_LOADER", {show: false});
        this.$router.push({ name: "watch", params: { animeId, episodeId } });
      } catch (e) {
        this.$store.dispatch("DISPLAY_LOADER", {show: false});
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
