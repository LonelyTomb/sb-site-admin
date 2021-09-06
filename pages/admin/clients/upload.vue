<template>
  <div>
    <b-container fluid="xxxl" class="client-page mt-5">
      <b-row>
        <customer-upload-table
          v-if="customers.rows"
          class="w-100"
          @export="exportData"
          @search="searchData"
        >
        </customer-upload-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ClientDashboard',
  components: {
    CustomerUploadTable: () =>
      import('@/components/tables/CustomerUploadTable'),
  },
  layout: 'admin',
  data() {
    return {
      fields: [
        {
          key: 'check',
        },
        {
          key: 'fullname',
          label: 'Fullname',
        },
        {
          key: 'email',
        },
        {
          key: 'phone',
          label: 'Phonenumber',
        },
        {
          key: 'downline',
        },
        {
          key: 'state_of_origin',
        },
        {
          key: 'gender',
        },
        {
          key: 'registration_date',
        },
      ],
      dummyData: [
        {
          title: 'Total Client',
          numeric: 4000,
          percentage: 40,
          icon: require('@/assets/images/svg/d-user.svg'),
        },
        {
          title: 'Active Client',
          numeric: 4500,
          percentage: 15,
          icon: require('@/assets/images/svg/d-active.svg'),
        },
        {
          title: 'Inactive Client',
          numeric: 800,
          percentage: 50,
          icon: require('@/assets/images/svg/d-inactive.svg'),
        },
        {
          title: 'Prospective Client',
          numeric: 1000,
          percentage: 10,
          icon: require('@/assets/images/svg/d-intending.svg'),
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      customerCount: 'customer/count',
      customers: 'customer/customers',
    }),
    cardData() {
      return [
        {
          title: 'Total Clients',
          numeric: this.customerCount,
          percentage: 0,
          icon: require('@/assets/images/svg/d-user.svg'),
        },
      ]
    },
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getCustomerCount()
      await this.getCustomers()
      loader.hide()
    } catch (e) {
      loader.hide()
      await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
    }
  },
  methods: {
    ...mapActions({
      getCustomerCount: 'customer/count',
      getCustomers: 'customer/customers',
      exportCustomer: 'customer/export',
    }),
    saveAsCSV(filename, data) {
      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data)
      hiddenElement.target = '_blank'
      hiddenElement.download = `${filename}.csv`
      hiddenElement.click()
    },
    async exportData() {
      const loader = this.$loading.show()
      try {
        const res = await this.exportCustomer()
        this.saveAsCSV('customers', res)
        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
    async searchData(val) {
      const loader = this.$loading.show()
      try {
        await this.getCustomers({ search: val })
        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$formatError(e)
      }
    },
  },
}
</script>

<style lang="scss">
.client-page {
  .range-filters {
    .btn {
      border: 1px solid var(--dark);
      background: {
        color: var(--white) !important;
      }
      a {
        color: var(--dark);
      }
    }
  }

  .d-card {
    background: var(--white);
    height: 170px;
    width: 100%;
    // @media screen and (max-width: 1024px) {
    //   width: 25%;
    // }
    // @media screen and (max-width: 768px) {
    //   width: 47.9%;
    //   margin-bottom: 30px;
    //   margin-right: 0 !important;
    //   &:nth-child(2n + 1) {
    //     margin-right: 30px !important;
    //   }
    // }
    p {
      text-transform: capitalize;
    }

    img {
      width: 40px;
    }
    h1 {
      font-weight: 400;
    }

    span {
      color: #16c98d;
      margin-bottom: 5px;
      display: inline-block;
    }

    &:last-child {
      span {
        color: #fa5e5b;
      }
    }
  }
}
</style>
