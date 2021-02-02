<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <div id="search">
          <b-form-input
            v-model="searchTerm"
            :placeholder="$t('find_movie')"
          ></b-form-input>
        </div>

        <b-tabs content-class="mt-1">
          <b-tab id="most_watched" :title="$t('most_watched')" active> 
              <Catalog />
          </b-tab>

          <b-tab :title="$t('watchlist')">
            <Watchlist />
          </b-tab>

          <b-tab :title="$t('watched')">
            <Watchlist :watched="true" />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import Catalog from "./Catalog";
import Watchlist from "./Watchlist";

export default {
  name: "Movies",
  components: {
    Catalog,
    Watchlist,
  },
  computed: {},
  watch: {
    searchTerm(term) {
      if (term.trim().length > 0) {
        this.debounceSearch();
      }
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    search() {
      //  '/search/movie
      this.$http
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${this.searchTerm}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch(() =>
          this.$bzToast(
            this.$t("error"),
            this.$t("msg_error_searching_movies"),
            "danger"
          )
        );
    },
  },
  created() {
    this.debounceSearch = debounce(this.search, 1000);
  },
};
</script>

<style  lang="scss">
</style>