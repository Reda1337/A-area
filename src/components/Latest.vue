<template>
  <div class="container mx-auto">
    <div class="mt-20 flex flex-wrap border border-black">
      <div class="ml-3 grow-0 w-[500px]">
        <h1 class="font-mono text-5xl text-white">Home Area</h1>
      </div>
      <div
        class="ml-3 flex mt-10 lg:mt-0 justify-start lg:justify-end grow relatve items-end"
      >
        <div class="relative">
          <mdicon name="magnify" class="text-blue-900 absolute mt-2 ml-1" />
          <input
            @keyup.enter="search"
            v-model="text"
            placeholder="Anime Name..."
            class="border border-blue-900 w-72 h-10 focus:outline focus:outline-blue-500 pl-7 rounded"
          />
        </div>
      </div>
    </div>
    <div class="mt-20 ml-2 text-white flex flex-row">
      <p class="mr-2 p-4 bg-blue-700 rounded text-2xl cursor-pointer" @click="changeChoice = false">Latest</p>
      <p class="mr-2 p-4 bg-blue-700 rounded text-2xl cursor-pointer" @click="changeChoice = true">Popular</p>
    </div>
    <div
      v-show="changeChoice === false"
      id="scroll"
      class="mb-20 ml-3 overflow-y-scroll content-start grid gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-2 lg:grid-cols-5 lg:gap-2 h-screen"
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
    <!-- <div class="text-white ml-20">
      {{PupularAnime}}
    </div> -->
    <div id="scroll-popular" v-show="changeChoice" class="mb-20 overflow-y-scroll content-start grid lg:grid-cols-3 h-screen">
      <div
        class="ml-5 mt-5 text-white grid grid-cols-3 gap-3 cursor-pointer"
        v-for="anime in PupularAnime"
        :key="anime.animeId"
        @click="watchEpisode(anime.animeId, anime.animeId + '-episode-1')"
      >
        <img :src="anime.animeImg" class="w-full rounded" />
        <div class="col-span-2 bg-gray-800 flex">
          <h1 class="text-xl truncate self-center p-2">{{anime.animeTitle}}<br />({{anime.releasedDate}})</h1>
        </div>
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
      text: '',
      page: 1,
      popularPage: 1,
      changeChoice: false
    };
  },
  computed: {
    latestEpisodes() {
      const data = this.$store.getters.getLatestAnimeList;
      return data;
    },
    PupularAnime() {
      const data = this.$store.getters.getPopularAnime;
      return data;
    },
    requestPage() {
      const data = this.$store.getters.getRequestPage;
      return data;
    },
    requestPopular() {
      const data = this.$store.getters.getPopularPage;
      return data;
    },
  },
  async created() {
    await this.$store.dispatch("loadLatestEpisodes", this.page);
    await this.$store.dispatch("loadPopularAnime", this.popularPage);
  },
  mounted() {
    const element = document.getElementById("scroll");
    const popular = document.getElementById("scroll-popular");

    element.addEventListener("scroll", this.onScrollEnd);
    popular.addEventListener("scroll", this.onPopularScrollEnd);
  },
  methods: {
    async onScrollEnd(e) {
      const target = e.target;
      if (
        target.scrollTop + 20 >= target.scrollHeight - target.offsetHeight &&
        this.requestPage
      ) {
        try {
          await this.$store.commit("SET_REQUEST_PAGE", { status: false });
          await this.$store.dispatch("loadLatestEpisodes", this.page + 1);
          this.page++;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async onPopularScrollEnd(e) {
      const target = e.target;
      if (
        target.scrollTop + 20 >= target.scrollHeight - target.offsetHeight &&
        this.requestPopular
      ) {
        try {
          await this.$store.commit("SET_POPULAR_REQUEST", { status: false });
          await this.$store.dispatch("loadPopularAnime", this.popularPage + 1);
          this.popularPage++;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async watchEpisode(animeId, episodeId) {
      this.$store.dispatch("DISPLAY_LOADER", { show: true });
      try {
        await this.$store.dispatch("loadAnimeDetails", animeId);
        await this.$store.dispatch("loadAnimeWatchingUrls", episodeId);
        this.$store.dispatch("DISPLAY_LOADER", { show: false });
        this.$router.push({ name: "watch", params: { animeId, episodeId } });
      } catch (e) {
        this.$store.dispatch("DISPLAY_LOADER", { show: false });
        console.log(e);
      }
    },
    async search() {
      try {
        this.$store.commit("RESET_SEARCH");
        const index = 1;
        await this.$store.dispatch("searchTag", { tag: this.text, index: 1 });
        this.$router.push({ name: "search", params: { tag: this.text } });
        this.text = ""
      } catch (error) {
        this.text = "";
        console.log(error);
      }
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScrollEnd);
    window.removeEventListener("scroll", this.onPopularScrollEnd);
    this.$store.commit("RESET_DETAILS")
  },
};
</script>

<style scoped></style>
