<template lang="">
  <div></div>
</template>
<script>
export default {
  middleware: [
    function ({ redirect }) {
      redirect({ name: 'admin-dashboard' })
    },
  ],
}
</script>
<style></style>
