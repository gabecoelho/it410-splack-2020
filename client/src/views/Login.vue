<template>
  <form class="login" @submit.prevent="login()">
    <p>
      <label>
        <span>Email</span>
        <input type="string" v-model="email">
      </label>
    </p>
    <p>
      <label>
        <span>Password</span>
        <input type="password" v-model="password">
      </label>
    </p>
    <p>
      <button type="button" @click="create()">Create Account</button>
      <button type="button" @click="login()">Login</button>
    </p>
  </form>
</template>

<script>
// @ is an alias to /src
import Axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async create() {
      const { email, password } = this;
      if (email && password) {
        const res = await axios.post('/api/users', { email, password })
        this.reset()
        if (res.statusCode === 201) {
          this.$store.dispatch('toast', 'Account created', { status: 'success', duration: 2000 })
        } else {
          this.$store.dispatch('toast', res.data, { status: 'error', duration: 2000 })
        }
      } else {
        this.$store.dispatch('toast', { message: 'Missing email or password', status: 'error', duration: 2000 })
      }
    },
    async login() {
      const { email, password } = this;
      if (email && password) {
        const res = await axios.put('/api/users', { email, password })
        if (res.statusCode === 200) {
          this.$store.dispatch('toast', 'Login successful', { status: 'success', duration: 2000 })
          this.$store.commit('login', email)
          this.$router.push('/')
        } else {
          this.$store.dispatch('toast', res.data, { status: 'error', duration: 2000 })
        }
      } else {
        this.$store.dispatch('toast', 'Missing email or password', { status: 'error', duration: 2000 })
      }
    },
    reset () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../css/vars.styl'
.login {
  label {
    span {
      display: inline-block;
      width: 80px;
    }
  }

  button {
    margin-right: 20px;
  }
}
</style>