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
import MovieDetail from "@/components/MovieDetail";
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
      rows: 2,
      movies: [],
    };
  },
  methods: {
    loadMovies() {
      this.$loading(true);
      
      const rdGenre = this.rankGenres[Math.floor(Math.random() * 3)][0];
      let movies = this.watchlist.filter((watch) =>{
        const genre_ids = watch.genre_ids
        return genre_ids.includes(parseInt(rdGenre))
      });

      const rdMovie = movies[Math.floor(Math.random(),  movies.length - 1)];
      const movieId = rdMovie.id;

      this.$http
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?page=${this.currentPage}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => (this.movies = response.data.results))
        .catch(() =>
          this.$toast(
            this.$t("error"),
            this.$t("msg_error_listing_movies"),
            "danger"
          )
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

<style  lang="scss">
</style>