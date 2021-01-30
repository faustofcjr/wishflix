<template>
  <div id="sigin" class="form-account">
    <h1 class="h3 mb-4">
      <font-awesome-icon icon="lock" />
      {{ $t("login") }}
    </h1>

    <b-form @submit="signIn">
      <b-form-group
        id="input-email"
        :label="$t('email')"
        label-for="email"
        label-class="required"
      >
        <b-form-input
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
          autocomplete="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="btn btn-lg btn-block">
        {{ $t("sign_in") }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn(event) {
      event.preventDefault();
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.push({ name: "movies-catalog" }))
        .catch((error) => this.showErrorMessage(error.code));
    },
    showErrorMessage(codeError) {
      let message = "";

      switch (codeError) {
        case "auth/user-not-found":
          message = this.$t("msg_user_wrong_email");
          break;
        case "auth/wrong-password":
          message = this.$t("msg_user_wrong_password");
          break;
        default:
          message = this.$t("msg_error_user_signin");
      }
      this.$toast(this.$t("error"), message, "danger");
    },
  },
};
</script>

<style>
</style>