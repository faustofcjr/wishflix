<template>
  <main>
    <h4 v-show="emptyMovies">{{ $t("any_movies_selected") }}</h4>
    <b-row>
      <b-col
        v-for="wl of watchlist"
        :key="wl.movie.id"
        cols="3"
        class="mb-5 align-items-stretch"
      >
        <MovieDetail
          :movie="wl.movie"
          :watched="wl.watched"
          :watchlistId="wl.id"
        />
      </b-col>
    </b-row>
  </main>
</template>

<script>
import movie from "@/domains/movie";
import MovieDetail from "./MovieDetail";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Watchlist",
  components: {
    MovieDetail,
  },
  props: {
    watched: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters(["profile"]),
    emptyMovies() {
      return this.watchlist.length == 0;
    },
  },
  data() {
    return {
      watchlist: [],
    };
  },
  methods: {
    ...mapActions(["concatWatchlist"]),
    loadMovies() {
      movie.getWatchlist(this.profile, this.watched, (snapshot) => {
        this.watchlist = snapshot;
        this.concatWatchlist(this.watchlist);
      });
    },
  },
  mounted() {
    this.loadMovies();
  },
};
</script>

<style  lang="scss">
</style>