<template>
  <b-container class="auth-pages px-0" fluid>
    <b-row class="page-wrapper" no-gutters>
      <b-col
        cols="12"
        lg="12"
        class="d-flex justify-content-center align-items-center"
      >
        <form v-if="!resend" class="form-wrapper px-4" @submit.prevent="submit">
          <div class="d-flex logo-brand mb-lg-5 mb-5 align-items-center">
            <b-link to="/login">
              <b-img src="~svg/back-icon.svg" alt="" class="mr-3" />
            </b-link>
            <b-link to="/login" class="font-weight-bold">Back to Login</b-link>
          </div>
          <AuthTitle title="Forgot Password" />
          <h5 class="mb-4">
            Enter your email address and we will send you instructions to reset
            your password.
          </h5>

          <BaseInout
            v-model="form.username"
            placeholder="Email Address"
            type="email"
            :value="form.username"
            required
            :class="{ error: $v.form.username.$error }"
            @blur="$v.form.username.$touch()"
          />
          <div v-if="$v.form.username.$error" class="my-0">
            <div v-if="!$v.form.username.required" class="error my-0 mb-3">
              Email is required
            </div>
            <div v-if="!$v.form.username.email" class="error my-0 mb-3">
              Please enter a valid email address
            </div>
          </div>

          <BaseButton text="Continue" class="mt-4 auth-button" type="submit" />
        </form>

        <div v-else class="form-wrapper px-4">
          <div class="logo-brand mb-5">
            <b-img src="~svg/logo.svg" alt="" rounded="circle" />
          </div>
          <AuthTitle title="Forgot Password" />
          <h5 class="mb-5">
            Hello {{ form.username }}, a message has been sent to your email
            with instructions to reset your password, Kindly check your inbox
          </h5>
          <div class="mt-5">
            <BaseButton
              text="Resend Email"
              class="auth-button"
              @click="resend = false"
            />
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import BaseInout from '../components/BaseInout'
import BaseButton from '../components/BaseButton'
import AuthTitle from '../components/AuthTitle'

export default {
  components: {
    BaseInout,
    BaseButton,
    AuthTitle,
  },
  data() {
    return {
      form: {
        username: '',
        callback_url: `${process.env.baseUrl}/reset-password`,
      },
      resend: false,
    }
  },
  validations: {
    form: {
      username: {
        required,
        email,
      },
    },
  },
  methods: {
    ...mapActions({ forgotPassword: 'user/forgotPassword' }),
    async submit() {
      const loader = this.$loading.show()
      try {
        const payload = { ...this.form }
        const response = await this.forgotPassword(payload)
        loader.hide()

        await this.$Toast.fire({
          icon: 'success',
          title: response.payload.message,
        })
        this.resend = true
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

  .page-wrapper {
    height: 100vh;
  }

  .form-wrapper {
    width: 30%;
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
