<template>
  <b-card class="users-card">
    <b-tabs content-class="mt-3">
      <b-tab title="Users" active> <admins /> </b-tab>
      <b-tab title="Roles"><roles /></b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: 'Users',
  components: {
    Admins: () => import('@/components/tabs/Admins'),
    Roles: () => import('@/components/tabs/Roles'),
  },
  layout: 'admin',
  data() {
    return {}
  },
  head() {
    return {
      title: 'Landshares || Change Users',
    }
  },
  computed: {},
  async mounted() {},
}
</script>

<style lang="scss">
.users-card {
  .tabs {
    .nav.nav-tabs {
      border-bottom: none;
      a {
        color: #8c8c8c !important;
        border: none;
        opacity: 1;
        font: {
          weight: 400;
        }
        &.active {
          color: #001409 !important;
        }
      }
    }
  }
}
</style>
