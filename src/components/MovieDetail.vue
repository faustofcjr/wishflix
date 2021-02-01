<template>
  <b-card-group>
    <b-card
      :img-src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      style="max-width: 40rem"
      :title="movie.title"
    >
      <b-card-text>
        {{ movie.overview }}
      </b-card-text>

      <b-button
        variant="outline-success"
        v-b-tooltip.hover
        :title="$t('add_to_my_list')"
        @click="addWatchlist()"
        v-if="watchlistId == null"
      >
        <font-awesome-icon icon="plus-circle" size="lg" />
      </b-button>

      <b-button
        variant="outline-success"
        @click="markAsWatch()"
        v-if="watchlistId != null && !watched"
      >
        <font-awesome-icon icon="child" />
        {{ $t("already_watched") }}
      </b-button>
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
        .then(() => console.log("sucesso"))
        .catch((error) => console.log(error));
    },
    markAsWatch() {
      this.$firebase
        .firestore()
        .collection("watchlist")
        .doc(this.watchlistId)
        .update({
          watched: true,
        });
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