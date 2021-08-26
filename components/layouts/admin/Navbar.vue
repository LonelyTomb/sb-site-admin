<template>
  <nav
    class="
      d-flex
      justify-content-between
      py-3
      px-4
      admin-nav
      align-items-center
    "
  >
    <div class="d-flex align-items-center gap-1">
      <img
        v-if="paths.length > 3"
        :src="require('@/assets/images/svg/back-arrow.svg')"
        class="mr-3 back-arrow"
        alt=""
        @click="$router.back()"
      />
      <p class="mb-0 text-capitalize page-title">
        {{ paths[2] }}
      </p>
    </div>
    <div class="d-flex align-items-center gap-3">
      <div class="profile-pic-thumb">
        <b-img-lazy
          src="~png/pattern.png"
          rounded="circle"
          fluid-grow
          class="profile-pic-thumb"
        />
      </div>
      <p class="profile-name mb-0 text-dark">
        {{ username }}
      </p>
      <b-dropdown variant="link" class="text-dark p-0" offset="-100">
        <b-dropdown-item @click.prevent="logOut">Log Out</b-dropdown-item>
      </b-dropdown>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  computed: {
    username() {
      return (
        this.$auth.user &&
        `${this.$auth.user.lastname} ${this.$auth.user.firstname}`
      )
    },
    paths() {
      return this.$route.path.split('/')
    },
  },
  methods: {
    logOut() {
      // this.$loading.show()
      this.$auth.logout()
    },
  },
}
</script>
<style lang="scss" scoped>
.admin-nav {
  font: {
    family: $admin-font;
  }
  background: {
    color: transparent;
  }
  color: var(--dark);
  .page-title {
    font: {
      size: toRem(24);
      weight: 600;
    }
    line-height: toRem(29);
  }
  .profile-pic-thumb {
    width: toRem(35);
    height: toRem(35);
  }
}
</style>
