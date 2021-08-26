<template>
  <div class="btn-wrapper">
    <b-button
      :type="type"
      class="
        w-100
        py-3
        text-white
        d-inline-flex
        align-items-center
        justify-content-center
      "
      :class="variant"
      :disabled="disableButton"
      v-on="$listeners"
      >{{ text }}
      <b-img
        src="@/assets/images/svg/btn-arrow.svg"
        alt=""
        class="btn-icon mb-0"
      />
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'dark',
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    disableButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  .btn {
    border-radius: 10px !important;
  }
}

.btn-icon {
  width: toRes(16);
  height: 11px;
  margin-left: 5px;
}

.green {
  background: var(--primary) !important;
}

.dark {
  background: var(--primary) !important;
}

.light {
  background: #fff;
  color: var(--primary) !important;
  // border: 1px solid #000;
}
</style>
