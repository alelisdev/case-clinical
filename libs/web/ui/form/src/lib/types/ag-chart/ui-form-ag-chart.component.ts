/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Component, ElementRef, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core'
import { FuseConfigService } from '@fuse/services/config/config.service';
import { AgChartOptions } from 'ag-charts-community';
import { FormService } from '../../form.service';
import { UiFormBaseField } from '../base-field-type';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { DataContextService } from '../../context-provider/data-context.service';
import { TailwindService } from '@case-clinical/web/ui/formly-designer';

@Component({
  template: `
  <div class="max-w-full overflow-auto mb-3 h-120">
    <ag-charts-angular
      style="height: 100%"
      [options]="chartOptions"
    ></ag-charts-angular>
  </div>
  `,
})
export class UiFormAgChartComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  baseTheme = 'ag-default';
  scheme = '';
  public chartOptions: AgChartOptions;
  data = []

  public get TimeSeriesChart(): boolean {
    return this.to.useTimeSeries
  }

  constructor(
    private configService: FuseConfigService,
    apiService: WebCoreDataAccessService,
    cd: ChangeDetectorRef,
    service: DataContextService,
    formService: FormService,
    tailwindService: TailwindService,
    cdr: ChangeDetectorRef,
    elementRef: ElementRef
  ) {
    super(apiService, cd, service, formService, tailwindService, cdr, elementRef)
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.scheme = config.scheme;
    })

    const dataKey = this.to.dataKey;
    if (dataKey) {
      const source = this.formService.getValueForKey(dataKey, this.to.context?.data ?? this.formState);
      if (source instanceof Observable) {
        source.subscribe(data => {
          this.data = data;
          this.chartOptions = this.buildChartOptions();
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            const data = this.formService.getValueForKey(dataKey, _data);
            this.data = data ?? [];
          }
        })
      }
    }

    this.chartOptions = this.buildChartOptions();
  }

  buildChartOptions(): any {
    const _chartOptions = {
      autoSize: this.to.autoSize,
      width: this.to.width,
      height: this.to.height,
      theme: {
        baseTheme: this.scheme === 'dark' ? 'ag-default-dark' : 'ag-default',
        palette: this.to.palette,
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                series: {
                  strokeWidth: 0,
                  dimOpacity: 0.8,
                },
              },
            },
          },
        },
      },
      title: this.to.chartTitle,
      subtitle: this.to.chartSubtitle,
      legend: this.to.legend,
      padding: this.to.padding,
    };
    if (this.to.axes?.length > 0) {
      _chartOptions['axes'] = this.to.axes.map(el => {
        const element = {
          type: el.type,
          position: el.position,
        };
        if (el.title.enabled) {
          element['title'] = el.title;
        }
        if (el.label.enabled) {
          element['label'] = el.label;
        }
        return element;
      });
    }

    if(!this.TimeSeriesChart)
      _chartOptions['data'] = this.data;

    _chartOptions['series'] = this.to.series.map((el, index) => {
      let oneSerial = {}
      if (Object.keys(el).includes('normalizedTo')) {
        oneSerial = {
          ...el,
          normalizedTo: el.normalizedTo ? 1 : 0
        }
      } else {
        oneSerial = el;
      };
      if(this.TimeSeriesChart) {
        oneSerial['data'] = this.data.length > index ? this.data[index] : []
      }
      return oneSerial;
    })
    return _chartOptions;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
