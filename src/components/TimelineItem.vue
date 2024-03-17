<!-- src/components/TimelineItem.vue -->
<template>
  <div v-if="event.color !== 'gray'" class="timeline-item" :style="itemStyle" :class="{ expanded: isExpanded }" @click="toggleExpanded" :tabindex="0" :aria-label="isExpanded ? ' Start Date ' + event.start_date + ' End Date ' + event.end_date + ' Description ' + event.description: event.event_name" @keydown.enter.prevent="expandOnEnter">
    <div class="text-white">{{ event.event_name }}</div>
    <div class="text-gray-600"><p><strong>Start:</strong> {{ event.start_date }}</p></div>
    <div class="info">
        <div class="text-gray-600"><p><strong>End:</strong> {{ event.end_date }}</p></div>
        <div class="text-gray-600">{{ event.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    itemStyle() {
      return {
        backgroundColor: this.event.color,
      };
    },
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    expandOnEnter(event) {
      if (event.keyCode === 13) { // Enter key
        this.isExpanded = !this.isExpanded;
      }
    },
  },
};
</script>

<style scoped>
.timeline-item {
    position: relative;
    margin: 40px 0;
    padding: 10px;
    text-align: center;
    border-radius: 40px;
    box-shadow: 0 0 20px rgba(128, 128, 128, 0.4);
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
    color: white;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

}
.timeline-item:before {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 14.9%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px;
    border-color: #ccc transparent transparent transparent;
}
.timeline-item:hover{
    box-shadow: 0 0 30px rgba(128, 128, 128, 0.9)
}
.timeline-item .info {
    display: none;
}
.timeline-item.expanded .info {
    display: block;
}
</style>