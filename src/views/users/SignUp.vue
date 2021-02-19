<template>
  <div id="signup" class="form-account">
    <h1 class="h3 mb-4">
      {{ $t("sign_up") }}
    </h1>

    <b-form @submit="create" @reset="onCancel">
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
          minlength="6"
          autocomplete="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="reset" id="cancel" variant="danger">
        {{ $t("cancel") }}
      </b-button>
      <b-button type="submit" id="register" variant="success ml-2">
        {{ $t("register") }}
      </b-button>
    </b-form>

    <b-modal
      id="modal-cancel"
      header-bg-variant="success"
      header-text-variant="light"
      footer-bg-variant="light"
      okVariant="success"
      :okTitle="$t('yes')"
      :cancelTitle="$t('no')"
      @ok="cancel"
      :title="$t('warning')"
      >{{ $t("qst_cancel_registration_modal") }}</b-modal
    >
  </div>
</template>

<script>
import user from "@/domains/user";

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        birthday: "",
      },
    };
  },
  methods: {
    create(event) {
      event.preventDefault();
      this.$loading(true);

      user
        .get("email", this.form.email)
        .then((response) => {
          const documents = response.docs.map((doc) => doc.data());
          if (documents.length == 0) {
            const payload = {
              name: this.form.name,
              birthday: this.form.birthday,
            };

            this.$loading(true);

            user
              .create(this.form.email, this.form.password, payload)
              .then(() => {
                let msgSuccess = this.$t("msg_account_successfully_create");
                this.$toast(msgSuccess, "success");
                this.$router.push({ name: "signin" });
              })
              .catch(() => this.showUnexpectedMessage())
              .finally(() => this.$loading(false));
          } else {
            let message = this.$t("msg_signup_email_registered");
            this.$toast(message, "warning");
          }
        })
        .catch(() => this.showUnexpectedMessage())
        .finally(() => this.$loading(false));
    },
    showUnexpectedMessage() {
      let message = this.$t("msg_error_signin");
      this.$toast(message, "danger");
    },
    onCancel(event) {
      event.preventDefault();
      this.$bvModal.show("modal-cancel");
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style  lang="scss">
</style>