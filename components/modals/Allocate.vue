<template>
  <b-modal
    id="allocate-product"
    ref="allocate-product"
    size="lg"
    hide-header
    hide-footer
    :title="` ${edit ? 'Update' : 'Create'} Allocation`"
    body-class="p-5"
  >
    <h1>{{ edit ? 'Update' : 'Create' }} Allocation</h1>
    <b-form @submit.prevent="submit">
      <b-form-group
        id="allocation"
        label="Enter Allocation Details:"
        label-for="allocation"
      >
        <b-form-tags
          v-model="form.allocations"
          input-id="tags-basic"
          placeholder="Enter Allocation Details separated by space"
        />
      </b-form-group>
      <div class="d-flex justify-content-end gap-3 pt-3">
        <b-button type="button" variant="link" @click="hideModal"
          >Cancel</b-button
        >
        <b-button type="submit" variant="dark">Save</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

const defaultData = {
  allocations: [],
  id: '',
}

export default {
  name: 'Allocation',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    allocation: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        ...defaultData,
      },
    }
  },
  computed: {},
  watch: {
    edit(val) {
      if (val) {
        this.updateForm(val)
      }
    },
    allocation(val) {
      if (val) {
        this.updateForm(val)
      }
    },
  },
  mounted() {
    if (this.edit) {
      this.updateForm(this.allocation)
    } else {
      this.form.id = this.allocation.id
    }
  },
  methods: {
    ...mapActions({
      allocate: 'product/allocate',
    }),

    hideModal() {
      this.$bvModal.hide('allocate-product')
    },
    updateForm(payload) {
      this.form = {
        ...this.form,
        ...payload,
      }
    },
    async submit() {
      const loader = this.$loading.show()

      try {
        const { allocations, id } = this.form

        await this.allocate({ id, allocations })
        loader.hide()

        this.$Toast.fire({
          icon: 'success',
          title: `Allocation ${this.edit ? 'Updated' : 'Created'}`,
        })
        this.form = { ...defaultData }

        this.hideModal()
        this.$emit('completed', true)
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
      }
    },
  },
}
</script>

<style scoped></style>
