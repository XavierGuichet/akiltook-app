<template>
<div class="pt-2">
  <div v-if="isLoading" class="alert alert-info">Chargement...</div>
  <div v-if="deletedItem" class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>

  <div class="card text-center" style="width: 22rem; margin: 0 auto 1rem;" v-for="item in items" :key="item['@id']">
    <div class="card-header">
      {{ item['startDate'] | formatDate }}
    </div>
    <div class="card-body py-2 px-0 d-flex">
      <h5 class="card-title p-0 col" style="flex-basis: 120px">
        <div class="d-flex flex-column">
          <div class="col px-0">
            <img v-bind:src="entrypoint + 'media/' + mediaobject(club(team(item['HomeTeam']).SportClub).Logo).contentUrl" class="img-fluid w-48" />
            <img v-bind:src="entrypoint + 'media/' + mediaobject(club(team(item['AwayTeam']).SportClub).Logo).contentUrl" class="img-fluid w-48" />
          </div>
          <h6 class="col card-subtitle mb-2">
            {{ club(team(item['HomeTeam']).SportClub).Name }} <span class="text-muted">({{ team(item['Team1']).Name }})</span>
            <br />
            {{ club(team(item['AwayTeam']).SportClub).Name }} <span class="text-muted">({{ team(item['Team2']).Name }})</span>
          </h6>
        </div>
      </h5>
      <div class="col px-0" style="flex-basis: 240px">
          <ul class="list-group">
          <!-- <li v-for="took_id in item['tooks']" :key="took_id" class="list-group-item">
              <span v-if="took(took_id).DoneBy">
                {{ took(took_id).DoneBy }}
              </span>
              <span v-else>
                {{ account(took(took_id).CreatedBy).username }}
              </span> :
            {{ took(took_id).Title }}
            <span class="text-muted" v-if="took(took_id).Description">({{ took(took_id).Description }})</span>
          </li>
          <li  v-if="item['tooks'].length == 0" class="list-group-item disabled">
            Une triste journée s'annonce. Personne ne s'est porté volontaire.
          </li> -->
        </ul>

        <router-link :to="{ name: 'TookCreate' }" class="card-link btn btn-secondary btn-sm card-action-took">Ajouter une took</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  ENTRYPOINT
} from '../../config/entrypoint';

export default {
  data() {
    return {
      entrypoint: ENTRYPOINT
    }
  },
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
    mediaobject: 'mediaobject/list/itemById',
  }),

  created() {
    this.getPage()
    this.getTeams()
    this.getClubs()
    this.getTooks()
    this.getAccounts()
    this.getMediaobjects()
  },

  methods: {
    ...mapActions({
      getAccounts: 'account/list/default',
      getPage: 'game/list/default',
      getTeams: 'team/list/default',
      getGames: 'game/list/default',
      getClubs: 'club/list/default',
      getTooks: 'took/list/default',
      getMediaobjects: 'mediaobject/list/default'
    })
  },
}
</script>
