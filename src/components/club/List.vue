<template>
<div class="pt-3">
  <h1>Liste des Clubs</h1>

  <div v-if="isLoading" class="alert alert-info">Chargement...</div>
  <div v-if="deletedItem" class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>

  <span v-if="view">
    <span> {{ view['hydra:totalItems'] }}</span>
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
          <th>Name</th>
          <th>teams</th>
          <th colspan="2" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item['@id']">
          <td>
            <router-link v-if="item" :to="{name: 'ClubShow', params: { id: item['@id'] }}">
              {{ item['@id'] | idNumber }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'ClubShow', params: { id: item['@id'] }}">
              {{ item['Name'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'ClubShow', params: { id: item['@id'] }}">
              {{ item['SportsTeams'] }}
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'ClubShow', params: { id: item['@id'] }}">
              <span class="fa fa-search" aria-hidden="true" />
              <span class="sr-only">Show</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'ClubUpdate', params: { id: item['@id'] }}">
              <font-awesome-icon icon="edit" aria-hidden="true" />
              <span class="sr-only">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>


  <router-link :to="{ name: 'ClubCreate' }" class="btn btn-primary">Create</router-link>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  computed: mapGetters({
    deletedItem: 'club/del/deleted',
    error: 'club/list/error',
    items: 'club/list/items',
    isLoading: 'club/list/isLoading',
    view: 'club/list/view'
  }),

  created() {
    this.getPage()
  },

  methods: mapActions({
    getPage: 'club/list/default'
  })
}
</script>
