import { ColDef } from '@ag-grid-community/core';
import { Component, Input, ViewChild } from '@angular/core'
import { TableViewComponent } from '@case-clinical/web/datatable/ui';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FuseConfigService } from '@fuse/services/config/config.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { DialogRef } from '@ngneat/dialog';
import { Subject } from 'rxjs';
import { DataListService } from '../business/data-list.service';
import { EditActionCellRenderer } from './edit-action-renderer';
import { NameEditActionCellRenderer } from './name-edit-action-renderer';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-excel-data-table-view',
  styleUrls: ['./style.css'],
  template: `
  <mat-tab-group class="h-full bg-card p-5">
    <mat-tab label="Data" class="h-full">
      <ng-template matTabContent>
        <div class="flex flex-col w-full h-full gap-4">
          <div *ngIf="ImportDataIsEmpty" class='flex-1 flex items-center justify-center text-red-900 font-bold text-2xl'>There are no data to import :(</div>
          <div *ngIf="!ImportDataIsEmpty" class="text-bold text-lg text-gray-800 dark:text-gray-50">Extracted Excel Data</div>
          <table-view
            class="flex-1"
            *ngIf="!ImportDataIsEmpty"
            [autoHeight]="true"
            [data]="excelData"
            [showSidebar]="false"
            [suppressRowClickSelection]="false"
            [columnDefs]="columnDefs"
          ></table-view>
          <div class="ml-3 mb-3 flex flex-row flex-reverse gap-2">
            <ui-button [disabled]="!valid" [label]="'Save'" (click)="onSave()" [variant]="'primary'"></ui-button>
            <ui-button [label]="'Cancel'" (click)="onCancel()" [variant]="'primary'"></ui-button>
          </div>
        </div>
      </ng-template>
    </mat-tab>

    <mat-tab label="Validation">
      <ng-template matTabContent>
        <div *ngIf="NameIsDuplicated" class="w-full h-full flex flex-col gap-2">
          <div class="text-bold text-red-900 text-lg">Name field is duplicated!!!</div>
          <table-name-validation-grid
            class="w-full flex-1"
            [detailCellRendererParams]="detailCellRendererParams"
            [rowData]="nameValidationRowData"
            [columnDefs]="nameValidationColumnDefs"
          ></table-name-validation-grid>
        </div>
        <div *ngIf="!NameIsDuplicated" class='w-full h-full flex flex-col gap-2'>
          <table-view
            *ngFor="let i of unknownNames"
            class="flex-1"
            [data]="i.data"
            [autoHeight]="true"
            [showSidebar]="false"
            [customFrameworkComponents]="frameworkComponents"
            [suppressRowClickSelection]="false"
            [columnDefs]="i.colDefs"
          ></table-view>
          <div *ngIf="unknownNames?.length === 0 && conflictNames?.length===0" class='w-full h-full flex items-center text-green-900 font-bold text-2xl justify-center flex-row gap-2'>
            There are no validation errors, You can save data now :)
          </div>
        </div>
      </ng-template>
    </mat-tab>
  </mat-tab-group>
  `
})
export class WebExcelDataTableViewComponent {



  frameworkComponents = {
    btnActionCellRenderer: EditActionCellRenderer,
  }

  tableName = ""

  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() columns: any;

  // eslint-disable-next-line @typescript-eslint/ban-types
  validateFunc: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  createNewFunc: Function
  excelData: unknown[] = []
  columnDefs: ColDef[] = []
  conflictNames: string[] = [];

  duplicateColumnDefs: ColDef[] = []
  validationColumnDefs = [];

  nameValidationColumnDefs: ColDef[] = [];
  nameValidationRowData: any[];
  detailCellRendererParams: any;

  valid = false;

  public get ImportDataIsEmpty(): boolean {
    return (this.excelData?.length ?? 0) === 0;
  }

  public get NameIsDuplicated(): boolean {
    return this.conflictNames.length > 0;
  }

  unknownNames: any[]

  constructor(
    public dialogRef: DialogRef<WebExcelDataTableViewComponent>,
    private toast: WebUiToastService,
    private confirmDlg: FuseConfirmationService,
    private dataListService: DataListService,

  ) {
    this.nameValidationColumnDefs = [
      {
        field: 'name',
        cellRenderer: 'agGroupCellRenderer',
        flex: 1,
      },
      {
        field: 'count',
        flex: 1,
      },
      {
        // maxWidth: 100,
        // minWidth: 100,
        flex: 1,
        headerName: 'Action',
        cellClass: "p-0",
        // cellRenderer: "btnNameActionCellRenderer",
        cellRenderer: "btnNameActionCellRenderer",
        cellRendererParams: {
          removeAtCallback: (data) => {
            // this.removeCallback(key, value);
            console.log({ data })
            this.removeRowAt(data['index']);
          },
          removeAllCallback: (name: string) => {
            // this.rejectRowCallback(key, value);
            this.removeRowsByName(name);
          }
        }
      },
    ]

    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: Object.values(this.dialogRef.data.columns).map(({ field, headerName }) => ({ headerName, field })),
        defaultColDef: {
          flex: 1,
          minWidth: 200,
          floatingFilter: false,
          hide: false,
          resizable: true,
          sortable: true
        },
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.data);
      },
    };
    console.log({ detailCellRendererParams: this.detailCellRendererParams })

    this.columnDefs = Object.values(dialogRef.data.columns).map((columnData: any) => {
      let filter = "";
      const { field, headerName, type } = columnData;
      switch (type) {
        case 'string':
          filter = 'agTextColumnFilter';
          break;
        case 'number':
          filter = 'agNumberColumnFilter';
          break;
        case 'date':
          filter = 'agDateColumnFilter';
          break;
        case 'set':
          filter = 'agSetColumnFilter';
          break;
        default:
          break;
      }
      let shouldCheckValidation = false;
      let key = "";

      if (field.includes('.')) {
        shouldCheckValidation = true;
        const keys = field.split('.');
        key = keys[0];
      }

      return {
        headerName,
        field,
        filter,
        tooltipValueGetter: params => {
          if (shouldCheckValidation) {
            return params.data[key]?.error ? params.data[key].errorDetail : "";
          }
        },
        cellStyle: params => {
          if (shouldCheckValidation) {
            return params.data[key]?.error ? { 'backgroundColor': 'red' } : {};
          } else {
            if (this.conflictNames.length > 0) {
              return columnData.field === 'name' && this.conflictNames.includes(params.data['name']) ? { 'backgroundColor': 'red' } : {};
            } else
              return {};
          }
        },
      }
    })
    // this.excelData = dialogRef.data.excelData;
    this.validateFunc = dialogRef.data.validateFunc;
    this.createNewFunc = dialogRef.data.createNewFunc;
    this.refresh(dialogRef.data.excelData);
    this.tableName = dialogRef.data.tableName;
  }

  refresh(data) {
    if (data?.length === 0) {
      this.valid = false;
      this.excelData = [];
      return;
    }
    if (this.validateFunc) {
      this.validateFunc(data).subscribe(({
        valid,
        excelData,
        unknownNames,
        conflictNames,
      }) => {
        this.excelData = excelData.map((el, index) => {
          return {
            index,
            ...el,
          }
        });
        this.conflictNames = conflictNames;

        if (this.NameIsDuplicated) {
          this.populateNameValidationGridData();
        }

        this.valid = valid;
        if (unknownNames) {
          const tableDataList = [];
          for (const key in unknownNames) {
            tableDataList.push({
              field: key,
              colDefs: [
                { headerName: key, field: "name", flex: 1, },
                {
                  maxWidth: 200,
                  minWidth: 200,
                  headerName: 'Action',
                  cellClass: "p-0",
                  cellRenderer: "btnActionCellRenderer",
                  cellRendererParams: {
                    // clicked: this.formFieldCopyCallback
                    options: unknownNames[key]['options'],
                    createCallback: (newValue) => {
                      this.createCallback(key, newValue);
                    },
                    replaceCallback: (from: string, to: string) => {
                      this.replaceCallback(key, from, to);
                    },
                    removeCallback: (value: string) => {
                      this.removeCallback(key, value);
                    },
                    rejectRowCallback: (value: string) => {
                      this.rejectRowCallback(key, value);
                    }
                  }
                },
              ],
              data: unknownNames[key]['newNames'].map((name) => ({ name }))
            })
          }
          this.unknownNames = tableDataList;
        }
      })
    } else {
      this.toast.error('Validation function should be defined!')
      this.excelData = data;
      this.valid = false;
    }
  }

  populateNameValidationGridData() {
    const dataByName = {}
    this.excelData.map((data) => {
      const name = data['name'];
      if (this.conflictNames.includes(name)) {
        if (dataByName[name]) {
          dataByName[name].count += 1;
          dataByName[name].data.push(data);
        } else {
          dataByName[name] = { name, count: 1, data: [data] }
        }
      }
    })
    console.log({ dataByName })
    this.nameValidationRowData = Object.values(dataByName);
  }

  removeRowAt(index) {
    this.excelData = this.excelData.filter((el: any) => el['index'] !== index)
    this.refresh(this.excelData);
  }

  removeRowsByName(name) {
    this.excelData = this.excelData.filter((el: any) => el['name'] !== name)
    this.refresh(this.excelData);
  }

  createCallback(field: string, newValue: string) {
    if (!this.createNewFunc) {
      this.toast.error('Create function is not implemented yet');
    } else {
      // field: gender.name|language.name|ethnicity.name|...
      let type = field;
      if (type.includes('.')) {
        type = type.split('.')[0];
      }
      this.createNewFunc(type, newValue).subscribe((added) => {
        if (added) {
          this.refresh(this.excelData);
        }
      })
    }
  }

  replaceCallback(field: string, from: string, to: string) {
    this.confirmDlg.open({ title: 'Replace', message: 'Are you going to save replace rule?' }).afterClosed().subscribe(result => {
      if (result === "confirmed") {
        this.dataListService.saveReplaceRule(this.tableName, field, from, to).subscribe();
      }
      this.excelData.map((datum) => {
        let parent = datum;
        let lastKey = field;
        if (field.includes('.')) {
          const keys = field.split('.');
          for (let i = 0; i < keys.length - 1; i++) {
            parent = parent[keys[i]];
            if (!parent) return;
          }
          lastKey = keys[keys.length - 1];
        }
        if (parent[lastKey] === from) {
          parent[lastKey] = to;
        }
      })
      this.refresh(this.excelData)
      this.toast.success('Replaced values successfully');
    })
  }

  removeCallback(field: string, value: string) {
    this.excelData.map((datum) => {
      if (field.includes('.')) {
        const keys = field.split('.');
        const mainKey = keys[0];
        const subKey = keys[1];
        if (datum[mainKey] && datum[mainKey][subKey] === value) {
          delete datum[mainKey];
        }
      } else {
        delete datum[field];
      }
    })
    this.refresh(this.excelData);
    this.toast.success(`Removed all ${value} values`);
  }

  rejectRowCallback(field: string, value: string) {
    const newData = this.excelData.filter((datum) => {
      if (field.includes('.')) {
        const keys = field.split('.');
        const mainKey = keys[0];
        const subKey = keys[1];
        return !datum[mainKey] || datum[mainKey][subKey] !== value
      } else {
        return datum[field] !== value;
      }
    });
    this.refresh(newData);
    this.toast.success(`Rejected all rows with ${value} value`);
  }

  onSave() {
    this.excelData.map((el) => {
      delete el['index'];
    })
    this.dialogRef.close({ status: 'confirmed', data: this.excelData })
  }

  onCancel() {
    this.dialogRef.close({ status: 'cancelled' })
  }
}
