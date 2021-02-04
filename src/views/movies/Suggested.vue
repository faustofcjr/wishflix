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
    </b-row>

    <b-button
      @click="scrollToTop()"
      v-if="showScrollUp"
      pill
      variant="success"
      class="btn-scroll-top"
    >
      <font-awesome-icon icon="arrow-up" />
    </b-button>
  </main>
</template>

<script>
import movie from "@/domains/movie";
import MovieDetail from "./MovieDetail";
import { mapGetters } from "vuex";

export default {
  name: "Suggested",
  components: {
    MovieDetail,
  },
  computed: {
    ...mapGetters(["rankGenres", "watchlist"]),
    emptyMovies() {
      return this.movies.length == 0;
    },
    showScrollUp() {
      return this.movies.length > 20;
    },
  },
  watch: {
    currentPage() {
      this.scrollToTop();
    },
    rankGenres() {
      this.loadMovies();
    },
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    loadMovies() {
      let movies = [];
      const maxPostion = 3; // count until 3º rank

      for (let i = 0; i < this.rankGenres.length; i++) {
        if (i > maxPostion) {
          break;
        }

        const genre = this.rankGenres[i];
        let filtered = this.watchlist.filter((watch) => {
          let genre_ids = watch.genre_ids;
          return genre_ids.includes(parseInt(genre));
        });

        movies = movies.concat(filtered);
      }

      movie
        .listAdvancedRecommendations(movies)
        .then((response) => (this.movies = response.movies))
        .catch(() =>
          this.$toast(this.$t("msg_error_listing_movies"), "danger")
        )
        .finally(() => this.$loading(false));
    },
    scrollToTop() {
      this.interval = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.interval);
        }
        window.scroll(0, window.pageYOffset - 100);
      }, 10);
    },
  },
};
</script>

<style  lang="scss">
</style>