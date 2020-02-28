<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div id="sidebar">
      <h3>Channels</h3>
    </div>
    <div id="main">
      <div id="titlebar">Title</div>
      <div id="content">Content</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

axios.get('/')
  .catch(console.error)

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="stylus">
@require './css/vars.styl'

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: color-primary;
  display: flex;
  align-items: stretch;
  height: 100%;

  #sidebar {
    width: 200px;
    background: color-primary;
    color: color-contrast;
    padding: padding-default;

    h3 {
      padding: 0;
      margin: 0;
    }
  }

  #main {
    flex: 1;

    #titlebar {
      padding: padding-default;
      border-bottom: 1px solid color-gray;
    }

    #content {
      padding: padding-default;
    }
  }
}
</style>
