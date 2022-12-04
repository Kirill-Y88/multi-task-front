<template>
  <div class="auth-register font_2">
    Authorization
    <form @submit.prevent = "onSubmit" >
        <fieldset class="auth-fieldset font_2">
          <input class="font_2" v-model="username" placeholder="username" >
          <input class="font_2" v-model="password" type="password" placeholder="password">
          <button class="font_2" @click="onSubmit" > Send</button>

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
      username: '',
      password: ''
    }
  },

  methods:{

    onSubmit(){
      console.log('send', this.username, this.password)
      this.username = ''
      this.password = ''
    }
  }


}

</script>