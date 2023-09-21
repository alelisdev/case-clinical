import { FieldType } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core'

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis
} from "ng-apexcharts";
import { FormService } from '../../form.service';
import { Observable } from 'rxjs';

@Component({
  template: `
  <div id="chart">
  <apx-chart
      [series]="chartOption.series"
      [chart]="chartOption.chart"
      [xaxis]="chartOption.xaxis"
      [stroke]="chartOption.stroke"
      [markers]="chartOption.markers"
      [fill]="chartOption.fill"
      [title]="chartOption.title"
    ></apx-chart>
  </div>
  `,
})
export class UiFormRadarChartComponent extends FieldType implements OnInit {

  chartOption: any;
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
        series: [
          {
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20]
          }
        ],
        labels: [
          "January", "February", "March", "April",
        ]
      }
    }

    this.chartOption = {
      series: this.data.series,
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: this.data.labels
      }
    }
  }
}
