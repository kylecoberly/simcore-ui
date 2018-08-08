<template>
  <TimeBlock theme="available" :class="blockClasses" :style="blockStyles">
    <RemoverControl @click.native.stop="$emit('removeTimeBlock')" />
    <StretchHandle direction="up" @mousedown.native="startStretchUp" />
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <StretchHandle direction="down" @mousedown.native="startStretchDown" />
    <TimeBlockLabel :startTime="block.startTime" :duration="block.duration" />
  </TimeBlock>
</template>

<script>
  import TimeBlock from './TimeBlock'
  import RemoverControl from './RemoverControl'
  import StretchHandle from './StretchHandle'
  import TimeBlockLabel from './TimeBlockLabel'

  import dragAndDroppable from '../mixins/drag-drop-block'
  import stretchUppable from '../mixins/stretch-up-block'
  import stretchDownable from '../mixins/stretch-down-block'

  export default {
    components: {
      TimeBlock,
      RemoverControl,
      StretchHandle,
      TimeBlockLabel,
    },
    extends: TimeBlock,
    mixins: [dragAndDroppable, stretchUppable, stretchDownable],
    props: {
      block: Object,
    },
    computed: {
      blockClasses() {
        const classes = {
          'is-moveable': true,
          'is-moving': this.isMoving,
          'is-stretching': this.stretchDirection,
        }
        classes[`is-stretching--${this.stretchDirection}`] = this.stretchDirection
        return classes
      },
      blockStyles() {
        const styles = []

        styles.push(`--start: ${this.block.startTime}`)
        styles.push(`--duration: ${this.block.duration}`)
        if (this.maximumDuration < 24) {
          styles.push(`--segment-size: ${this.segmentSize}`)
        }

        return styles.join(';')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timeblock';
</style>
