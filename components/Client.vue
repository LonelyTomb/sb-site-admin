<template>
  <b-tabs content-class="realtor-tabs" nav-class="realtor-navs realtor">
    <b-tab v-for="tab in tabs" :key="tab.title" :title="tab.title">
      <component
        :is="tab.component"
        v-bind="{ ...tab.props }"
        v-on="{ ...tab.on }"
      />
    </b-tab>
  </b-tabs>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Realtor',
  components: {},
  props: {
    user: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      subscriptions: 'product/subscriptions',
    }),
    completeds() {
      return (
        this.subscriptions.rows &&
        this.subscriptions.rows.filter((item) => item.status === 'completed')
      )
    },
    tabs() {
      return [
        {
          title: 'Sales',
          icon: '',
          component: () => import('@/components/tables/SalesTable'),
          props: {
            fields: [
              {
                key: 'sales',
                label: 'Sales',
              },
              {
                key: 'date',
                label: 'Date',
              },
              {
                key: 'total_amount',
                label: 'Total Price',
              },
              {
                key: 'amount_paid',
                label: 'Amount Paid',
              },
              {
                key: 'status',
              },
            ],
            items: this.subscriptions.rows || [],
            pagination: this.subscriptions.paging || {},
          },
          on: {
            search: async (val) => {
              const loader = this.$loading.show()
              try {
                await this.getSubscriptions({
                  search: val,
                  customer_id: this.$route.params.id,
                })
                loader.hide()
              } catch (e) {
                loader.hide()
                await this.$formatError(e)
              }
            },
            goToPage: async (e) => {
              const loader = this.$loading.show()
              try {
                await this.getSubscriptions({
                  page: e,
                  customer_id: this.$route.params.id,
                })
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
        },
        {
          title: 'Allocations',
          icon: '',
          component: () => import('@/components/tables/PendingAllocationTable'),
          on: {},
          props: {
            items: this.completeds || [],
            controls: false,
            fields: [
              {
                key: 'sales',
                label: 'Sales',
              },
              {
                key: 'date',
                label: 'Date',
              },
              {
                key: 'total_amount',
                label: 'Total Price',
              },
              {
                key: 'amount_paid',
                label: 'Amount Paid',
              },
              {
                key: 'is_allocated',
                label: 'Allocated',
              },
              {
                key: 'allocations',
                label: 'Allocations',
              },
            ],
          },
        },
      ]
    },
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getSubscriptions({ customer_id: this.$route.params.id })
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
      getSubscriptions: 'product/subscriptions',
    }),
  },
}
</script>

<style lang="scss">
.realtor-navs {
  background: {
    color: transparent !important;
  }
  .nav-item {
    &:first-of-type {
      .nav-link {
        clip-path: polygon(0 0%, 90% 0px, 99% 100%, 0px 100%);
        margin-left: 0;
        margin-right: 0;
        padding: {
          right: 2rem;
          left: 1rem;
        }
      }
    }
    &:nth-child(even) {
      margin-left: -10px;
      margin-right: -10px;
    }
    &:nth-child(odd) {
      z-index: 1;
    }
    .nav-link {
      background: {
        color: #f6f6f6 !important;
      }
      color: rgba($b, 0.3);
      font: {
        weight: 400;
      }
      padding: {
        right: 1.5rem;
        left: 1.5rem;
      }
      opacity: 1;
      //border: 1px solid rgba(230, 230, 230, 0.4);
      clip-path: polygon(10px 0%, 85% 0px, 100% 100%, 0px 100%);
      &.active {
        background: {
          color: #ffffff !important;
        }
        color: rgba($b, 1);
      }
    }
  }
}
.realtor-tabs {
  background: var(--white);
  border-radius: 0 10px 10px 10px;
  margin: {
    left: 1px;
  }
  padding: 1rem;
}
</style>
