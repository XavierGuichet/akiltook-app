<template>
<div>
  <h1>Liste des matchs</h1>

  <div v-if="isLoading" class="alert alert-info">Chargement...</div>
  <div v-if="deletedItem" class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>

  <span v-if="view">
    <button :disabled="!view['hydra:previous']" type="button" class="btn btn-basic btn-sm" @click="getPage(view['hydra:first'])">First</button>
    &nbsp;
    <button :disabled="!view['hydra:previous']" type="button" class="btn btn-basic btn-sm" @click="getPage(view['hydra:previous'])">Previous</button>
    &nbsp;
    <button :disabled="!view['hydra:next']" type="button" class="btn btn-basic btn-sm" @click="getPage(view['hydra:next'])">Next</button>
    &nbsp;
    <button :disabled="!view['hydra:last']" type="button" class="btn btn-basic btn-sm" @click="getPage(view['hydra:last'])">Last</button>
    &nbsp;
  </span>

  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Debut</th>
          <th>Equipe </th>
          <th>Equipe </th>
          <th>À domicile</th>
          <th>Lieu</th>
          <th>Tooks</th>
          <th colspan="2" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item['@id']">
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ item['@id'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ item['startAt'] | formatDate }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ club(team(item['Team1']).club).Name }} {{ team(item['Team1']).Name }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ club(team(item['Team2']).club).Name }} {{ team(item['Team2']).Name }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ item['atHome'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ item['location'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'GameShow', params: { id: item['@id'] }}">
              {{ item['tooks'] }}
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'GameShow', params: { id: item['@id'] }}">
              <span class="fa fa-search" aria-hidden="true" />
              <span class="sr-only">Show</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'GameUpdate', params: { id: item['@id'] }}">
              <font-awesome-icon icon="edit" aria-hidden="true" />
              <span class="sr-only">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <router-link :to="{ name: 'GameCreate' }" class="btn btn-primary">Create</router-link>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  computed: mapGetters({
    deletedItem: 'game/del/deleted',
    error: 'game/list/error',
    items: 'game/list/items',
    isLoading: 'game/list/isLoading',
    view: 'game/list/view',
    team: 'team/list/itemById',
    club: 'club/list/itemById'
  }),

  created() {
    this.getPage()
    this.getTeams()
    this.getClubs()
  },

  methods: {
    ...mapActions({
      getPage: 'game/list/default',
      getTeams: 'team/list/default',
      getGames: 'game/list/default',
      getClubs: 'club/list/default'
    })
  },
}
</script>
