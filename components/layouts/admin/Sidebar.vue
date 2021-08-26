<template>
  <aside
    class="
      admin-sidebar
      py-5
      px-4
      d-flex
      flex-column
      justify-content-between
      scrollbar
    "
  >
    <div class="d-flex flex-column gap-5">
      <section
        v-for="{ links, title } in menu"
        :key="title"
        class="menu-section"
      >
        <p class="menu-title text-uppercase">{{ title }}</p>
        <b-list-group class="sidebar-links">
          <b-list-group-item
            v-for="link in links"
            :key="link.name"
            class="sidebar-link p-0"
          >
            <nuxt-link
              :to="{ name: link.name }"
              class="
                d-inline-flex
                pr-5
                py-3
                w-100
                text-decoration-none
                gap-4
                align-items-center
              "
              ><b-img :src="link.image" fluid />{{ link.title }}</nuxt-link
            >
          </b-list-group-item>
        </b-list-group>
      </section>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    menu: {
      type: Array,
      required: false,
      default: () => [{ title: '', links: '' }],
    },
  },
  computed: {
    username() {
      return (
        this.$auth.user &&
        `${this.$auth.user.lastname} ${this.$auth.user.firstname}`
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.admin-sidebar {
  background: {
    color: var(--dark);
  }
  overflow-y: auto;
  height: 100vh;
  .menu-section {
    .menu-title {
      color: var(--light-gray);
      font: {
        weight: 600;
        family: $admin-font;
        size: toRem(12);
      }
      line-height: toRem(4.52);
    }
  }
  .sidebar-links {
    border: 0;
  }
  .sidebar-link {
    border: 0;
    background: {
      color: transparent;
    }

    img {
      width: toRem(20);
      height: toRem(20);
    }
    a {
      font: {
        weight: 500;
        family: $admin-font;
        size: toRem(14);
      }
      color: var(--light-gray);
      &:hover,
      &.nuxt-link-active {
        color: var(--white);
        // & img {
        //   filter: invert(1);
        //   mix-blend-mode: color-dodge;
        // }
      }
    }
  }
}
</style>
