import { AllModules } from '@ag-grid-enterprise/all-modules';
import { BtnCopyCellRenderer } from '../cell-renderers/copy-cell-renderer';
import { BtnDeleteCellRenderer } from '../cell-renderers/delete-cell-renderer';
import { BtnEditCellRenderer } from '../cell-renderers/edit-cell-renderer';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormService } from '@case-clinical/web/ui/form';
import { FuseConfigService } from '@fuse/services/config/config.service';

@Component({
  selector: 'ui-web-template-selector',
  template: `
    <ag-grid-angular
      *ngIf="gridClassName$ | async as gridClassName"
      class="w-full h-full"
      [ngClass]="gridClassName"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [rowSelection]="'single'"
      (selectionChanged)="selectionChanged()"
      [rowData]="rowData"
      [frameworkComponents]="frameworkComponents"
      [columnDefs]="columns"
      (gridReady)="gridReady($event)"
      [modules]="modules"
    >
    </ag-grid-angular>
    `,
})
export class WebUiTemplateSelectorComponent implements OnInit {
  @Input() rowData = []
  @Input() readonly = false;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>()
  @Output() editCallback = new EventEmitter<any>()
  @Output() deleteCallback = new EventEmitter<any>()
  modules = AllModules;
  gridClassName$ = this.configService.agGridClassName$;

  frameworkComponents = {
    btnDeleteCellRenderer: BtnDeleteCellRenderer,
    btnEditCellRenderer: BtnEditCellRenderer,
    btnCopyCellRenderer: BtnCopyCellRenderer,
  }

  gridApi

  columns = [

  ]

  defaultColDef = {
    flex: 1,
    // minWidth: 100,
    resizable: true
  };

  constructor(
    public formService: FormService,
    private configService: FuseConfigService,
  ) {
  }
  ngOnInit(): void {
    if(this.readonly) {
      this.columns = [
        {
          field: "name"
        },
      ]
    } else {
      this.columns = [
        {
          field: "name"
        },
        {
          maxWidth: 50,
          minWidth: 50,
          cellClass: "p-0",
          cellRenderer: "btnEditCellRenderer",
          cellRendererParams: {
            clicked: this.formFieldEditCallback.bind(this)
          }
        },
        {
          maxWidth: 50,
          minWidth: 50,
          cellClass: "p-0",
          cellRenderer: "btnDeleteCellRenderer",
          cellRendererParams: {
            clicked: this.removeRowNode.bind(this)
          }
        }
      ]
    }
  }

  selectionChanged() {
    const selected = this.gridApi.getSelectedRows()[0];
    this.save.emit(selected)
  }

  gridReady($event) {
    this.gridApi = $event.api;
  }

  removeRowNode(params) {
    this.deleteCallback.emit(params.node.data)
  }

  formFieldEditCallback(params) {
    this.editCallback.emit(params.node.data)
  }
}
