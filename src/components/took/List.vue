<template>
<div>
  <h1>Took List</h1>

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
          <th>Match</th>
          <th>Title</th>
          <th>Description</th>
          <th colspan="2" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item['@id']">
          <td>
            <router-link v-if="item" :to="{name: 'TookShow', params: { id: item['@id'] }}">
              {{ item['@id'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'TookShow', params: { id: item['@id'] }}">
              {{ item['SportEvent'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'TookShow', params: { id: item['@id'] }}">
              {{ item['Title'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="item" :to="{name: 'TookShow', params: { id: item['@id'] }}">
              {{ item['Description'] }}
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'TookShow', params: { id: item['@id'] }}">
              <span class="fa fa-search" aria-hidden="true" />
              <span class="sr-only">Show</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'TookUpdate', params: { id: item['@id'] }}">

              <font-awesome-icon icon="edit" aria-hidden="true" />
              <span class="sr-only">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <router-link :to="{ name: 'TookCreate' }" class="btn btn-primary">Create</router-link>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  computed: mapGetters({
    deletedItem: 'took/del/deleted',
    error: 'took/list/error',
    items: 'took/list/items',
    isLoading: 'took/list/isLoading',
    view: 'took/list/view'
  }),

  created() {
    this.getPage()
  },

  methods: mapActions({
    getPage: 'took/list/default'
  })
}
</script>
