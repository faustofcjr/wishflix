<template>
  <div>
    {{ $t("sign_up") }}
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-name"
        :label="$t('name')"
        label-for="name"
        label-class="required"
      >
        <b-form-input id="name" v-model="form.name" required></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-birthday"
        :label="$t('birthday')"
        label-for="birthday"
        label-class="required"
      >
        <b-form-input
          type="date"
          id="birthday"
          v-model="form.birthday"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-email"
        :label="$t('email')"
        label-for="email"
        label-class="required"
      >
        <b-form-input
          type="email"
          id="email"
          v-model="form.email"
          required
          autofocus
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-password"
        :label="$t('password')"
        label-for="password"
        label-class="required"
      >
        <b-form-input
          type="password"
          id="password"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">
        {{ $t("submit") }}
      </b-button>
      <b-button type="reset" variant="danger" class="ml-2">
        {{ $t("cancel") }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        profile: "",
        email: "",
        password: "",
        name: "",
        birthday: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.validateSignup()
      // this.$http.post("https://wishflix-5c831-default-rtdb.firebaseio.com/users.json", this.form)
      // .then(response => console.log(response))
      // .catch(error => console.log(error))
    },
    validateSignup() {
       this.$http.get("https://wishflix-5c831-default-rtdb.firebaseio.com/users.json", this.form)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    },
    onReset(event) {
      event.preventDefault();
    },
  },
};
</script>

<style>
</style>