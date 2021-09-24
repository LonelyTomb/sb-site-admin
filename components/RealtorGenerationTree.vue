<template>
  <div ref="generation" style="max-height: 600px" />
</template>

<script>
import mitchTree from 'd3-mitch-tree'
import 'd3-mitch-tree/dist/css/d3-mitch-tree.min.css'
import 'd3-mitch-tree/dist/css/d3-mitch-tree-theme-default.min.css'

export default {
  name: 'RealtorGenerationTree',
  props: {
    realtor: {
      required: true,
      default: () => ({}),
      type: Object,
    },
  },
  mounted() {
    this.generateGeneration()
  },
  methods: {
    generateGeneration() {
      const tree = {
        id: this.realtor.id,
        firstname: this.realtor.firstname,
        lastname: this.realtor.lastname,
        name: `${this.realtor.firstname} ${this.realtor.lastname}`,
        description: 'Text',
        realtor_stage:
          (this.realtor.realtor_stage &&
            this.realtor.realtor_stage.replace('_', ' ')) ||
          'N/A',
        downline: this.realtor.downline,
      }
      setTimeout(() => {
        // eslint-disable-next-line
        const treePlugin = new mitchTree.boxedTree()
          .setData(tree)
          .setAllowFocus(false)
          .setAllowZoom(false)
          .setAllowPan(true)
          .setAllowNodeCentering(false)
          .setElement(this.$refs.generation)
          .setMinScale(0.9)
          .setIdAccessor(function (data) {
            return data.id
          })
          .setChildrenAccessor(function (data) {
            return data.downline
          })
          .setBodyDisplayTextAccessor(function (data) {
            return `${data.firstname} ${data.lastname}`
          })
          .setTitleDisplayTextAccessor(function (data) {
            return `${
              (data.realtor_stage && data.realtor_stage.replace('_', ' ')) ||
              'N/A'
            }`
          })
          .initialize()

        const nodes = treePlugin.getNodes()
        nodes.forEach(function (node, index, arr) {
          treePlugin.expand(node)
        })
        treePlugin.update(treePlugin.getRoot())
      }, 2000)
    },
  },
}
</script>

<style scoped></style>
