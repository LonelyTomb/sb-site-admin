<template>
  <b-container class="auth-pages px-0" fluid>
    <b-row class="page-wrapper" no-gutters>
      <b-col cols="12" lg="4" class="pattern px-0">
        <img src="~png/forgot-password-img.png" alt="" />
      </b-col>
      <b-col
        cols="12"
        lg="8"
        class="d-flex justify-content-center align-items-center"
      >
        <div v-if="verified" class="form-wrapper px-4">
          <div class="logo-brand mb-5">
            <b-img src="~svg/logo.svg" alt="" rounded="circle" />
          </div>
          <AuthTitle title="Email Verified" />
          <h5 class="mb-5">Your email has been successfully verified</h5>
          <p>Redirecting to login page</p>
        </div>
        <div v-if="failToVerify" class="form-wrapper px-4">
          <div class="logo-brand mb-5">
            <b-img src="~svg/logo.svg" alt="" rounded="circle" />
          </div>
          <AuthTitle title="Verify Email" />
          <h5 class="mb-5">Unable to verify email address.</h5>
          <div class="mt-5">
            <nuxt-link :to="{ name: 'verify-resend' }">
              <BaseButton text="Click to Resend Email" />
            </nuxt-link>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import BaseButton from '../../components/BaseButton'
import AuthTitle from '../../components/AuthTitle'

export default {
  components: {
    BaseButton,
    AuthTitle,
  },
  data() {
    return {
      verified: false,
      failToVerify: false,
    }
  },
  mounted() {
    // eslint-disable-next-line camelcase
    const { id: auth_id, token: value } = this.$route.query
    const loader = this.$loading.show()
    this.submit(loader, { auth_id, value })
  },
  methods: {
    ...mapActions({ resendEmail: 'user/verifyEmail' }),
    ...mapMutations({ changeStrategy: 'auth/SET' }),
    async submit(loader, payload) {
      try {
        await this.resendEmail(payload)
        loader.hide()
        this.verified = true
        await this.$Toast.fire({
          icon: 'success',
          title: 'Email Verified',
        })
        setTimeout(() => {
          this.$router.push({ name: 'login' })
        }, 1500)
      } catch (e) {
        loader.hide()
        const message =
          e.response.data.error && e.response.data.error[0].message

        if (
          message &&
          message.toLowerCase() === 'customer email already verified'
        ) {
          this.verified = true
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 1500)
        } else {
          this.failToVerify = true
        }
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

  .form-wrapper {
    width: 55%;
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
