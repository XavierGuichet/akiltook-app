<template>
  <form @submit.prevent="handleSubmit(item)" class="d-flex flex-column">
    <div class="form-group">
      <label
        for="mediaObject_file"
        class="form-control-label">Image du mediaObject</label>
      <input
        id="mediaObject_file"
        v-model="item.file"
        :class="['form-control', isInvalid('Logo') ? 'is-invalid' : '']"
        type="text"
        placeholder="Reference media (non modifiable)"
        @input="handleUpdateField('file', $event.target.value)">
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
      class="btn btn-success">Enregistrer</button>
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
      this.values.file = dataUri
      this.handleUpdateField('file', dataUri)
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
