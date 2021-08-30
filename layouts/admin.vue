<template>
  <b-container fluid="xxxl" class="admin-dashboard-container p-0 min-h-screen">
    <b-row no-gutters align-h="end" class="pr-lg-4">
      <b-col cols="12" class="position-fixed sidebar-wrapper d-none d-lg-block">
        <sidebar :menu="menu" />
      </b-col>
      <b-col
        cols="12"
        class="position-fixed mobile-nav-wrapper d-block d-lg-none"
      >
        <mobile-navbar />
        <mobile-sidebar :menu="menu" />
      </b-col>

      <b-col md="12" lg="9" class="pt-5 pt-lg-0">
        <navbar class="mt-5" />
        <div class="admin-page-wrapper">
          <Nuxt />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  components: {
    sidebar: () => import('@/components/layouts/admin/Sidebar'),
    MobileNavbar: () => import('@/components/layouts/admin/MobileNavbar'),
    Navbar: () => import('@/components/layouts/admin/Navbar'),
    MobileSidebar: () => import('@/components/layouts/admin/MobileSidebar'),
  },
  data() {
    return {
      menu: [
        {
          title: 'Main',
          links: [
            {
              title: 'Dashboard',
              name: 'admin-dashboard',
              image: require('@/assets/images/svg/dashboard-icon.svg'),
            },
            {
              title: 'Client',
              name: 'admin-clients',
              image: require('@/assets/images/svg/client-icon.svg'),
            },
            {
              title: 'Realtor',
              name: 'admin-realtors',
              image: require('@/assets/images/svg/realtor-icon.svg'),
            },
            {
              title: 'Locations',
              name: 'admin-locations',
              image: require('@/assets/images/svg/location-icon.svg'),
            },
            {
              title: 'Investments',
              name: 'admin-investments',
              image: require('@/assets/images/svg/realtor-icon.svg'),
            },
            // {
            //   title: 'Pending Allocation',
            //   name: 'admin-pending_allocation',
            //   image: require('@/assets/images/svg/pending-allocation-icon.svg'),
            // },
          ],
        },
        {
          title: 'Finances',
          links: [
            // {
            //   title: 'Sales',
            //   name: 'admin-sales',
            //   image: require('@/assets/images/svg/sales-icon.svg'),
            // },
            // {
            //   title: 'Promotions',
            //   name: 'admin-promotions',
            //   image: require('@/assets/images/svg/promotions-icon.svg'),
            // },
            {
              title: 'Payments',
              name: 'admin-payments',
              image: require('@/assets/images/svg/payments-icon.svg'),
            },
            {
              title: 'Commissions',
              name: 'admin-commissions',
              image: require('@/assets/images/svg/commissions-icon.svg'),
            },
          ],
        },
        {
          title: 'Setup',
          links: [
            // {
            //   title: 'Change Requests',
            //   name: 'admin-change_requests',
            //   image: require('@/assets/images/svg/changed-request-icon.svg'),
            // },
            {
              title: 'Settings',
              name: 'admin-settings',
              image: require('@/assets/images/svg/settings-icon.svg'),
            },
            // {
            //   title: 'Users',
            //   name: 'admin-users',
            //   image: require('@/assets/images/svg/users-icon.svg'),
            // },
          ],
        },
      ],
    }
  },
  mounted() {},
}
</script>
<style lang="scss">
.admin-dashboard-container {
  min-height: 100vh;
  background: {
    color: #e5e5e5;
  }
  .sidebar-wrapper {
    left: 0;
    width: 22%;
  }

  .mobile-nav-wrapper {
    z-index: 1000;
  }
}
</style>
