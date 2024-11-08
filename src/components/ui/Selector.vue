<template>
  <div class="selector-wrapper">
    <label>{{ label }}</label>
    <select
      v-model="localValue"
      @focus="handleFocus"
      @change="handleSelection($event.target.value)"
    >
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    value: String,
    showCalendarOnFocus: {
      type: Boolean,
      default: false, // Only trigger calendar if this is explicitly true
    },
  },
  data() {
    return {
      localValue: this.value || null,
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
  },
  methods: {
    handleSelection(option) {
      if (option) {
        this.localValue = option;
        this.$emit("input", option); // Update v-model binding
        this.$emit("inputFilled", true);
        this.$emit("updateAnswer", option);
      } else {
        this.$emit("inputFilled", false);
      }
    },
    handleFocus() {
      if (this.showCalendarOnFocus) {
        this.$emit("showCalendar"); // Trigger only if showCalendarOnFocus is true
      }
    },
  },
};
</script>

<style scoped>
.selector-wrapper {
  margin: 10px 0 20px 0;
  width: 100%;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #1b1f26;
  color: white;
}
</style>
