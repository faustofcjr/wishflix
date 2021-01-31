<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <font-awesome-icon icon="film" class="mr-2" />
        <strong>{{ $t("app_name") }} </strong>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              :placeholder="$t('find_movie')"
            >
            </b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              {{ $t("search") }}
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown :text="$t('language')" right>
            <b-dropdown-item
              v-for="language of languages"
              :key="language.key"
              @click="changeLanguage(language.key)"
            >
              {{ language.value }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
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
export default {
  name: "Header",
  data() {
    return {
      languages: [
        { key: "pt_br", value: this.$t("portuguese") },
        { key: "en", value: this.$t("english") },
      ],
    };
  },
  methods: {
    changeLanguage(key) {
      console.log(key);
    },
    signOut() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Logout successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>