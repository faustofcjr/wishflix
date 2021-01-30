<template>
  <footer class="text-muted py-5">
    <div class="container">
      <a href="https://www.themoviedb.org" target="_blank">
        <img src="@/assets/image/tmdb-logo.svg" />
      </a>
      <p>{{ $t("tmdb-use-terms") }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
</style>