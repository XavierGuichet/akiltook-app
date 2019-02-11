<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="club_Name"
        class="form-control-label">Name</label>
      <input
        id="club_Name"
        v-model="item.Name"
        :class="['form-control', isInvalid('Name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('Name', $event.target.value)">
      <div
        v-if="isInvalid('Name')"
        class="invalid-feedback">{{ violations.Name }}</div>
    </div>
    <button
      type="submit"
      class="btn btn-success">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
