<template>
<div class="pt-3">
  <h1>Liste des équipes</h1>

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
          <th>Club</th>
          <th>Name</th>
          <th colspan="2" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item['@id']">
          <td>
            <router-link v-if="item" :to="{name: 'TeamShow', params: { id: item['@id'] }}">
              {{ item['@id'] | idNumber }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'TeamShow', params: { id: item['@id'] }}">
              <img v-bind:src="entrypoint + 'media/' + mediaobject(club(item['SportClub']).Logo).contentUrl" class="img-fluid img-list" />
              {{ club(item['club']).Name }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'TeamShow', params: { id: item['@id'] }}">
              {{ item['Name'] }}

            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'TeamShow', params: { id: item['@id'] }}">
              <span class="fa fa-search" aria-hidden="true" />
              <span class="sr-only">Show</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'TeamUpdate', params: { id: item['@id'] }}">

              <font-awesome-icon icon="edit" aria-hidden="true" />
              <span class="sr-only">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <router-link :to="{ name: 'TeamCreate' }" class="btn btn-primary">Create</router-link>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import { ENTRYPOINT } from '../../config/entrypoint';

export default {
  data () {
    return {
      entrypoint: ENTRYPOINT
    }
  },
  computed: mapGetters({
    deletedItem: 'team/del/deleted',
    error: 'team/list/error',
    items: 'team/list/items',
    isLoading: 'team/list/isLoading',
    view: 'team/list/view',
    club: 'club/list/itemById',
    mediaobject: 'mediaobject/list/itemById',
  }),

  created() {
    this.getPage()
    this.getClubs()
    this.getMediaobjects()
  },

  methods: mapActions({
    getPage: 'team/list/default',
    getClubs: 'club/list/default',
    getMediaobjects: 'mediaobject/list/default'
  })
}
</script>
