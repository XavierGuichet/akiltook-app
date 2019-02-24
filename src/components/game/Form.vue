<template>
<form @submit.prevent="handleSubmit(item)">
  <div class="form-check">
    <input id="game_atHome" v-model="item.atHome" :class="['form-check-input', isInvalid('atHome') ? 'is-invalid' : '']" type="checkbox" placeholder="" @input="handleUpdateField('atHome', $event.target.value)">
    <label for="game_atHome" class="form-check-label">A domicile</label>
    <div v-if="isInvalid('atHome')" class="invalid-feedback">{{ violations.atHome }}</div>
  </div>
  <div class="form-group">
    <label for="game_location" class="form-control-label">Location</label>
    <input id="game_location" v-model="item.location" :class="['form-control', isInvalid('location') ? 'is-invalid' : '']" type="text" placeholder="" @input="handleUpdateField('location', $event.target.value)">
    <div v-if="isInvalid('location')" class="invalid-feedback">{{ violations.location }}</div>
  </div>
  <div class="row">
  <div class="form-group col-6">
    <label for="game_Team1" class="form-control-label">Equipe</label>
    <select id="game_Team1" v-model="item.Team1" :class="['form-control', isInvalid('Team1') ? 'is-invalid' : '']" @change="handleUpdateField('Team1', $event.target.value)">
      >
      <option v-for="item in teams" :key="item['@id']" :value="item['@id']">
        {{ club(item['club']).Name }} - {{ item['Name'] }}
      </option>
    </select>
    <div v-if="isInvalid('Team1')" class="invalid-feedback">{{ violations.Team1 }}</div>
  </div>
  <div class="form-group col-6">
    <label for="game_Team2" class="form-control-label">Equipe</label>
    <select id="game_Team2" v-model="item.Team2" :class="['form-control', isInvalid('Team2') ? 'is-invalid' : '']" @change="handleUpdateField('Team2', $event.target.value)">
      >
      <option v-for="item in teams" :key="item['@id']" :value="item['@id']">
        {{ club(item['club']).Name }} - {{ item['Name'] }}
      </option>
    </select>
    <div v-if="isInvalid('Team2')" class="invalid-feedback">{{ violations.Team2 }}</div>
  </div>
  </div>
  <div class="form-group">
    <label for="game_startAt" class="form-control-label">startAt</label>
    <input id="game_startAt" v-model="item.startAt" :class="['form-control', isInvalid('startAt') ? 'is-invalid' : '']" type="hidden" placeholder="" @input="handleUpdateField('startAt', $event.target.value)">
    <div v-if="isInvalid('startAt')" class="invalid-feedback">{{ violations.startAt }}</div>
    <date-picker
      v-model="item.startAt"
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
      console.log("hello")
      console.log(this.DatePickerDatetime)
    }
  },

  created() {
    this.getTeams()
    this.getClubs()
  }
}
</script>
