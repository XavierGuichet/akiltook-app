<template>
<div>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      <h1>Connexion</h1>

      <div v-if="isLoading" class="alert alert-info" role="status">Chargement...</div>
      <div v-if="error" class="alert alert-danger" role="alert">
        <span class="fa fa-exclamation-triangle" aria-hidden="true" /> {{ error }}
      </div>

      <LoginForm :handle-submit="onSendForm" :handle-update-field="updateField" :values="item" :errors="violations" />
    </div>
  </div>
</div>
</template>

<script>
import {
  createNamespacedHelpers
} from 'vuex'
import LoginForm from './LoginForm'

const {
  mapGetters,
  mapActions
} = createNamespacedHelpers('account/create')

export default {
  components: {
    LoginForm
  },

  data() {
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
    created: function(created) {
      if (!created) {
        return
      }

      this.$router.push({
        name: 'GameUserList',
        params: {
          id: created['@id']
        }
      })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm() {
      this.$auth.login({
        body: this.item, // Vue-resource
        rememberMe: false,
        success: function() {
          this.loading = false
        },
        error: function(res) {
          let message = 'Une erreur inattendue est survenue.' // 'default'
          if (res.message) {
            if (res.message == "Bad credentials") {
              res.message = 'Identifiant incorrects'
            }
            message = res.message
          }
          this.requestErrors = [{
            msg: message
          }]
          if (res.errors) {
            this.requestErrors = res.errors
          }
          this.showErrors = true
          this.loading = false
        }
      })
    },

    updateField(field, value) {
      Object.assign(this.item, {
        [field]: value
      })
    }
  }
}
</script>
