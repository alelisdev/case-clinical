import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { FormService } from '../../form.service';
import { Observable } from 'rxjs';

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
        [labels]="apexOption.labels"
        [legend]="apexOption.legend"
        [plotOptions]="apexOption.plotOptions"
        [series]="apexOption.series"
        [states]="apexOption.states"
        [stroke]="apexOption.stroke"
        [tooltip]="apexOption.tooltip"
        [xaxis]="apexOption.xaxis"
        [yaxis]="apexOption.yaxis"
      ></apx-chart>
    </div>
  `,
})
export class UiFormChartComponent extends FieldType implements OnInit {

  formControl!: FormControl

  apexOption: any;
  data = {
    labels: [],
    series: []
  }

  constructor(private formService: FormService) {
    super()
  }

  ngOnInit(): void {
    const dataKey = this.to.dataKey;
    if(dataKey) {
      const source = this.formService.getValueForKey(dataKey, this.formState);
      if(!source) {
        console.error(`You have to provide data in formData for '${dataKey}' key`);
      } else if(source instanceof Object) {
        this.data = source;
      } else if(source instanceof Observable) {
        source.forEach(value => { this.data = value; })
      } else {
        console.error(`Invalid data for '${dataKey}'`)
      }
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
      labels: this.data.labels,
      legend: {
        show: false
      },
      series: this.data.series,
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
