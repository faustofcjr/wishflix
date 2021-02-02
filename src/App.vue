<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "@/components/template/Header";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "App",
  components: {
    Header,
    Content,
    Footer,
  },
  methods: {
    ...mapActions(["getCurrentUser", "getCurrentLanguage"]),
  },
  mounted() {
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("changeLanguage");
  },
};
</script>

<style lang="scss" src="@/assets/scss/main.scss">
</style>
