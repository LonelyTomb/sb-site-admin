<template>
  <div
    class="
      investment-card
      d-flex
      align-content-between
      pl-4
      pr-5
      py-4
      flex-column
    "
    :class="{
      matured: investment.isMatured,
    }"
  >
    <p class="mb-5 pb-4 text">
      NGN {{ $formatAsMoney($fromKobo(investment.unit_price)) }} for
      {{ investment.duration }} months @{{ investment.interest_percentage }}%
      ROI
    </p>
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
}
</script>

<style scoped lang="scss">
.investment-card {
  border-radius: toRem(10);
  background: var(--primary);
  max-width: toRes(315);
  color: var(--white);
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
