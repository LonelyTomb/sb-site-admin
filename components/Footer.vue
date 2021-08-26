<template>
  <footer class="the-hills-footer">
    <div class="footer-logo-container">
      <b-img src="@/assets/images/svg/logo-white.svg" class="footer-logo" />
    </div>
    <div class="quicklinks">
      <p class="footer-title">quick links</p>
      <ul>
        <li><a href="/">home</a></li>
        <li><a href="">About Us</a></li>
        <li><a href="">Faq</a></li>
      </ul>
    </div>

    <div class="quicklinks">
      <p class="footer-title">social network</p>
      <ul>
        <li><a href="/">facebook</a></li>
        <li><a href="#about">instagram</a></li>
        <li><a href="">twitter</a></li>
      </ul>
    </div>

    <div class="quicklinks">
      <p class="footer-title">legal</p>
      <ul>
        <li><a href="/">terms &amp; conditions</a></li>
        <li><a href="">privacy policy</a></li>
      </ul>
    </div>

    <div class="quicklinks address-container">
      <div class="address">
        <p class="footer-title">contact us</p>
        <p class="address-text">
          153, EGBEDA - AKOWONJO ROAD, SOBO BUS STOP, AKOWONJO, LAGOS NIGERIA.
        </p>
      </div>
      <div class="phone number">
        <p class="footer-title">call us on</p>
        <p>08025984186, 08078340621</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.the-hills-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 3%;
  padding-bottom: 4%;
  padding-left: 10%;
  padding-right: 10%;
  background-color: var(--cta-accent);
  text-transform: uppercase;
  font-size: toRes(25);
  font-weight: 600;
  color: var(--white);

  ul {
    padding-left: 0;
    li {
      list-style: none;
      margin-bottom: 10px;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}

.footer-logo {
  height: 60px;
  width: 60px;
  cursor: pointer;
}

.footer-title {
  opacity: 0.5;
}

.address-container {
  width: 30%;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
  .the-hills-footer {
    padding-left: 5%;
    padding-right: 5%;
  }
}

@media only screen and (max-width: 768px) {
  .the-hills-footer {
    flex-direction: column;
    padding-top: 5%;
  }
  .address-container {
    width: 100%;
  }
  .footer-logo {
    margin-bottom: 30px;
  }
}
</style>
