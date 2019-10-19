<template>
<form @submit.prevent="handleSubmit(item)">
  <div class="form-group">
    <label for="game_location" class="form-control-label">Location</label>
    <input id="game_location" v-model="item.location" :class="['form-control', isInvalid('location') ? 'is-invalid' : '']" type="text" placeholder="" @input="handleUpdateField('location', $event.target.value)">
    <div v-if="isInvalid('location')" class="invalid-feedback">{{ violations.location }}</div>
  </div>
  <div class="row">
  <div class="form-group col-6">
    <label for="game_HomeTeam" class="form-control-label">Equipe Dom.</label>
    <select id="game_HomeTeam" v-model="item.HomeTeam" :class="['form-control', isInvalid('HomeTeam') ? 'is-invalid' : '']" @change="handleUpdateField('HomeTeam', $event.target.value)">
      >
      <option v-for="item in teams" :key="item['@id']" :value="item['@id']">
        {{ club(item['SportClub']).Name }} - {{ item['Name'] }}
      </option>
    </select>
    <div v-if="isInvalid('HomeTeam')" class="invalid-feedback">{{ violations.HomeTeam }}</div>
  </div>
  <div class="form-group col-6">
    <label for="game_AwayTeam" class="form-control-label">Equipe Ext.</label>
    <select id="game_AwayTeam" v-model="item.AwayTeam" :class="['form-control', isInvalid('AwayTeam') ? 'is-invalid' : '']" @change="handleUpdateField('AwayTeam', $event.target.value)">
      >
      <option v-for="item in teams" :key="item['@id']" :value="item['@id']">
        {{ club(item['SportClub']).Name }} - {{ item['Name'] }}
      </option>
    </select>
    <div v-if="isInvalid('AwayTeam')" class="invalid-feedback">{{ violations.AwayTeam }}</div>
  </div>
  </div>
  <div class="form-group">
    <label for="game_startDate" class="form-control-label">startDate</label>
    <input id="game_startDate" v-model="item.startDate" :class="['form-control', isInvalid('startDate') ? 'is-invalid' : '']" type="hidden" placeholder="" @input="handleUpdateField('startDate', $event.target.value)">
    <div v-if="isInvalid('startDate')" class="invalid-feedback">{{ violations.startDate }}</div>
    <date-picker
      v-model="item.startDate"
      :config="DatePickerOptions"
      @dp-change="handleUpdateDatePicker"
      ></date-picker>
  </div>

  <div class="form-group">
    <label for="game_title" class="form-control-label">title</label>
    <input id="game_title" v-model="item.title" :class="['form-control', isInvalid('title') ? 'is-invalid' : '']" type="text" placeholder="" @input="handleUpdateField('title', $event.target.value)">
    <div v-if="isInvalid('title')" class="invalid-feedback">{{ violations.title }}</div>
  </div>

  <button type="submit" class="btn btn-success">Enregistrer</button>
</form>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

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
      DatePickerDatetime: new Date(),
      DatePickerOptions: {
        inline: true,
                sideBySide: true,
        useCurrent: false,
        locale: 'fr'
      }
    }
  },

  computed: {
    ...mapGetters({
      teams: 'team/list/items',
      clubs: 'club/list/items',
      club: 'club/list/itemById'
    }),
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values
    },

    violations() {
      return this.errors || {}
    },
  },

  methods: {
    ...mapActions({
      getTeams: 'team/list/default',
      getClubs: 'club/list/default'
    }),

    isInvalid(key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    handleUpdateDatePicker() {
      console.log(this.DatePickerDatetime)
    }
  },

  created() {
    this.getTeams()
    this.getClubs()
  }
}
</script>
