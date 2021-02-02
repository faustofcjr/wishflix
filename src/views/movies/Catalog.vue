<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <div id="search">
          <b-form-input
            v-model="searchTerm"
            :placeholder="$t('find_movie')"
          ></b-form-input>
        </div>

        <b-tabs content-class="mt-1">
          <b-tab id="most_watched" :title="$t('most_watched')" active>
            <b-row>
              <b-col
                v-for="movie of movies"
                :key="movie.id"
                cols="3"
                class="mb-5 d-flex align-items-stretch"
              >
                <MovieDetail :movie="movie" />
              </b-col>
            </b-row>
          </b-tab>

          <b-tab :title="$t('watchlist')">
            <Watchlist />
          </b-tab>

          <b-tab :title="$t('watched')">
            <Watchlist :watched="true" />
          </b-tab>
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
      <!--<b-nav-form>
             <b-form-input
              size="sm"
              class="mr-sm-2"
              :placeholder="$t('find_movie')"
            >
            </b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              {{ $t("search") }}
            </b-button>
          </b-nav-form> -->
    </b-row>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import MovieDetail from "@/components/MovieDetail";
import Watchlist from "./Watchlist";
import { mapGetters } from "vuex";

export default {
  name: "Catalog",
  components: {
    MovieDetail,
    Watchlist,
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  watch: {
    searchTerm(term) {
      if (term.trim().length > 0) {
        this.debounceSearch();
      }
    },
  },
  data() {
    return {
      page: 1,
      movies: [],
      searchTerm: "",
    };
  },
  methods: {
    listMovies() {
      this.$loading(true);
      //  '/movie/popular')
      this.$http
        .get(
          `https://api.themoviedb.org/3/movie/popular?page=${this.page}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => {
          this.movies = response.data.results;
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
    search() {
      //  '/search/movie
      this.$http
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${this.searchTerm}&api_key=40d26954d2e35216b139b80e5f442fef&language=pt-BR`
        )
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch(() =>
          this.$bzToast(
            this.$t("error"),
            this.$t("msg_error_searching_movies"),
            "danger"
          )
        );
    },
  },
  created() {
    this.debounceSearch = debounce(this.search, 1000);
  },
  mounted() {
    this.listMovies();
  },
};
</script>

<style>
</style>