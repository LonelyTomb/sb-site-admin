<template>
  <div class="stats-card bg-white">
    <div class="d-flex align-items-center justify-content-between">
      <div>
        <p class="stat-header">{{ item.numeric }}</p>
        <p class="stat-detail">{{ item.title }}</p>
      </div>
      <div>
        <b-img :src="item.icon" fluid />
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
    font-weight: 500;
    opacity: 0.7;
  }
}
</style>
