<template>
  <main>
    <h4 v-show="emptyMovies">{{ $t("any_movies_selected") }}</h4>
    <b-row>
      <b-col
        v-for="movie of movies"
        :key="movie.id"
        cols="3"
        class="mb-5 align-items-stretch"
      >
        <MovieDetail :movie="movie" />
      </b-col>
      <b-col class="mb-5" v-show="displayPagination">
        <b-pagination
          v-if="!emptyMovies"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="1"
          last-number
        ></b-pagination>
      </b-col>
    </b-row>
  </main>
</template>

<script>
import movie from "@/domains/movie";
import { debounce } from "lodash";
import MovieDetail from "./MovieDetail";

export default {
  name: "Catalog",
  components: {
    MovieDetail,
  },
  props: {
    searchTerm: { type: String, default: "" },
  },
  computed: {
    emptyMovies() {
      return this.movies.length == 0;
    },
    displayPagination() {
      return this.searchTerm.length == 0;
    }
  },
  watch: {
    currentPage() {
      this.scrollToTop();
      this.loadMovies();
    },
    searchTerm(term) {
      if (term.trim().length > 0) {
        this.debounceSearch();
      }

      if (term.length == 0) {
        this.loadMovies()
      }
    },
  },
  data() {
    return {
      currentPage: 1,
      rows: 500,
      movies: [],
    };
  },
  methods: {
    loadMovies() {
      this.$loading(true);
      movie
        .listPopular(this.currentPage)
        .then((response) => (this.movies = response.data.results))
        .catch(() => this.$toast(this.$t("msg_error_listing_movies"), "warning"))
        .finally(() => this.$loading(false));
    },
    search() {
      if(this.searchTerm.length == 0) {
        return;
      }
      this.$loading(true);
      movie
        .search(this.searchTerm).then((response) => this.movies = response.data.results)
        .catch(() => this.$toast(this.$t("msg_error_searching_movies"), "warning"))
        .finally(() => this.$loading(false));
    },
    scrollToTop() {
      this.interval = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.interval);
        }
        window.scroll(0, window.pageYOffset - 50);
      }, 20);
    },
  },
  mounted() {
    this.debounceSearch = debounce(this.search, 1000);
    this.loadMovies();
  },
};
</script>

<style lang="scss">
</style>