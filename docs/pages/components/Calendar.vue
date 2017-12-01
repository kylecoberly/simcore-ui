<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <SimCalendar :date="date" :dates="user_dates" @calendar-day-selected="manageDayControlPanel">

            <div slot="day" slot-scope="props" class="user-time-blocks">
              <div v-for="block in timeBlocks(props.day)" :style="setBlockStyles(block)"></div>
            </div>

            <div class="day-control-panel" slot="day-control-panel">
              <SimTimePicker :date="date" :blocks="blocks" :should-show-date="true"
                @calendar-day-selected="manageDayControlPanel"
                @all-time-blocks-removed="allTimeBlocksRemoved"
                @time-block-removed="timeBlockRemoved"
                @time-block-created="timeBlockCreated"
                @time-block-updated="doUpdateStuff"
                >
              </SimTimePicker>
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
  &lt;div v-for="block in timeBlocks(props.day)" :style="setBlockStyles(block)">&lt;/div>
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
  import SimCalendar from '../../../components/Calendar'
  import SimTimePicker from '../../../components/TimePicker'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      SimCalendar,
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
          '2017-11-28': [
            {
              start: 8,
              duration: 3.5
            },
            {
              start: 14,
              duration: 2.5
            }
          ],
          '2017-11-29': [
            {
              start: 8.5,
              duration: 3.5
            },
          ],
        },
        stagedData: {},
        blocks: [],
        block: {},
      }
    },
    methods: {
      manageDayControlPanel (date) {
        let dayMoment = moment(date)
        this.displayDate = dayMoment.format('dddd, MMMM Do')
        this.date = dayMoment.format('YYYY-MM-DD')
        this.blocks = this.user_dates[this.date] || []
        if(this.blocks.length) {
          this.user_dates[this.date] = this.blocks
        }
      },
      allTimeBlocksRemoved (date) {
        delete this.user_dates[date]
        this.doUpdateStuff(date)
      },
      timeBlockCreated (date, blocks) {
        this.user_dates[date] = blocks
        this.doUpdateStuff(date)
      },
      timeBlockRemoved (date, blocks) {
        this.user_dates[date] = blocks
        this.doUpdateStuff(date)
      },
      timeBlocks(day) {
        return this.user_dates[day]
      },
      setBlockStyles (block) {
        let styles = []
        styles.push(`--duration: ${block.duration}`)
        return styles.join(';')
      },
      doUpdateStuff (date) {
          // this.stagedData[date] = this.user_dates[date]
          this.stagedData[date] = JSON.parse(JSON.stringify(this.user_dates[date]))
          window.console.log('staged data:', this.stagedData)
          // this.postData(this.stagedData) - example of what to do with stuff
      },
    },
  }
</script>

<style lang="scss">
  .day-control-panel {
      flex: 1;
      background: var(--picker-bg);
      color: var(--picker-fg);
      box-shadow: var(--lines);
      position: relative;
      overflow: hidden;
  }
  .user-time-blocks {
      display: flex;
      flex-wrap: wrap;
      margin: .25em;
      div {
          padding: .5em .25em;
          margin: .25em;
          width: calc(var(--duration) * 4.1667%);
          background: var(--action);
          border-radius: .2em;
      }
  }
  .sim-calendar {
      &.is-week-view {
          .sim-calendar--grid--day {
              display: flex;
          }
          .user-time-blocks {
              flex: 1;
          }
      }
      .is-before-today {
          .sim-calendar--grid--date {
              color: #ddd;
          }
          .sim-calendar--grid--time-blocks div {
              background: #ddd;
          }
      }
  }
</style>
