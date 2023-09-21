import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { FormService } from '../../form.service';
import { Observable } from 'rxjs';
import { ChartData, ChartFieldTypeComponent, CubeSeries } from './chart-field-type.component';

@Component({
  styles: [
    `
      :host {
        height: 400px !important;
        width: 100%;
        background-color: red;
      }
    `
  ],
  template: `
  <div class="flex flex-col flex-auto">
      <apx-chart
        class="flex-auto w-full h-90"
        [chart]="apexOption.chart"
        [colors]="apexOption.colors"
        [dataLabels]="apexOption.dataLabels"
        [grid]="apexOption.grid"
        [labels]="data.labels"
        [legend]="apexOption.legend"
        [plotOptions]="apexOption.plotOptions"
        [series]="data.series"
        [states]="apexOption.states"
        [stroke]="apexOption.stroke"
        [tooltip]="apexOption.tooltip"
        [xaxis]="apexOption.xaxis"
        [yaxis]="apexOption.yaxis"
      ></apx-chart>
    </div>
  `,
})
export class UiFormLineChartComponent extends ChartFieldTypeComponent implements OnInit {


  apexOption: any;
  data = {
    labels: [],
    series: []
  }

  setChartData(data: ChartData) {
    this.data = {
      series: data.series,
      labels: data.labels
    }
  }

  getSampleData(): ChartData {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: 'New issues',
          data: [42, 28, 43, 34, 20, 25, 22]
        },
        {
          name: 'Closed issues',
          data: [11, 10, 8, 11, 8, 10, 17]
        }
      ]
    }
  }
  getChartOptions() {
    return {}
  }
  mapCubeSeries(cubeSeries: [CubeSeries]): ChartData {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: 'New issues',
          data: [42, 28, 43, 34, 20, 25, 22]
        },
        {
          name: 'Closed issues',
          data: [11, 10, 8, 11, 8, 10, 17]
        }
      ]
    }
  }


  ngOnInit(): void {
    super.ngOnInit()
    this.data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: 'New issues',
          data: [42, 28, 43, 34, 20, 25, 22]
        },
        {
          name: 'Closed issues',
          data: [11, 10, 8, 11, 8, 10, 17]
        }
      ]
    }
    this.apexOption = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#64748B', '#94A3B8'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1],
        background: {
          borderWidth: 0
        }
      },
      grid: {
        borderColor: 'var(--fuse-border)'
      },
      legend: {
        show: false
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75
          }
        }
      },
      stroke: {
        width: [3, 3]
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      }
    };
  }
}
