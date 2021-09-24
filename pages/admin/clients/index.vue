<template>
  <div>
    <b-container fluid="xxxl" class="client-page">
      <b-row v-if="false" no-gutters class="mb-4">
        <b-col cols="12">
          <section class="d-flex flex-row range-filters gap-5">
            <b-dropdown id="dropdown-left" text="Custom Range" class="m-2">
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here</b-dropdown-item>
            </b-dropdown>
          </section>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col
          v-for="(item, index) in cardData"
          :key="index"
          cols="12"
          lg="3"
          md="6"
          class="mb-4"
        >
          <div
            class="d-card py-4 px-3 d-flex flex-column justify-content-between"
          >
            <div class="d-flex align-items-center">
              <img :src="item.icon" alt="" />
              <p class="mb-0 ml-2">{{ item.title }}</p>
            </div>
            <div class="d-flex align-items-end">
              <h1 class="mb-0 mr-1">{{ item.numeric }}</h1>
              <span v-if="false">-{{ item.percentage }}%</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="px-3">
        <customer-table
          v-if="customers.rows"
          class="w-100"
          :items="customers.rows"
          :fields="fields"
          :pagination="customers.paging"
          @export="exportData"
          @search="searchData"
          @goToPage="loadData"
        >
        </customer-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Clients',
  components: {
    CustomerTable: () => import('@/components/tables/CustomerTable'),
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
        {
          key: 'status',
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
      await this.getCustomerCount({ is_realtor: false })
      await this.getCustomers({ is_realtor: false })
      loader.hide()
    } catch (e) {
      loader.hide()
      await this.$formatError(e)
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
    async loadData(e) {
      const loader = this.$loading.show()
      try {
        await this.getCustomers({ page: e, is_realtor: false })
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
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
