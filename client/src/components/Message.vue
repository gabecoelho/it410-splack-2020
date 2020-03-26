<template>
  <div class="message">
    <div class="user">{{username}}</div>
    <div class="content">{{content}}</div>
    <div class="replies" v-if="replyCount">
      <a href='#'>{{repliesMessage}}</a>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
export default {
  name: 'Channel',
  components: {
    Message,
  },
  props: {
    content: {
      type: String,
      default: '-'
    },
    replyCount: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      default: 'Anonymous'
    }
  },
  computed: {
    repliesMessage () {
      if (this.replyCount === 1) return '1 reply'
      return this.replyCount + ' replies'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message > div {
  margin: 5px 0;
}
.replies a {
  text-decoration: none;
  font-style: italic;
  margin-left: 15px;
}
.user {
  font-weight: bold;
}
</style>
