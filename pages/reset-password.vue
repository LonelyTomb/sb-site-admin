<template>
  <b-container class="auth-pages px-0" fluid>
    <b-row class="page-wrapper">
      <b-col cols="12" lg="4" class="pattern px-0">
        <img src="~png/reset-password-img.png" alt="" />
      </b-col>
      <b-col
        cols="12"
        lg="8"
        class="d-flex justify-content-center align-items-center"
      >
        <form class="form-wrapper px-4" @submit.prevent="submit">
          <div class="d-flex logo-brand mb-lg-5 mb-5 align-items-center">
            <b-link to="/login">
              <b-img src="~svg/back-icon.svg" alt="" class="mr-3" />
            </b-link>
            <b-link to="/login" class="font-weight-bold">Back to Login</b-link>
          </div>
          <AuthTitle title="Set New Password" />

          <BaseInout
            v-model="form.password"
            placeholder="Enter New Password"
            type="password"
            :value="form.password"
            required
            :class="{ error: $v.form.password.$error }"
            @blur="$v.form.password.$touch()"
          />
          <div v-if="$v.form.password.$error" class="my-0">
            <div v-if="!$v.form.password.required" class="error my-0 mb-3">
              Password is required
            </div>
            <div v-if="!$v.form.password.minLength" class="error my-0 mb-3">
              Password must be 8 characters minimum
            </div>
          </div>

          <BaseInout
            v-model="form.confirm_password"
            placeholder="Enter Password Again"
            type="password"
            required
            :value="form.confirm_password"
            :class="{ error: $v.form.confirm_password.$error }"
            @blur="$v.form.confirm_password.$touch()"
          />

          <div v-if="$v.form.confirm_password.$error" class="my-0">
            <div
              v-if="!$v.form.confirm_password.sameAsPassword"
              class="error my-0"
            >
              Password doesn't match
            </div>
          </div>

          <BaseButton
            text="Update Password"
            class="mt-5 auth-button"
            type="submit"
          />
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import BaseInout from '../components/BaseInout'
import BaseButton from '../components/BaseButton'
import AuthTitle from '../components/AuthTitle'
export default {
  name: 'ResetPassword',
  components: {
    BaseInout,
    BaseButton,
    AuthTitle,
  },
  data() {
    return {
      form: {
        password: '',
        confirm_password: '',
        id: 0,
        token: 'string',
      },
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
      },
      confirm_password: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  mounted() {
    const { id, token } = this.$route.query
    this.form = { ...this.form, id, token }
  },
  methods: {
    ...mapActions({ resetPassword: 'user/resetPassword' }),
    async submit() {
      const loader = this.$loading.show()
      try {
        const payload = { ...this.form, id: Number(this.form.id) }
        const response = await this.resetPassword(payload)
        loader.hide()

        await this.$Toast.fire({
          icon: 'success',
          title: response.payload.message,
        })
        await this.$router.push({ name: 'login' })
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.auth-pages {
  .pattern {
    img {
      width: inherit;
      height: 100vh;
    }
  }

  .form-wrapper {
    width: 55%;
  }

  .logo-brand img {
    width: 40px;
  }
}

@media screen and (max-width: 768px) {
  .auth-pages {
    .pattern {
      img {
        width: inherit;
        height: 50vh;
        min-height: 50vh;
      }
    }
  }
  .page-wrapper {
    height: 100vh;
    margin-top: -25vh;
  }
  .form-wrapper {
    text-align: center;
    padding-top: 50px;
    width: 100% !important;
  }

  .suggested-link {
    width: 200px;
    margin: 0 auto;
    line-height: 1.7;
    padding: 20px 0;
  }
}
</style>
