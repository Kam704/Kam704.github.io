<!-- src/components/ViewSwitchButton.vue -->
<template>
  <div>
    <button @click="toggleView" aria-label="Toggle View" tabindex="0">Toggle View</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleView() {
      this.isActive = !this.isActive;
      this.$emit('view-changed', this.isActive);
    },
  },
};
</script>