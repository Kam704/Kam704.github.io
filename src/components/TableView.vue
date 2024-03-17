<!-- src/components/TableView.vue -->
<template>
  <div>
    <div>
    <div class="date-filters">
    <h2>Time Picker</h2>
    <div>
      <label for="fromDate">From Date: </label>
      <input id="fromDate" type="date" v-model="fromDate" @input="filterEvents" aria-label="Select From Date type in format day month year"/>
    </div>
    <div>
      <label for="toDate">To Date: </label>
      <input id="toDate" type="date" v-model="toDate" @input="filterEvents" aria-label="Select To Date type in format day month year"/>
    </div>
    </div>
      <label for="toDate">Date Field: </label>
      <select v-model="dateFilter" @change="filterEvents" aria-label="Select Date Field to filter">
        <option value="start">Start Date</option>
        <option value="end">End Date</option>
      </select>
    </div>
    <h2>Table View</h2>
    <table>
      <thead>
        <tr>
          <th><button tabindex="0" @click="sortEvents('id')" aria-label="Sort by ID">ID</button></th>
          <th><button tabindex="0" @click="sortEvents('start_date')" aria-label="Sort by Start Date">Start Date</button></th>
          <th><button tabindex="0" @click="sortEvents('end_date')" aria-label="Sort by End Date">End Date</button></th>
          <th><button tabindex="0" @click="sortEvents('event_name')" aria-label="Sort by Event Name">Event Name</button></th>
          <th><button tabindex="0" @click="sortEvents('description')" aria-label="Sort by Description" >Description</button></th>
          <th><button tabindex="0" @click="sortEvents('category')" aria-label="Sort by Category">Category</button></th>
          <th><button tabindex="0" @click="sortEvents('color')" aria-label="Sort by Color">Color</button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in filteredEvents" :key="event.id">
          <td>{{ event.id }}</td>
          <td>
            <input type=date v-model="event.start_date" @input="validateDates(event)" :aria-label="'Type start date in format day month year for event with ID ' + event.id"/>
          </td>
          <td>
            <input type=date v-model="event.end_date" @input="validateDates(event)" :aria-label="'Type end date in format day month year for event with ID ' + event.id"/>
          </td>
          <td>
            <input
              type="text"
              :maxlength="20"
              v-model="event.event_name"
              @input="validateEventName(event)"
              :aria-label="'Type Event Name for event with ID ' + event.id"
            />
          </td>
          <td>
            <input
              type="text"
              :maxlength="100"
              v-model="event.description"
              @input="validateDescription(event)"
              :aria-label="'Type Event Description for event with ID ' + event.id"
            />
          </td>
          <td>
            <select class="category-dropdown" v-model="event.category" @change="updateEvent(event)" :aria-label="'Select category for event with ID ' + event.id">
              <option v-for="category in uniqueCategories" :value="category">{{ category }}</option>
            </select>
          </td>
<td :style="{ backgroundColor: event.color }">{{ event.color }}</td>
          <td>
            <button tabindex="0" @click="deleteEvent(event.id)" :aria-label="'Delete item with ID ' + event.id">Delete</button> <!-- Add the delete button -->
          </td>
        </tr>
      </tbody>
    </table>
    <button tabindex="0" @click="createNewEvent" aria-label="Add new event">New Event</button>

<h2>Categories and Colors</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>
            <input
              type="text"
              :maxlength="20"
              v-model="category.category"
              @input="validateCategoryLength(category)"
              :aria-label="'Change Category name, now category has name ' + category.category"
            />
          </td>
          <td>
            <select v-model="category.color" @change="updateCategory(category)" aria-label="Select Color for category">
              <option value="gray">Disabled</option>
              <option value="red" :disabled="isColorUsed('red')">Red</option>
              <option value="blue" :disabled="isColorUsed('blue')">Blue</option>
              <option value="yellow" :disabled="isColorUsed('yellow')">Yellow</option>
              <option value="green" :disabled="isColorUsed('green')">Green</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { events, categories} from '../data/events';

export default {
  data() {
    return {
      events: this.loadEventsFromSessionStorage(),
      categories: this.loadCategoriesFromSessionStorage(),
      sortingField: null,
      sortingDirection: 1,
      fromDate: '', 
      toDate: '',  
      dateFilter: 'start',
    };
  },
  computed: {
    uniqueCategories() {
      const categories_ = new Set();
      this.categories.forEach((category) => {
        if (category.color !== 'gray') {
          categories_.add(category.category);
        }
      });
      return Array.from(categories_);
    },
    filteredEvents() {
      if (!this.fromDate || !this.toDate) {
        return this.events;
      }
      // Filter events based on the selected date range and date filter
      return this.events.filter((event) => {
        const eventStartDate = new Date(event.start_date);
        const eventEndDate = new Date(event.end_date);

        if (this.dateFilter === 'start') {
          // Filter based on the start date
          return eventStartDate >= new Date(this.fromDate) && eventStartDate <= new Date(this.toDate);
        } else if (this.dateFilter === 'end') {
          // Filter based on the end date
          return eventEndDate >= new Date(this.fromDate) && eventEndDate <= new Date(this.toDate);
        }

        return false;
      });
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
    validateEventName(event) {
      // Ensure event_name does not exceed 20 characters
      if (event.event_name.length > 20) {
        event.event_name = event.event_name.slice(0, 20);
      }
      this.updateEvent(event);
    },
    validateDescription(event) {
      // Ensure description does not exceed 100 characters
      if (event.description.length > 100) {
        event.description = event.description.slice(0, 100);
      }
      this.updateEvent(event);
    },
    validateDates(event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      // Check if startDate is after endDate
      if (startDate > endDate) {
        alert('Start date must be before the end date');
        event.start_date = event.end_date;
      } else {
        // Update the event and store in sessionStorage
        event.start_date = startDate.toISOString().split('T')[0]; // Format as 'yyyy-mm-dd'
        event.end_date = endDate.toISOString().split('T')[0]; // Format as 'yyyy-mm-dd'
        this.updateEvent(event);
      }
    },
    validateCategoryLength(category) {
      // Ensure category length does not exceed 20 characters
      if (category.category.length > 20) {
        category.category = category.category.slice(0, 20);
      }
      this.updateCategory(category);
    },
    updateEvent(event) {
      const category = this.categories.find((cat) => cat.category === event.category);
      if (category) {
        event.color = category.color;
      } else {
        event.color = 'gray'; // Set to gray if the category doesn't exist
      }

      sessionStorage.setItem(`event_${event.id}`, JSON.stringify(event));
    },
    deleteEvent(eventId) {
      // Remove the event from the events array
      const eventIndex = this.events.findIndex((event) => event.id === eventId);
      if (eventIndex !== -1) {
        this.events.splice(eventIndex, 1);
      }

      // Remove the event from sessionStorage
      sessionStorage.removeItem(`event_${eventId}`);
    },
    loadCategoriesFromSessionStorage() {
      // Load categories from session storage
      const categories = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith('category_')) {
          const category = JSON.parse(sessionStorage.getItem(key));
          categories.push(category);
        }
      }
      return categories;
    },
    updateCategory(category) {
      // Find the index of the category in the array
      const categoryIndex = this.categories.findIndex((cat) => cat.id === category.id);

      if (categoryIndex !== -1) {
        // If the category exists, update it
        this.categories[categoryIndex] = { ...category };
      } else {
        // If the category doesn't exist in the categories array, add it
        this.categories.push({ ...category });
      }

      sessionStorage.setItem(`category_${category.id}`, JSON.stringify(category));

      for (const event of this.events) {
        if (event.category === category.category) {
          event.color = category.color;
        }
      }
    },

    isColorUsed(color) {
      // Check if the color is already used by another category
      const categoryWithSameColor = this.categories.find(
        (category) => category.color === color && category !== event.category
      );

      return categoryWithSameColor !== undefined;
    },
    sortEvents(field) {
      if (field === this.sortingField) {
        // Toggle the sorting direction if the same field is clicked again
        this.sortingDirection *= -1;
      } else {
        // Set the new field to sort by and default to ascending order
        this.sortingField = field;
        this.sortingDirection = 1;
      }

      // Sorting
      this.events.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue < bValue) return -1 * this.sortingDirection;
        if (aValue > bValue) return 1 * this.sortingDirection;
        return 0;
      });
    },
    createNewEvent() {
      // Generate a new event with default values
      const newEvent = {
        id: this.getNextAvailableEventId(),
        start_date: '2023-09-01',
        end_date: '2023-10-01',
        event_name: 'New Event',
        description: 'Description of New Event',
        color: this.categories[0] ? this.categories[0].color : 'gray',
        category: this.categories[0] ? this.categories[0].category : 'Default Category',
      };

      // Add the new event to the events array
      this.events.push(newEvent);

      // Store the new event in sessionStorage
      sessionStorage.setItem(`event_${newEvent.id}`, JSON.stringify(newEvent));
    },

    getNextAvailableEventId() {
      // Find the next available event ID
      const usedIds = this.events.map((event) => event.id);
      const maxId = Math.max(...usedIds);
      return maxId + 1;
    },
  },
  watch: {
    categories: {
      handler(newCategories, oldCategories) {
        for (const event of this.events) {
          const categoryByColor = newCategories.find((cat) => cat.color === event.color);
          const newCategory = newCategories.find((cat) => cat.category === event.category);
          if (newCategory) {
            event.category = newCategory.category;
            event.color = newCategory.color;
          } else if (categoryByColor){
            event.category = categoryByColor.category;
            event.color = categoryByColor.color;
          }
          // Update the event in session storage
          sessionStorage.setItem(`event_${event.id}`, JSON.stringify(event));
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.category-dropdown {
  width: 13em; 
}
</style>