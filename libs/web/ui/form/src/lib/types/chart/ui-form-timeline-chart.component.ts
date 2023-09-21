import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { FormService } from '../../form.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Component({
  template: `
  <div id="chart">
    <apx-chart
      [series]="series"
      [chart]="apexOption.chart"
      [dataLabels]="apexOption.dataLabels"
      [plotOptions]="apexOption.plotOptions"
      [xaxis]="apexOption.xaxis"
      [yaxis]="apexOption.yaxis"
      [tooltip]="apexOption.tooltip"
    ></apx-chart>
</div>
  `,
})
export class UiFormTimelineChartComponent extends FieldType implements OnInit {
  formControl!: FormControl
  apexOption: any;

  series = []

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
        this.series = source;
      } else if(source instanceof Observable) {
        source.forEach(value => { this.series = value; })
      } else {
        console.error(`Invalid data for '${dataKey}'`)
      }
    } else {
      this.series = [
        {
          data: [
            {
              x: "Code",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-04").getTime()
              ],
            },
            {
              x: "Test",
              y: [
                new Date("2019-03-04").getTime(),
                new Date("2019-03-08").getTime()
              ],
            },
            {
              x: "Validation",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-12").getTime()
              ],
            },
            {
              x: "Deployment",
              y: [
                new Date("2019-03-12").getTime(),
                new Date("2019-03-18").getTime()
              ],
            }
          ]
        }
      ]
    }

    this.apexOption = {
      chart: {
        height: 350,
        type: "rangeBar",
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
          const label = opts.w.globals.labels[opts.dataPointIndex];
          const a = moment(val[0]);
          const b = moment(val[1]);
          const diff = b.diff(a, "days");
          return label + ": " + diff + (diff > 1 ? " days" : " day");
        },
        style: {
          colors: ["#f3f4f5", "#fff"]
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
      },
      xaxis: {
        type: "datetime",
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      },
    };
  }
}
