<template>
  <div>
    <h1>Show {{ item && item['@id'] }}</h1>

    <div
      v-if="isLoading"
      class="alert alert-info"
      role="status">Loading...</div>
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
            <td>atHome</td>
            <td>{{ item['atHome'] }}</td>
          </tr>
          <tr>
            <td>location</td>
            <td>{{ item['location'] }}</td>
          </tr>
          <tr>
            <td>Team1</td>
            <td>{{ item['Team1'] }}</td>
          </tr>
          <tr>
            <td>Team2</td>
            <td>{{ item['Team2'] }}</td>
          </tr>
          <tr>
            <td>startAt</td>
            <td>{{ item['startAt'] }}</td>
          </tr>
          <tr>
            <td>tooks</td>
            <td>{{ item['tooks'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link
      v-if="item"
      :to="{ name: 'GameList' }"
      class="btn btn-default">Back to list</router-link>
    <button
      class="btn btn-danger"
      @click="deleteItem(item)">Delete</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    deleteError: 'game/del/error',
    error: 'game/show/error',
    isLoading: 'game/show/isLoading',
    item: 'game/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      del: 'game/del/del',
      reset: 'game/show/reset',
      retrieve: 'game/show/retrieve'
    }),

    deleteItem (item) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        this.del(item).then(() => this.$router.push({ name: 'GameList' }))
      }
    }
  }
}
</script>
