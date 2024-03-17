import { events, categories } from './data/events';
sessionStorage.clear();
events.forEach((event) => {
  sessionStorage.setItem(`event_${event.id}`, JSON.stringify(event));
});
categories.forEach((category) => {
  sessionStorage.setItem(`category_${category.id}`, JSON.stringify(category));
});
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
createApp(App).mount('#app')
