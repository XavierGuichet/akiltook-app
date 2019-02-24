<template>
  <div>
    <h1>Modifier {{ item && item['@id'] }}</h1>

    <div
      v-if="created"
      class="alert alert-success"
      role="status">{{ created['@id'] }} created.</div>
    <div
      v-if="updated"
      class="alert alert-success"
      role="status">{{ updated['@id'] }} updated.</div>
    <div
      v-if="isLoading || deleteLoading"
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

    <TeamForm
      v-if="item"
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      :initial-values="retrieved" />

    <router-link
      v-if="item"
      :to="{ name: 'TeamList' }"
      class="btn btn-default">Retour à la liste</router-link>
    <button
      class="btn btn-danger"
      @click="del">Supprimer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TeamForm from './Form.vue'

export default {
  components: {
    TeamForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'team/update/isLoading',
      error: 'team/update/error',
      deleteError: 'team/del/error',
      deleteLoading: 'team/del/isLoading',
      created: 'team/create/created',
      deleted: 'team/del/deleted',
      retrieved: 'team/update/retrieved',
      updated: 'team/update/updated',
      violations: 'team/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'TeamList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'team/create/reset',
      deleteItem: 'team/del/del',
      delReset: 'team/del/reset',
      retrieve: 'team/update/retrieve',
      updateReset: 'team/update/reset',
      update: 'team/update/update',
      updateRetrieved: 'team/update/updateRetrieved'
    }),

    del () {
      if (window.confirm('Are you sure you want to delete this team ?')) {
        this.deleteItem(this.retrieved)
      }
    },

    reset () {
      this.updateReset()
      this.delReset()
      this.createReset()
    },

    onSendForm () {
      this.update()
    },

    updateField (field, value) {
      this.updateRetrieved({ [field]: value })
    }
  }
}
</script>
