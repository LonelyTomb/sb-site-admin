<template>
  <div>
    <b-container fluid="xxxl" class="client-page">
      <b-row>
        <role-table
          v-if="roles.rows"
          class="w-100"
          :items="roles.rows"
          :fields="fields"
          :pagination="roles.paging"
          @search="searchData"
          @goToPage="loadData"
          @refresh="refreshData"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RoleTab',
  components: {
    RoleTable: () => import('@/components/tables/RoleTable'),
  },
  layout: 'admin',
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'name',
        },
        {
          key: 'description',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      roles: 'role/roles',
    }),
  },
  async mounted() {
    await this.refreshData()
  },
  methods: {
    ...mapActions({
      getRoles: 'role/roles',
    }),
    async loadData(e) {
      const loader = this.$loading.show()
      try {
        await this.getRoles({ page: e })
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
    async refreshData() {
      const loader = this.$loading.show()
      try {
        await this.getRoles()
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
        await this.getRoles({ search: val })
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
