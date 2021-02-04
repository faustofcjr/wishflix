<template>
  <div id="profile" class="text-center">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto">
      <h1 class="display-4">{{ $t("app_name") }}</h1>
      <p class="lead">{{ $t("msg_choose_profile") }}</p>
    </div>

    <b-row class="justify-content-md-center pt-md-5">
      <b-col cols="3" v-for="profile of profiles" :key="profile.key">
        <b-button
          :variant="profile.main ? 'outline-success': 'outline-primary'"
          @click="selectProfile(profile)"
        >
          <font-awesome-icon icon="user" size="7x" />
        </b-button>
        <h4>{{ profile.name }}</h4>
        <b-button
          variant="outline-danger"
          pill
          v-if="!profile.main"
          @click="removeProfile(profile)"
        >
          <font-awesome-icon icon="trash-alt" size="lg" />
        </b-button>
      </b-col>

      <b-col v-show="!reachedMaxProfiles" cols="3">
        <b-button v-b-modal.modal-prevent-closing variant="outline-dark">
          <font-awesome-icon icon="user-plus" size="7x" />
        </b-button>
        <h5>{{ $t("new_profile") }}</h5>
      </b-col>
    </b-row>

    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        :title="$t('new_profile')"
        header-bg-variant="success"
        header-text-variant="light"
        okVariant="success"
        :ok-disabled="!checkFormValidity"
        @hidden="resetFormModal"
        @ok="handleFormOk"
      >
        <form ref="form" @submit.stop.prevent="handleFormOk">
          <b-form-group :label="$t('name')" label-for="name-input">
            <b-form-input
              id="name-input"
              v-model="form.name"
              autofocus
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import user from "@/domains/user";

export default {
  name: "Profile",
  computed: {
    reachedMaxProfiles() {
      return this.profiles.length >= 4;
    },
    checkFormValidity() {
      return this.isValidName();
    },
  },
  data() {
    return {
      currentUser: {},
      profiles: [],
      form: { name: "" },
    };
  },
  methods: {
    selectProfile(profile) {
      this.$store.dispatch("addProfile", profile);
      this.$router.push({ name: "movies" });
    },
    resetFormModal() {
      this.form.name = "";
    },
    handleFormOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.isValidName()) {
        this.addProfile();
      }
    },
    isValidName() {
      const name = this.form.name;
      return (
        name.length > 0 &&
        !this.profiles.find(
          (profile) => profile.name.toLowerCase() === name.toLowerCase()
        )
      );
    },
    addProfile() {
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });

      this.$loading(true);
      user
        .addProfile(this.currentUser.id, this.form.name)
        .then((response) => this.profiles.push(response.profile))
        .catch(() =>
          this.$toast(this.$t("msg_error_adding_profiles"), "danger")
        )
        .finally(() => this.$loading(false));
    },

    removeProfile(profile) {
      this.$loading(true);

      user
        .removeProfile(this.currentUser.id, profile)
        .then(() => {
          var index = this.profiles.map((p) => p.uuid).indexOf(profile.uuid);
          this.profiles.splice(index, 1);
        })
        .catch(() =>
          this.$toast(this.$t("msg_error_deleting_profiles"), "danger")
        )
        .finally(() => this.$loading(false));
    },
    getUser() {
      this.$loading(true);
      user
        .getCurrentUser()
        .then((response) => {
          this.currentUser = response.user;
          this.profiles = this.currentUser.profiles;
        })
        .catch(() =>
          this.$toast(this.$t("msg_error_listing_profiles"), "danger")
        )
        .finally(() => this.$loading(false));
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss">
</style>