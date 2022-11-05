<script>

export default {
  data() {
    return {
      active: false,
      clicked: 0,
      items: [
        {text: 'Latest', icon: 'autorenew'},
        {text: 'Ranking', icon: 'chevron-triple-up'},
        {text: 'Inventory', icon: 'eye-plus-outline'}
      ]
    }
  },
  methods: {
    changeDisplay () {
      this.active = !this.active
    },
    setClicked(index, item) {
      console.log("item ", item);
      this.clicked = index;
      this.$store.dispatch("updateNavItem", { text: item });
      console.log(this.$store.getters.getNavItem);
    }
  },
}
</script>

<template>
  <div :class="[active ? 'w-72' : 'w-16']" class="fixed h-screen bg-gray-800 duration-500 z-10">
    <div class="flex flex-col relative">
      <div @click="changeDisplay" :class="[active ? 'rotate-180' : '']" class="duration-500 border border-black absolute -right-3 top-7 text-blue-700 bg-white rounded-[20px] cursor-pointer">
        <mdicon name="arrow-left"/>
      </div>
      
      <div :class="[active ? 'ml-4' : '']" class="flex duration-500">
        <mdicon name="television" size="50" class="mt-4 text-blue-900" />
        <h1 :class="[active ? '': 'scale-0']" class="ml-3 duration-500 text-white mt-6 text-2xl">A-area</h1>
      </div>

      <div class="ml-3 mt-20">
        <ul>
          <li
            class=" text-sm flex items-center gap-x-4 cursor-pointer p-2 rounder-md mt-6 duration-500"
            v-for="({text, icon}, index) in items"  
            @click="setClicked(index, text)"
            :key="index"
            :class="[index === clicked ? 'text-black bg-white': 'text-gray-300 hover:bg-gray-500']"
          >
            <mdicon :name="icon" />
            <h1 :class="[active ? '' : 'scale-0']" class="duration-300">{{ text }}</h1>
          </li>
        </ul>
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>

