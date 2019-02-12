<template>
  <form @submit.prevent="handleSubmit(item)" class="d-flex flex-column">
    <div class="form-group">
      <label
        for="club_Name"
        class="form-control-label">Name</label>
      <input
        id="club_Name"
        v-model="item.Name"
        :class="['form-control', isInvalid('Name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('Name', $event.target.value)">
      <div
        v-if="isInvalid('Name')"
        class="invalid-feedback">{{ violations.Name }}</div>
    </div>
    <div class="form-group">
      <label
        for="club_logo"
        class="form-control-label">Logo du club</label>
      <input
        id="club_Logo"
        v-model="item.Logo"
        :class="['form-control', isInvalid('Logo') ? 'is-invalid' : '']"
        type="text"
        placeholder="Reference logo (non modifiable)"
        @input="handleUpdateField('Logo', $event.target.value)">
      <div
        v-if="isInvalid('Name')"
        class="invalid-feedback">{{ violations.Name }}</div>
      <vue-base64-file-upload
        class=""
        accept="image/png,image/jpeg"
        image-class="img-fluid"
        input-class="form-control"
        :max-size="customImageMaxSize"
        @size-exceeded="onSizeExceeded"
        @file="onFile"
        @load="onLoad" />
    </div>
    <button
      type="submit"
      class="btn btn-success">Submit</button>
  </form>
</template>

<script>
import VueBase64FileUpload from 'vue-base64-file-upload';

export default {
  components: {
    VueBase64FileUpload
  },
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

  data() {
    return {
      customImageMaxSize: 3 // megabytes
    };
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
    onFile(file) {
    },

    onLoad(dataUri) {
      this.values.Logo = dataUri
      this.handleUpdateField('Logo', dataUri)
    },

    onSizeExceeded(size) {
      alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
    },

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
