<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="took_Event"
        class="form-control-label">Match</label>
        <select
          id="took_Event"
          v-model="item.Event"
          :class="['form-control', isInvalid('Event') ? 'is-invalid' : '']"
          @change="handleUpdateField('Event', $event.target.value)">
        >
          <option v-for="item in games"
          :key="item['@id']"
          :value="item['@id']"
          >
          {{ item['startAt'] | formatDate }} {{ club(team(item['Team1']).club).Name }} {{ team(item['Team1']).Name }} - {{ club(team(item['Team2']).club).Name }} {{ team(item['Team2']).Name }}
          </option>
        </select>
      <div
        v-if="isInvalid('Event')"
        class="invalid-feedback">{{ violations.Event }}</div>
    </div>
    <div class="form-group">
      <label
        for="took_Title"
        class="form-control-label">Title</label>
      <input
        id="took_Title"
        v-model="item.Title"
        :class="['form-control', isInvalid('Title') ? 'is-invalid' : '']"
        type="text"
        required="true"
        placeholder="Took / Samoussa / Cookie / ..."
        @input="handleUpdateField('Title', $event.target.value)">
      <div
        v-if="isInvalid('Title')"
        class="invalid-feedback">{{ violations.Title }}</div>
    </div>
    <div class="form-group">
      <label
        for="took_Description"
        class="form-control-label">Description</label>
      <input
        id="took_Description"
        v-model="item.Description"
        :class="['form-control', isInvalid('Description') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('Description', $event.target.value)">
      <div
        v-if="isInvalid('Description')"
        class="invalid-feedback">{{ violations.Description }}</div>
    </div>
    <div class="form-group">
      <label
        for="took_Description"
        class="form-control-label">Qui s'en occupe ?</label>
      <input
        id="took_Description"
        v-model="item.DoneBy"
        :class="['form-control', isInvalid('DoneBy') ? 'is-invalid' : '']"
        type="text"
        placeholder="A remplir quand ce n'est pas vous"
        @input="handleUpdateField('DoneBy', $event.target.value)">
      <div
        v-if="isInvalid('DoneBy')"
        class="invalid-feedback">{{ violations.DoneBy }}</div>
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
      games: 'game/list/items',
      team: 'team/list/itemById',
      club: 'club/list/itemById'
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
      getTeams: 'team/list/default',
      getGames: 'game/list/default',
      getClubs: 'club/list/default'
    }),
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  },

  created () {
    this.getGames()
    this.getTeams()
    this.getClubs()
  }
}
</script>
