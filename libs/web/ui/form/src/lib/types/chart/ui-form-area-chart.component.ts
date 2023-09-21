import { Component } from '@angular/core'
import * as moment from 'moment';
import { ChartFieldTypeComponent, CubeSeries, ChartData } from './chart-field-type.component';

const sampleData= [
  {
    name: 'Visitors',
    data: [
      {
        x: moment().subtract(12, 'months').day(1).toDate(),
        y: 4884
      },
      {
        x: moment().subtract(12, 'months').day(4).toDate(),
        y: 5351
      },
      {
        x: moment().subtract(12, 'months').day(7).toDate(),
        y: 5293
      },
      {
        x: moment().subtract(12, 'months').day(10).toDate(),
        y: 4908
      },
      {
        x: moment().subtract(12, 'months').day(13).toDate(),
        y: 5027
      },
      {
        x: moment().subtract(12, 'months').day(16).toDate(),
        y: 4837
      },
      {
        x: moment().subtract(12, 'months').day(19).toDate(),
        y: 4484
      },
      {
        x: moment().subtract(12, 'months').day(22).toDate(),
        y: 4071
      },
      {
        x: moment().subtract(12, 'months').day(25).toDate(),
        y: 4124
      },
      {
        x: moment().subtract(12, 'months').day(28).toDate(),
        y: 4563
      },
      {
        x: moment().subtract(11, 'months').day(1).toDate(),
        y: 3820
      },
      {
        x: moment().subtract(11, 'months').day(4).toDate(),
        y: 3968
      },
      {
        x: moment().subtract(11, 'months').day(7).toDate(),
        y: 4102
      },
      {
        x: moment().subtract(11, 'months').day(10).toDate(),
        y: 3941
      },
      {
        x: moment().subtract(11, 'months').day(13).toDate(),
        y: 3566
      },
      {
        x: moment().subtract(11, 'months').day(16).toDate(),
        y: 3853
      },
      {
        x: moment().subtract(11, 'months').day(19).toDate(),
        y: 3853
      },
      {
        x: moment().subtract(11, 'months').day(22).toDate(),
        y: 4069
      },
      {
        x: moment().subtract(11, 'months').day(25).toDate(),
        y: 3879
      },
      {
        x: moment().subtract(11, 'months').day(28).toDate(),
        y: 4298
      },
      {
        x: moment().subtract(10, 'months').day(1).toDate(),
        y: 4355
      },
      {
        x: moment().subtract(10, 'months').day(4).toDate(),
        y: 4065
      },
      {
        x: moment().subtract(10, 'months').day(7).toDate(),
        y: 3650
      },
      {
        x: moment().subtract(10, 'months').day(10).toDate(),
        y: 3379
      },
      {
        x: moment().subtract(10, 'months').day(13).toDate(),
        y: 3191
      },
      {
        x: moment().subtract(10, 'months').day(16).toDate(),
        y: 2968
      },
      {
        x: moment().subtract(10, 'months').day(19).toDate(),
        y: 2957
      },
      {
        x: moment().subtract(10, 'months').day(22).toDate(),
        y: 3313
      },
      {
        x: moment().subtract(10, 'months').day(25).toDate(),
        y: 3708
      },
      {
        x: moment().subtract(10, 'months').day(28).toDate(),
        y: 3586
      },
      {
        x: moment().subtract(9, 'months').day(1).toDate(),
        y: 3965
      },
      {
        x: moment().subtract(9, 'months').day(4).toDate(),
        y: 3901
      },
      {
        x: moment().subtract(9, 'months').day(7).toDate(),
        y: 3410
      },
      {
        x: moment().subtract(9, 'months').day(10).toDate(),
        y: 3748
      },
      {
        x: moment().subtract(9, 'months').day(13).toDate(),
        y: 3929
      },
      {
        x: moment().subtract(9, 'months').day(16).toDate(),
        y: 3846
      },
      {
        x: moment().subtract(9, 'months').day(19).toDate(),
        y: 3771
      },
      {
        x: moment().subtract(9, 'months').day(22).toDate(),
        y: 4015
      },
      {
        x: moment().subtract(9, 'months').day(25).toDate(),
        y: 3589
      },
      {
        x: moment().subtract(9, 'months').day(28).toDate(),
        y: 3150
      },
      {
        x: moment().subtract(8, 'months').day(1).toDate(),
        y: 3050
      },
      {
        x: moment().subtract(8, 'months').day(4).toDate(),
        y: 2574
      },
      {
        x: moment().subtract(8, 'months').day(7).toDate(),
        y: 2823
      },
      {
        x: moment().subtract(8, 'months').day(10).toDate(),
        y: 2848
      },
      {
        x: moment().subtract(8, 'months').day(13).toDate(),
        y: 3000
      },
      {
        x: moment().subtract(8, 'months').day(16).toDate(),
        y: 3216
      },
      {
        x: moment().subtract(8, 'months').day(19).toDate(),
        y: 3299
      },
      {
        x: moment().subtract(8, 'months').day(22).toDate(),
        y: 3768
      },
      {
        x: moment().subtract(8, 'months').day(25).toDate(),
        y: 3524
      },
      {
        x: moment().subtract(8, 'months').day(28).toDate(),
        y: 3918
      },
      {
        x: moment().subtract(7, 'months').day(1).toDate(),
        y: 4145
      },
      {
        x: moment().subtract(7, 'months').day(4).toDate(),
        y: 4378
      },
      {
        x: moment().subtract(7, 'months').day(7).toDate(),
        y: 3941
      },
      {
        x: moment().subtract(7, 'months').day(10).toDate(),
        y: 3932
      },
      {
        x: moment().subtract(7, 'months').day(13).toDate(),
        y: 4380
      },
      {
        x: moment().subtract(7, 'months').day(16).toDate(),
        y: 4243
      },
      {
        x: moment().subtract(7, 'months').day(19).toDate(),
        y: 4367
      },
      {
        x: moment().subtract(7, 'months').day(22).toDate(),
        y: 3879
      },
      {
        x: moment().subtract(7, 'months').day(25).toDate(),
        y: 4357
      },
      {
        x: moment().subtract(7, 'months').day(28).toDate(),
        y: 4181
      },
      {
        x: moment().subtract(6, 'months').day(1).toDate(),
        y: 4619
      },
      {
        x: moment().subtract(6, 'months').day(4).toDate(),
        y: 4769
      },
      {
        x: moment().subtract(6, 'months').day(7).toDate(),
        y: 4901
      },
      {
        x: moment().subtract(6, 'months').day(10).toDate(),
        y: 4640
      },
      {
        x: moment().subtract(6, 'months').day(13).toDate(),
        y: 5128
      },
      {
        x: moment().subtract(6, 'months').day(16).toDate(),
        y: 5015
      },
      {
        x: moment().subtract(6, 'months').day(19).toDate(),
        y: 5360
      },
      {
        x: moment().subtract(6, 'months').day(22).toDate(),
        y: 5608
      },
      {
        x: moment().subtract(6, 'months').day(25).toDate(),
        y: 5272
      },
      {
        x: moment().subtract(6, 'months').day(28).toDate(),
        y: 5660
      },
      {
        x: moment().subtract(5, 'months').day(1).toDate(),
        y: 5836
      },
      {
        x: moment().subtract(5, 'months').day(4).toDate(),
        y: 5659
      },
      {
        x: moment().subtract(5, 'months').day(7).toDate(),
        y: 5575
      },
      {
        x: moment().subtract(5, 'months').day(10).toDate(),
        y: 5474
      },
      {
        x: moment().subtract(5, 'months').day(13).toDate(),
        y: 5427
      },
      {
        x: moment().subtract(5, 'months').day(16).toDate(),
        y: 5865
      },
      {
        x: moment().subtract(5, 'months').day(19).toDate(),
        y: 5700
      },
      {
        x: moment().subtract(5, 'months').day(22).toDate(),
        y: 6052
      },
      {
        x: moment().subtract(5, 'months').day(25).toDate(),
        y: 5760
      },
      {
        x: moment().subtract(5, 'months').day(28).toDate(),
        y: 5648
      },
      {
        x: moment().subtract(4, 'months').day(1).toDate(),
        y: 5435
      },
      {
        x: moment().subtract(4, 'months').day(4).toDate(),
        y: 5239
      },
      {
        x: moment().subtract(4, 'months').day(7).toDate(),
        y: 5452
      },
      {
        x: moment().subtract(4, 'months').day(10).toDate(),
        y: 5416
      },
      {
        x: moment().subtract(4, 'months').day(13).toDate(),
        y: 5195
      },
      {
        x: moment().subtract(4, 'months').day(16).toDate(),
        y: 5119
      },
      {
        x: moment().subtract(4, 'months').day(19).toDate(),
        y: 4635
      },
      {
        x: moment().subtract(4, 'months').day(22).toDate(),
        y: 4833
      },
      {
        x: moment().subtract(4, 'months').day(25).toDate(),
        y: 4584
      },
      {
        x: moment().subtract(4, 'months').day(28).toDate(),
        y: 4822
      },
      {
        x: moment().subtract(3, 'months').day(1).toDate(),
        y: 4582
      },
      {
        x: moment().subtract(3, 'months').day(4).toDate(),
        y: 4348
      },
      {
        x: moment().subtract(3, 'months').day(7).toDate(),
        y: 4132
      },
      {
        x: moment().subtract(3, 'months').day(10).toDate(),
        y: 4099
      },
      {
        x: moment().subtract(3, 'months').day(13).toDate(),
        y: 3849
      },
      {
        x: moment().subtract(3, 'months').day(16).toDate(),
        y: 4010
      },
      {
        x: moment().subtract(3, 'months').day(19).toDate(),
        y: 4486
      },
      {
        x: moment().subtract(3, 'months').day(22).toDate(),
        y: 4403
      },
      {
        x: moment().subtract(3, 'months').day(25).toDate(),
        y: 4141
      },
      {
        x: moment().subtract(3, 'months').day(28).toDate(),
        y: 3780
      },
      {
        x: moment().subtract(2, 'months').day(1).toDate(),
        y: 3524
      },
      {
        x: moment().subtract(2, 'months').day(4).toDate(),
        y: 3212
      },
      {
        x: moment().subtract(2, 'months').day(7).toDate(),
        y: 3568
      },
      {
        x: moment().subtract(2, 'months').day(10).toDate(),
        y: 3800
      },
      {
        x: moment().subtract(2, 'months').day(13).toDate(),
        y: 3796
      },
      {
        x: moment().subtract(2, 'months').day(16).toDate(),
        y: 3870
      },
      {
        x: moment().subtract(2, 'months').day(19).toDate(),
        y: 3745
      },
      {
        x: moment().subtract(2, 'months').day(22).toDate(),
        y: 3751
      },
      {
        x: moment().subtract(2, 'months').day(25).toDate(),
        y: 3310
      },
      {
        x: moment().subtract(2, 'months').day(28).toDate(),
        y: 3509
      },
      {
        x: moment().subtract(1, 'months').day(1).toDate(),
        y: 3187
      },
      {
        x: moment().subtract(1, 'months').day(4).toDate(),
        y: 2918
      },
      {
        x: moment().subtract(1, 'months').day(7).toDate(),
        y: 3191
      },
      {
        x: moment().subtract(1, 'months').day(10).toDate(),
        y: 3437
      },
      {
        x: moment().subtract(1, 'months').day(13).toDate(),
        y: 3291
      },
      {
        x: moment().subtract(1, 'months').day(16).toDate(),
        y: 3317
      },
      {
        x: moment().subtract(1, 'months').day(19).toDate(),
        y: 3716
      },
      {
        x: moment().subtract(1, 'months').day(22).toDate(),
        y: 3260
      },
      {
        x: moment().subtract(1, 'months').day(25).toDate(),
        y: 3694
      },
      {
        x: moment().subtract(1, 'months').day(28).toDate(),
        y: 3598
      }
    ]
  }
]

@Component({
  template: `
  <div class="flex flex-col flex-auto h-90">
    <apx-chart
      class="flex-auto w-full h-full"
      [chart]="chartOptions.chart"
      [colors]="chartOptions.colors"
      [dataLabels]="chartOptions.dataLabels"
      [fill]="chartOptions.fill"
      [grid]="chartOptions.grid"
      [series]="series ?? []"
      [legend]="chartOptions.legend"
      [stroke]="chartOptions.stroke"
      [tooltip]="chartOptions.tooltip"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"></apx-chart>
    </div>
  `,
})
export class UiFormAreaChartComponent extends ChartFieldTypeComponent {
  series = []

  setChartData(data: ChartData) {
    this.series = data.series;
  }

  mapCubeSeries(cubeSeries: [CubeSeries]): ChartData {
    return {
      series: cubeSeries.map(el => ({
        name: el.title,
        data: el.series.map((childSeries) => ({
          x: childSeries.x,
          y: childSeries.value
        }))
      }))
    };
  }

  getSampleData(): ChartData {
    return {series: sampleData};
  }

  getChartOptions() {
    return {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        height: '100%',
        type: 'area',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#818CF8'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true
      },
      fill: {
        colors: ['#312E81']
      },
      grid: {
        show: true,
        borderColor: '#334155',
        padding: {
          top: 10,
          bottom: -40,
          left: 0,
          right: 0
        },
        position: 'back',
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      stroke: {
        width: 2
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        x: {
          format: 'MMM dd, yyyy'
        },
        y: {
          formatter: (value: number): string => `${value}`
        }
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          stroke: {
            color: '#475569',
            dashArray: 0,
            width: 2
          }
        },
        labels: {
          offsetY: -20,
          style: {
            colors: '#CBD5E1'
          }
        },
        tickAmount: 1,
        tooltip: {
          enabled: false
        },
        type: 'datetime'
      },
      yaxis: {
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        },
        min: (min): number => min - 2,
        max: (max): number => max + 2,
        tickAmount: 1,
        show: false
      }
    };
  }
}
