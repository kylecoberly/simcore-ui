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
              <!-- <span class="sim-calendar-button" @click="setContext('instructor')" :class="{active: context === 'instructor'}">Instructor</span>
              <span class="sim-calendar-button" @click="setContext('coordinator')" :class="{active: context === 'coordinator'}">Coordinator</span> -->
            </div>

            <div slot="day" slot-scope="props" class="user-day">

              <ul v-if="props.mode === 'week'" class="sim-calendar--grid--day--timelines">
                <li v-for="hour in 25" @dblclick="createTimeBlock(props.day, hour-1)" :class="setHourClasses(hour-1)"></li>
              </ul>

              <!-- <div class="user-event-blocks">
                events!
              </div> -->

              <div class="user-time-blocks">
                <template v-for="(block, index) in timeBlocks(props.day)">
                  <SimTimeBlock v-if="props.mode == 'week'" :block="block" :index="index" :date="props.day" orientation="y" @remove-time-block="removeTimeBlock" @block-updated="doUpdateStuff" />
                  <SimTimeBlock v-else :block="block" :index="index" orientation="x" :show-controls="false" />
                </template>
              </div>

              <div v-if="isCoordinatorContext && props.mode === 'month'" class="calendar-quadrants--outer">
                <div class="calendar-quadrant" v-for="quad in density" :style="`--percent: ${(quad.percent / 100)}`"></div>
              </div>

            </div>

            <div class="day-control-panel" slot="day-control-panel" slot-scope="props">
              <SimTimePicker v-if="isInstructorContext && props.mode === 'month'" :date="date" :blocks="blocks" :should-show-date="true"
                @calendar-day-selected="manageDayControlPanel"
                @all-time-blocks-removed="allTimeBlocksRemoved"
                @time-block-removed="timeBlockRemoved"
                @time-block-created="timeBlockCreated"
                @time-block-updated="doUpdateStuff"
              >
              </SimTimePicker>

              <div class="bubble-boy">
                <div>here's a bubble for this thing</div>
              </div>

            </div>

          </SimCalendar>

          <br />
          <p>Data</p>
          <div class="flex-baseline-around">
            <pre><code class="javascript">{{ date }}</code></pre>
            <pre><code class="javascript">{{ user_dates }}</code></pre>
          </div>

        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;div slot="day" slot-scope="props" class="sim-calendar--grid--time-blocks">
  ...
&lt;/div></code></pre>
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
  import SimSwitch from '../../../components/Switch'
  import SimCalendar from '../../../components/Calendar'
  import SimTimeBlock from '../../../components/TimeBlock'
  import SimTimePicker from '../../../components/TimePicker'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      SimSwitch,
      SimCalendar,
      SimTimeBlock,
      SimTimePicker,
    },
    data() {
      return {
        msg: 'TimePicker',
        dateFormat: 'YYYY-MM-DD',
        date: moment().format('YYYY-MM-DD'),
        displayDate: moment().format('dddd, MMMM Do'),
        weekendDays: [0,6],
        user_dates: {
          '2017-12-04': [
            {
              start: 8,
              duration: 3.5
            },
            {
              start: 14,
              duration: 2.5
            }
          ],
          '2017-12-05': [
            {
              start: 8.5,
              duration: 3.5
            },
          ],
        },
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
        user_events: {},
        blocks: [],
        events: [],
        block: {},
        contextSwitch: false,
      }
    },
    computed: {
      isInstructorContext (){
        return (this.contextSwitch === false)
      },
      isCoordinatorContext (){
        return (this.contextSwitch === true)
      },
      user_data () {
        return this.isInstructorContext ? this.user_dates : this.user_events
      },
      contextLabel () {
        return this.isInstructorContext ? 'instructor' : 'coordinator'
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
  .day-control-panel {
    flex: 1;
    background: var(--picker-bg);
    color: var(--picker-fg);
    position: relative;
  }

  .bubble-boy {
    position: absolute;
    background: var(--dark);
    color: var(--lighter);
  }

  .calendar-quadrants--outer {
    display: flex;
    flex-direction: column;
    width: 20%;
    min-width: 2em;
  }
  .calendar-quadrant {
    flex: 1;
    border-left: .2em solid #fff;
    box-shadow: -.2em 0 0 0 rgba(0,0,0,.2);
    display: flex;
    &--inner {}
    &:after {
      content: '';
      flex: 1;
      background: var(--action);
      opacity: var(--percent);
    }
    + .calendar-quadrant {
      margin-top: .2em;
    }
  }

  .user-day {
    position: relative;
    flex: 1;
    display: flex;
    .user-event-blocks {
      pointer-events: none;
      position: relative;
      flex: 1;
      > * {
        pointer-events: auto;
      }
    }
    .user-time-blocks {
      pointer-events: none;
      position: relative;
      flex: 1;
      > * {
        pointer-events: auto;
      }
    }
  }
  .is-month-view.is-instructor-context .user-day {
    flex-direction: column-reverse;
  }
  .is-coordinator-context .user-day .user-time-blocks {
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
