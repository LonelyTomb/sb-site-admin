<template>
  <div
    class="investment-card d-flex justify-content-between px-4 py-4 flex-column"
    :class="{
      matured: investment.isMatured,
    }"
  >
    <div>
      <p class="text">{{ investment.name ? investment.name : '' }}</p>
      <p class="mb-3 pb-4 text">
        {{
          `${
            price
              ? `NGN ${$formatAsMoney($fromKobo(price))}`
              : 'Price not available'
          } for
      ${investment.duration} months @ ${investment.interest_percentage}%
      ROI`
        }}
      </p>
    </div>

    <div class="maturity">
      <small>Maturity Period</small>
      <p>{{ investment.duration }} Months</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Investment',
  props: {
    investment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return this.investment.payment_plans &&
        this.investment.payment_plans.length
        ? this.investment.payment_plans[0].amount_per_unit
        : null
    },
  },
}
</script>

<style scoped lang="scss">
.investment-card {
  border-radius: toRem(10);
  background: var(--primary);
  max-width: toRes(315);
  color: var(--white);
  flex: 1;
  height: 100%;
  &.matured {
    background: var(--secondary);
  }
  .text {
    line-height: toRes(30);
    text-align: left;
    font: {
      size: toRes(20);
      weight: 500;
    }
  }
  .btn {
    box-shadow: 0 0 20px #090d7c1a;
    letter-spacing: toRem(-0.3);
    font: {
      size: toRes(15);
      weight: bold;
    }
  }
}
</style>
