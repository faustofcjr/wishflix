<template>
  <main v-infinite-scroll="loadMovies" :infinite-scroll-distance="scrollDistance" >
    <h4 v-show="emptyMovies">{{ $t("any_movies_selected") }}</h4>
    <b-row >
      <b-col
        v-for="movie of movies"
        :key="movie.id"
        cols="3"
        class="mb-5 d-flex align-items-stretch"
      >
        <MovieDetail :movie="movie" />
      </b-col>
    </b-row>
  </main>
</template>

<script>
import MovieDetail from "@/components/MovieDetail";
import { mapGetters } from "vuex";

export default {
  name: "Catalog",
  components: {
    MovieDetail,
  },
  computed: {
    ...mapGetters(["profile"]),
    emptyMovies() {
      return this.movies.length == 0;
    },
    scrollDistance() {
      return this.page * 10
    }
  },
  data() {
    return {
      page: 0,
      movies: [],
    };
  },
  methods: {
    loadMovies() {
      this.$loading(true);
      this.page += 1
      //  '/movie/popular')
      this.$http
        .get(
          `https://api.themoviedb.org/3/movie/popular?page=${this.page}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => {
          this.movies = this.movies.concat(response.data.results);
        })
        .catch(() =>
          this.$bzToast(
            this.$t("error"),
            this.$t("msg_error_listing_movies"),
            "danger"
          )
        )
        .finally(() => this.$loading(false));
    },
  },
};
</script>

<style  lang="scss">
</style>