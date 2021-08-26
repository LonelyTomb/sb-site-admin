<template>
  <nav
    class="
      d-flex
      justify-content-between
      py-3
      px-4
      mobile-nav
      align-items-center
    "
  >
    <div class="d-flex align-items-center gap-3">
      <b-button
        v-b-toggle.admin-mobile-sidebar
        variant="link"
        class="text-white p-0"
        size="lg"
      >
        <b-icon icon="list"></b-icon>
      </b-button>
      <p class="mb-0 text-capitalize">{{ $route.path.split('/').pop() }}</p>
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

      <b-button variant="link" class="text-white p-0" size="sm">
        <b-icon icon="chevron-down"></b-icon>
      </b-button>
    </div>
  </nav>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.mobile-nav {
  background: {
    color: var(--dark);
  }
  z-index: 1000;
  color: var(--white);
  .profile-pic-thumb {
    width: toRem(35);
    height: toRem(35);
  }
}
</style>
