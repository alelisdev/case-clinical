import { FieldType } from '@ngx-formly/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Observable } from 'rxjs';
import { FormService } from '../../form.service';

@Component({
  template: `
  <div id="chart">
    <apx-chart
      [series]="chartOptions.series"
      [labels]="chartOptions.labels"
      [chart]="chartOptions.chart"
      [dataLabels]="chartOptions.dataLabels"
      [stroke]="chartOptions.stroke"
      [legend]="chartOptions.legend"
      [plotOptions]="chartOptions.plotOptions"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"
      [tooltip]="chartOptions.tooltip"
    ></apx-chart>
  </div>
  `,
})
export class UiFormPolarAreaChartComponent extends FieldType implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: any

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
    } else {
      this.data = {
        series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
        labels: ['web', 'android', 'iPhone', 'Cloud', 'Angular', 'React', 'Vue', 'Next', 'Nest'],
      }
    }

    this.chartOptions = {
      series: this.data.series,
      labels: this.data.labels,
      legend: {
        show: true,
        labels: {
          colors: ['fff']
        }
      },
      chart: {
        type: "polarArea",
        height: 350,
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
