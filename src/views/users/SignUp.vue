<template>
  <div id="signup" class="form-account">
    <h1 class="h3 mb-4">
      <font-awesome-icon icon="user-plus" />
      {{ $t("sign_up") }}
    </h1>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-name"
        :label="$t('name')"
        label-for="name"
        label-class="required"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          required
          autofocus
        ></b-form-input>
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
          autocomplete="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-password"
        :label="$t('password_minimum_six_characters')"
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

      <b-button type="submit" variant="primary">
        {{ $t("register") }}
      </b-button>
      <b-button type="reset" variant="danger" class="ml-2">
        {{ $t("cancel") }}
      </b-button>
    </b-form>

    <b-modal
      id="modal-cancel"
      header-bg-variant="secondary"
      header-text-variant="light"
      footer-bg-variant="light"
      :okTitle="$t('yes')"
      :cancelTitle="$t('no')"
      @ok="cancel"
      :title="$t('warning')"
      >{{ $t("qst_cancel_registration_modal") }}</b-modal
    >
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        profiles: [],
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

      if (this.form.password.length < 6) {
        this.$toast(
          this.$t("error"),
          this.$t("msg_error_signup_password_length"),
          "danger"
        );
        return;
      }

      this.getByValue("email", this.form.email)
        .then((response) => {
          const documents = response.docs.map((doc) => doc.data());
          if (documents.length == 0) {
            this.create();
          } else {
            let message = this.$t("msg_signup_email_registered");
            this.$toast(this.$t("error"), message, "danger");
          }
        })
        .catch(() => this.showUnexpectedMessage());
    },
    create() {
      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((response) => {
          const user = {
            uid: response.user.uid,
            email: this.form.email,
            name: this.form.name,
            birthday: this.form.birthday,
          };

          this.$firebase
            .firestore()
            .collection("users")
            .add(user)
            .then(() => this.$router.push({ name: "signin" }))
            .catch(() => this.showUnexpectedMessage());
        })
        .catch(() => this.showUnexpectedMessage());
    },
    showUnexpectedMessage() {
      let message = this.$t("msg_error_signin");
      this.$toast(this.$t("error"), message, "danger");
    },
    getByValue(key, value) {
      return this.$firebase
        .firestore()
        .collection("users")
        .where(key, "==", value)
        .get();
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.show("modal-cancel");
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>