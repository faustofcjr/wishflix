<template>
  <b-card-group>
    <b-card :img-src="image" img-lazy img-alt="Card image">
      
      <b-card-text>
        <h5>{{ movie.title }}</h5>
      </b-card-text>

      <template #footer>
        <b-button
          variant="outline-success"
          @click="addWatchlist()"
          v-if="watchlistId == null"
          :disabled="forbidWatch"
        >
          {{ $t("will_watch") }}
        </b-button>

        <b-button
          variant="outline-success"
          @click="markAsWatch()"
          v-if="watchlistId != null && !watched"
        >
          {{ $t("already_watched") }}
        </b-button>

        <b-button
          variant="outline-success"
          @click="watchAgain()"
          v-if="watchlistId != null && watched"
        >
          {{ $t("watch_again") }}
        </b-button>
      </template>
    </b-card>
  </b-card-group>
</template>

<script>
import movie from "@/domains/movie";
import watchlist from "@/domains/watchlist";
import { mapGetters } from "vuex";

export default {
  name: "MovieDetail",
  props: {
    movie: Object,
    watchlistId: { Type: String, default: null },
    watched: { Type: Boolean, default: false },
  },
  computed: {
    ...mapGetters(["watchlist", "profile"]),
    forbidWatch() {
      const moviesIds = this.watchlist.map((watch) => watch.id);
      const forbid = !this.watchlistId && moviesIds.includes(this.movie.id);
      return forbid;
    },
  },
  data() {
    return {
      image: ""
    }
  },
  methods: {
    addWatchlist() {
      const movie = {
        id: this.movie.id,
        title: this.movie.title,
        overview: this.movie.overview,
        poster_path: this.movie.poster_path,
        genre_ids: this.movie.genre_ids,
      };

      watchlist
        .addToWatchlist(movie, this.profile)
        .catch(() => this.$toast(this.$t("msg_error_add_movie_watchlist", "warning")));
    },
    watchAgain() {
      this.UpdateWatched(false);
    },
    markAsWatch() {
      this.UpdateWatched(true);
    },
    UpdateWatched(watched) {
      watchlist
        .updateWatchlist(this.watchlistId, { watched })
        .catch(() => this.$toast(this.$t("msg_error_update_movie_watchlist", "warning")));
    },
    getImage() {
      const path = this.movie.poster_path

      // some poster_path come null, prevent console error
      this.image = path ? movie.getImageURL(path) : "" 
    },
  },
  mounted() {
    this.getImage()
  }
};
</script>

<style lang="scss">
</style>