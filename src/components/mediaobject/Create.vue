<template>
  <div>
    <h1>Nouveau MediaObject</h1>

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

    <MediaObjectForm
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations" />

    <router-link
      :to="{ name: 'MediaObjectList' }"
      class="btn btn-default">Retour à la liste</router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MediaObjectForm from './Form'

const { mapGetters, mapActions } = createNamespacedHelpers('mediaobject/create')

export default {
  components: {
    MediaObjectForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: mapGetters([
    'error',
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'MediaObjectUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
