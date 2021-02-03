<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="success">
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
              @click="changeLanguage(lang.key)"
            >
              <font-awesome-icon icon="check" v-show="lang.key === language" />
              {{ $t(lang.value) }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="user">
            <template #button-content>
              <em v-if="!profile">{{ user.email }}</em>
              <em v-else>{{ profile.name }}</em>
            </template>

            <b-dropdown-item @click="changeProfile()" v-if="profile">
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
import user from "@/domains/user";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["user", "profile", "languages", "language"]),
  },
  methods: {
    ...mapActions(["logout", "cleanProfile", "changeLanguage"]),
    changeProfile() {
      this.cleanProfile();
      this.$router.push({ name: "user-profile" });
    },
    signOut() {
      user
        .signOut()
        .then(() => {
          this.$router.push({ name: "signin" });
          this.logout();
        })
        .catch(() => this.$toast(this.$t("msg_error_user_signout"), "warning"));
    },
  },
};
</script>

<style lang="scss">
</style>