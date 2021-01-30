<template>
  <b-card-group>
    <b-card
      :img-src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      style="max-width: 40rem;"
      :title="movie.title"
    >
      <b-card-text>
        {{ movie.overview }}
      </b-card-text>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "MovieDetail",
  props: {
    movie: Object,
  },
  methdos: {
    getImage(filePath) {
      this.$http
        .get(`https://image.tmdb.org/t/p/w300/${filePath}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch(
          (error) => console.log(error)
          // this.$bzToast(
          //   this.$t("error"),
          //   this.$t("msg_error_list_registers"),
          //   "danger"
          // )
        );
    },
  },
};
</script>

<style>
</style>