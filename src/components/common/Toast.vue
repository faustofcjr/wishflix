<script>
export default {
  name: "Toast",
    show(message, variant) {
      this.$bvToast.toast(message, {
        variant,
        solid: true,
        noCloseButton: false
      });
  },
};
</script>