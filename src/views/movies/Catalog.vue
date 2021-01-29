<template>
  <main>
    <section id="create-account" class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">{{ $t("app_name") }}</h1>
          <p class="lead text-muted">
            {{ $t("app_proposition") }}
          </p>
          <p>
            <a href="#" class="btn btn-primary my-2 mr-2">
              {{ $t("create_an_account") }}
            </a>
          </p>
        </div>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="movie of movies" :key="movie.key">
            <MovieDetail :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MovieDetail from "@/components/MovieDetail";
export default {
  name: "Catalog",
  components: {
    MovieDetail,
  },
  data() {
    return {
      movies: [
        {}
      ],
    };
  },
  methods: {
    listMovies() {
      console.log('List Movies')
    }
  },
  mounted() {
    this.listMovies()
  }

};
</script>

<style>
</style>