<template>
  <form @submit.prevent="handleSubmit(item)" class="d-flex flex-column">
    <div class="form-group">
      <label
        for="club_Name"
        class="form-control-label">Nom</label>
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
    <div class="form-group">
      <label
        for="club_Logo"
        class="form-control-label">Logo</label>
        <select
          id="club_Logo"
          v-model="item.Logo"
          :class="['form-control', isInvalid('Logo') ? 'is-invalid' : '']"
          @change="handleUpdateField('Logo', $event.target.value)">
        >
          <option v-for="item in mediaobjects"
          :key="item['@id']"
          :value="item['@id']"
          >
          {{ item['@id'] }}
          </option>
        </select>
      <div
        v-if="isInvalid('Logo')"
        class="invalid-feedback">{{ violations.Logo }}</div>
    </div>
    <button
      type="submit"
      class="btn btn-success">Enregistrer</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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

  data() {
    return {
      customImageMaxSize: 3 // megabytes
    };
  },

  computed: {
    ...mapGetters({
      mediaobjects: 'mediaobject/list/items'
    }),
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
  },

  methods: {
    ...mapActions({
      getMediaobjects: 'mediaobject/list/default'
    }),
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  },

  created () {
    this.getMediaobjects()
  }
}
</script>
