<template>
  <div class="grid grid-cols-12">
    <div class="ml-20 col-span-12">
      <Latest v-if="navItem == 'Latest'"/>
      <!-- <Animes v-if="navItem == 'Animes'"/> -->
    </div>
  </div>
</template>

<script>
import Latest from "./Latest.vue"
import Animes from "./Animes.vue"

export default {
  components:{
    Latest,
    Animes
  },
  computed:{
    navItem(){
      const data = this.$store.getters.getNavItem
      return data
    }
  },
  mounted() {

  },
}
</script>