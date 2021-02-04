<template>
  <b-container>
    <b-row>
      <b-col>
        <div id="search">
          <b-form-input v-model="searchTerm" :placeholder="$t('find_movie')" />
        </div>

        <b-tabs content-class="mt-1">
          <b-tab id="most-watched" :title="$t('most_watched')" active>
            <Catalog :searchTerm="searchTerm" />
          </b-tab>
          <b-tab id="suggested-movies" :title="$t('suggested_movies')">
            <Suggested />
          </b-tab>

          <b-tab id="watchlist" :title="$t('watchlist')">
            <Watchlist />
          </b-tab>

          <b-tab id="watched" :title="$t('watched')">
            <Watchlist :watched="true" />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Catalog from "./Catalog";
import Watchlist from "./Watchlist";
import Suggested from "./Suggested";

export default {
  name: "Movies",
  components: {
    Catalog,
    Suggested,
    Watchlist,
  },
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>

<style  lang="scss">
</style>