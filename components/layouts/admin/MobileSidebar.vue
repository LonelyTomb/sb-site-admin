<template>
  <b-sidebar
    id="admin-mobile-sidebar"
    class=""
    no-header
    backdrop
    variant="dark"
  >
    <template #default="{ hide }">
      <div class="admin-mobile-sidebar p-4">
        <div class="close-button mb-5">
          <b-button
            variant="link"
            class="text-white p-0"
            size="lg"
            @click.prevent="hide"
          >
            <b-icon icon="filter-right"></b-icon>
          </b-button>
        </div>
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
              class="mobile-sidebar-link p-0"
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
    </template>
  </b-sidebar>
</template>
<script>
export default {
  name: 'MobileSidebar',
  props: {
    menu: {
      type: Array,
      required: false,
      default: () => [{ title: '', link: '' }],
    },
  },
}
</script>
<style lang="scss">
.admin-mobile-sidebar {
  background: {
    color: var(--dark);
  }
  height: 100vh;
  .logo {
    width: toRes(61);
  }
  .page-title {
    color: var(--dark);
    font: {
      size: toRes(25);
      family: $secondary-font;
    }
  }
  .sidebar-links {
    border: 0;
  }

  .mobile-sidebar-link {
    border: 0;

    img {
      width: toRem(19);
      height: toRem(19);
    }

    a {
      font: {
        size: toRes(25);
        weight: 500;
      }
      color: var(--white);
      background: {
        color: var(--dark);
      }

      &:hover {
        background: {
          color: var(--dark);
          image: url('~png/menu-backdrop.png');
          position: center right;
          repeat: no-repeat;
        }
      }

      &.nuxt-link-exact-active {
        background: {
          color: var(--dark);
        }
        color: var(--white);
      }
    }
  }
}
</style>
