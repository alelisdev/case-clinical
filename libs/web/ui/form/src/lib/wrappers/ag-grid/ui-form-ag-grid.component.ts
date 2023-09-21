import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Observable, Subject, takeUntil } from 'rxjs';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss'],
  selector: 'ui-ag-grid-component',
  template: `
  <div
      id="chart1"
      style="flex: 1 1 auto; overflow: hidden;"
    ></div>
    <ag-grid-angular
      [style]="getStyle()"
      class='hideHorizontalScrollbar'
      [ngClass]="to.theme ?? 'ag-theme-alpine'"
      [enableCharts]="to.enableCharts"
      [modules]="modules"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [animateRows]="true"
      [sideBar]="to.showSidebar ? sideBar : null"
      [domLayout]="to.autoHeight ? 'autoHeight' : ''"
      (gridReady)="onGridReady($event)"
      (firstDataRendered)="onFirstDataRendered($event)"
    ></ag-grid-angular>

    `,
})

export class UiFormAgGridComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private gridApi;
  private gridColumnApi;

  private _unsubscribeAll: Subject<any> = new Subject();
  formControl!: FormControl
  modules = AllModules;

  columnDefs;
  defaultColDef = {
    width: 100,
    editable: true,
    filter: 'agTextColumnFilter',
    sortable: true,
    flex: 1,
  };

  sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        width: 225,
        maxWidth: 225,
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: 'right',
    defaultToolPanel: 'none',
  };

  rowData: any;

  getStyle() {
    return `width: 100%; height: 100%; ${ this.to.autoHeight ? '' : 'min-height:500px !important;'}`;
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.columnDefs = [];
    this.field.fieldGroup?.map((childField) => {
      const { field, headerName, hide, sort, editible, filter } = childField.templateOptions ?? {};
      this.columnDefs.push({ field, headerName, hide, sortable: sort, editible,filter });
    })

    const dataKey = this.to.dataKey;
    if (dataKey) {
      const source = this.service.getValue(dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.rowData = data ?? [];
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            const data = this.formService.getValueForKey(dataKey, _data);
            this.rowData = data ?? [];
          }
        })
      }
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

  }

  onFirstDataRendered(event) {
    if(!this.to.enableChart) return;

    const eContainer1 = document.querySelector('#chart1');
    const params1 = {
      cellRange: {
        // rowStartIndex: 0,
        // rowEndIndex: 4,
        columns: this.to.columns ? this.to.columns.map(({name}) => name) : undefined,
      },
      chartType: this.to.chartType,
      chartContainer: eContainer1,
    };
    event.api.createRangeChart(params1);
    // var eContainer2 = document.querySelector('#chart2');
    // var params2 = {
    //   cellRange: {
    //     columns: ['group', 'gold'],
    //   },
    //   chartType: 'pie',
    //   chartContainer: eContainer2,
    //   aggFunc: 'sum',
    //   chartThemeOverrides: {
    //     common: {
    //       padding: {
    //         top: 20,
    //         left: 10,
    //         bottom: 30,
    //         right: 10,
    //       },
    //       legend: {
    //         enabled: true,
    //         position: 'bottom',
    //       },
    //     },
    //   },
    // };
    // event.api.createRangeChart(params2);
    // var eContainer3 = document.querySelector('#chart3');
    // var params3 = {
    //   cellRange: {
    //     columns: ['group', 'silver'],
    //   },
    //   chartType: 'pie',
    //   chartContainer: eContainer3,
    //   aggFunc: 'sum',
    //   chartThemeOverrides: {
    //     common: {
    //       padding: {
    //         top: 20,
    //         left: 10,
    //         bottom: 30,
    //         right: 10,
    //       },
    //       legend: {
    //         enabled: true,
    //         position: 'bottom',
    //       },
    //     },
    //   },
    // };
    // event.api.createRangeChart(params3);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
