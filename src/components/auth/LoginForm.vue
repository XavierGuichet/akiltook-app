<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="account_email"
        class="form-control-label">Email</label>
      <input
        id="account_email"
        v-model="item.email"
        :class="['form-control', isInvalid('email') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('email', $event.target.value)">
      <div
        v-if="isInvalid('email')"
        class="invalid-feedback">{{ violations.email }}</div>
    </div>
    <div class="form-group">
      <label
        for="account_password"
        class="form-control-label">Mot de passe</label>
      <input
        id="account_password"
        v-model="item.password"
        :class="['form-control', isInvalid('password') ? 'is-invalid' : '']"
        type="password"
        placeholder=""
        @input="handleUpdateField('password', $event.target.value)">
      <div
        v-if="isInvalid('password')"
        class="invalid-feedback">{{ violations.password }}</div>
    </div>

    <button
      type="submit"
      class="btn btn-block btn-secondary">Connexion</button>
  </form>
</template>

<script>
export default {
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
