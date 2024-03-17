<template>
  <div :class="['full-screen-popup', { 'dark-mode': isDarkMode }]">
    <div class="popup-content">
      <div v-html="popupText" class="text-box" :style="{ color: isDarkMode ? 'white' : 'black' }"></div>
      <button @click="closePopup" tabindex="0" aria-label="Close popup">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false, // Initially assuming light mode
    };
  },
  mounted() {
    // Check if dark mode is preferred by the system
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = darkModeMediaQuery.matches;

    // Listen for changes to the system's color scheme preference
    darkModeMediaQuery.addListener((e) => {
      this.isDarkMode = e.matches;
    });
  },
  props: {
    popupText: {
      type: String,
      default: ''
    }
  },
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.full-screen-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  z-index: 9999; /* Ensure the popup appears on top of other content */
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-screen-popup .popup-content {
  background-color: rgba(255, 255, 255, 0.8); /* semi-transparent white background for popup content */
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.full-screen-popup.dark-mode .popup-content {
  background-color: rgba(0, 0, 0, 0.8); /* semi-transparent black background for dark mode */
}

.text-box {
  margin-bottom: 20px;
  overflow-wrap: break-word;
  max-height: 100%;
  overflow-y: auto;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* blue color for the button */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center;
}

button:hover {
  background-color: #0056b3; /* darker shade of blue on hover */
}
</style>
