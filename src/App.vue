<template>
<div class="h-100">
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
    <b-navbar-brand :to="{ name: 'HomePage' }" >Akiltook</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto" v-if="$auth.ready()">
        <b-nav-item :to="{ name: 'AuthRegister' }" v-if="!$auth.check()">Inscription</b-nav-item>
        <b-nav-item :to="{ name: 'AuthLogin' }" v-if="!$auth.check()">Connexion</b-nav-item>
        <b-nav-item :to="{ name: 'AccountList' }" v-if="$auth.check('ROLE_ADMIN')">Utilisateurs</b-nav-item>
        <b-nav-item :to="{ name: 'ClubList' }" v-if="$auth.check('ROLE_ADMIN')">Clubs</b-nav-item>
        <b-nav-item :to="{ name: 'GameList' }" v-if="$auth.check('ROLE_ADMIN')">Matchs</b-nav-item>
        <b-nav-item :to="{ name: 'MediaObjectList' }" v-if="$auth.check('ROLE_ADMIN')">Media</b-nav-item>
        <b-nav-item :to="{ name: 'TookList' }" v-if="$auth.check('ROLE_ADMIN')">Tooks</b-nav-item>
        <b-nav-item :to="{ name: 'TeamList' }" v-if="$auth.check('ROLE_ADMIN')">Equipes</b-nav-item>
        <b-nav-item :to="{ name: 'GameUserList' }" v-if="$auth.check('ROLE_USER')">Match à venir</b-nav-item>
        <b-nav-item @click="$auth.logout()" v-if="$auth.check()">Déconnexion</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <div class="container h-100 main-container">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  computed: {}
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

h1,
h2 {
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
