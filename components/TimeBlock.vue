<template lang="html">
  <div :class="setClass()" :style="setStyle(block)">
    <div class="sim-timeblock--remover" @click="removeTimeBlock">
      <SimIconText icon="fa-times fa-fw"></SimIconText>
    </div>
    <div class="sim-timeblock--handle sim-timeblock--handle--left" @mousedown="startStretchLeft"></div>
    <div class="sim-timeblock--handle sim-timeblock--handle--right" @mousedown="startStretchRight"></div>
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <div class="sim-timeblock--time">{{ displayBlockTime() }}</div>
  </div>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'

  const _zeroPad = function(num, pads) {
    pads = pads || '000'
    return (pads + num).substr(-2)
  }

  const _cap = function(num, width, min, max) {
    return num = (num < min ? min : (num > max - width ? max - width : num))
  }

  const _setProperty = function(element, property, value) {
    element.style.setProperty(`--${property}`, value)
  }
  const _getProperty = function(element, property) {
    return element.style.getPropertyValue(`--${property}`)
  }

  const _metrics = function (element) {
    const blockMetrics = element.getBoundingClientRect()
    const pickerMetrics = element.parentElement.getBoundingClientRect()

    return {
      start_x: window.event.clientX,
      width_x: blockMetrics.width,
      offset_x: blockMetrics.x,
      max_width: pickerMetrics.width,
      offset_parent_x: pickerMetrics.x,
      segment_width: pickerMetrics.width / 48,
      dur: parseFloat(_getProperty(element, 'duration')),
      start: parseFloat(_getProperty(element, 'start')),
    }
  }

  export default {
    name: 'sim-timeblock',
    components: {
      SimIconText,
    },
    props: {
      block: {
        type: Object,
        default: {},
      },
      index: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        isMoving: false,
        isStretching: false,
        isStretchingLeft: false,
        isStretchingRight: false,
      }
    },
    mounted () {
    },
    methods: {
      setStyle (block) {
        let styles = []
        styles.push(`--start: ${block.start}`)
        styles.push(`--duration: ${block.duration}`)
        return styles.join(';')
      },
      setClass () {
        let classes = ['sim-timeblock sim-timeblock-' + this.index]
        if(this.block.loading) {
          classes.push('is-loading')
        }
        if(this.isMoving) {
          classes.push('is-moving')
        }
        if(this.isStretching || this.block.stretching) {
          classes.push('is-stretching')
          if(this.isStretching === 'left') {
            classes.push('is-stretching--left')
          } else if(this.isStretching === 'right') {
            classes.push('is-stretching--right')
          }
        }
        return classes.join(' ')
      },
      displayBlockTime () {
        let total = this.block.duration
        let output = total.toString().replace(/\.5/, '½').replace(/^0/, '') || 0
        let hours = `${output} ${(total > 0 && total <= 1 ? 'hour' : 'hours')}`
        let times = hours

        if(this.isMoving || this.isStretching) {
          let day = moment().startOf('day')
          let start = day.add(this.block.start, 'hours').format('h:mma')
          let end =  day.add(this.block.duration, 'hours').format('h:mma')
          times = `${start.replace(':00','')} — ${end.replace(':00','')} (${hours})`
        }

        return times
      },
      removeTimeBlock () {
        this.$emit('remove-time-block', this.index)
      },
      // ----------
      move () {
        let x = _cap((this.metrics.offset_x + window.event.clientX - this.metrics.start_x - this.metrics.offset_parent_x), this.metrics.width_x, 0, this.metrics.max_width)
        this.block.start = Math.round(x/this.metrics.segment_width)/2
        _setProperty(this.$el, 'start', this.block.start)
      },
      doneMoving () {
        this.isMoving = false
        this.$emit('is-moving', false)
        this.$emit('block-updated')
        removeEventListener('mousemove', this.move)
        removeEventListener('mouseup', this.startMove)
      },
      startMove () {
        event.preventDefault()
        event.stopPropagation()
        this.isMoving = true
        this.metrics = _metrics(this.$el)
        this.$emit('is-moving', true)
        addEventListener('mousemove', this.move)
        addEventListener('mouseup', this.doneMoving)
      },
      // ----------
      stretchRight () {
        let dur = Math.round((this.metrics.width_x + window.event.clientX - this.metrics.start_x)/this.metrics.segment_width)/2
        this.block.duration = _cap(dur, 0, 0.5, 24 - this.block.start)
        _setProperty(this.$el, 'duration', this.block.duration)
      },
      doneStretchingRight () {
        this.isStretching = false
        this.$emit('is-stretching', false)
        removeEventListener('mousemove', this.stretchRight)
        removeEventListener('mouseup', this.startStretchRight)
      },
      startStretchRight () {
        event.preventDefault()
        event.stopPropagation()
        this.isStretching = 'right'
        this.metrics = _metrics(this.$el)
        this.$emit('is-stretching', true)
        addEventListener('mousemove', this.stretchRight)
        addEventListener('mouseup', this.doneStretchingRight)
      },
      // ----------
      stretchLeft () {
        let start = Math.floor((this.metrics.offset_x + window.event.clientX - this.metrics.start_x - this.metrics.offset_parent_x)/this.metrics.segment_width)/2
        let dur = this.metrics.dur - Math.floor((window.event.clientX - this.metrics.start_x)/this.metrics.segment_width)/2
        this.block.start = _cap(start, 0, 0, (this.metrics.start + this.metrics.dur - 0.5))
        this.block.duration = _cap(dur, 0, 0.5, (start < 0 ? this.block.duration : 24))
        _setProperty(this.$el, 'start', this.block.start)
        _setProperty(this.$el, 'duration', this.block.duration)
      },
      doneStretchingLeft () {
        this.isStretching = false
        this.$emit('is-stretching', false)
        removeEventListener('mousemove', this.stretchLeft)
        removeEventListener('mouseup', this.startStretchLeft)
      },
      startStretchLeft () {
        event.preventDefault()
        event.stopPropagation()
        this.isStretching = 'left'
        this.metrics = _metrics(this.$el)
        this.$emit('is-stretching', true)
        addEventListener('mousemove', this.stretchLeft)
        addEventListener('mouseup', this.doneStretchingLeft)
      },
    },
  }
</script>
