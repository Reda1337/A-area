
<template>
  <div class="container mx-auto">
    <div class="ml-20 pt-20">
      <div class="grid lg:grid-cols-2 gap-4">
        <!-- <h1 class="mb-20 text-4xl truncate w-[600px]">Search for "{{this.$route.params.tag}}"</h1> -->
        <div>
          <h1 class="text-white mb-20 text-4xl">Search for "{{this.$route.params.tag}}"</h1>
        </div>
        <div class="justify-self-end">
          <div class="relative">
            <mdicon name="magnify" class="text-blue-900 absolute mt-2 ml-1" />
            <input
              @keyup.enter="search(text)"
              v-model="text"
              placeholder="Anime Name..."
              class="border border-blue-900 w-72 h-10 focus:outline focus:outline-blue-500 pl-7 rounded"
            />
        </div>
        </div>
      </div>
      <div 
        id="search-scroll"
        class="h-screen mb-20 overflow-y-scroll content-start grid lg:grid-cols-3 gap-2"
      >
        <div 
          class="grid grid-cols-3 gap-2 cursor-pointer"
          v-for="anime in searchList"
          :key="anime.animeId"
          @click="watchEpisode(anime.animeId, anime.animeId + '-episode-1')"
        >
          <img :src="anime.animeImg" class="w-full h-full" />
          <div class="text-white col-span-2">
            <h1 >{{anime.animeTitle}} <br />{{anime.status}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 2,
      text: ''
    }
  },
  computed: {
    searchList() {
      const data = this.$store.getters.getSearchList;
      return data;
    },
    requestPage() {
      const data = this.$store.getters.getRequestPage;
      return data
    }
  },
  mounted() {
    const scroll = document.getElementById("search-scroll");

    scroll.addEventListener("scroll", this.onScrollEnd);
    if (this.searchList.length <= 0) {
      this.search(this.$route.params.tag)
    }
  },
  methods: {
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
    async onScrollEnd(e) {
      const target = e.target;
      if (
        target.scrollTop + 20 >= target.scrollHeight - target.offsetHeight &&
        this.requestPage
      ) {
        try {
          await this.$store.commit("SET_REQUEST_PAGE", { status: false });
          await this.$store.dispatch("searchTag", {tag: this.$route.params.tag, index: this.page});
          this.page++;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async search(tag) {
      try {
        const index = 1;
        await this.$store.dispatch("searchTag", { tag, index: 1 });
        this.$router.push({ name: "search", params: { tag } });
        this.text = ""
      } catch (error) {
        this.text = "";
        console.log(error);
      }
    }
  },

  unmounted() {
    window.removeEventListener("scroll", this.onScrollEnd);
    this.$store.commit("RESET_SEARCH");
  }
}
</script>