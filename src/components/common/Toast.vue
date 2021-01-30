<script>
export default {
  name: "Toast",
  methods: {
    success(title, message) {
      console.log(title, message);
      // this.show(title, message, "success");
    },
    warning(title, message) {
      console.log(title, message);
      // this.show(title, message, "warning");
    },
    danger(title, message) {
      console.log(title, message);
      // this.show(title, message, "error");
    },
    show(title, message, variant) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>