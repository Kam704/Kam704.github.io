<!-- src/components/Timeline.vue -->
<template>
  <div class="timeline-container">
    <legend-component />
  <div class="timeline">
    <div class="timeline-line"/>
      <timeline-item v-for="event in sortedEvents" :key="event.id" :event="event"></timeline-item>
  </div>
    </div>
    <noscript>
    <div class="unsupported-browser-message">
      This application requires a higher version of HTML. Please use a modern web browser to access this site.
    </div>
  </noscript>
</template>

<script>
import TimelineItem from './TimelineItem.vue';
import LegendComponent from './LegendComponent.vue';

export default {
    props: ['events'],
    components: {
        TimelineItem,
        LegendComponent,
    },
    computed: {
    sessionEvents() {
      // Parse events from session storage and return them
      return Object.keys(sessionStorage)
        .filter(key => key.startsWith('event_'))
        .map(key => JSON.parse(sessionStorage.getItem(key)));
    },
    sortedEvents() {
      return this.events.slice().sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA - dateB;
      });
    },
  },
};
</script>

<style scoped>
.timeline-container {
  max-width: 200px;
  margin: 0 auto;
}
.timeline {
    position: relative;
    max-width: 500px;
    min-width: 300px;
    margin: 0 -100px;
}
.timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 60px;
    width: 5px;
    background-color: #ccc; 
}
.text {
    font-size: 14px;
}
.unsupported-browser-message {
  background-color: #ffcccc;
  border: 2px solid #ff0000;
  color: #ff0000;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
}
@media print {
    .no-print {
        display: none;
    }
}
</style>