<template>
  <div class="legend">
    <div v-for="category in uniqueCategories" :key="category" class="legend-item">
      <span class="dot" :style="{ backgroundColor: getCategoryColor(category) }"></span>
      {{ category }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: this.loadEventsFromSessionStorage(),
    };
  },
  computed: {
    uniqueCategories() {
      const categories = new Set();
      this.events.forEach((event) => {
        if (event.color !== 'gray') {
          categories.add(event.category);
        }
      });
      return Array.from(categories);
    },
  },
  methods: {
    loadEventsFromSessionStorage() {
      // Load events from session storage
      const events = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith('event_')) {
          const event = JSON.parse(sessionStorage.getItem(key));
          events.push(event);
        }
      }
      return events;
    },
    getCategoryColor(category) {
      const eventWithCategory = this.events.find((event) => event.category === category);
      return eventWithCategory ? eventWithCategory.color : 'gray';
    },
  },
};
</script>

<style scoped>
.legend {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.legend-item {
  display: flex;
  align-items: center; 
  margin-bottom: 10px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px; 
  display: inline-block;
}

</style>