<template>
  <div>
    <div class="row">
      <div class="col-sm-6 mx-auto">
    <h1>Nouvel utilisateur</h1>

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

    <AccountForm
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations" />
  </div>
  </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import AccountForm from './Form'

const { mapGetters, mapActions } = createNamespacedHelpers('account/create')

export default {
  components: {
    AccountForm
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

      this.$router.push({ name: 'AuthLogin' })
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
