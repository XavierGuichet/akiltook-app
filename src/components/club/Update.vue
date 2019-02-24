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

    <ClubForm
      v-if="item"
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      :initial-values="retrieved" />

    <router-link
      v-if="item"
      :to="{ name: 'ClubList' }"
      class="btn btn-default">Retour à la liste</router-link>
    <button
      class="btn btn-danger"
      @click="del">Supprimer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClubForm from './Form.vue'

export default {
  components: {
    ClubForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'club/update/isLoading',
      error: 'club/update/error',
      deleteError: 'club/del/error',
      deleteLoading: 'club/del/isLoading',
      created: 'club/create/created',
      deleted: 'club/del/deleted',
      retrieved: 'club/update/retrieved',
      updated: 'club/update/updated',
      violations: 'club/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'ClubList' })
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
      createReset: 'club/create/reset',
      deleteItem: 'club/del/del',
      delReset: 'club/del/reset',
      retrieve: 'club/update/retrieve',
      updateReset: 'club/update/reset',
      update: 'club/update/update',
      updateRetrieved: 'club/update/updateRetrieved'
    }),

    del () {
      if (window.confirm('Are you sure you want to delete this club ?')) {
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
