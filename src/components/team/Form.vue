<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="team_Name"
        class="form-control-label">Nom</label>
      <input
        id="team_Name"
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
        for="team_Name"
        class="form-control-label">Équipe féminine</label>
        <div class="custom-control custom-switch">
        <input type="checkbox"
               class="custom-control-input"
               id="team_women"
               v-model="item.Women"
               value=1
               @change="handleUpdateField('Women', $event.target.value)">
        <label class="custom-control-label" for="team_women">Oui</label>
      </div>
      <div
        v-if="isInvalid('Name')"
        class="invalid-feedback">{{ violations.Name }}</div>
    </div>
    <div class="form-group">
      <label
        for="team_club"
        class="form-control-label">Club</label>
        <select
          id="team_club"
          v-model="item.SportClub"
          :class="['form-control', isInvalid('SportClub') ? 'is-invalid' : '']"
          @change="handleUpdateField('SportClub', $event.target.value)">
        >
          <option v-for="item in clubs"
          :key="item['@id']"
          :value="item['@id']"
          >
          {{ item['Name'] }}
          </option>
        </select>
      <div
        v-if="isInvalid('club')"
        class="invalid-feedback">{{ violations.club }}</div>
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

  computed: {
    ...mapGetters({
      clubs: 'club/list/items',
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
      getClubs: 'club/list/default'
    }),

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  },

  created () {
    this.getClubs()
  },
}
</script>
