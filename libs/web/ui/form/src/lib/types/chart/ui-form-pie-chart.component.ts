import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { FormService } from '../../form.service';
import { shuffle } from 'lodash';

@Component({
  styles: [
    `
      :host {
        width: 100%;
        background-color: red;
      }
    `
  ],
  template: `
    <div class="flex flex-col flex-auto mt-6 h-44">
      <apx-chart
        *ngIf="chartOption"
        class="flex flex-auto items-center justify-center w-full h-full"
        [chart]="chartOption.chart"
        [colors]="chartOption.colors"
        [labels]="chartOption.labels"
        [plotOptions]="chartOption.plotOptions"
        [series]="chartOption.series"
        [states]="chartOption.states"
        [tooltip]="chartOption.tooltip"></apx-chart>
    </div>
  `,
})
export class UiFormPieChartComponent extends FieldType implements OnInit, OnDestroy {
  private unsubsribeAll = new Subject();

  formControl!: FormControl

  chartOption: any;
  data: any;

  immutableColors = ['#319795', '#4FD1C5', '#DD6B20', '#F6AD55', '#3182CE', '#63B3ED', '#805AD5', '#B794F4']
  colors = []

  constructor(private formService: FormService) {
    super();
    this.colors = shuffle(this.immutableColors);
  }

  ngOnDestroy(): void {
    this.unsubsribeAll.next(null);
    this.unsubsribeAll.complete();
  }

  ngOnInit(): void {
    // First get data from formState using dataKey;
    console.log('ngoninit......')
    const dataKey = this.to.dataKey;
    if (this.to.data && this.to.data.length > 0) {
      console.log('This.to.data', this.to.data)
      this.data = this.to.data;
      this.generateChartOption();
    } else if (dataKey) {
      console.log('datakey', dataKey)
      const source = this.formService.getValueForKey(dataKey, this.formState);
      if (!source) {
        console.error(`You have to provide data in formData for ${dataKey} key`);
      } else if (source instanceof Object) {
        this.data = source;
        this.generateChartOption();
      } else if (source instanceof Observable) {
        source.pipe(takeUntil(this.unsubsribeAll)).subscribe(data => {
          this.data = data;
          this.generateChartOption();
        })
      } else {
        console.error('Invalid data type for pie chart');
      }
    } else {
      this.data = [
        {
          label: 'Male',
          value: 55,
        },
        {
          label: 'Female',
          value: 45,
        }
      ]
      this.generateChartOption();
    }
  }

  generateChartOption() {
    if (!this.data)
      return null;

    console.log(this.data)

    const labels = this.data.map((el) => el.label)
    const series = this.data.map((el) => el.value)

    console.log({ labels, series })

    this.chartOption = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },
        legend: {
          show: true
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      colors: this.colors,
      labels: labels,
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%'
          }
        }
      },
      series: series,
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({
          seriesIndex,
          w
        }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                               <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                               <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                               <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                           </div>`
      }
    };
  }
}
