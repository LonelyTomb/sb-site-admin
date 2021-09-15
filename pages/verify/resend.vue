<template>
  <b-container class="auth-pages px-0" fluid>
    <b-row class="page-wrapper" no-gutters>
      <b-col
        cols="12"
        lg="12"
        class="d-flex justify-content-center align-items-center"
      >
        <form class="form-wrapper px-4" @submit.prevent="submit">
          <LogoBar />
          <AuthTitle title="Verify Email" />
          <h5 class="mb-4">
            Enter your email address to resend the email verification link
          </h5>

          <BaseInout
            v-model="form.email"
            placeholder="Email Address"
            type="email"
            required
            :value="form.email"
            :class="{ error: $v.form.email.$error }"
            @blur="$v.form.email.$touch()"
          />
          <div v-if="$v.form.email.$error" class="my-0">
            <div v-if="!$v.form.email.required" class="error my-0 mb-3">
              Email is required
            </div>
            <div v-if="!$v.form.email.email" class="error my-0 mb-3">
              Please enter a valid email address
            </div>
          </div>

          <BaseButton text="Send" type="submit" class="mt-4" />
          <h6 class="mt-3 d-none d-lg-block">
            Already have an account?
            <b-link to="/login">Login</b-link>
          </h6>

          <h6 class="mt-3 px-4 d-lg-none d-sm-block suggested-link">
            Already a user?
            <b-link to="/login">Login here</b-link>
          </h6>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import BaseInout from '../../components/BaseInout'
import BaseButton from '../../components/BaseButton'
import AuthTitle from '../../components/AuthTitle'
import LogoBar from '../../components/LogoBar'

export default {
  name: 'ResendEmail',
  components: {
    BaseInout,
    BaseButton,
    AuthTitle,
    LogoBar,
  },
  data() {
    return {
      form: {
        email: '',
      },
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    ...mapActions({ resendEmail: 'user/resendEmail' }),
    async submit() {
      const loader = this.$loading.show()
      try {
        const payload = { ...this.form }
        const response = await this.resendEmail(payload)
        loader.hide()

        await this.$Toast.fire({
          icon: 'success',
          title: response.payload.message,
        })
        await this.$router.push({ name: 'login' })
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
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

  .page-wrapper {
    height: 100vh;
  }

  .form-wrapper {
    width: 30%;
  }

  .logo-brand img {
    width: 70px;
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
