<template>
  <div class="home">
    <h1>Welcome to Splack!</h1>
    <p>The lacking slack alternative.</p>
    <p>Click on the channel to the left to get started.</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped lang="stylus">
@require '../css/vars.styl'

</style>
