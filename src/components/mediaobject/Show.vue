<template>
  <div>
    <h1>Détails {{ item && item['@id'] }}</h1>

    <div
      v-if="isLoading"
      class="alert alert-info"
      role="status">Chargement...</div>
    <div
      v-if="error"
      class="alert alert-danger"
      role="alert">
      <span
        class="fa fa-exclamation-triangle"
        aria-hidden="true" /> {{ error }}
    </div>
    <div
      v-if="deleteError"
      class="alert alert-danger"
      role="alert">
      <span
        class="fa fa-exclamation-triangle"
        aria-hidden="true" /> {{ deleteError }}
    </div>
    <div
      v-if="item"
      class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{{ item['Name'] }}</td>
          </tr>
          <tr>
            <td>teams</td>
            <td>{{ item['teams'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link
      v-if="item"
      :to="{ name: 'MediaObjectList' }"
      class="btn btn-default">Retour à la liste</router-link>
    <button
      class="btn btn-danger"
      @click="deleteItem(item)">Supprimer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    deleteError: 'mediaObject/del/error',
    error: 'mediaObject/show/error',
    isLoading: 'mediaObject/show/isLoading',
    item: 'mediaObject/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      del: 'mediaObject/del/del',
      reset: 'mediaObject/show/reset',
      retrieve: 'mediaObject/show/retrieve'
    }),

    deleteItem (item) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        this.del(item).then(() => this.$router.push({ name: 'MediaObjectList' }))
      }
    }
  }
}
</script>
