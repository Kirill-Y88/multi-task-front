<template>
  <div class="auth-register font_2">
    <h3>Registration</h3>
    <form @submit.prevent = "Submit" >
      <fieldset class="registration-fieldset font_2">
        <input class="font_2" v-model="login" placeholder="username" >
        <input class="font_2" v-model="email" type="text" placeholder="email">
<!--        <input class="font_2" v-model="name" type="text" placeholder="имя">-->
        <input class="font_2" v-model="password" type="password" placeholder="password">
        <button class="font_2" @click="onSubmitRegister" > Send</button>

      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'McvRegistration',
  data() {
    return {
      login: '',
      email: '',
      name:'tempUser',
      password: ''
    }
  },
  methods:{

    onSubmitRegister(){
      localStorage.clear()
      this.$store.dispatch('registration', {
        id: '',
        login: this.login,
        email: this.email,
        name: this.name,
        password: this.password,
        userRoleString: ''
      })
          .then(user => {
            console.log('successfully register user', user)
            this.$router.push({name: 'home'})
          })

      this.login = ''
      this.email =''
      // this.name = ''
      this.password = ''
    }
  }

}

</script>