<template>
  <main>
    <section
      id="create-account"
      class="py-5 text-center container"
      v-if="!currentUser"
    >
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">{{ $t("app_name") }}</h1>
          <p class="lead text-muted">
            {{ $t("app_proposition") }}
          </p>
          <p>
            <router-link
              :to="{ name: 'signup' }"
              class="btn btn-primary my-2 mr-2"
            >
              {{ $t("create_an_account") }}
            </router-link>
            <router-link :to="{ name: 'signin' }" class="btn btn-success my-2">
              {{ $t("i_have_account") }}
            </router-link>
          </p>
        </div>
      </div>
    </section>

    <div>
      <b-container fluid>
        <b-row>
          <b-col cols="9">
            <b-tabs content-class="mt-3">
              <b-tab id="most_watched" :title="$t('most_watched')" active>
                <b-row>
                  <b-col
                    v-for="movie of movies"
                    :key="movie.id"
                    cols="3"
                    class="mb-3"
                  >
                    <MovieDetail :movie="movie" />
                  </b-col>
                </b-row>
              </b-tab>

              <b-tab :title="$t('watchlist')" @click="getWatchlist()">
                <b-row>
                  <b-col
                    v-for="wl of watchlist"
                    :key="wl.movie.id"
                    cols="3"
                    class="mb-3"
                  >
                    <MovieDetail
                      :movie="wl.movie"
                      :watched="wl.watched"
                      :watchlistId="wl.id"
                    />
                  </b-col>
                </b-row>
              </b-tab>

              <b-tab :title="$t('watched')" @click="getWatched()">
                <b-row>
                  <b-col
                    v-for="wl of watched"
                    :key="wl.movie.id"
                    cols="3"
                    class="mb-3"
                  >
                    <MovieDetail
                      :movie="wl.movie"
                      :watched="wl.watched"
                      :watchlistId="wl.id"
                    />
                  </b-col> </b-row
              ></b-tab>
            </b-tabs>
          </b-col>

          <!-- <b-col>
            <b-form-select v-model="selectedGenre">
              <b-form-select-option :value="null">
                {{ $t("select_genre") }}
              </b-form-select-option>

              <b-form-select-option
                v-for="genre of genres"
                :key="genre.id"
                :value="genre.id"
              >
                {{ genre.name }}
              </b-form-select-option>
            </b-form-select>
          </b-col> -->
        </b-row>
      </b-container>
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
      currentUser: null,
      page: 1,
      selectedGenre: null,
      watchlist: [],
      watched: [],
      movies: [],
      genres: [],
    };
  },
  methods: {
    getWatchlist() {
      return this.$firebase
        .firestore()
        .collection("watchlist")
        .where("watched", "==", false)
        .get()
        .then((snapshot) => {
          this.watchlist = [];
          snapshot.docs.forEach((doc) => {
            this.watchlist.push({ id: doc.id, ...doc.data() });
          });
        })
        .catch((error) => console.log(error));
    },

    getWatched() {
      return this.$firebase
        .firestore()
        .collection("watchlist")
        .where("watched", "==", true)
        .get()
        .then((snapshot) => {
          this.watched = [];
          snapshot.docs.forEach((doc) => {
            this.watched.push({ id: doc.id, ...doc.data() });
          });
        })
        .catch((error) => console.log(error));
    },

    listGenres() {
      // /genre/movie/list
      this.$http
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR"
        )
        .then((response) => {
          this.genres = response.data.genres;
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
    listMovies() {
      // movie/popular
      this.$http
        .get(
          `https://api.themoviedb.org/3/movie/popular?page=${this.page}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => {
          // console.log(response.data);
          this.movies = response.data.results;
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
    listMore() {
      this.page += 1;

      this.$http
        .get(
          `https://api.themoviedb.org/3/movie/popular?page=${this.page}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => {
          this.movies = this.movies.concat(response.data.results);
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
  mounted() {
    this.currentUser = this.$firebase.auth().currentUser;
    this.listGenres();
    this.listMovies();
  },
};
</script>

<style>
</style>