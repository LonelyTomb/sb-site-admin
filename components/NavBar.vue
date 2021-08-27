<template>
  <div class="the-hills-nav">
    <nav class="navbar">
      <b-img src="@/assets/images/svg/logo.svg" class="nav-logo" />
      <div class="nav-links justify-content-between">
        <NuxtLink to="#about">About us</NuxtLink>
        <NuxtLink to="#faq">How It works</NuxtLink>
        <NuxtLink to="#contact">Contact Us</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
      <b-button v-b-toggle.sidebar-backdrop class="menu-button" variant="link">
        <b-img src="@/assets/images/svg/menu-icon.svg" />
      </b-button>

      <b-sidebar
        id="sidebar-backdrop"
        class="nav-sidebar"
        title="Sidebar with backdrop"
        backdrop
        shadow
        right
        width="100%"
        z-index="10000"
        bg-variant="white"
        no-header
        d-flex
        flex-column
      >
        <template #default="{ hide }">
          <div class="close-btn-container">
            <b-button variant="link " @click="hide">
              <b-img src="@/assets/images/svg/Close.svg" class="close-button" />
            </b-button>
          </div>
          <div class="menu-container">
            <ul>
              <li>
                <NuxtLink to="#about">About Us</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faq">How it works</NuxtLink>
              </li>
              <li>
                <NuxtLink to="#contact">Contact us</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/login">Login</NuxtLink>
              </li>
            </ul>
          </div>
        </template>
      </b-sidebar>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss">
.the-hills-nav {
  .navbar {
    padding-top: 3rem;
    padding-left: 7rem;
    padding-right: 7rem;
    text-transform: uppercase;
    font-size: toRes(25);
    z-index: 7000;
  }

  .nav-logo {
    height: toRes(87);
    width: toRes(87);
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    width: 40%;

    a {
      color: var(--dark);
      font-weight: 700;
      padding-bottom: 2px;
      display: inline-block;
    }

    a:hover {
      text-decoration: none;
      border-bottom: 1px solid var(--dark);
    }
  }

  .menu-button {
    display: none;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
  .the-hills-nav .navbar {
    padding-left: 2rem;
    padding-right: 3rem;
  }
  .the-hills-nav .nav-links {
    width: 70%;
  }
}

@media only screen and (max-width: 768px) {
  .the-hills-nav .navbar .nav-links {
    display: none;
  }
  .the-hills-nav .navbar {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .the-hills-nav .menu-button {
    display: block;
  }

  .close-btn-container {
    padding-top: 10%;
    padding-left: 7%;
  }

  .menu-button:focus {
    box-shadow: none;
  }

  .menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
    width: 100%;
    text-align: center;

    ul {
      padding: 0;
      li {
        list-style: none;
        margin-bottom: 40px;
        a {
          color: var(--dark);
          font-weight: 700;
        }
      }
    }
  }
}
</style>
