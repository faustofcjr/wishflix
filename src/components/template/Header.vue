<template>
  <header>
    <b-navbar toggleable="lg" type="dark">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <font-awesome-icon icon="film" class="mr-2" />
        <strong>{{ $t("app_name") }} </strong>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="$t('language')" right>
            <b-dropdown-item
              v-for="lang of languages"
              :key="lang.key"
              @click="setLanguage(lang.key)"
            >
              <font-awesome-icon icon="check" v-show="lang.key === language" />
              {{ lang.value }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="user">
            <template #button-content>
              <em v-if="!profile">{{ user.email }}</em>
              <em v-else>{{ profile.name }}</em>
            </template>

            <b-dropdown-item @click="changeProfile()" v-if="profile" >
              <font-awesome-icon icon="user-friends" class="mr-1" />
              {{ $t("change_profile") }}
            </b-dropdown-item>

            <b-dropdown-item @click="signOut()">
              <font-awesome-icon icon="sign-out-alt" class="mr-1" />
              {{ $t("sign_out") }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["user", "profile", "language"]),
  },
  data() {
    return {
      languages: [
        { key: "pt_br", value: this.$t("portuguese") },
        { key: "en", value: this.$t("english") },
      ],
    };
  },
  methods: {
    ...mapActions(["logout", "cleanProfile", "changeLanguage"]),
    setLanguage(key) {
      this.$store.dispatch("changeLanguage", key);
    },
    changeProfile() {
      this.cleanProfile("cleanProfile");
      this.$router.push({ name: "user-profile" });
    },
    signOut() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "signin" });
          this.$store.dispatch("logout");
        });
    },
  },
};
</script>

<style lang="scss">
</style>