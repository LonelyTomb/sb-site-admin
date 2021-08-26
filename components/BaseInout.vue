<template>
  <div class="position-relative">
    <b-form-input
      v-model="text"
      :value="value"
      v-bind="$attrs"
      :class="{ 'w-half': widthHalf, 'mb-3': !noSpacing }"
      :required="required"
      @input="updateValue"
      v-on="$listeners"
    ></b-form-input>
    <b-icon :icon="icon" class="input-icon"></b-icon>
    <!-- <img v-if="icon" :src="icon" alt="" /> -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: [String, Number],
      required: false,
      default: '',
    },
    widthHalf: {
      type: Boolean,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    noSpacing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      text: '',
    }
  },
  watch: {
    value(val) {
      this.text = val
    },
  },
  mounted() {
    if (this.value) {
      this.text = this.value
    }
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-control {
  border: 2px solid var(--light) !important;
  border-radius: 5px !important;
}

input {
  padding: 30px 40px;
  /* border-radius: 10px !important; */
  &:focus {
    border: 1px solid var(--primary) !important;
  }
}

.input-icon {
  top: 22px;
  right: 36px;
  width: 20px;
  position: absolute;
}
</style>
