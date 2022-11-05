<template>
  <div class="grid grid-cols-12">
    <div class="ml-20 col-span-12">
      <Latest v-if="navItem == 'Latest'"/>
    </div>
  </div>
</template>

<script>
import Latest from "./Latest.vue"
export default {
  components:{
    Latest
  },
  computed:{
    navItem(){
      const data = this.$store.getters.getNavItem
      console.log({data});
      return data
    }
  },
  mounted() {

  },
}
</script>