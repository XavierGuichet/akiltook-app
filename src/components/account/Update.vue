<template>
  <div>
    <h1>Modifier {{ item && item['@id'] }}</h1>

    <div
      v-if="created"
      class="alert alert-success"
      role="status">{{ created['@id'] }} crée.</div>
    <div
      v-if="updated"
      class="alert alert-success"
      role="status">{{ updated['@id'] }} modifié.</div>
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

    <AccountForm
      v-if="item"
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      :initial-values="retrieved" />

    <router-link
      v-if="item"
      :to="{ name: 'AccountList' }"
      class="btn btn-default">Retour à la liste</router-link>
    <button
      class="btn btn-danger float-right mr-2"
      @click="del">Supprimer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AccountForm from './Form.vue'

export default {
  components: {
    AccountForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'account/update/isLoading',
      error: 'account/update/error',
      deleteError: 'account/del/error',
      deleteLoading: 'account/del/isLoading',
      created: 'account/create/created',
      deleted: 'account/del/deleted',
      retrieved: 'account/update/retrieved',
      updated: 'account/update/updated',
      violations: 'account/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'AccountList' })
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
      createReset: 'account/create/reset',
      deleteItem: 'account/del/del',
      delReset: 'account/del/reset',
      retrieve: 'account/update/retrieve',
      updateReset: 'account/update/reset',
      update: 'account/update/update',
      updateRetrieved: 'account/update/updateRetrieved'
    }),

    del () {
      if (window.confirm('Are you sure you want to delete this account ?')) {
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
