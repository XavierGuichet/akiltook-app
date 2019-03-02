<template>
<div>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      Connexion par réseau social en cours
    </div>
  </div>
</div>
</template>

<script>
import {
  createNamespacedHelpers
} from 'vuex'

import {
  ENTRYPOINT, FACEBOOK_ID, GOOGLE_ID
} from '../../config/entrypoint';

const {
  mapGetters,
  mapActions
} = createNamespacedHelpers('account/create')

export default {
  data() {
    return {
    }
  },

  computed: mapGetters([
  ]),

  watch: {

  },


  mounted () {
    // facebook return
    if (this.$route.query.code) {
      this.loading = true
      let code = this.$route.query.code
      this.$auth.oauth2({
        code: true,
        url: ENTRYPOINT + 'login/check-facebook?code='+code,
        provider: 'facebook',
        data: { },
        success: function(res) {
          this.loading = false
        },
        error: function (res) {
          this.loading = false
        },
        redirect: {path: '/match'},
      });
    }
  },
}
</script>
