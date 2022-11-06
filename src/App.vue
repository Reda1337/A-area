<template>
  <Loader />
  <Navbar />
  <router-view :key="$route.fullPath"/>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Loader from "./components/core/Loader.vue"
import Home from "./components/Home.vue"

export default {
  components:{
    Navbar,
    Home,
    Loader
  },
  data() {
    return {
    }
  },
  mounted() {
    // this.$router.push({ path: "/" })
  },
}
</script>
