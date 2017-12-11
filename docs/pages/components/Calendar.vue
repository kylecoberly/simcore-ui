<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <SimCalendar :class="`is-${contextLabel}-context`" :date="date" :dates="user_data" @calendar-day-selected="manageDayControlPanel">

            <div slot="context-controls">
              <SimSwitch v-model="contextSwitch" left-label="Instructor" right-label="Coordinator" />
            </div>

            <div class="local--day" slot="day" slot-scope="props">
              <ul v-if="props.mode === 'week'" class="sim-calendar--grid--day--timelines">
                <li v-for="hour in 25" @dblclick="createTimeBlock(props.date, hour-1)" :class="setHourClasses(hour-1)"></li>
              </ul>
              <!-- <div class="local--day--event-blocks">
                events!
              </div> -->
              <div class="local--day--time-blocks">
                <template v-for="(block, index) in timeBlocks(props.date)">
                  <SimTimeBlock v-if="props.mode == 'week'" :block="block" :index="index" :date="props.date" orientation="y" @remove-time-block="removeTimeBlock" @block-updated="doUpdateStuff" />
                  <SimTimeBlock v-else :block="block" :index="index" orientation="x" :show-controls="false" />
                </template>
              </div>
              <div v-if="isCoordinatorContext && props.mode === 'month'" class="calendar-quadrants--outer">
                <template v-for="quad in density">
                  <SimBubbleTrigger class="calendar-quadrant"
                    :class="{active: shouldBubbleBeOpen && bubbleData.item === quad && date === props.date}"
                    :style="`--percent: ${(quad.percent / 100)}`"
                    :data="{item: quad, dayOfWeek: props.dayOfWeek, date: props.date, x: props.dayOfWeek+1}"
                    ></SimBubbleTrigger>
                </template>
              </div>
            </div>

            <div class="day-control-panel" slot="day-control-panel" slot-scope="props">
              <SimTimePicker v-if="isInstructorContext && props.mode === 'month'" :date="props.date" :blocks="blocks" :should-show-date="true"
                @calendar-day-selected="manageDayControlPanel"
                @all-time-blocks-removed="allTimeBlocksRemoved"
                @time-block-removed="timeBlockRemoved"
                @time-block-created="timeBlockCreated"
                @time-block-updated="doUpdateStuff"
              >
              </SimTimePicker>
            </div>

            <SimBubble v-if="isCoordinatorContext && shouldBubbleBeOpen && props.mode === 'month'"
              slot="day-bubble"
              slot-scope="props"
              >
              <SimSlideDeck :slides="slides"></SimSlideDeck>
            </SimBubble>
          </SimCalendar>

        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html"></code></pre>
        </template>
        <template slot="js">
          <pre><code class="javascript"></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import moment from 'moment'
  import Demobox from '../../utility/Demobox'
  import SimBubble from '../../../components/Bubble'
  import SimBubbleTrigger from '../../../components/BubbleTrigger'
  import SimCalendar from '../../../components/Calendar'
  import SimSlideDeck from '../../../components/SlideDeck'
  import SimSwitch from '../../../components/Switch'
  import SimTimeBlock from '../../../components/TimeBlock'
  import SimTimePicker from '../../../components/TimePicker'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      SimBubble,
      SimBubbleTrigger,
      SimCalendar,
      SimSwitch,
      SimSlideDeck,
      SimTimeBlock,
      SimTimePicker,
    },
    data() {
      return {
        msg: 'TimePicker',
        dateFormat: this.$store.state.calendar_settings.date_format.raw,
        date: this.$store.state.active_date,
        displayDate: moment().format(this.$store.state.calendar_settings.date_format.display),
        current_user_availability: this.$store.state.current_user_data.availability,
        current_user_events: this.$store.state.current_user_data.events,
        density: [
          {
            percent: 100,
            start: 0,
            end: 6
          },
          {
            percent: 35,
            start: 6,
            end: 12
          },
          {
            percent: 65,
            start: 12,
            end: 18
          },
          {
            percent: 10,
            start: 18,
            end: 24
          },
        ],
        stagedData: {},
        blocks: [],
        events: [],
        block: {},
        contextSwitch: true,
        slides: this.$store.state.slides,
      }
    },
    mounted () {
      // window.console.log(this.$store.state.active_date)
    },
    computed: {
      isInstructorContext (){
        return (this.contextSwitch === false)
      },
      isCoordinatorContext (){
        return (this.contextSwitch === true)
      },
      user_data () {
        return this.isInstructorContext ? this.current_user_availability : this.current_user_events
      },
      contextLabel () {
        return this.isInstructorContext ? 'instructor' : 'coordinator'
      },
      bubbleData() {
        return this.$store.state.bubble_data
      },
      shouldBubbleBeOpen() {
        return this.$store.state.bubble_is_open
      },
    },
    methods: {
      setHourClasses (hour) {
        let classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))
        return classes.join(' ')
      },
      setBlockStyles (block) {
        let styles = []
        styles.push(`--start: ${block.start}`)
        styles.push(`--duration: ${block.duration}`)
        return styles.join(';')
      },
      setContext (context) {
        this.context = context
        this.manageDayControlPanel(this.date)
      },

      manageDayControlPanel (date) {
        let dayMoment = moment(date)
        this.displayDate = dayMoment.format('dddd, MMMM Do')
        this.date = dayMoment.format('YYYY-MM-DD')
        this.blocks = this.user_data[this.date] || []
        if(this.blocks.length) {
          this.user_data[this.date] = this.blocks
        }
      },
      allTimeBlocksRemoved (date) {
        delete this.user_data[date]
        this.doUpdateStuff(date)
      },
      createTimeBlock (date, hour) {
        if(this.date === date) {
          let blocks = []
          blocks = this.user_data[date] || []
          blocks.push({start: hour, duration: 1})
          blocks.sort((a, b) => parseFloat(a.start) - parseFloat(b.start))
          this.timeBlockCreated(date, blocks)
        }
      },
      timeBlockCreated (date, blocks) {
        this.user_data[date] = blocks
        this.doUpdateStuff(date)
      },
      removeTimeBlock (index) {
        this.blocks.splice(index, 1)
      },
      timeBlockRemoved (date, blocks) {
        this.user_data[date] = blocks
        this.doUpdateStuff(date)
      },
      timeBlocks(day) {
        return this.user_data[day]
      },
      doUpdateStuff (date) {
          this.stagedData[date] = JSON.parse(JSON.stringify(this.user_data[date]))
          window.console.log('staged data:', this.stagedData)
          // this.postData(this.stagedData) - example of what to do with stuff
          this.$forceUpdate()
      },
    },
  }
</script>

<style lang="scss">
  .sim-calendar .sim-bubble {
    top: -1em;
    bottom: -1em;
    width: 20em;
    &::after {
      top: calc(var(--dink-y) * 1px);
    }
    &--left {
      left: calc(14.285% * var(--x) - 1px);
    }
    &--right {
      left: calc(14.285% * (var(--x) - 1) - 1px);
      transform: translateX(-100%);
    }
    section {
      flex: 1;
      display: flex;
      position: relative;
      overflow: hidden;
    }
    .content {
      flex: 0 0 100%;
      padding: 1em;
      overflow: auto;
      will-change: transform;
      transform: translateX(0%);
      transition: transform .3s ease-out;
    }
    [step="2"] .content {
      transform: translateX(-100%);
    }
    [step="3"] .content {
      transform: translateX(-200%);
    }
    [step="4"] .content {
      transform: translateX(-300%);
    }
  }



  .day-control-panel {
    flex: 1;
    background: var(--picker-bg);
    color: var(--picker-fg);
    position: relative;
  }

  .is-selected .calendar-quadrant {}

  .calendar-quadrants--outer {
    display: flex;
    flex-direction: column;
    width: 20%;
    min-width: 2em;
  }

  .calendar-quadrant {
    position: relative;
    flex: 1;
    border-left: .2em solid #fff;
    box-shadow: -.2em 0 0 0 rgba(0,0,0,.2);
    display: flex;
    &.active {
      &::before {
        content: '';
        position: absolute;
        background: var(--red);
        left: calc(100% * -5 + 1.5em);
        right: .5em;
        top: 0;
        bottom: 0;
        opacity: .15;
        transform: translate(.5em, 0);
      }
    }
    &--inner {}
    &::after {
      content: '';
      flex: 1;
      background: var(--action);
      opacity: var(--percent);
    }
    + .calendar-quadrant {
      margin-top: .2em;
    }
  }

  .local--day {
    position: relative;
    flex: 1;
    display: flex;
    &--event-blocks {
      pointer-events: none;
      position: relative;
      flex: 1;
      > * {
        pointer-events: auto;
      }
    }
    &--time-blocks {
      pointer-events: none;
      position: relative;
      flex: 1;
      > * {
        pointer-events: auto;
      }
    }
  }
  .is-month-view.is-instructor-context .local--day {
    flex-direction: column-reverse;
  }
  .is-coordinator-context .local--day .local--day--time-blocks {
    display: flex;
    justify-content: space-between;
  }

  .sim-calendar {
    --switch-color: var(--lighter-grey);
    --switch-color-active: var(--lighter-grey);
    --switch-handle-color: var(--action);
    .sim-switch input {
      box-shadow: 0 0 0 1px var(--light-grey);
      &::before {
        padding: 1ch;
        color: var(--lightest);
      }
    }
    &.is-week-view {
      .day-control-panel {
        display: none;
      }
      .sim-calendar--grid--day {
        display: flex;
      }
    }
    .is-before-today {
      .sim-calendar--grid--date {
        color: #ddd;
      }
    }
  }
</style>
