import { takeUntil } from 'rxjs/operators';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { DialogService } from '@ngneat/dialog';
import { FieldType } from '@ngx-formly/core';
import { FuseConfigService } from '@fuse/services/config/config.service'
import { GridApi } from '@ag-grid-community/core';
import { Observable, Subject } from 'rxjs';
import { FormService } from '../../form.service';
import { FormControl } from '@angular/forms'
import { FilterDataContext } from '../filter-container/filter-data-context';

@Component({
  selector: 'ui-formly-field-grid',
  template: `
    <div class='bg-card flex flex-row items-center justify-between gap-2 p-2 w-full'>
      <h3 class='text-lg font-bold text-gray-800 dark:text-gray-50'>{{to.title ?? 'Title'}}</h3>
      <button mat-flat-button (click)="onCreate()" type="button" class="bg-primary text-white">+ Add</button>
    </div>
    <ag-grid-angular
      *ngIf="agGridClassName | async as agGridClassName"
      class="w-full mb-3 cursor-pointer"
      [ngClass]="agGridClassName"
      [rowData]="data"
      [columnDefs]="to.columnDefs"
      [modules]="modules"
      rowSelection="single"
      [sideBar]="false"
      [domLayout]="'autoHeight'"
      [animateRows]="true"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="onSelectionChanged()"
      [defaultColDef]="defaultColDef"
    >
    </ag-grid-angular>

    <ng-template #editTpl let-ref>
      <div class="p-5 bg-gray-50 overflow-auto dark:bg-gray-800">
        <ui-formly-json-form
          [formName]="to.formKey"
          [showSubmitButton]="true"
          [formData]="{}"
          [viewOnly]="true"
          [model]="ref.data"
          (save)="onSave($event);ref.close()"
        ></ui-formly-json-form>
      </div>
    </ng-template>
  `,
})
export class UiFormGridComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl;

  @ViewChild('editTpl') editTpl!: TemplateRef<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  agGridClassName = this.configService.agGridClassName$;
  gridApi: GridApi
  modules = AllModules
  data: any[];

  defaultColDef = {
    flex: 1,
    minWidth: 200,
    hide: false,
    resizable: true,
    sortable: true
  }

  constructor(
    private formService: FormService,
    private configService: FuseConfigService,
    private dialogService: DialogService,
    private chaneDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    const dataKey = this.to.dataKey;
    const dataContext: FilterDataContext = this.to.context;
    if(this.formControl.value) {
      console.log(this.formControl.value)
      this.data = this.formControl.value;
    }

    this.formControl.valueChanges.subscribe(value => {
      console.log(value)
      this.data = value;
    })

    console.log('the grid context',this.to.context)

    if(dataKey) {
      if(dataContext) {
        dataContext.dataStream$.pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) this.data = _data[dataKey];
        })
      } else {
        console.log('the context data', this.formState)
        const source = this.formService.getValueForKey(dataKey, this.to.context?.data ?? this.formState)
        if(!source) {
          console.error(`formState does not have data for '${dataKey}' key`);
          this.data = [];
        } else if(source instanceof Array) {
          this.data = source;
        } else if(source instanceof Observable) {
          source.forEach(data => {
            this.data = data;
            this.chaneDetectorRef.detectChanges()
          })
        }
      }
    }

    console.log(this.data)
  }

  onGridReady($event) {
    this.gridApi = $event.api;
  }

  onSelectionChanged() {
    if(this.to.readOnly) return;
    const selected = this.gridApi.getSelectedRows()[0];
    this.dialogService.open(this.editTpl, {
      data: selected,
      minHeight: '200px',
    })
  }

  onCreate() {
    this.dialogService.open(this.editTpl, {
      data: null,
      width: 'auto',
      minHeight: '200px'
    })
  }

  onSave(data) {
    const updatedIndex = this.data.findIndex(el => el.id === data.id);
    if(updatedIndex !== -1) {
      this.data[updatedIndex] = data;
      this.data = this.data.map((el, index) => {
        if(index === updatedIndex) return data;
        else return el;
      });
    } else {
      this.data = [
        ...this.data,
        data
      ]
    }
  }
}
