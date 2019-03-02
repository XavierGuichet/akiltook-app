<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <router-link :to="{ name: 'GameUserList' }" class="navbar-brand"><img src="./assets/bottle.svg" height="42px" />Akiltook</router-link>
      <ul class="nav nav-justified" v-if="$auth.ready()">
        <li class="active" v-if="!$auth.check()"><router-link :to="{ name: 'AuthRegister' }" class="btn btn-outline-light">Inscription</router-link></li>
        <li class="active" v-if="!$auth.check()"><router-link :to="{ name: 'AuthLogin' }" class="btn btn-outline-light">Connexion</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_ADMIN')"><router-link :to="{ name: 'AccountList' }" class="btn btn-outline-secondary">Utilisateurs</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_ADMIN')"><router-link :to="{ name: 'ClubList' }" class="btn btn-outline-secondary">Clubs</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_ADMIN')"><router-link :to="{ name: 'GameList' }" class="btn btn-outline-secondary">Matchs</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_ADMIN')"><router-link :to="{ name: 'MediaObjectList' }" class="btn btn-outline-secondary">Media</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_ADMIN')"><router-link :to="{ name: 'TookList' }" class="btn btn-outline-secondary">Tooks</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_ADMIN')"><router-link :to="{ name: 'TeamList' }" class="btn btn-outline-secondary">Equipes</router-link></li>
        <li class="active" v-if="$auth.check('ROLE_USER')"><router-link :to="{ name: 'GameUserList' }" class="btn btn-outline-light">Match à venir</router-link></li>
        <li class="active" v-if="$auth.check()"><a href="#" @click="$auth.logout()" class="btn btn-outline-light">Déconnexion</a></li>
      </ul>
    </nav>
  <div class="container pt-2">
    <div>
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  computed: {
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
