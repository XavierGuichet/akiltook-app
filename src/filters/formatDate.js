import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  moment.locale('fr')
  if (value) {
    return moment(String(value)).format('LLL')
  }
})
