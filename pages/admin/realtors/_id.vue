<template>
  <div class="profile">
    <b-countainer fluid="xxxl">
      <b-row>
        <b-col cols="12" lg="9" class="mt-4"> <div></div> </b-col>
        <b-col cols="12" lg="3" class="mt-4">
          <div class="info">
            <div class="text-center pt-5">
              <b-avatar
                src="https://placekitten.com/300/300"
                size="8rem"
              ></b-avatar>
              <br />
              <b-button class="border border-white b-btn mt-2"
                ><img
                  src="@/assets/images/svg/edit-icon.svg"
                  class="mr-2"
                  alt=""
                />
                Edit</b-button
              >
            </div>
            <div class="bio px-4 py-4">
              <h4 class="mb-3">Bio Data</h4>
              <div class="data">
                <p>
                  <img
                    src="@/assets/images/svg/edit-icon.svg"
                    class="mr-2"
                    alt=""
                  />Micheal Hollah
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/mail-icon.svg"
                    class="mr-2"
                    alt=""
                  />micheahollah@gmail.com
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/phone-icon.svg"
                    class="mr-2"
                    alt=""
                  />09046585049
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/phone-icon.svg"
                    class="mr-2"
                    alt=""
                  />08164748843
                </p>
              </div>
            </div>
            <div class="bio px-4 pb-4">
              <h4 class="mb-3">Next of Kins Data</h4>
              <div class="data">
                <p>
                  <img
                    src="@/assets/images/svg/edit-icon.svg"
                    class="mr-2"
                    alt=""
                  />Micheal Hollah
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/mail-icon.svg"
                    class="mr-2"
                    alt=""
                  />micheahollah@gmail.com
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/phone-icon.svg"
                    class="mr-2"
                    alt=""
                  />09046585049
                </p>
                <p>
                  <img
                    src="@/assets/images/svg/phone-icon.svg"
                    class="mr-2"
                    alt=""
                  />08164748843
                </p>
              </div>
            </div>
            <div class="text-center pb-4">
              <b-button
                class="border border-white bg-dark text-light mt-2 mr-2"
              >
                Send Email</b-button
              >
              <b-button class="border border-white b-btn mt-2"
                >Send Sms</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-countainer>
  </div>
</template>
<script>
export default {
  layout: 'admin',
}
</script>

<style lang="scss" scoped>
.profile {
  .info {
    background: var(--white);
    width: 100%;
    border-radius: 15px;
  }

  .b-btn {
    background-color: rgba(43, 88, 161, 0.08);
    img {
      width: 15px;
      margin-top: -2px;
    }
  }

  .bio {
    h4 {
      font-size: 19px;
      font-weight: 500;
      opacity: 0.7;
    }
    .data {
      p {
        opacity: 0.7;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
}
</style>
