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

    <MediaObjectForm
      v-if="item"
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      :initial-values="retrieved" />

    <router-link
      v-if="item"
      :to="{ name: 'MediaObjectList' }"
      class="btn btn-default">Retour à la liste</router-link>
    <button
      class="btn btn-danger"
      @click="del">Supprimer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MediaObjectForm from './Form.vue'

export default {
  components: {
    MediaObjectForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'mediaobject/update/isLoading',
      error: 'mediaobject/update/error',
      deleteError: 'mediaobject/del/error',
      deleteLoading: 'mediaobject/del/isLoading',
      created: 'mediaobject/create/created',
      deleted: 'mediaobject/del/deleted',
      retrieved: 'mediaobject/update/retrieved',
      updated: 'mediaobject/update/updated',
      violations: 'mediaobject/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'MediaObjectList' })
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
      createReset: 'mediaobject/create/reset',
      deleteItem: 'mediaobject/del/del',
      delReset: 'mediaobject/del/reset',
      retrieve: 'mediaobject/update/retrieve',
      updateReset: 'mediaobject/update/reset',
      update: 'mediaobject/update/update',
      updateRetrieved: 'mediaobject/update/updateRetrieved'
    }),

    del () {
      if (window.confirm('Are you sure you want to delete this mediaObject ?')) {
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
