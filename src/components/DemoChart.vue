<script setup lang="ts">
import type {
  Options,
  AxisPointBreakEventCallbackFunction,
  ChartClickEventObject,
  Axis
} from 'highcharts'

// 粗利率 15.7%
const originData = {
  uriagedaka: {
    yosan: 1229528,
    jisseki: 1220000,
  },
  arariekigaku: {
    yosan: 193327,
    jisseki: 200000,
  },
  koteihi: {
    yosan: 160840,
    jisseki: 160000,
  },
  jinkenhi: {
    yosan: 79080,
    jisseki: 80000,
  },
  keijourieki: {
    yosan: 32487,
    jisseki: 40000,
  },
}

const chartOptions: Options = {
  chart: {
    type: 'bar',
    events: {
      render() {
        const chart = this,
          renderer = chart.renderer,
          yAxis = chart.yAxis[0],
          {
            from,
            to
          } = yAxis.brokenAxis.breakArray[0],
          x = (yAxis.toPixels(from) + yAxis.toPixels(to)) / 2,
          y = yAxis.height + chart.plotTop,
          w = 40,
          path = [
            'M', x, y + 50,
            'L', x, 0
          ];

        if (!this.brokenAxisPath) {
          this.brokenAxisPath = renderer.path(path).attr({
            stroke: 'red',
            'stroke-width': 3
          }).add();
        } else {
          this.brokenAxisPath.attr({
            d: path
          })
        }
      }
    }
  },
  title: {
    text: 'July 2024.',
    align: 'left',
  },
  credits: {
    enabled: false,
  },
  subtitle: {
    text: 'April 1, 2023, to July 31, 2023.',
    align: 'left',
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
    x: -20,
    y: -80,
    floating: true,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    shadow: true,
  },
  xAxis: {
    type: 'category',
    categories: ['Revenue', 'Gross profit', 'Fixed costs', 'Personnel expenses', 'Operating profit'],
  },
  yAxis: {
    gridLineWidth: 1,
    labels: {
      formatter: function () {
        const label = this.axis.defaultLabelFormatter.call(this)
        const lastCharacter = label.toString().slice(-1)
        let res: string
        if (lastCharacter === 'k') {
          let num = label.slice(0, -1)
          num = num.replace(/\s/g, '')
          res = (Number(num) * 1000).toLocaleString()
        } else {
          res = Number(label).toLocaleString()
        }
        return res
      },
    },
    title: {
      text: 'Current cash balance',
    },
    lineColor: 'black',
    lineWidth: 1,
    tickColor: '#E0E0E0',
    tickWidth: 1,
    // tickInterval: 25000,
    breaks: [
      {
        from: 250000,
        to: 1150000,
      }
    ],
    // events: {
    //   pointBreak: pointBreakColumn as AxisPointBreakEventCallbackFunction // 2-2
    // }
  },
  series: [
    {
      type: 'bar',
      color: '#F9A825',
      name: 'Cumulative budget',
      data: [
        originData.uriagedaka.yosan,
        originData.arariekigaku.yosan,
        originData.koteihi.yosan,
        originData.jinkenhi.yosan,
        originData.keijourieki.yosan,
      ],
      dataLabels: {
        enabled: true,
        color: 'black',
        inside: true,
        align: 'center',
        formatter: function () {
          const label = (this.y ?? 0).toLocaleString()
          return label
        },
      },
    },
    {
      type: 'bar',
      color: '#66BB6A',
      name: 'Cumulative actuals',
      data: [
        originData.uriagedaka.jisseki,
        originData.arariekigaku.jisseki,
        originData.koteihi.jisseki,
        originData.jinkenhi.jisseki,
        originData.keijourieki.jisseki,
      ],
      dataLabels: {
        enabled: true,
        color: 'black',
        inside: true,
        align: 'center',
        formatter: function () {
          const label = (this.y ?? 0).toLocaleString()
          return label
        },
      },
    },
  ],
}

// const chartOptions: Options = {
//   chart: {
//   type: 'bar',
//     events: {
//       render() {
//         const chart = this,
//           renderer = chart.renderer,
//           yAxis = chart.yAxis[0],
//           {
//             from,
//             to
//           } = yAxis.brokenAxis.breakArray[0],
//           x = (yAxis.toPixels(from) + yAxis.toPixels(to)) / 2,
//           y = yAxis.height + chart.plotTop,
//           w = 40,
//           path = [
//             'M', x, y + 50,
//             'L', x, 20
//           ];

//         if (!this.brokenAxisPath) {
//           this.brokenAxisPath = renderer.path(path).attr({
//             stroke: 'red',
//             'stroke-width': 3
//           }).add();
//         } else {
//           this.brokenAxisPath.attr({
//             d: path
//           })
//         }

//       }
//     }
//   },
//   yAxis: {
//     tickInterval: 1,
//     breaks: [{
//       from: 5,
//       to: 10,
//       breakSize: 0.5
//     }]
//   },
//   series: [{
//     type: 'bar',
//     gapSize: 1,
//     data: (function() {
//       const data = [];
//       for (let i = 0; i < 20; i = i + 1) {
//         data.push(i);
//       }
//       return data;
//     }())
//   }]
// }

/**
 * On top of each column, draw a zigzag line where the axis break is.
 */
// function pointBreakColumn(this: Axis, e: ChartClickEventObject): void {
//   const point = e.point, // 2-3
//     brk = e.brk, // 2-4
//     shapeArgs = point.shapeArgs,
//     shapeArgsX = shapeArgs.x,
//     shapeArgsY = this.translate(brk.from, 0, 1, 0, 1), // 2-5
//     shapeArgsWidth = shapeArgs.width,
//     key = ['brk', brk.from, brk.to],
//     path = [
//       'M',
//       shapeArgsX,
//       shapeArgsY,
//       'L',
//       shapeArgsX + shapeArgsWidth * 0.25,
//       shapeArgsY + 3,
//       'L',
//       shapeArgsX + shapeArgsWidth * 0.75,
//       shapeArgsY - 3,
//       'L',
//       shapeArgsX + shapeArgsWidth,
//       shapeArgsY
//     ]

//   if (!point[key]) {
//     point[key] = this.chart.renderer
//       .path(path)
//       .attr({
//         'stroke-width': 4,
//         stroke: point.series.options.borderColor
//       })
//       .add(point.graphic.parentGroup)
//   } else {
//     point[key].attr({
//       d: path
//     })
//   }
// }
</script>

<template>
  <highcharts :options="chartOptions" style="width: 80vw; height: 80vh"></highcharts>
</template>

<style scoped></style>
