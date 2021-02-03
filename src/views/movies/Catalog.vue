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
      <b-col class="mb-5">
        <b-pagination
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
import MovieDetail from "./MovieDetail";

export default {
  name: "Catalog",
  components: {
    MovieDetail,
  },
  computed: {
    emptyMovies() {
      return this.movies.length == 0;
    },
  },
  watch: {
    currentPage() {
      this.scrollToTop();
      this.loadMovies();
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
      //  '/movie/popular')
      this.$http
        .get(
          `https://api.themoviedb.org/3/movie/popular?page=${this.currentPage}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => (this.movies = response.data.results))
        .catch(() =>
          this.$toast(this.$t("msg_error_listing_movies"), "warning")
        )
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
    this.loadMovies();
  },
};
</script>

<style lang="scss">
</style>