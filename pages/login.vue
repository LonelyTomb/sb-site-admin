<template>
  <b-container class="auth-pages px-0" fluid>
    <b-row class="page-wrapper" no-gutters>
      <b-col cols="12" lg="4" class="pattern px-0">
        <img src="~png/login-image.png" alt="" />
      </b-col>
      <b-col
        cols="12"
        lg="8"
        class="d-flex justify-content-center align-items-center"
      >
        <form class="form-wrapper px-4" @submit.prevent="submit">
          <div class="logo-brand mb-lg-5 mb-4">
            <b-img src="~svg/logo.svg" alt="" rounded="circle" />
          </div>
          <AuthTitle title="Login to continue" />

          <BaseInout
            v-model="form.username"
            :icon="require('@/assets/images/svg/logo.svg')"
            placeholder="Enter email address"
            type="text"
            :value="form.username"
            :class="{ error: $v.form.username.$error }"
            :required="true"
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

          <BaseInout
            v-model="form.password"
            :icon="require('@/assets/images/svg/logo.svg')"
            placeholder="Enter password"
            type="password"
            :value="form.password"
            :class="{ error: $v.form.password.$error }"
            :required="true"
            @blur="$v.form.password.$touch()"
          />

          <div v-if="$v.form.password.$error" class="my-0">
            <div v-if="!$v.form.password.required" class="error my-0 mb-3">
              Password is required
            </div>
            <div v-if="!$v.form.password.minLength" class="error my-0 mb-3">
              Password must be at least 8 characters minimum
            </div>
          </div>

          <div class="d-flex justify-content-between mb-5 font-weight-bold">
            <div class="">
              <input
                id="styled-checkbox-1"
                type="checkbox"
                class="styled-checkbox"
              />
              <!--              <label for="styled-checkbox-1">Remember Me</label>-->
            </div>

            <b-link to="/forgot-password" class="text-dark font-weight-bold">
              <span>Forgot Password</span>
            </b-link>
          </div>

          <BaseButton text="Log in" type="submit" class="auth-button mb-5" />
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
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
        password: '',
      },
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      if (this.$auth.user?.type?.includes('admin')) {
        this.$router.push({ name: 'admin-dashboard' })
      } else {
        this.$router.push({ name: 'customer-dashboard' })
      }
    }
  },
  validations: {
    form: {
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    async submit() {
      const loader = this.$loading.show()
      try {
        const payload = { ...this.form }
        await this.$auth.loginWith('admin', {
          data: payload,
        })
        loader.hide()
        await this.$router.push({ name: 'admin' })
      } catch (e) {
        const msg = this.$formatError(e)
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: msg,
        })
        if (msg.toLowerCase() === 'user email not verified') {
          await this.$router.push({ name: 'verify-resend' })
        }
      }
    },
  },
}
</script>

<style lang="scss">
.auth-pages {
  .pattern {
    img {
      width: inherit;
      min-height: 100vh;
      height: 100%;
    }
  }

  .form-wrapper {
    width: 55%;
  }

  .logo-brand img {
    width: 70px;
  }
  .auth-button {
    button {
      transition: all 2s ease-out;
      &:hover .btn-icon {
        transform: translateX(10px);
      }
    }
  }
}

.styled-checkbox {
  opacity: 0; // hide it
  position: absolute;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
    border: 1px solid #000;
    border-radius: 3px;
    padding: 5px;
  }

  // Box hover
  label:before {
    background: #000000;
  }

  // Box focus
  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  // Box checked
  &:checked + label:before {
    background: #000000;
  }
}

@media screen and (max-width: 768px) {
  .auth-pages {
    .pattern {
      img {
        width: inherit;
        height: 60vh;
        min-height: 60vh;
      }
    }
  }
  .page-wrapper {
    height: 100vh;
    margin-top: -34vh;
  }
  .form-wrapper {
    text-align: center;
    padding-top: 50px;
    width: 100% !important;
  }

  .sugested-links {
    width: 220px;
    margin: 0 auto;
    line-height: 1.7;
    padding: 20px 0;
  }
}
</style>
