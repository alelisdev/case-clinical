import { FuseConfigService } from './../../../../../../@fuse/services/config/config.service';
import { GridApi } from '@ag-grid-community/core';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { FieldType } from '@ngx-formly/core'
import { EMPTY, of, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { DialogService } from '@ngneat/dialog'

@Component({
  styleUrls: ['./ui-form-typeahead.css'],
  template: `
    <div class="border-slate-500 border-[1px] overflow-hidden border-md p-[9px] bg-transparent flex flex-row hover:border-primary rounded-md cursor-pointer" (click)="openDialog(selectDlg)">
      <div *ngIf="value" class="flex-1 text-gray-800 dark:text-gray-50 font-medium">
        {{ value.name }}
      </div>
      <div *ngIf="!value" class="flex-1 text-gray-00 dark:text-gray-100 font-medium">
        {{ to.placeholder }}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
    <ng-template #selectDlg let-ref>
      <div class="flex-grow flex flex-col p-4 gap-2">
        <div class="text-semibold text-lg text-gray-800 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 rounded-t-md px-3 py-3">{{ to.placeholder }}</div>
        <div class="flex-grow flex flex-col">
          <div class="flex flex-col gap-2 lg:col-span-9 bg-gray-50 dark:bg-gray-900 rounded-b-lg shadow flex-1 p-3">
              <div class='flex flex-row bg-white p-2 gap-2'>
                <ui-search [value]="searchText" (valueChange)="searchQueryChanged($event)"></ui-search>
                <div class='flex-1'></div>
                  <button *ngIf="!to.readonly" (click)="create()" mat-flat-button>
                    <mat-icon class="icon-size-4 mr-2" [svgIcon]="'heroicons_solid:check'"></mat-icon>
                      Add
                  </button>
                  <button *ngIf="!to.readonly" (click)="update()" [disabled]="!itemSelected" mat-flat-button>
                    <mat-icon class="icon-size-4 mr-2" [svgIcon]="'heroicons_solid:check'"></mat-icon>
                      Edit
                  </button>
                  <button (click)="confirm();ref?.close()" [disabled]="!itemSelected" mat-flat-button>
                    <mat-icon class="icon-size-4 mr-2" [svgIcon]="'heroicons_solid:check'"></mat-icon>
                      Ok
                  </button>
                  <button (click)="ref?.close()" class='bg-primary' mat-flat-button>
                    <mat-icon class="icon-size-4 mr-2" [svgIcon]="'heroicons_solid:x'"></mat-icon>
                    Cancel
                  </button>
                </div>
              <ag-grid-angular
                *ngIf="gridClassName$ | async as gridClassName"
                class="w-full h-full"
                [ngClass]="gridClassName"
                [rowData]="data"
                [columnDefs]="to.columnDefs"
                rowSelection="single"
                [modules]="modules"
                [animateRows]="true"
                (selectionChanged)="onSelectionChanged()"
                [defaultColDef]="defaultColDef"
                (gridReady)="onGridReady($event)"
              >
              </ag-grid-angular>
              <span class='text-gray-900 dark:text-gray-50'>Matching records: {{ data.length }}</span>
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #editTpl let-ref>
      <div class="p-5 bg-gray-50 dark:bg-gray-800">
        <ui-formly-json-form
          [formName]="to.formKey"
          [showSubmitButton]="true"
          [formData]="{}"
          [viewOnly]="true"
          [model]="ref.data"
          (save)="onSaveData($event);ref.close()"
        ></ui-formly-json-form>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormTypeaheadComponent extends FieldType implements OnInit, OnDestroy {
  @ViewChild('editTpl') editTpl!: TemplateRef<any>;

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>()
  gridApi: GridApi
  public searchText = ''


  public value: any = null
  private tempValue: any

  itemSelected = false;

  modules = AllModules
  _immutableData: any[]
  data: any[]

  defaultColDef = {
    flex: 1,
    minWidth: 200,
    hide: false,
    resizable: true,
  }

  gridClassName$ = this.fuseConfigService.agGridClassName$;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private readonly dialog: DialogService,
    private readonly fuseConfigService: FuseConfigService,
    ) {
    super()
  }

  public ngOnInit() {
    this.to.disabled && this.formControl.disable()
    const dataKey = this.to.dataKey;
    if(this.to.items) {
      this._immutableData = this.to.items;
    } else if(this.formState[dataKey]) {
      const items = this.formState[this.to.dataKey]
      if(items instanceof Array) {
        this._immutableData = this.formState[this.to.dataKey] ?? [];
      } else {
        try {
          items.subscribe((_items) => {
            this._immutableData = _items;
            this.setInitialValue();
          })
        } catch (err) {
          console.error(err)
          this._immutableData = []
        }
      }
    } else {
      this._immutableData = [];
      console.error(`You have to provide data for key "${dataKey}"\nexpected type: any[] | Promise<any[]>\nexpected usage:\n${dataKey} = [;\nor you can use promise function\n${dataKey} = this.getCustomers;\n<ui-formly-json-form\n  [formData]="{ ..., ${dataKey}: ${dataKey} ]}"\n></ui-formly-json-form>`)
    }

    if (this.formControl.value) {
      this.setInitialValue();
    }

    this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((x) => {
      this.to.changed && this.to.changed(x)
      if (x && x.name) {
        this.value = x
      }
    })
  }

  public get immutableData() : any[] {
    if(this.to.values && this.to.values instanceof Array) {
      return this.to.values;
    } else {
      return this._immutableData;
    }
  }

  // public get dataSource(): Observable<any> {
  //   console.log('in the typeahead',this.to)
  //   if(this.to.dataKey && this.to.store){
  //     return this.to.store[this.to.dataKey]
  //   } else {
  //     return of({})
  //   }
  // }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true)
    this.ngUnsubscribe.unsubscribe()
  }

  setInitialValue() {
    console.log( this.formControl.value )
    if(!this.immutableData || !this.immutableData.length) return;
    if(this.formControl.value === null) return;
    const value = (this.formControl.value instanceof Object) ? this.formControl.value[this.to.valuePath] : this.formControl.value;
    this.value = this.immutableData.find((el) => el[this.to.valuePath] === value)
    if(this.value)
      this.publishValue();
    this.changeDetectorRef.detectChanges();
  }

  onGridReady($event) {
    this.gridApi = $event.api;
  }

  onSelectionChanged() {
    this.itemSelected = true;
    const selectedRows = this.gridApi.getSelectedRows()
    this.tempValue = selectedRows[0]
  }

  confirm() {
    this.value = this.tempValue;
    this.publishValue();
  }

  publishValue() {
    this.formControl.setValue(this.value)
    this.formState[String(this.field.key)] = this.value;
    this.formControl.markAsDirty();
  }

  searchQueryChanged(value) {
    this.data = this.immutableData.filter((data) => data[this.to.searchPath].includes(value) )
  }

  update() {
    console.log(this.value)
    this.dialog.open(this.editTpl, {
      data: { ...this.tempValue },
      minHeight: '200px'
    })
  }

  create() {
    this.dialog.open(this.editTpl, {
      data: null,
      minHeight: '200px'
    })
  }

  onSaveData(_data) {
    const updatedIndex = this._immutableData.findIndex(el => el.id === _data.id);
    if(updatedIndex !== -1) {
      this._immutableData = this._immutableData.map((el, index) => {
        if(index === updatedIndex) return _data;
        else return el;
      })
    } else {
      this._immutableData = [...this._immutableData, _data];
    }
    this.searchQueryChanged("");
  }

  openDialog(tpl: TemplateRef<any>) {
    this.searchQueryChanged("");
    this.dialog.open(tpl, {
      closeButton: false,
      minHeight: '200px',
      width: '80%',
      height: '90%'
    }).afterClosed$.subscribe(() => {
      this.gridApi = null;
    })
  }
}
