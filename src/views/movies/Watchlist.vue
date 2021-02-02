<template>
  <main
    v-infinite-scroll="loadMovies"
    :infinite-scroll-distance="scrollDistance"
  >
    <h4 v-show="emptyMovies">{{ $t("any_movies_selected") }}</h4>
    <b-row>
      <b-col v-for="wl of watchlist" :key="wl.movie.id" cols="3" class="mb-3">
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
import MovieDetail from "@/components/MovieDetail";
import { mapGetters } from "vuex";

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
    scrollDistance() {
      return this.page * 10;
    },
  },
  data() {
    return {
      watchlist: [],
    };
  },
  methods: {
    loadMovies() {
      this.$firebase
        .firestore()
        .collection("watchlist")
        .where("profile", "==", this.profile)
        .where("watched", "==", this.watched)
        .onSnapshot((snapshot) => {
          this.watchlist = [];
          snapshot.docs.forEach((doc) => {
            this.watchlist.push({ id: doc.id, ...doc.data() });
          });
        });
    },
  },
};
</script>

<style  lang="scss">
</style>