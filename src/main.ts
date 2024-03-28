import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import brokenAxis from 'highcharts/modules/broken-axis'
brokenAxis(Highcharts)

/**
 * Extend the Axis.getLinePath method in order to visualize breaks with two
 * parallel slanted lines. For each break, the slanted lines are inserted into
 * the line path.
 */
Highcharts.wrap(Highcharts.Axis.prototype, 'getLinePath', function (this: Highcharts.Axis, proceed, lineWidth) {
  const axis = this,
    brokenAxisModule = axis.options.breaks, // 2-1
    path = proceed.call(this, lineWidth),
    start = path[0]

  let x = start[1],
    y = start[2]

  ;(brokenAxisModule || []).forEach(function test(brk: any) {
    if (axis.horiz) {
      x = axis.toPixels(brk.from, false)
      path.splice(
        1,
        0,
        ['L', x - 4, y], // stop
        ['M', x - 9, y + 5],
        ['L', x + 1, y - 5], // left slanted line
        ['M', x - 1, y + 5],
        ['L', x + 9, y - 5], // higher slanted line
        ['M', x + 4, y],
      )
    } else {
      y = axis.toPixels(brk.from, false)
      path.splice(
        1,
        0,
        ['L', x, y - 4], // stop
        ['M', x + 5, y - 9],
        ['L', x - 5, y + 1], // lower slanted line
        ['M', x + 5, y - 1],
        ['L', x - 5, y + 9], // higher slanted line
        ['M', x, y + 4],
      )
    }
  })
  return path
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(HighchartsVue)

app.mount('#app')
