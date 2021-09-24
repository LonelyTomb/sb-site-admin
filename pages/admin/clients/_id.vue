<template>
  <div class="profile">
    <b-container fluid="xxxl">
      <b-row>
        <b-col cols="12" lg="9" class="mt-4">
          <b-container>
            <b-row>
              <b-col cols="12">
                <p>{{ customer.firstname }} {{ customer.lastname }}</p>
                <client :user="customer" />
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col cols="12" lg="3" class="mt-4">
          <div v-if="customer.id" class="info">
            <div class="text-center pt-5">
              <b-avatar
                :src="
                  customer.profile_pic ||
                  require('@/assets/images/png/1620655858850.png')
                "
                size="8rem"
              ></b-avatar>
              <br />
              <b-button v-if="false" class="border border-white b-btn mt-2"
                ><img
                  src="@/assets/images/svg/edit-icon.svg"
                  class="mr-2"
                  alt=""
                />
                Edit</b-button
              >
            </div>
            <div class="bio px-4 py-4">
              <h4 class="mb-3">Bio Data</h4>
              <div class="data">
                <p>
                  <img
                    src="@/assets/images/svg/edit-icon.svg"
                    class="mr-2"
                    alt=""
                  />
                  {{ customer.firstname }} {{ customer.lastname }}
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/mail-icon.svg"
                    class="mr-2"
                    alt=""
                  />{{ customer.email }}
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/phone-icon.svg"
                    class="mr-2"
                    alt=""
                  />{{ customer.phone }}
                </p>
              </div>
            </div>
            <div v-if="customer.next_of_kin_full_name" class="bio px-4 pb-4">
              <h4 class="mb-3">Next of Kins Data</h4>
              <div class="data">
                <p>
                  <img
                    src="@/assets/images/svg/edit-icon.svg"
                    class="mr-2"
                    alt=""
                  />{{ customer.next_of_kin_full_name }}
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/mail-icon.svg"
                    class="mr-2"
                    alt=""
                  />{{ customer.next_of_kin_address }}
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/phone-icon.svg"
                    class="mr-2"
                    alt=""
                  />{{ customer.next_of_kin_phone }}
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/d-user.svg"
                    class="mr-2"
                    alt=""
                  />{{ customer.next_of_relationship }}
                </p>
              </div>
            </div>
            <div v-if="false" class="text-center pb-4">
              <b-button
                class="border border-white bg-dark text-light mt-2 mr-2"
              >
                Send Email</b-button
              >
              <b-button class="border border-white b-btn mt-2"
                >Send Sms</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Client: () => import('@/components/Client'),
  },
  layout: 'admin',
  computed: {
    ...mapGetters({
      customer: 'customer/customer',
    }),
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getCustomer(this.$route.params.id)
      loader.hide()
    } catch (e) {
      loader.hide()
      await this.$Toast.fire({
        icon: 'error',
        title: this.$formatError(e),
      })
    }
  },
  methods: {
    ...mapActions({
      getCustomer: 'customer/customer',
    }),
    async loadData() {
      const loader = this.$loading.show()
      try {
        await this.getCustomer(this.$route.params.id)
        loader.hide()
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
.profile {
  .info {
    background: var(--white);
    width: 100%;
    border-radius: 15px;
  }

  .b-btn {
    background-color: rgba(43, 88, 161, 0.08);
    img {
      width: 15px;
      margin-top: -2px;
    }
  }

  .bio {
    h4 {
      font-size: 19px;
      font-weight: 500;
      opacity: 0.7;
    }
    .data {
      p {
        opacity: 0.7;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
}
</style>
