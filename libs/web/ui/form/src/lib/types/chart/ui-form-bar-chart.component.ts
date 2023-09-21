import { FieldType } from '@ngx-formly/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Observable } from 'rxjs';
import { FormService } from '../../form.service';

@Component({
  template: `
  <div id="chart">
    <apx-chart
      [series]="data.series"
      [labels]="data.labels"
      [chart]="chartOptions.chart"
      [dataLabels]="chartOptions.dataLabels"
      [stroke]="chartOptions.stroke"
      [plotOptions]="chartOptions.plotOptions"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"
      [tooltip]="chartOptions.tooltip"
    ></apx-chart>
  </div>
  `,
})
export class UiFormBarChartComponent extends FieldType implements OnInit {
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
        labels: [
          2008, 2009, 2010, 2011, 2012, 2013, 2014
        ],
        series: [
          {
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21]
          }
        ]
      }
    }
    
    this.chartOptions = {
      series: this.data.series,
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },
        type: "bar",
        height: 350,
        fontFamily: 'inherit',
        foreColor: 'inherit',
        stacked: this.to.stacked,
        // stackType: "100%",
        toolbar: {
          show: false
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      plotOptions: {
        bar: {
          horizontal: this.to.horizontal ?? true
        }
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      },
      xaxis: {
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
        categories: this.data.labels
      }
    };
  }
}
