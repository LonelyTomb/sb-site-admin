<template>
  <b-container class="auth-pages px-0" fluid>
    <b-row class="page-wrapper" no-gutters>
      <b-col
        cols="12"
        lg="12"
        class="d-flex justify-content-center align-items-center"
      >
        <div class="form-wrapper px-4">
          <LogoBar />
          <AuthTitle title="Account Created" />
          <h5 class="mb-5">
            Thank you for signing up. Kindly verify your email by clicking on
            the link sent to your inbox
          </h5>
          <nuxt-link :to="{ name: 'verify-resend' }">
            <BaseButton text="Click to Resend Email" class="auth-button" />
          </nuxt-link>

          <h6 class="mt-3 d-none d-lg-block">
            Already verified?
            <b-link to="/login">Login</b-link>
          </h6>

          <h6 class="mt-3 px-4 d-lg-none d-sm-block suggested-link">
            Already verified?
            <b-link to="/login">Login here</b-link>
          </h6>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BaseButton from '../../components/BaseButton'
import AuthTitle from '../../components/AuthTitle'
import LogoBar from '../../components/LogoBar'

export default {
  components: {
    BaseButton,
    AuthTitle,
    LogoBar,
  },
  data() {
    return {
      verified: false,
      failToVerify: false,
    }
  },
  mounted() {},
  methods: {},
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
