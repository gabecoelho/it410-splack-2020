<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div id="sidebar">
      <h3>Channels</h3>
      <div v-for="channel in channels" :key="channel.id">
        <router-link :to="'/channels/' + channel.id">
          {{channel.title}}
        </router-link>
      </div>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

// import axios from 'axios'
// axios.get('/')
//   .catch(console.error)

export default {
  name: 'App',
  data () {
    return {
    channels: [
      {
        id: 'general',
        title: 'General',
        messages: [
          {
            username: 'Bob Smith',
            content: 'First to Post!',
            replyCount: 1
          },
          {
            username: 'Jan Jones',
            content: 'Does anyone know the purpose of this channel?'
          },
          {
            username: 'Pablo Vasquez',
            content: 'It is for any posts that are intended for a general audience.'
          }
        ]
      },
      {
        id: 'serious-stuff',
        title: 'Serious Stuff',
        messages: []
      },
      {
        id: 'random',
        title: 'Random',
        messages: [
          {
            username: 'Alicia Tran',
            content: 'I like turtles!'
          }
        ]
      }
    ]
  }
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
      margin: 0 0 10px 0;
    }

    a {
      display: block;
      padding: 5px;
      margin: 0 -5px;
      text-decoration: none;
      color: color-contrast;

      &:hover {
        background-color: alpha(color-contrast, .25);
      }
    }
  }

  #main {
    flex: 1;
    padding: padding-default;
  }
}
</style>
