import {  createStore } from 'vuex'

const modules = {}
const files = import.meta.glob('./modules/*.module.js')

for (const path in files) {
  await files[path]().then((mod) => {
    const moduleName = path.replace(/(\.\/|\.module\.js)/g, '')
    modules[moduleName] = mod.default
  })
}

const store = createStore({
  modules
})

export default store