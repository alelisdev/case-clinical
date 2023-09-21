import { FieldType } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core'

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexNonAxisChartSeries,
  ApexPlotOptions
} from "ng-apexcharts";
import { FormService } from '../../form.service';
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  template: `
  <div id="chart">
  <apx-chart
  [series]="chartOption.series"
    [chart]="chartOption.chart"
    [plotOptions]="chartOption.plotOptions"
    [labels]="chartOption.labels"
    ></apx-chart>
  </div>
  `,
})
export class UiFormRadialChartComponent extends FieldType implements OnInit {

  chartOption: ChartOptions;
  data: any;
  constructor(private formService: FormService) {
    super()
    this.data = {
      labels: [],
      series: []
    }
  }

  ngOnInit(): void {
    const dataKey = this.to.dataKey;
    if (dataKey) {
      const source = this.formService.getValueForKey(dataKey, this.formState);
      if (!source) {
        console.error(`You have to provide data in formData for '${dataKey}' key`);
      } else if (source instanceof Object) {
        this.data = source;
      } else if (source instanceof Observable) {
        source.forEach(value => { this.data = value; })
      } else {
        console.error(`Invalid data for '${dataKey}'`)
      }
    } else {
      this.data = {
        series: [44, 55, 67, 83],
        labels: [
          "Apples", "Oranges", "Bananas", "Berries"
        ]
      }
    }

    this.chartOption = {
      series: this.data.series,
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px",
              color: 'var(--fuse-text-secondary)'
            },
            total: {
              show: false,
              color: 'var(--fuse-text-secondary)',
              label: "Total",
              formatter: function(w) {
                return "249";
              }
            }
          }
        }
      },
      labels: this.data.labels
    }
  }
}
