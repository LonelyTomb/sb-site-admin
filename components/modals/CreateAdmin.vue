<template>
  <b-modal
    id="create-admin"
    ref="create-admin"
    size="lg"
    hide-header
    hide-footer
    :title="`Admin ${edit ? 'Update' : 'Creation'}`"
    body-class="p-5"
  >
    <h1>Admin {{ edit ? 'Update' : 'Creation' }}</h1>
    <b-form @submit.prevent="submit">
      <b-form-group id="firstname-l" label="First Name:" label-for="firstname">
        <b-form-input
          id="firstname"
          v-model="form.firstname"
          type="text"
          placeholder="Enter Firstname"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="lastname-l" label="Last Name:" label-for="lastname">
        <b-form-input
          id="lastname"
          v-model="form.lastname"
          type="text"
          placeholder="Enter Lastname"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="middlename-l"
        label="Middle Name:"
        label-for="middlename"
      >
        <b-form-input
          id="middlename"
          v-model="form.middlename"
          type="text"
          placeholder="Enter Middlename (Optional)"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="email-l" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Role-l" label="Role:" label-for="role">
        <b-form-select
          id="role"
          v-model="form.role_id"
          placeholder="Select Role"
          required
        >
          <b-form-select-option :value="null" disabled
            >Select Role</b-form-select-option
          >
          <b-form-select-option
            v-for="role in roles.rows || []"
            :key="role.id"
            :value="role.id"
            >{{ role.name.replace('_', ' ') }}</b-form-select-option
          >
        </b-form-select>
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
import { mapActions, mapGetters } from 'vuex'

const defaultData = {
  firstname: '',
  lastname: '',
  middlename: '',
  email: '',
  password: '',
  role_id: null,
}

export default {
  name: 'CreateAdmin',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      form: {
        ...defaultData,
      },
    }
  },
  computed: {
    ...mapGetters({ admin: 'admin/admin', roles: 'role/roles' }),
  },
  watch: {
    edit(val) {
      if (val) {
        this.updateForm(val)
      }
    },
    admin(val) {
      if (val) {
        this.updateForm(val)
      }
    },
  },
  mounted() {
    if (this.edit) {
      this.updateForm(this.admin)
    }
    this.getRoles()
  },
  methods: {
    ...mapActions({
      saveAdmin: 'admin/add',
      getRoles: 'role/roles',
    }),
    randomPwd() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    },
    hideModal() {
      this.$bvModal.hide('create-admin')
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
        const payload = {
          ...this.form,
          password: 'password',
        }
        if (!payload.middlename) delete payload.middlename
        await this.saveAdmin(payload)
        loader.hide()

        this.$Toast.fire({
          icon: 'success',
          title: `Admin ${this.edit ? 'Updated' : 'Created'}`,
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
