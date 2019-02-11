<template>
  <div>
    <h1>Game List</h1>

    <div
      v-if="isLoading"
      class="alert alert-info">Loading...</div>
    <div
      v-if="deletedItem"
      class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div>
    <div
      v-if="error"
      class="alert alert-danger">{{ error }}</div>

    <span v-if="view">
      <button
        :disabled="!view['hydra:previous']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:first'])">First</button>
      &nbsp;
      <button
        :disabled="!view['hydra:previous']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:previous'])">Previous</button>
      &nbsp;
      <button
        :disabled="!view['hydra:next']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:next'])">Next</button>
      &nbsp;
      <button
        :disabled="!view['hydra:last']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:last'])">Last</button>
      &nbsp;
    </span>

    <div class="card" style="width: 18rem; margin-bottom: 1rem;" v-for="item in items"
    :key="item['@id']">
      <div class="card-body">
        <h5 class="card-title">
          {{ club(team(item['Team1']).club).Name }} {{ team(item['Team1']).Name }}
          -
          {{ club(team(item['Team2']).club).Name }} {{ team(item['Team2']).Name }}
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ item['startAt'] | formatDate }}
          <span v-if="item['atHome']">
            Domicile
          </span>
          <span v-else>
            Extérieur
          </span>
        </h6>
        <ul>
          <li v-for="took_id in item['tooks']" :key="took_id">
            {{ took_id }}
          </li>
        </ul>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Ajouter une took</a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>startAt</th>
            <th>Team1</th>
            <th>Team2</th>
            <th>atHome</th>
            <th>location</th>
            <th>tooks</th>
            <th colspan="2" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item['@id']">
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ item['@id'] }}
              </router-link>
            </td>
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ item['startAt'] | formatDate }}
              </router-link>
            </td>
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ club(team(item['Team1']).club).Name }} {{ team(item['Team1']).Name }}
              </router-link>
            </td>
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ club(team(item['Team2']).club).Name }} {{ team(item['Team2']).Name }}
              </router-link>
            </td>
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ item['atHome'] }}
              </router-link>
            </td>
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ item['location'] }}
              </router-link>
            </td>
            <td>
              <router-link
                v-if="item"
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                {{ item['tooks'] }}
              </router-link>
            </td>
            <td>
              <router-link
                :to="{name: 'GameShow', params: { id: item['@id'] }}">
                <span
                  class="fa fa-search"
                  aria-hidden="true" />
                <span class="sr-only">Show</span>
              </router-link>
            </td>
            <td>
              <router-link :to="{name: 'GameUpdate', params: { id: item['@id'] }}">
                <span
                  class="fa fa-pencil"
                  aria-hidden="true" />
                <span class="sr-only">Edit</span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link
      :to="{ name: 'GameCreate' }"
      class="btn btn-primary">Create</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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

  created () {
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
