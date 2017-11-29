<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <SimCalendar :date="date" :dates="user_dates" @calendar-day-clicked="manageDayControlPanel">

            <div slot="day" slot-scope="props" class="sim-calendar--grid--time-blocks">
              <div v-for="block in timeBlocks(props.day)" :style="setBlockStyles(block)"></div>
            </div>

            <div class="day-control-panel" slot="day-control-panel">
              <SimTimePicker :date="date" :blocks="blocks" :should-show-date="true"
                @calendar-day-selected="manageDayControlPanel"
                @all-time-blocks-removed="allTimeBlocksRemoved"
                @time-block-removed="timeBlockRemoved"
                @time-block-created="timeBlockCreated"
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
        blocks: [],
        block: {},
      }
    },
    computed: {
      activeMoment () {
        return moment(this.date)
      },
      activeMonth () {
        return this.activeMoment.month()
      },
      activeYear () {
        return this.activeMoment.year()
      },
    },
    methods: {
      manageDayControlPanel (dateObject) {
        let dayMoment = moment([dateObject.year, dateObject.month-1, dateObject.day])
        this.displayDate = dayMoment.format('dddd, MMMM Do')
        this.date = dayMoment.format('YYYY-MM-DD')
        this.blocks = this.user_dates[this.date] || []
        if(this.blocks.length) {
          this.user_dates[this.date] = this.blocks
        }
      },
      allTimeBlocksRemoved (date) {
        delete this.user_dates[date]
      },
      timeBlockCreated (date, blocks) {
        this.user_dates[date] = blocks
      },
      timeBlockRemoved (date, blocks) {
        this.user_dates[date] = blocks
      },
      timeBlocks(day) {
        let dateOfDay = moment([this.activeYear, this.activeMonth, day]).format(this.dateFormat)
        return this.user_dates[dateOfDay]
      },
      setBlockStyles (block) {
        let styles = []
        styles.push(`--duration: ${block.duration}`)
        return styles.join(';')
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
  }
</style>
