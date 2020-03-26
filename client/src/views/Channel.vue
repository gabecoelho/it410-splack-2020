<template>
  <div class="channel">
    <div class="titlebar">{{title}}</div>
    <div class="messages">
      <p v-if="!messages.length">There are no messages in this channel. Be the first to post!</p>
      <message v-for="message in messages" :key="message.id"
        :username="message.username"
        :content="message.content"
        :reply-count="message.replyCount"></message>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'Channel',
  components: {
    Message
  },
  props: {
    messages: {
      type: Array,
      default () {
        return [
          {
            username: 'Bob Smith',
            content: 'First to Post!',
            replyCount: 1
          }
        ]
      }
    },
    title: {
      type: String,
      default: 'Channel Name'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@require '../css/vars.styl'

.channel .titlebar {
  padding: padding-default;
  border-bottom: 1px solid color-gray;
}

.messages {
  padding: padding-default;
}
</style>
