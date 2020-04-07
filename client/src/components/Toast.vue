<template>
  <div v-if="message" :class="classes" mode="out-in">{{message}}</div>
</template>

<script>
export default {
  name: 'Toast',
  computed: {
    classes () {
      return 'toast ' +
        (this.message ? 'show ' : '') +
        (this.status || '')
    },
    message () {
      return this.$store.state.toast.message
    },
    status () {
      return this.$store.state.toast.status
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@require '../css/vars.styl'

.toast {
  position absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid;
  padding: padding-default;
  border-radius: radius-default;
  display: none;

  &.info {
    background: lighten(color-secondary, 80%);
    color: color-secondary;
  }

  &.success {
    background: lighten(color-accent-good, 50%);
    color: darken(color-accent-good, 80%);
  }

  &.error {
    border-color: red;
    background: lighten(red, 80%);
  }

  &.show {
    display: block;
  }
}
</style>
