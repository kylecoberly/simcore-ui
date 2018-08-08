<template>
  <TimeBlock theme="pending-event" class="is-moveable" :style="blockStyles">
    <RemoverControl @click.native.stop="$emit('clearPendingEvent')" />
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <TimeBlockLabel :startTime="block.startTime" :duration="block.duration" />
  </TimeBlock>
</template>

<script>
  import TimeBlock from './TimeBlock'
  import RemoverControl from './RemoverControl'
  import TimeBlockLabel from './TimeBlockLabel'

  import dragAndDroppable from '../mixins/drag-drop-block'

  export default {
    extends: TimeBlock,
    mixins: [dragAndDroppable],
    components: {
      TimeBlock,
      RemoverControl,
      TimeBlockLabel,
    },
    props: {
      block: Object,
    },
    computed: {
      blockStyles() {
        const styles = []

        styles.push(`--start: ${this.block.startTime - this.timeShiftOffset}`)
        styles.push(`--duration: ${this.block.duration}`)
        if (this.maximumDuration < 24) {
          styles.push(`--segment-size: ${this.segmentSize}`)
        }

        return styles.join(';')
      },
    },
    mounted() {
      this.updatePosition()
    },
    methods: {
      updatePendingEvent(block) {
        this.$emit('updatePendingEvent', block)
      },
      updatePosition() {
        this.$emit('updatePosition', {
          domPosition: this.$el.getBoundingClientRect(),
          offset: {
            x: 0,
            y: 0,
          },
        })
      },
    },
  }
</script>
