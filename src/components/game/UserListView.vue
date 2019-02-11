<template>
<div>
  <div v-if="isLoading" class="alert alert-info">Loading...</div>
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

  <div class="card text-center" style="width: 18rem; margin: 0 auto 1rem;" v-for="item in items" :key="item['@id']">
    <div class="card-header">
      {{ item['startAt'] | formatDate }}
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <div class="row">
          <div class="col-6">
            {{ club(team(item['Team1']).club).Name }} {{ team(item['Team1']).Name }}
          </div>
          <div class="col-6">
            {{ club(team(item['Team2']).club).Name }} {{ team(item['Team2']).Name }}
          </div>
        </div>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        <span v-if="item['atHome']">
          Domicile
        </span>
        <span v-else>
          Extérieur
        </span>
      </h6>
      <table class="table">
        <tr>
          <th>Qui</th>
          <th>Quoi</th>
          <th>Plus</th>
        </tr>
        <tr v-for="took_id in item['tooks']" :key="took_id">
          <td>
            <span v-if="took(took_id).DoneBy">
              {{ took(took_id).DoneBy }}
            </span>
            <span v-else>
              {{ account(took(took_id).CreatedBy).username }}
            </span>
          <td>{{ took(took_id).Title }}</td>
          <td>{{ took(took_id).Description }}</td>
        </tr>
        <tr v-if="item['tooks'].length == 0">
          <td colspan="3">
            Une triste journée s'annonce. Personne ne s'est porté volontaire.
          </td>
        </tr>
      </table>
      <router-link :to="{ name: 'TookCreate' }" class="card-link btn btn-secondary btn-sm">Ajouter une took</router-link>
    </div>
  </div>
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
    club: 'club/list/itemById',
    took: 'took/list/itemById',
    account: 'account/list/itemById',
  }),

  created() {
    this.getPage()
    this.getTeams()
    this.getClubs()
    this.getTooks()
    this.getAccounts()
  },

  methods: {
    ...mapActions({
      getAccounts: 'account/list/default',
      getPage: 'game/list/default',
      getTeams: 'team/list/default',
      getGames: 'game/list/default',
      getClubs: 'club/list/default',
      getTooks: 'took/list/default'
    })
  },
}
</script>
