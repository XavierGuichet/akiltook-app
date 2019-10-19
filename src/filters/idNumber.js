import Vue from 'vue'

Vue.filter('idNumber', function(value) {
  var splitted = value.split("/");
  var id = splitted.pop();
  return id;
})
