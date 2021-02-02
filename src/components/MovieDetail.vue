<template>
  <b-card-group>
    <b-card
      :img-src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      :title="movie.title"
      class="movie-poster"
    >
      <!-- <b-card-text>
        {{ movie.overview }}
      </b-card-text> -->

      <template #footer>
        <b-button
          variant="outline-success"
          @click="addWatchlist()"
          v-if="watchlistId == null"
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
export default {
  name: "MovieDetail",
  props: {
    movie: Object,
    watchlistId: { Type: String, default: null },
    watched: { Type: Boolean, default: false },
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

      const profile = JSON.parse(localStorage.getItem("profile"));
      const watchlist = { profile: profile, movie, watched: false };

      this.$firebase
        .firestore()
        .collection("watchlist")
        .add(watchlist)
        .catch((error) => console.log(error));
    },
    watchAgain() {
      this.UpdateWatched(false);
    },
    markAsWatch() {
      this.UpdateWatched(true);
    },
    UpdateWatched(watched) {
      this.$firebase
        .firestore()
        .collection("watchlist")
        .doc(this.watchlistId)
        .update({ watched })
        .catch((error) => console.log(error));
    },
    // getImage(filePath) {
    //   this.$http
    //     .get(`https://image.tmdb.org/t/p/w300/${filePath}`)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch(
    //       (error) => console.log(error)
    //       // this.$bzToast(
    //       //   this.$t("error"),
    //       //   this.$t("msg_error_list_registers"),
    //       //   "danger"
    //       // )
    //     );
    // },
  },
};
</script>

<style>
</style>