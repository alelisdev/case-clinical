import { FieldType } from '@ngx-formly/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormService } from '../../form.service';
import { CubeService } from './cube-service.service';
import { Observable } from 'rxjs';

export class CubeSeries {
  key: string
  title: string
  series: {
    category: any,
    x: any,
    value: any
  }[]
}

export class ChartData {
  series?: any[]
  labels?: any[]
}

@Component({
  template: ""
})
export abstract class ChartFieldTypeComponent extends FieldType implements OnInit {

  chartOptions: any;

  constructor(public changeDetectRef: ChangeDetectorRef, private formService: FormService, private cubejs: CubeService) {
    super()
  }

  abstract setChartData(data: ChartData);

  abstract getSampleData(): ChartData;

  abstract getChartOptions();

  // Map Cube-specific series data to {series, labels} data
  // cubeSeries = [{
  //   key: 'Customer.count',
  //   title: 'Customer count',
  //   series: [
  //     {
  //       category: "2022-11-10T",
  //       x: "2022-11-10T",
  //       value: 1,
  //     },
  //     {
  //       category: "2022-11-10T",
  //       x: "2022-11-10T",
  //       value: 34,
  //     },
  //   ]
  // }]
  abstract mapCubeSeries(cubeSeries: [CubeSeries]): ChartData;

  ngOnInit() {
    const dataKey = this.to.dataKey;
    const cubeQuery = this.to.cubeQuery;

    if (dataKey) {
      const source = this.formService.getValueForKey(dataKey, this.formState);
      if (!source) {
        console.error(`You have to provide data in formData for '${dataKey}' key`);
      } else if (source instanceof Array) {
        this.setChartData({ series: source});
      } else if(source instanceof Object) {
        this.setChartData(source) ;
      } else if (source instanceof Observable) {
        source.subscribe(data => {
          if(data instanceof Array) this.setChartData({ series: data })
          else if(data instanceof Object) this.setChartData(data);
        })
      } else {
        console.error(`You have provided wrong data for '${dataKey}' key`);
      }
    } else if(cubeQuery) {
      console.error(cubeQuery);
      this.cubejs.runCubeQuery(cubeQuery).forEach(cubeSeries => {
        this.setChartData(this.mapCubeSeries(cubeSeries)) ;
      })
    } else {
      this.setChartData(this.getSampleData());
    }
    this.chartOptions = this.getChartOptions();
  }
}
