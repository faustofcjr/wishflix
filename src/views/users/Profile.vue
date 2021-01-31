<template>
  <div id="profile" class="profile">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">{{ $t("app_name") }}</h1>
      <p class="lead">{{ $t("msg.choose.profile") }}</p>
    </div>

    <div class="row mb-5 mt-5">
      <div
        class="col-lg-2 text-center"
        v-for="profile of profiles"
        :key="profile.key"
      >
        <b-button
          :variant="profile.main ? 'outline-primary' : 'outline-success'"
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
      </div>

      <div class="col-lg-2 text-center" v-show="reachedMaxProfiles">
        <b-button v-b-modal.modal-prevent-closing variant="outline-dark">
          <font-awesome-icon icon="user-plus" size="7x" />
        </b-button>
        <h5>{{ $t("new_profile") }}</h5>
      </div>
    </div>

    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        :title="$t('new_profile')"
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
export default {
  name: "Profile",
  computed: {
    reachedMaxProfiles() {
      return this.profiles.length < 4;
    },
    checkFormValidity() {
      const name = this.form.name;
      return name.length > 0 && this.isValidName(name);
    },
  },
  data() {
    return {
      userId: null,
      profiles: [],
      form: { name: "" },
    };
  },
  methods: {
    selectProfile(profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
      this.$router.push({ name: "movies-catalog" });
    },
    resetFormModal() {
      this.form.name = "";
    },
    handleFormOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      const name = this.form.name;

      if (this.isValidName(name)) {
        this.addProfile();
      }
    },
    isValidName(name) {
      const found = this.profiles.find(
        (profile) => profile.name.toLowerCase() === name.toLowerCase()
      );
      return !found;
    },
    addProfile() {
      let newOne = {
        uid: this.$uuid.v4(),
        name: this.form.name,
        main: false,
      };

      this.$nextTick(() => {
        this.resetFormModal();
        this.$bvModal.hide("modal-prevent-closing");
      });

      this.$firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .update({
          profiles: this.$firebase.firestore.FieldValue.arrayUnion(newOne),
        })
        .then(() => this.profiles.push(newOne))
        .catch(() =>
          this.$toast(
            this.$t("error"),
            this.$t("msg_error_adding_profiles"),
            "danger"
          )
        );
    },
    getByValue(key, value) {
      return this.$firebase
        .firestore()
        .collection("users")
        .where(key, "==", value)
        .get();
    },

    removeProfile(profile) {
      this.$firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .update({
          profiles: this.$firebase.firestore.FieldValue.arrayRemove(profile),
        })
        .then(() => {
          var index = this.profiles
            .map((p) => {
              return p.uid;
            })
            .indexOf(profile.uid);
          this.profiles.splice(index, 1);
        })
        .catch(() =>
          this.$toast(
            this.$t("error"),
            this.$t("msg_error_adding_profiles"),
            "danger"
          )
        );
    },
  },
  mounted() {
    const currentUser = this.$firebase.auth().currentUser;
    this.getByValue("uid", currentUser.uid)
      .then((response) => {
        const user = response.docs[0];
        this.userId = user.id;
        this.profiles = user.data().profiles;
      })
      .catch(() =>
        this.$toast(
          this.$t("error"),
          this.$t("msg_error_listing_profiles"),
          "danger"
        )
      );
  },
};
</script>

<style>
</style>