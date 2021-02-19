<template>
  <transition name="fade" mode="out-in">
    <b-container fluid="md">
      <router-view />
    </b-container>
  </transition>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style lang="scss">
</style>