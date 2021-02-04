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
import watchlist from "@/domains/watchlist";
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
    showScrollUp() {
      return this.watchlist.length > 20;
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
      watchlist.getWatchlist(this.profile, this.watched, (snapshot) => {
        this.watchlist = snapshot;
        this.concatWatchlist(this.watchlist);
      });
    },
  },
  scrollToTop() {
    this.interval = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(this.interval);
      }
      window.scroll(0, window.pageYOffset - 100);
    }, 10);
  },
  mounted() {
    this.loadMovies();
  },
};
</script>

<style  lang="scss">
</style>