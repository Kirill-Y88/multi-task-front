<template>
  <div class="auth-register font_2">
    <h3>Authorization</h3>
    <form @submit.prevent = "Submit" >
        <fieldset class="auth-fieldset font_2">
          <input class="font_2" v-model="login" placeholder="username" >
          <input class="font_2" v-model="password" type="password" placeholder="password">
          <button class="font_2" @click="onSubmitAuto" > Send</button>

        </fieldset>
    </form>

      <router-link v-bind:to="{name: 'registration'}">Need an account?</router-link>


  </div>
</template>

<script>


export default {
  name: 'McvAuthorization',
  data(){
    return {
      login: '',
      password: ''
    }
  },

  methods:{

    onSubmitAuto(){
      localStorage.clear()
        this.$store.dispatch('authorization', {
        login: this.login,
        password: this.password
      })
          .then(user => {
            console.log('successfully register user', user)
            this.$router.push({name: 'home'})
          })

      this.login = ''
      this.password = ''


    }
  }


}

</script>