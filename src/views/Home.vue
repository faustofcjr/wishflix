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
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>