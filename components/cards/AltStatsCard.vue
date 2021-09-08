<template>
  <div class="stats-card bg-white">
    <div class="">
      <p class="stat-detail mb-3">{{ item.title }}</p>
      <div class="d-flex align-items-center">
        <b-img :src="item.icon" fluid class="mr-2" />
        <p class="stat-detail numeric">{{ item.numeric }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>

<style scoped lang="scss">
.stats-card {
  border-radius: 10px;
  padding: toRem(30);

  .stat-header {
    font-size: toRes(35);
    display: flex;
    gap: 0.5rem;
    align-items: end;
    font-weight: 700;
    // position: relative;
  }

  .stat-change-rate {
    // position: absolute;
    // top: 2%;
    // right: -65%;
    font-weight: 600;
    color: var(--good);
    font-size: toRes(18);
  }

  .negative-stat {
    color: var(--bad);
  }

  .stat-detail {
    margin-bottom: 0;
    font-weight: 400;
    opacity: 0.7;
    &.numeric {
      opacity: 1;
      font-size: toRem(24);
      color: var(--black);
    }
  }
}
</style>
