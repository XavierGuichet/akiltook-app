<template>
<div>
  <div class="row">
    <div class="col-sm-12">
      <h1 class="text-center">S'incrire</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      <div class="row mb-3">
        <div class="col-sm-6">
          <button type="button" class="btn btn-block mr-2 bg-fb text-light" v-on:click="fb_register()">Facebook</button>
        </div>
        <div class="col-sm-6">
          <button type="button" class="btn btn-block bg-google text-light d-none" v-on:click="google_register()">Google</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2 class="text-center">Par mail</h2>
          <div v-if="isLoading" class="alert alert-info" role="status">Chargement...</div>
          <div v-if="error" class="alert alert-danger" role="alert">
            <span class="fa fa-exclamation-triangle" aria-hidden="true" /> {{ error }}
          </div>
          <div class="clearfix mb-2">
            <AccountForm
              :handle-submit="onSendForm"
              :handle-update-field="updateField"
              :values="item"
              :errors="violations" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  createNamespacedHelpers
} from 'vuex'
import AccountForm from './RegisterForm'

const {
  mapGetters,
  mapActions
} = createNamespacedHelpers('account/create')

export default {
  components: {
    AccountForm
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
        name: 'AuthLogin'
      })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm() {
      this.create(this.item)
    },

    updateField(field, value) {
      Object.assign(this.item, {
        [field]: value
      })
    },

    fb_register() {
      this.loading = true
      this.$auth.oauth2({
        provider: 'facebook',
        rememberMe: true
      });
      this.loading = false
    },
    google_register() {
      this.loading = true
      this.$auth.oauth2({
        provider: 'google',
        rememberMe: true
      });
      this.loading = false
    },
  }
}
</script>
